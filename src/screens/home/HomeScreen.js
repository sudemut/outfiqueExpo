
// src/screens/home/HomeScreen.js
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  Image
} from 'react-native';
import { COLORS } from '../../theme/colors';
import { FONTS } from '../../theme/fonts';
import FriendOutfitCard from '../../components/home/FriendOutfitCard';
import ChallengeCard from '../../components/challenges/ChallengeCard.js';

// Temporary mock data
const friendsOutfits = [
  {
    id: '1',
    name: 'Sarah',
    timestamp: '1h ago',
    imageUrl: null, // This would be a real image URL in production
  },
  {
    id: '2',
    name: 'Mike',
    timestamp: '2h ago',
    imageUrl: null,
  },
  {
    id: '3',
    name: 'Emma',
    timestamp: '4h ago',
    imageUrl: null,
  },
];

const challenges = [
  {
    id: '1',
    title: 'Color Theme Challenge',
    description: 'Coordinate with friends and wear a specific color of the day.',
    participants: 178,
    startDate: '7 Apr',
    endDate: '14 Apr',
    badgeName: 'Color Coordinator',
  },
  {
    id: '2',
    title: 'Second-Hand Day',
    description: 'Promote sustainability by styling a thrifted or pre-loved outfit.',
    participants: 246,
  },
  {
    id: '3',
    title: 'Outfit Swap',
    description: 'Recreate a friend\'s look with your wardrobe.',
    participants: 132,
  },
];

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appName}>OUTFIQUE</Text>
        <Text style={styles.tagline}>YOUR OUTFIT, YOUR STORY</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Friends' Outfits</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.friendsScrollView}
          >
            {friendsOutfits.map((friend) => (
              <FriendOutfitCard 
                key={friend.id} 
                friend={friend} 
                onPress={() => navigation.navigate('OutfitDetails', { friendId: friend.id })}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Challenges</Text>
          
          {challenges.map((challenge) => (
            <ChallengeCard 
              key={challenge.id}
              challenge={challenge}
              onPress={() => navigation.navigate('ChallengeDetails', { challengeId: challenge.id })}
            />
          ))}

          <TouchableOpacity 
            style={styles.thisOrThatCard}
            onPress={() => navigation.navigate('ThisOrThat')}
          >
            <Text style={styles.thisOrThatTitle}>This or That</Text>
            <Text style={styles.thisOrThatDescription}>
              Help your friends decide between outfit options!
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  appName: {
    fontSize: FONTS.sizes.xxxl,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  tagline: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.primary,
    marginTop: 4,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  seeAll: {
    fontSize: FONTS.sizes.md,
    color: COLORS.secondary,
  },
  friendsScrollView: {
    marginBottom: 8,
  },
  thisOrThatCard: {
    backgroundColor: COLORS.lightPink,
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    marginBottom: 20,
  },
  thisOrThatTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  thisOrThatDescription: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.gray,
  },
});

export default HomeScreen;