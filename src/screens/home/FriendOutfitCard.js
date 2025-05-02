// src/screens/home/FriendsOutfitFeed.js
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS } from '../../theme/colors';
import { FONTS } from '../../theme/fonts';

const { width, height } = Dimensions.get('window');

// Mock data for friends' outfits
const friendsOutfits = [
  {
    id: '1',
    user: {
      id: '1',
      name: 'Emma',
      username: 'emma_style',
      avatar: null,
    },
    outfit: {
      imageUrl: null,
      caption: 'Today\'s look for coffee with friends. Going for that cozy autumn vibe! #CasualStyle #AutumnLook',
      likes: 42,
      comments: 7,
      timeAgo: '2h ago',
      location: 'Coffee House',
      isLiked: false,
      items: [
        { id: '1', name: 'Oversized Sweater', brand: 'H&M', sustainable: true },
        { id: '2', name: 'Mom Jeans', brand: 'Levi\'s', sustainable: false },
        { id: '3', name: 'Ankle Boots', brand: 'Dr. Martens', sustainable: true },
      ],
      challenge: { id: '1', name: 'Autumn Colors Challenge' },
    },
  },
  {
    id: '2',
    user: {
      id: '2',
      name: 'Michael',
      username: 'michael_fashion',
      avatar: null,
    },
    outfit: {
      imageUrl: null,
      caption: 'Office look but make it stylish. The vintage watch adds a nice touch! #WorkAttire #MensFashion',
      likes: 38,
      comments: 5,
      timeAgo: '4h ago',
      location: 'Downtown',
      isLiked: true,
      items: [
        { id: '4', name: 'White Button-Up', brand: 'Uniqlo', sustainable: false },
        { id: '5', name: 'Navy Chinos', brand: 'Zara', sustainable: false },
        { id: '6', name: 'Leather Loafers', brand: 'Ecco', sustainable: true },
      ],
      challenge: null,
    },
  },
  {
    id: '3',
    user: {
      id: '3',
      name: 'Sarah',
      username: 'sarah_styles',
      avatar: null,
    },
    outfit: {
      imageUrl: null,
      caption: 'Thrifted this whole outfit for under $30! Who says sustainable fashion has to be expensive? #ThriftFinds #SustainableFashion',
      likes: 67,
      comments: 12,
      timeAgo: '5h ago',
      location: 'Vintage Market',
      isLiked: false,
      items: [
        { id: '7', name: 'Vintage Blouse', brand: 'Thrifted', sustainable: true },
        { id: '8', name: 'Denim Skirt', brand: 'Thrifted', sustainable: true },
        { id: '9', name: 'Retro Sunglasses', brand: 'Thrifted', sustainable: true },
      ],
      challenge: { id: '2', name: 'Second-Hand Day' },
    },
  },
  {
    id: '4',
    user: {
      id: '4',
      name: 'Jake',
      username: 'jake_fashion',
      avatar: null,
    },
    outfit: {
      imageUrl: null,
      caption: 'Streetwear vibe today. Mixing vintage and modern pieces. #StreetStyle #UrbanFashion',
      likes: 54,
      comments: 9,
      timeAgo: '7h ago',
      location: 'Urban District',
      isLiked: false,
      items: [
        { id: '10', name: 'Graphic T-Shirt', brand: 'Supreme', sustainable: false },
        { id: '11', name: 'Cargo Pants', brand: 'Carhartt', sustainable: false },
        { id: '12', name: 'High-Top Sneakers', brand: 'Converse', sustainable: false },
      ],
      challenge: null,
    },
  },
  {
    id: '5',
    user: {
      id: '5',
      name: 'Olivia',
      username: 'olivia_chic',
      avatar: null,
    },
    outfit: {
      imageUrl: null,
      caption: 'Date night outfit! Feeling elegant and comfortable. #DateNight #EveningLook',
      likes: 78,
      comments: 14,
      timeAgo: '1d ago',
      location: 'Downtown Restaurant',
      isLiked: true,
      items: [
        { id: '13', name: 'Little Black Dress', brand: 'COS', sustainable: true },
        { id: '14', name: 'Strappy Heels', brand: 'Steve Madden', sustainable: false },
        { id: '15', name: 'Statement Earrings', brand: 'Local Artisan', sustainable: true },
      ],
      challenge: null,
    },
  },
];

