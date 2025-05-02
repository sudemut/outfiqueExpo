
// src/screens/challenges/ChallengeDetailsScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  Modal,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { joinChallenge, leaveChallenge } from '../../store/slices/challengesSlice';
import { COLORS } from '../../theme/colors';
import { FONTS } from '../../theme/fonts';
import ParticipantItem from '../../components/challenges/ParticipantItem';
import PostItem from '../../components/challenges/PostItem';

// Temporary challenge data based on ID
const getChallengeData = (id) => {
  const challenges = {
    '1': {
      id: '1',
      title: 'Color Theme Challenge',
      description: 'Coordinate with friends and wear a specific color of the day.',
      participants: 178,
      startDate: '7 Apr',
      endDate: '14 Apr',
      badgeName: 'Color Coordinator',
      badgeIcon: '🏆',
      details: 'Join this challenge to coordinate your outfit colors with friends! Each day has a specific color theme that everyone will follow. Show your creativity by styling different outfits with the same color palette.',
      todayColor: '#FF6B6B', // Red for today's challenge
      colorName: 'Coral Red',
      topParticipants: [
        { id: '1', name: 'Emma', avatarUrl: null, outfitCount: 4 },
        { id: '2', name: 'Michael', avatarUrl: null, outfitCount: 3 },
        { id: '3', name: 'Sarah', avatarUrl: null, outfitCount: 3 },
        { id: '4', name: 'Jake', avatarUrl: null, outfitCount: 2 },
      ],
      recentPosts: [
        { id: '1', user: { id: '1', name: 'Emma', avatarUrl: null }, imageUrl: null, likes: 42, comments: 5, timeAgo: '2h ago' },
        { id: '2', user: { id: '2', name: 'Michael', avatarUrl: null }, imageUrl: null, likes: 29, comments: 3, timeAgo: '4h ago' },
        { id: '3', user: { id: '3', name: 'Sarah', avatarUrl: null }, imageUrl: null, likes: 37, comments: 7, timeAgo: '6h ago' },
      ],
      upcoming: [
        { day: 'Tomorrow', color: '#4ECDC4', colorName: 'Turquoise' },
        { day: 'Wednesday', color: '#FFD166', colorName: 'Marigold' },
        { day: 'Thursday', color: '#06D6A0', colorName: 'Mint' },
      ],
    },
    '2': {
      id: '2',
      title: 'Second-Hand Day',
      description: 'Promote sustainability by styling a thrifted or pre-loved outfit.',
      participants: 246,
      startDate: '5 Apr',
      endDate: '12 Apr',
      badgeName: 'Sustainability Champion',
      badgeIcon: '🍃',
      details: 'For this challenge, style an outfit made entirely of second-hand or thrifted items. Share the story behind your finds and inspire others to shop sustainably!',
      topParticipants: [
        { id: '5', name: 'Alex', avatarUrl: null, outfitCount: 5 },
        { id: '6', name: 'Sophia', avatarUrl: null, outfitCount: 4 },
        { id: '7', name: 'Liam', avatarUrl: null, outfitCount: 3 },
        { id: '8', name: 'Olivia', avatarUrl: null, outfitCount: 3 },
      ],
      recentPosts: [
        { id: '4', user: { id: '5', name: 'Alex', avatarUrl: null }, imageUrl: null, likes: 53, comments: 12, timeAgo: '1h ago' },
        { id: '5', user: { id: '6', name: 'Sophia', avatarUrl: null }, imageUrl: null, likes: 47, comments: 8, timeAgo: '3h ago' },
        { id: '6', user: { id: '7', name: 'Liam', avatarUrl: null }, imageUrl: null, likes: 38, comments: 6, timeAgo: '5h ago' },
      ],
      sustainabilityTips: [
        'Check garment quality before purchasing',
        'Look for classic pieces that won\'t go out of style',
        'Wash clothes less frequently and line dry when possible',
        'Learn basic mending skills for repairs',
      ],
    },
    '3': {
      id: '3',
      title: 'Outfit Swap',
      description: 'Recreate a friend\'s look with your wardrobe.',
      participants: 132,
      startDate: '10 Apr',
      endDate: '17 Apr',
      badgeName: 'Style Mimic',
      badgeIcon: '👯',
      details: 'Choose one of your friend\'s outfits and recreate it with items from your own wardrobe. Tag the friend whose style inspired you!',
      topParticipants: [
        { id: '9', name: 'Noah', avatarUrl: null, outfitCount: 4 },
        { id: '10', name: 'Ava', avatarUrl: null, outfitCount: 3 },
        { id: '11', name: 'Ethan', avatarUrl: null, outfitCount: 3 },
        { id: '12', name: 'Charlotte', avatarUrl: null, outfitCount: 2 },
      ],
      recentPosts: [
        { id: '7', user: { id: '9', name: 'Noah', avatarUrl: null }, imageUrl: null, likes: 31, comments: 4, timeAgo: '2h ago' },
        { id: '8', user: { id: '10', name: 'Ava', avatarUrl: null }, imageUrl: null, likes: 27, comments: 5, timeAgo: '4h ago' },
        { id: '9', user: { id: '11', name: 'Ethan', avatarUrl: null }, imageUrl: null, likes: 22, comments: 3, timeAgo: '7h ago' },
      ],
      friendSuggestions: [
        { id: '1', name: 'Emma', avatarUrl: null, style: 'Minimalist Chic' },
        { id: '2', name: 'Michael', avatarUrl: null, style: 'Street Style' },
        { id: '5', name: 'Alex', avatarUrl: null, style: 'Vintage Inspired' },
      ],
    },
  };

  return challenges[id] || null;
};

