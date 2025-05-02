
// src/screens/home/OutfitDetailsScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
  Share,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useSelector, useDispatch } from 'react-redux';
import { likeOutfit, unlikeOutfit, addComment } from '../../store/slices/outfitsSlice';
import { COLORS } from '../../theme/colors';
import { FONTS } from '../../theme/fonts';

// Mock data for outfit details
const getOutfitData = (id) => {
  const outfits = {
    '1': {
      id: '1',
      user: {
        id: '1',
        name: 'Emma',
        username: 'emma_style',
        avatarUrl: null,
        followers: 324,
        following: 215,
      },
      imageUrl: null,
      caption: 'Simple and casual look for a sunny day. This tee is one of my favorites—Ive worn it over 20 times! #sustainablefashion #capsulewardrobe',
      likeCount: 53,
      isLiked: false,
      timeAgo: '2h ago',
      location: 'Istanbul, Turkey',
      tags: ['Casual', 'Summer', 'Sustainable'],
      challenges: [
        { id: '1', name: 'Color Theme Challenge', icon: '🎨' }
      ],
      aesthetics: [
        { id: '1', name: 'Soft Aesthetic', icon: '🌸' },
        { id: '11', name: 'Cottagecore', icon: '🌾' }
      ],
      items: [
        { id: '1', name: 'White Linen T-Shirt', brand: 'H&M Conscious', sustainableTag: true, wearCount: 22 },
        { id: '2', name: 'High-Waisted Jeans', brand: 'Levi\'s', sustainableTag: false, wearCount: 35 },
        { id: '3', name: 'Straw Hat', brand: 'Local Market', sustainableTag: true, wearCount: 15 },
      ],
      comments: [
        { id: '1', user: { id: '2', name: 'Michael', username: 'michael_fashion', avatarUrl: null }, text: 'Love the sustainable approach! That tee is perfect for summer.', timeAgo: '1h ago' },
        { id: '2', user: { id: '3', name: 'Sarah', username: 'sarah_styles', avatarUrl: null }, text: 'The hat really completes the look!', timeAgo: '45m ago' },
      ],
    },
    '2': {
      id: '2',
      user: {
        id: '2',
        name: 'Michael',
        username: 'michael_fashion',
        avatarUrl: null,
        followers: 567,
        following: 324,
      },
      imageUrl: null,
      caption: 'Retro-futuristic vibes today with this Y2K inspired outfit. First time trying this aesthetic! What do you think? #Y2K #retro #cyberstyle',
      likeCount: 78,
      isLiked: true,
      timeAgo: '4h ago',
      location: 'Istanbul, Turkey',
      tags: ['Street', 'Retro', 'Y2K'],
      challenges: [
        { id: '3', name: 'Y2K Revival', icon: '👾' }
      ],
      aesthetics: [
        { id: '2', name: 'Cyber Y2K', icon: '💾' },
        { id: '6', name: 'Vaporwave', icon: '🌴' }
      ],
      items: [
        { id: '4', name: 'Metallic Puffer Jacket', brand: 'Vintage Find', sustainableTag: true, wearCount: 4 },
        { id: '5', name: 'Cargo Pants', brand: 'Urban Outfitters', sustainableTag: false, wearCount: 12 },
        { id: '6', name: 'Platform Sneakers', brand: 'Buffalo', sustainableTag: false, wearCount: 8 },
      ],
      comments: [
        { id: '3', user: { id: '1', name: 'Emma', username: 'emma_style', avatarUrl: null }, text: 'This is amazing! Love the Y2K vibe, totally suits you.', timeAgo: '3h ago' },
        { id: '4', user: { id: '4', name: 'Jake', username: 'jake_fashionist', avatarUrl: null }, text: 'Those platform sneakers are everything!', timeAgo: '2h ago' },
      ],
    },
    // Add more outfits as needed...
  };

  return outfits[id] || null;
};