const FriendsOutfitFeed = ({ navigation }) => {
  const [outfits, setOutfits] = useState(friendsOutfits);
  const flatListRef = useRef(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  const handleLike = (outfitId) => {
    setOutfits(outfits.map(item => {
      if (item.id === outfitId) {
        const isLiked = item.outfit.isLiked;
        return {
          ...item,
          outfit: {
            ...item.outfit,
            likes: isLiked ? item.outfit.likes - 1 : item.outfit.likes + 1,
            isLiked: !isLiked
          }
        };
      }
      return item;
    }));
  };

  const navigateToComments = (outfitId) => {
    // Navigate to comments screen
    navigation.navigate('OutfitComments', { outfitId });
  };

  const   navigateToProfile = (userId) => {
    // Navigate to user profile
    navigation.navigate('Profile', { userId });
  };

  const navigateToOutfitDetails = (outfitId) => {
    // Navigate to outfit details
    navigation.navigate('OutfitDetails', { outfitId });
  };

  const navigateToChallenge = (challengeId) => {
    // Navigate to challenge details
    navigation.navigate('ChallengeDetails', { challengeId });
  };

  const renderOutfitItem = ({ item, index }) => {
    const outfit = item.outfit;
    const user = item.user;
    
    // Animation for item appearance
    const inputRange = [
      (index - 1) * height,
      index * height,
      (index + 1) * height
    ];
    
    const opacity = scrollY.interpolate({
      inputRange,
      outputRange: [0.4, 1, 0.4],
      extrapolate: 'clamp'
    });
    
    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: 'clamp'
    });

    return (
      <Animated.View 
        style={[
          styles.outfitContainer,
          { opacity, transform: [{ scale }] }
        ]}
      >
        <View style={styles.outfitHeader}>
          <TouchableOpacity 
            style={styles.userInfo}
            onPress={() => navigateToProfile(user.id)}
          >
            {user.avatar ? (
              <Image source={{ uri: user.avatar }} style={styles.userAvatar} />
            ) : (
              <View style={styles.userAvatarPlaceholder}>
                <Text style={styles.userAvatarLetter}>{user.name.charAt(0)}</Text>
              </View>
            )}
            <View style={styles.userTextInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userUsername}>@{user.username}</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.moreButton}>
            <Icon name="more-horizontal" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.outfitImageContainer}
          onPress={() => navigateToOutfitDetails(item.id)}
          activeOpacity={0.9}
        >
          {outfit.imageUrl ? (
            <Image source={{ uri: outfit.imageUrl }} style={styles.outfitImage} />
          ) : (
            <View style={styles.outfitImagePlaceholder}>
              <Icon name="image" size={64} color={COLORS.gray} />
              <Text style={styles.placeholderText}>Outfit Image</Text>
            </View>
          )}
          
          {outfit.location && (
            <View style={styles.locationContainer}>
              <Icon name="map-pin" size={16} color={COLORS.white} />
              <Text style={styles.locationText}>{outfit.location}</Text>
            </View>
          )}
          
          {outfit.challenge && (
            <TouchableOpacity 
              style={styles.challengeTag}
              onPress={() => navigateToChallenge(outfit.challenge.id)}
            >
              <Text style={styles.challengeTagText}>{outfit.challenge.name}</Text>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
        
        <View style={styles.actionsContainer}>
          <View style={styles.mainActions}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => handleLike(item.id)}
            >
              <Icon 
                name="heart" 
                size={28} 
                color={outfit.isLiked ? COLORS.secondary : COLORS.darkGray} 
              />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => navigateToComments(item.id)}
            >
              <Icon name="message-circle" size={28} color={COLORS.darkGray} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="share-2" size={28} color={COLORS.darkGray} />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.bookmarkButton}>
            <Icon name="bookmark" size={28} color={COLORS.darkGray} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.likesContainer}>
          <Text style={styles.likesText}>{outfit.likes} likes</Text>
        </View>
        
        <View style={styles.captionContainer}>
          <Text style={styles.captionUsername}>{user.name}</Text>
          <Text style={styles.caption}>{outfit.caption}</Text>
        </View>
        
        {outfit.comments > 0 && (
          <TouchableOpacity 
            style={styles.viewCommentsButton}
            onPress={() => navigateToComments(item.id)}
          >
            <Text style={styles.viewCommentsText}>
              View all {outfit.comments} comments
            </Text>
          </TouchableOpacity>
        )}
        
        <Text style={styles.timeAgo}>{outfit.timeAgo}</Text>
        
        <View style={styles.outfitItemsContainer}>
          <Text style={styles.outfitItemsTitle}>Items</Text>
          {outfit.items.map((item, index) => (
            <View key={index} style={styles.outfitItem}>
              <Text style={styles.outfitItemName}>{item.name}</Text>
              <View style={styles.outfitItemDetails}>
                <Text style={styles.outfitItemBrand}>{item.brand}</Text>
                {item.sustainable && (
                  <View style={styles.sustainableTag}>
                    <Icon name="leaf" size={12} color={COLORS.white} />
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>
      </Animated.View>
    );
  };

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Friends' Outfits</Text>
        <TouchableOpacity 
          style={styles.allFriendsButton}
          onPress={() => navigation.navigate('AllFriends')}
        >
          <Text style={styles.allFriendsText}>See All</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      
      <Animated.FlatList
        ref={flatListRef}
        data={outfits}
        renderItem={renderOutfitItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        snapToInterval={height}
        snapToAlignment="start"
        decelerationRate="fast"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
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
  headerTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  allFriendsButton: {
    padding: 8,
  },
  allFriendsText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.primary,
    fontWeight: '500',
  },
  listContainer: {
    paddingBottom: 20,
  },
  outfitContainer: {
    height: height - 120, // Adjust as needed to fit the screen
    paddingHorizontal: 16,
    paddingBottom: 16,
    marginBottom: 8,
  },
  outfitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  moreButton: {
    padding: 8,
  },
  outfitImageContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  outfitImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  outfitImagePlaceholder: {
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
  locationContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  locationText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.white,
    marginLeft: 4,
  },
  challengeTag: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  challengeTagText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  mainActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginRight: 16,
  },
  bookmarkButton: {
    padding: 4,
  },
  likesContainer: {
    marginBottom: 8,
  },
  likesText: {
    fontSize: FONTS.sizes.md,
    fontWeight: 'bold',
    color: COLORS.darkGray,
  },
  captionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  captionUsername: {
    fontSize: FONTS.sizes.md,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginRight: 6,
  },
  caption: {
    fontSize: FONTS.sizes.md,
    color: COLORS.darkGray,
    flex: 1,
    flexWrap: 'wrap',
  },
  viewCommentsButton: {
    marginBottom: 8,
  },
  viewCommentsText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.gray,
  },
  timeAgo: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.gray,
    marginBottom: 12,
  },
  outfitItemsContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
  },
  outfitItemsTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
  },
  outfitItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  outfitItemName: {
    fontSize: FONTS.sizes.md,
    color: COLORS.darkGray,
  },
  outfitItemDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  outfitItemBrand: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.gray,
    marginRight: 8,
  },
  sustainableTag: {
    backgroundColor: COLORS.badge.sustainability,
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FriendsOutfitFeed;