const ChallengeDetailsScreen = ({ route, navigation }) => {
  const { challengeId } = route.params;
  const [challenge, setChallenge] = useState(null);
  const [isJoined, setIsJoined] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('posts'); // 'posts', 'participants', or 'info'
  
  const dispatch = useDispatch();

  useEffect(() => {
    // In a real app, this would fetch data from an API
    const challengeData = getChallengeData(challengeId);
    setChallenge(challengeData);
    
    // Check if user has already joined this challenge
    // In a real app, this would come from the store
    setIsJoined(false);
  }, [challengeId]);

  if (!challenge) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const handleJoinChallenge = () => {
    dispatch(joinChallenge(challengeId));
    setIsJoined(true);
    setModalVisible(true);
  };

  const handleLeaveChallenge = () => {
    dispatch(leaveChallenge(challengeId));
    setIsJoined(false);
  };

  const renderColorCircle = (color, name) => (
    <View style={styles.colorContainer}>
      <View style={[styles.colorCircle, { backgroundColor: color }]} />
      <Text style={styles.colorName}>{name}</Text>
    </View>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'posts':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Recent Posts</Text>
            {challenge.recentPosts.map((post) => (
              <PostItem
                key={post.id}
                post={post}
                onPress={() => navigation.navigate('OutfitDetails', { outfitId: post.id })}
              />
            ))}
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All Posts</Text>
            </TouchableOpacity>
          </View>
        );
      
      case 'participants':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Top Participants</Text>
            {challenge.topParticipants.map((participant) => (
              <ParticipantItem
                key={participant.id}
                participant={participant}
                onPress={() => navigation.navigate('Profile', { userId: participant.id })}
              />
            ))}
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All Participants</Text>
            </TouchableOpacity>
          </View>
        );
      
      case 'info':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Challenge Details</Text>
            <View style={styles.infoCard}>
              <Text style={styles.infoText}>{challenge.details}</Text>
              
              {challenge.id === '1' && (
                <>
                  <Text style={styles.infoSubtitle}>Today's Color</Text>
                  {renderColorCircle(challenge.todayColor, challenge.colorName)}
                  
                  <Text style={styles.infoSubtitle}>Upcoming Colors</Text>
                  <View style={styles.upcomingContainer}>
                    {challenge.upcoming.map((day, index) => (
                      <View key={index} style={styles.upcomingItem}>
                        <Text style={styles.upcomingDay}>{day.day}</Text>
                        {renderColorCircle(day.color, day.colorName)}
                      </View>
                    ))}
                  </View>
                </>
              )}
              
              {challenge.id === '2' && (
                <>
                  <Text style={styles.infoSubtitle}>Sustainability Tips</Text>
                  {challenge.sustainabilityTips.map((tip, index) => (
                    <View key={index} style={styles.tipContainer}>
                      <Icon name="check" size={16} color={COLORS.primary} />
                      <Text style={styles.tipText}>{tip}</Text>
                    </View>
                  ))}
                </>
              )}
              
              {challenge.id === '3' && (
                <>
                  <Text style={styles.infoSubtitle}>Friend Suggestions</Text>
                  <Text style={styles.infoText}>Try recreating outfits from these style inspirations:</Text>
                  {challenge.friendSuggestions.map((friend, index) => (
                    <View key={index} style={styles.friendSuggestionItem}>
                      <View style={styles.friendAvatar}>
                        {friend.avatarUrl ? (
                          <Image source={{ uri: friend.avatarUrl }} style={styles.avatarImage} />
                        ) : (
                          <View style={styles.placeholderAvatar}>
                            <Text style={styles.avatarLetter}>{friend.name.charAt(0)}</Text>
                          </View>
                        )}
                      </View>
                      <View style={styles.friendInfo}>
                        <Text style={styles.friendName}>{friend.name}</Text>
                        <Text style={styles.friendStyle}>{friend.style}</Text>
                      </View>
                      <TouchableOpacity style={styles.viewProfileButton}>
                        <Text style={styles.viewProfileText}>View</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </>
              )}
            </View>
          </View>
        );
      
      default:
        return null;
    }
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
        <Text style={styles.headerTitle}>Challenge Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.challengeHeader}>
          <View style={styles.badgeContainer}>
            <View style={styles.badgeIcon}>
              <Text style={styles.badgeEmoji}>{challenge.badgeIcon}</Text>
            </View>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.challengeTitle}>{challenge.title}</Text>
            <Text style={styles.challengeDescription}>{challenge.description}</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{challenge.participants}</Text>
            <Text style={styles.statLabel}>Participants</Text>
          </View>
          <View style={styles.verticalDivider} />
          <View style={styles.dateContainer}>
            <Text style={styles.dateLabel}>Duration</Text>
            <Text style={styles.dateValue}>{challenge.startDate} - {challenge.endDate}</Text>
          </View>
          <View style={styles.verticalDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{challenge.badgeName}</Text>
            <Text style={styles.statLabel}>Badge</Text>
          </View>
        </View>

        {isJoined ? (
          <View style={styles.joinedIndicator}>
            <Icon name="check-circle" size={20} color={COLORS.primary} />
            <Text style={styles.joinedText}>You've joined this challenge</Text>
            <TouchableOpacity 
              style={styles.leaveButton}
              onPress={handleLeaveChallenge}
            >
              <Text style={styles.leaveButtonText}>Leave</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity 
            style={styles.joinButton}
            onPress={handleJoinChallenge}
          >
            <Text style={styles.joinButtonText}>Join Challenge</Text>
          </TouchableOpacity>
        )}

        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[
              styles.tabButton, 
              activeTab === 'posts' && styles.activeTabButton
            ]}
            onPress={() => setActiveTab('posts')}
          >
            <Text 
              style={[
                styles.tabButtonText,
                activeTab === 'posts' && styles.activeTabButtonText
              ]}
            >
              Posts
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.tabButton, 
              activeTab === 'participants' && styles.activeTabButton
            ]}
            onPress={() => setActiveTab('participants')}
          >
            <Text 
              style={[
                styles.tabButtonText,
                activeTab === 'participants' && styles.activeTabButtonText
              ]}
            >
              Participants
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.tabButton, 
              activeTab === 'info' && styles.activeTabButton
            ]}
            onPress={() => setActiveTab('info')}
          >
            <Text 
              style={[
                styles.tabButtonText,
                activeTab === 'info' && styles.activeTabButtonText
              ]}
            >
              Info
            </Text>
          </TouchableOpacity>
        </View>

        {renderTabContent()}
      </ScrollView>

      {/* Success Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Icon name="check-circle" size={60} color={COLORS.primary} />
            <Text style={styles.modalTitle}>Challenge Joined!</Text>
            <Text style={styles.modalText}>
              You've successfully joined the {challenge.title}. Get ready to participate!
            </Text>
            <TouchableOpacity 
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Got it!</Text>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  badgeContainer: {
    marginRight: 16,
  },
  badgeIcon: {
    backgroundColor: COLORS.lightPink,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeEmoji: {
    fontSize: 28,
  },
  titleContainer: {
    flex: 1,
  },
  challengeTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  challengeDescription: {
    fontSize: FONTS.sizes.md,
    color: COLORS.darkGray,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.gray,
  },
  verticalDivider: {
    height: 24,
    width: 1,
    backgroundColor: COLORS.border,
  },
  dateContainer: {
    alignItems: 'center',
    flex: 1,
  },
  dateLabel: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.gray,
    marginBottom: 4,
  },
  dateValue: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.primary,
    fontWeight: '500',
  },
  joinedIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(10, 30, 80, 0.1)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  joinedText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.primary,
    fontWeight: '500',
    marginLeft: 8,
    flex: 1,
  },
  leaveButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  leaveButtonText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.primary,
    fontWeight: '500',
  },
  joinButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  joinButtonText: {
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTabButton: {
    backgroundColor: COLORS.primary,
  },
  tabButtonText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.gray,
  },
  activeTabButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  tabContent: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
  },
  infoText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.darkGray,
    lineHeight: 22,
    marginBottom: 16,
  },
  infoSubtitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
  },
  colorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  colorCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  colorName: {
    fontSize: FONTS.sizes.md,
    color: COLORS.darkGray,
  },
  upcomingContainer: {
    marginTop: 8,
  },
  upcomingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  upcomingDay: {
    width: 80,
    fontSize: FONTS.sizes.md,
    fontWeight: '500',
    color: COLORS.primary,
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.darkGray,
    marginLeft: 8,
    flex: 1,
  },
  friendSuggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  friendAvatar: {
    marginRight: 12,
  },
  placeholderAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lavender,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarLetter: {
    fontSize: FONTS.sizes.md,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  friendInfo: {
    flex: 1,
  },
  friendName: {
    fontSize: FONTS.sizes.md,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 2,
  },
  friendStyle: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.gray,
  },
  viewProfileButton: {
    backgroundColor: COLORS.lavender,
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  viewProfileText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.primary,
    fontWeight: '500',
  },
  viewAllButton: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  viewAllText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.primary,
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    width: '80%',
  },
  modalTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 16,
    marginBottom: 8,
  },
  modalText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.darkGray,
    textAlign: 'center',
    marginBottom: 24,
  },
  modalButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  modalButtonText: {
    fontSize: FONTS.sizes.md,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});

export default ChallengeDetailsScreen;