const OutfitDetailsScreen = ({ route, navigation }) => {
  const { outfitId } = route.params;
  const [outfit, setOutfit] = useState(null);
  const [comment, setComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [showItemModal, setShowItemModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showOptionsModal, setShowOptionsModal] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    // In a real app, this would fetch data from an API or Redux store
    const outfitData = getOutfitData(outfitId);
    setOutfit(outfitData);
    
    if (outfitData) {
      setIsLiked(outfitData.isLiked);
      setLikesCount(outfitData.likeCount);
    }
  }, [outfitId]);

  if (!outfit) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const handleLike = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikesCount(prev => prev - 1);
      dispatch(unlikeOutfit({ outfitId, source: 'explore' }));
    } else {
      setIsLiked(true);
      setLikesCount(prev => prev + 1);
      dispatch(likeOutfit({ outfitId, source: 'explore' }));
    }
  };

  const handleComment = () => {
    if (comment.trim() === '') return;

    const newComment = {
      id: Date.now().toString(),
      user: {
        id: 'current_user',
        name: 'You',
        username: 'your_username',
        avatarUrl: null,
      },
      text: comment,
      timeAgo: 'Just now',
    };

    // Add to local state
    outfit.comments.unshift(newComment);
    
    // Add to Redux store (in a real app)
    dispatch(addComment({
      outfitId,
      comment: newComment,
      source: 'explore'
    }));

    setComment('');
  };

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `Check out this outfit by ${outfit.user.name} on OUTFIQUE!`,
        // In a real app, you would have a sharing URL here
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleItemPress = (item) => {
    setSelectedItem(item);
    setShowItemModal(true);
  };

  const handleFollowUser = () => {
    // In a real app, dispatch an action to follow the user
    // For now, just close the modal
    setShowOptionsModal(false);
  };

  const handleSaveOutfit = () => {
    // In a real app, dispatch an action to save the outfit
    // For now, just close the modal
    setShowOptionsModal(false);
  };

  const handleReportOutfit = () => {
    // In a real app, navigate to a report screen
    // For now, just close the modal
    setShowOptionsModal(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Outfit Details</Text>
        <TouchableOpacity 
          style={styles.optionsButton}
          onPress={() => setShowOptionsModal(true)}
        >
          <Icon name="more-vertical" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.userInfoContainer}>
          <TouchableOpacity 
            style={styles.userInfo}
            onPress={() => navigation.navigate('Profile', { userId: outfit.user.id })}
          >
            {outfit.user.avatarUrl ? (
              <Image source={{ uri: outfit.user.avatarUrl }} style={styles.userAvatar} />
            ) : (
              <View style={styles.userAvatarPlaceholder}>
                <Text style={styles.userAvatarLetter}>{outfit.user.name.charAt(0)}</Text>
              </View>
            )}
            <View style={styles.userTextInfo}>
              <Text style={styles.userName}>{outfit.user.name}</Text>
              <Text style={styles.userUsername}>@{outfit.user.username}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.followButtonText}>Follow</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.imageContainer}>
          {outfit.imageUrl ? (
            <Image 
              source={{ uri: outfit.imageUrl }} 
              style={styles.outfitImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Icon name="image" size={64} color={COLORS.gray} />
              <Text style={styles.placeholderText}>Outfit Image</Text>
            </View>
          )}
        </View>

        <View style={styles.actionsContainer}>
          <View style={styles.mainActions}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handleLike}
            >
              <Icon 
                name={isLiked ? "heart" : "heart"} 
                size={24} 
                color={isLiked ? COLORS.secondary : COLORS.darkGray} 
                solid={isLiked}
              />
              <Text style={styles.actionText}>{likesCount}</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => {/* Focus on comment input */}}
            >
              <Icon name="message-circle" size={24} color={COLORS.darkGray} />
              <Text style={styles.actionText}>{outfit.comments.length}</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handleShare}
            >
              <Icon name="share-2" size={24} color={COLORS.darkGray} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.saveButton}
            onPress={handleSaveOutfit}
          >
            <Icon name="bookmark" size={24} color={COLORS.darkGray} />
          </TouchableOpacity>
        </View>

        {outfit.location && (
          <View style={styles.locationContainer}>
            <Icon name="map-pin" size={16} color={COLORS.primary} />
            <Text style={styles.locationText}>{outfit.location}</Text>
          </View>
        )}

        <View style={styles.captionContainer}>
          <Text style={styles.caption}>{outfit.caption}</Text>
          <Text style={styles.timeAgo}>{outfit.timeAgo}</Text>
        </View>

        {outfit.tags && outfit.tags.length > 0 && (
          <View style={styles.tagsContainer}>
            {outfit.tags.map((tag, index) => (
              <TouchableOpacity key={index} style={styles.tagPill}>
                <Text style={styles.tagText}>#{tag}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {outfit.challenges && outfit.challenges.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Challenges</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.challengesContainer}
            >
              {outfit.challenges.map((challenge) => (
                <TouchableOpacity 
                  key={challenge.id} 
                  style={styles.challengeCard}
                  onPress={() => navigation.navigate('ChallengeDetails', { challengeId: challenge.id })}
                >
                  <Text style={styles.challengeIcon}>{challenge.icon}</Text>
                  <Text style={styles.challengeName}>{challenge.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {outfit.aesthetics && outfit.aesthetics.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Aesthetics</Text>
            <View style={styles.aestheticsContainer}>
              {outfit.aesthetics.map((aesthetic) => (
                <TouchableOpacity 
                  key={aesthetic.id} 
                  style={styles.aestheticPill}
                >
                  <Text style={styles.aestheticIcon}>{aesthetic.icon}</Text>
                  <Text style={styles.aestheticName}>{aesthetic.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {outfit.items && outfit.items.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Items</Text>
            <View style={styles.itemsContainer}>
              {outfit.items.map((item) => (
                <TouchableOpacity 
                  key={item.id} 
                  style={styles.itemRow}
                  onPress={() => handleItemPress(item)}
                >
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <View style={styles.itemDetails}>
                      <Text style={styles.itemBrand}>{item.brand}</Text>
                      {item.sustainableTag && (
                        <View style={styles.sustainableTag}>
                          <Icon name="leaf" size={12} color={COLORS.white} />
                          <Text style={styles.sustainableTagText}>Sustainable</Text>
                        </View>
                      )}
                    </View>
                  </View>
                  <View style={styles.wearCountContainer}>
                    <Text style={styles.wearCountLabel}>Worn</Text>
                    <Text style={styles.wearCountValue}>{item.wearCount}x</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        <View style={styles.commentsSection}>
          <Text style={styles.sectionTitle}>Comments</Text>
          
          {outfit.comments.map((comment) => (
            <View key={comment.id} style={styles.commentContainer}>
              <View style={styles.commentHeader}>
                {comment.user.avatarUrl ? (
                  <Image source={{ uri: comment.user.avatarUrl }} style={styles.commentAvatar} />
                ) : (
                  <View style={styles.commentAvatarPlaceholder}>
                    <Text style={styles.commentAvatarLetter}>{comment.user.name.charAt(0)}</Text>
                  </View>
                )}
                <View style={styles.commentUserInfo}>
                  <Text style={styles.commentUserName}>{comment.user.name}</Text>
                  <Text style={styles.commentTimeAgo}>{comment.timeAgo}</Text>
                </View>
              </View>
              <Text style={styles.commentText}>{comment.text}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.commentInputContainer}>
        <View style={styles.commentInputWrapper}>
          <TextInput
            style={styles.commentInput}
            placeholder="Add a comment..."
            value={comment}
            onChangeText={setComment}
          />
          <TouchableOpacity 
            style={[
              styles.sendButton,
              !comment.trim() && styles.sendButtonDisabled
            ]}
            onPress={handleComment}
            disabled={!comment.trim()}
          >
            <Icon 
              name="send" 
              size={20} 
              color={comment.trim() ? COLORS.primary : COLORS.gray} 
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Item Details Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showItemModal}
        onRequestClose={() => setShowItemModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Item Details</Text>
              <TouchableOpacity onPress={() => setShowItemModal(false)}>
                <Icon name="x" size={24} color={COLORS.darkGray} />
              </TouchableOpacity>
            </View>

            {selectedItem && (
              <View style={styles.itemDetails}>
                <Text style={styles.modalItemName}>{selectedItem.name}</Text>
                <Text style={styles.modalItemBrand}>Brand: {selectedItem.brand}</Text>
                
                <View style={styles.itemStatsContainer}>
                  <View style={styles.itemStatCard}>
                    <Text style={styles.itemStatValue}>{selectedItem.wearCount}</Text>
                    <Text style={styles.itemStatLabel}>Times Worn</Text>
                  </View>
                  
                  {selectedItem.sustainableTag && (
                    <View style={[styles.itemStatCard, styles.sustainableStatCard]}>
                      <Icon name="leaf" size={24} color={COLORS.badge.sustainability} />
                      <Text style={styles.sustainableStatText}>Sustainable Item</Text>
                    </View>
                  )}
                </View>
                
                <Text style={styles.itemImpactTitle}>Environmental Impact</Text>
                <Text style={styles.itemImpactText}>
                  By wearing this item {selectedItem.wearCount} times, this user has helped reduce fashion waste and their carbon footprint.
                </Text>
                
                <TouchableOpacity style={styles.addToWardrobeButton}>
                  <Text style={styles.addToWardrobeText}>Add Similar to My Wardrobe</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>

      {/* Options Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showOptionsModal}
        onRequestClose={() => setShowOptionsModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.optionsModalContent}>
            <View style={styles.optionsModalHeader}>
              <Text style={styles.optionsModalTitle}>Options</Text>
              <TouchableOpacity onPress={() => setShowOptionsModal(false)}>
                <Icon name="x" size={24} color={COLORS.darkGray} />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              style={styles.optionItem}
              onPress={handleFollowUser}
            >
              <Icon name="user-plus" size={20} color={COLORS.primary} />
              <Text style={styles.optionText}>Follow {outfit.user.name}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.optionItem}
              onPress={handleSaveOutfit}
            >
              <Icon name="bookmark" size={20} color={COLORS.primary} />
              <Text style={styles.optionText}>Save to Collection</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.optionItem}
              onPress={handleShare}
            >
              <Icon name="share-2" size={20} color={COLORS.primary} />
              <Text style={styles.optionText}>Share Outfit</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.optionItem}
              onPress={handleReportOutfit}
            >
              <Icon name="flag" size={20} color={COLORS.error} />
              <Text style={[styles.optionText, styles.reportText]}>Report Outfit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  optionsButton: {
    padding: 8,
  },
  userInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userAvatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lavender,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userAvatarLetter: {
    fontSize: FONTS.sizes.md,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  userTextInfo: {
    marginLeft: 12,
  },
  userName: {
    fontSize: FONTS.sizes.md,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  userUsername: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.gray,
  },
  followButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
  },
  followButtonText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.sm,
    fontWeight: 'bold',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 4/5,
    backgroundColor: COLORS.white,
  },
  outfitImage: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lavender,
  },
  placeholderText: {
    marginTop: 12,
    fontSize: FONTS.sizes.md,
    color: COLORS.gray,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  mainActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  actionText: {
    marginLeft: 6,
    fontSize: FONTS.sizes.md,
    color: COLORS.darkGray,
  },
  saveButton: {
    padding: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  locationText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.primary,
    marginLeft: 4,
  },
  captionContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  caption: {
    fontSize: FONTS.sizes.md,
    color: COLORS.darkGray,
    lineHeight: 22,
  },
  timeAgo: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.gray,
    marginTop: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  tagPill: {
    backgroundColor: COLORS.lavender,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.primary,
  },
  sectionContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 12,
  },
  challengesContainer: {
    paddingRight: 16,
  },
  challengeCard: {
    backgroundColor: COLORS.lightPink,
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    width: 150,
    alignItems: 'center',
  },
  challengeIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  challengeName: {
    fontSize: FONTS.sizes.sm,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
  },
  aestheticsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  aestheticPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lavender,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  aestheticIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  aestheticName: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.primary,
  },
  itemsContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: FONTS.sizes.md,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  itemDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemBrand: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.gray,
    marginRight: 8,
  },
  sustainableTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.badge.sustainability,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  sustainableTagText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.white,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  wearCountContainer: {
    alignItems: 'center',
  },
  wearCountLabel: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.gray,
  },
  wearCountValue: {
    fontSize: FONTS.sizes.md,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  commentsSection: {
    paddingHorizontal: 16,
    marginBottom: 80, // Extra space for comment input
  },
  commentContainer: {
    marginBottom: 16,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  commentAvatarPlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.lavender,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  commentAvatarLetter: {
    fontSize: FONTS.sizes.sm,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  commentUserInfo: {
    flex: 1,
  },
  commentUserName: {
    fontSize: FONTS.sizes.sm,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  commentTimeAgo: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.gray,
  },
  commentText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.darkGray,
    lineHeight: 20,
  },
  commentInputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  commentInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: FONTS.sizes.md,
    backgroundColor: COLORS.lighterGray,
    marginRight: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lavender,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: COLORS.lightGray,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 30, // For bottom safe area
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  itemDetails: {
    padding: 16,
  },
  modalItemName: {
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
  },
  modalItemBrand: {
    fontSize: FONTS.sizes.md,
    color: COLORS.darkGray,
    marginBottom: 16,
  },
  itemStatsContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  itemStatCard: {
    flex: 1,
    backgroundColor: COLORS.lavender,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginRight: 8,
  },
  sustainableStatCard: {
    backgroundColor: 'rgba(139, 195, 74, 0.2)',
    marginRight: 0,
  },
  itemStatValue: {
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  itemStatLabel: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.darkGray,
  },
  sustainableStatText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.badge.sustainability,
    fontWeight: 'bold',
    marginTop: 4,
  },
  itemImpactTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
  },
  itemImpactText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.darkGray,
    lineHeight: 22,
    marginBottom: 24,
  },
  addToWardrobeButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  addToWardrobeText: {
    fontSize: FONTS.sizes.md,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  optionsModalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 30, // For bottom safe area
  },
  optionsModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  optionsModalTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  optionText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.darkGray,
    marginLeft: 12,
  },
  reportText: {
    color: COLORS.error,
  },
});

export default OutfitDetailsScreen;