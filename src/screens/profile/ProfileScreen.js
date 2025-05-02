// src/screens/profile/ProfileScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS } from '../../theme/colors';
import { FONTS } from '../../theme/fonts';
import BadgeItem from '../../components/profile/BadgeItem';
import OutfitGridItem from '../../components/profile/OutfitGridItem';

// Mock user data
const mockUser = {
  id: '1',
  name: 'Your Profile',
  outfits: 24,
  challenges: 356,
  followers: 127,
  following: 265,
  badges: [
    {
      id: '1',
      name: 'Sustainability Champion',
      icon: '🍃',
      color: COLORS.lightPink,
    },
    {
      id: '2',
      name: 'Style Trendsetter',
      icon: '⭐',
      color: COLORS.lightPink,
    },
    {
      id: '3',
      name: '30x Challenge Winner',
      icon: '🏆',
      color: COLORS.lightPink,
    },
  ],
  outfitPosts: [
    { id: '1', imageUrl: null, likes: 39, date: '4/1' },
    { id: '2', imageUrl: null, likes: 30, date: '4/0' },
    { id: '3', imageUrl: null, likes: 82, date: '4/-1' },
    { id: '4', imageUrl: null, likes: 79, date: '4/-2' },
    { id: '5', imageUrl: null, likes: 54, date: '4/-3' },
    { id: '6', imageUrl: null, likes: 48, date: '4/-4' },
  ],
};

const ProfileScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('outfits'); // 'outfits', 'challenges', or 'saved'
  const [user, setUser] = useState(mockUser);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'outfits':
        return (
          <View style={styles.outfitsGrid}>
            {user.outfitPosts.map((outfit) => (
              <OutfitGridItem
                key={outfit.id}
                outfit={outfit}
                onPress={() => navigation.navigate('OutfitDetails', { outfitId: outfit.id })}
              />
            ))}
          </View>
        );
      case 'challenges':
        return (
          <View style={styles.emptyTabContent}>
            <Icon name="award" size={48} color={COLORS.gray} />
            <Text style={styles.emptyTabText}>Your challenge history will appear here</Text>
          </View>
        );
      case 'saved':
        return (
          <View style={styles.emptyTabContent}>
            <Icon name="bookmark" size={48} color={COLORS.gray} />
            <Text style={styles.emptyTabText}>Saved items will appear here</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.outfits}</Text>
            <Text style={styles.statLabel}>Outfits</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.challenges}</Text>
            <Text style={styles.statLabel}>Challenges</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.followers}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.following}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.settingsButton}>
          <Icon name="settings" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.badgeSection}>
        <Text style={styles.sectionTitle}>Your Badges</Text>
        <View style={styles.badgesContainer}>
          {user.badges.map((badge) => (
            <BadgeItem key={badge.id} badge={badge} />
          ))}
        </View>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'outfits' && styles.activeTabButton]}
          onPress={() => setActiveTab('outfits')}
        >
          <Icon
            name="grid"
            size={24}
            color={activeTab === 'outfits' ? COLORS.primary : COLORS.gray}
          />
          <Text
            style={[
              styles.tabLabel,
              activeTab === 'outfits' && styles.activeTabLabel,
            ]}
          >
            Outfits
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'challenges' && styles.activeTabButton]}
          onPress={() => setActiveTab('challenges')}
        >
          <Icon
            name="award"
            size={24}
            color={activeTab === 'challenges' ? COLORS.primary : COLORS.gray}
          />
          <Text
            style={[
              styles.tabLabel,
              activeTab === 'challenges' && styles.activeTabLabel,
            ]}
          >
            Challenges
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'saved' && styles.activeTabButton]}
          onPress={() => setActiveTab('saved')}
        >
          <Icon
            name="bookmark"
            size={24}
            color={activeTab === 'saved' ? COLORS.primary : COLORS.gray}
          />
          <Text
            style={[
              styles.tabLabel,
              activeTab === 'saved' && styles.activeTabLabel,
            ]}
          >
            Saved
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>{renderTabContent()}</ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.lavender,
    borderRadius: 16,
    margin: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  statsContainer: {
    flexDirection: 'row',
  },
  statItem: {
    marginRight: 20,
    alignItems: 'center',
  },
  statValue: {
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.darkGray,
  },
  settingsButton: {
    padding: 4,
  },
  badgeSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 12,
  },
  badgesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabButton: {
    borderBottomColor: COLORS.primary,
  },
  tabLabel: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.gray,
    marginTop: 4,
  },
  activeTabLabel: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  outfitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 2,
  },
  emptyTabContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyTabText: {
    marginTop: 12,
    fontSize: FONTS.sizes.md,
    color: COLORS.gray,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});

export default ProfileScreen;