// src/screens/explore/ExploreScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS } from '../../theme/colors';
import { FONTS } from '../../theme/fonts';
import OutfitCard from '../../components/explore/OutfitCard';
import ChallengePreview from '../../components/explore/ChallengePreview';
import StyleCategoryButton from '../../components/explore/StyleCategoryButton';
import AestheticFilter from '../../components/explore/AestheticFilter';

// Mock data for categories
const styleCategories = [
  { id: '1', name: 'All', icon: 'grid' },
  { id: '2', name: 'Casual', icon: 'coffee' },
  { id: '3', name: 'Formal', icon: 'briefcase' },
  { id: '4', name: 'Street', icon: 'map' },
  { id: '5', name: 'Vintage', icon: 'clock' },
  { id: '6', name: 'Sporty', icon: 'activity' },
  { id: '7', name: 'Boho', icon: 'feather' },
];

// Mock data for aesthetics
const aesthetics = [
  {
    id: '1',
    name: 'Soft Aesthetic',
    colors: ['#B9E6FF', '#E4C1F9', '#FFD6EC'],
    icon: '🌸',
  },
  {
    id: '2',
    name: 'Cyber Y2K',
    colors: ['#C7C7C7', '#BB00EA', '#00FF84'],
    icon: '💾',
  },
  {
    id: '3',
    name: 'Minimalism',
    colors: ['#FFFFFF', '#D1D1D6', '#1C1C1E'],
    icon: '🔲',
  },
  {
    id: '4',
    name: 'Romantic',
    colors: ['#FFE6E6', '#E5D3B3', '#9E2B25'],
    icon: '🌹',
  },
  {
    id: '5',
    name: 'Dark Academia',
    colors: ['#0A1045', '#4F5D2F', '#8B4513'],
    icon: '📚',
  },
  {
    id: '6',
    name: 'Vaporwave',
    colors: ['#9900FF', '#0096FF', '#FF00FF'],
    icon: '🌴',
  },
  {
    id: '7',
    name: 'Kidcore',
    colors: ['#FF0000', '#0000FF', '#FFFF00'],
    icon: '🧸',
  },
  {
    id: '8',
    name: 'Grunge',
    colors: ['#A9A9A9', '#8B0000', '#000000'],
    icon: '🎸',
  },
  {
    id: '9',
    name: 'Eco Aesthetic',
    colors: ['#708238', '#C19A6B', '#A2A2A2'],
    icon: '🌿',
  },
  {
    id: '10',
    name: 'Baddie',
    colors: ['#FF69B4', '#DA70D6', '#F5F5DC'],
    icon: '💅',
  },
  {
    id: '11',
    name: 'Cottagecore',
    colors: ['#90EE90', '#F5F5DC', '#FFA500'],
    icon: '🌾',
  },
];

// Mock data for outfits
const mockOutfits = [
  { 
    id: '1', 
    user: { id: '1', name: 'Emma', avatarUrl: null }, 
    imageUrl: null, 
    likes: 53, 
    comments: 7,
    styleCategory: 'Casual',
    aesthetics: ['1', '11'], // Soft Aesthetic, Cottagecore
    timeAgo: '2h ago',
    caption: 'Simple and casual look for a sunny day',
  },
  { 
    id: '2', 
    user: { id: '2', name: 'Michael', avatarUrl: null }, 
    imageUrl: null, 
    likes: 78, 
    comments: 12,
    styleCategory: 'Street',
    aesthetics: ['2', '6'], // Cyber Y2K, Vaporwave
    timeAgo: '4h ago',
    caption: 'Retro-futuristic vibes today',
  },
  { 
    id: '3', 
    user: { id: '3', name: 'Sophie', avatarUrl: null }, 
    imageUrl: null, 
    likes: 124, 
    comments: 15,
    styleCategory: 'Formal',
    aesthetics: ['3', '5'], // Minimalism, Dark Academia
    timeAgo: '6h ago',
    caption: 'Business meeting look with a scholarly twist',
  },
  { 
    id: '4', 
    user: { id: '4', name: 'Jake', avatarUrl: null }, 
    imageUrl: null, 
    likes: 42, 
    comments: 3,
    styleCategory: 'Casual',
    aesthetics: ['7', '8'], // Kidcore, Grunge
    timeAgo: '8h ago',
    caption: 'Nostalgic 90s inspired outfit',
  },
  { 
    id: '5', 
    user: { id: '5', name: 'Olivia', avatarUrl: null }, 
    imageUrl: null, 
    likes: 96, 
    comments: 9,
    styleCategory: 'Boho',
    aesthetics: ['9', '11'], // Eco Aesthetic, Cottagecore
    timeAgo: '10h ago',
    caption: 'Sustainable fashion for a day in nature',
  },
  { 
    id: '6', 
    user: { id: '6', name: 'Liam', avatarUrl: null }, 
    imageUrl: null, 
    likes: 67, 
    comments: 6,
    styleCategory: 'Sporty',
    aesthetics: ['3', '9'], // Minimalism, Eco Aesthetic
    timeAgo: '12h ago',
    caption: 'Keeping it simple and comfortable for the gym',
  },
  { 
    id: '7', 
    user: { id: '7', name: 'Ava', avatarUrl: null }, 
    imageUrl: null, 
    likes: 112, 
    comments: 14,
    styleCategory: 'Vintage',
    aesthetics: ['4', '5'], // Romantic, Dark Academia
    timeAgo: '1d ago',
    caption: 'Vintage finds with a romantic touch',
  },
  { 
    id: '8', 
    user: { id: '8', name: 'Noah', avatarUrl: null }, 
    imageUrl: null, 
    likes: 89, 
    comments: 8,
    styleCategory: 'Street',
    aesthetics: ['8', '10'], // Grunge, Baddie
    timeAgo: '1d ago',
    caption: 'Urban style with attitude',
  },
];

// Mock data for challenges
const mockChallenges = [
  {
    id: '1',
    title: 'Color Theme Challenge',
    description: 'Coordinate with friends and wear a specific color of the day.',
    participants: 178,
    type: 'challenge',
    aesthetics: ['1', '3', '4', '11'], // Soft, Minimalism, Romantic, Cottagecore
    icon: '🎨',
  },
  {
    id: '2',
    title: 'Second-Hand Day',
    description: 'Promote sustainability by styling a thrifted or pre-loved outfit.',
    participants: 246,
    type: 'challenge',
    aesthetics: ['5', '8', '9', '11'], // Dark Academia, Grunge, Eco, Cottagecore
    icon: '♻️',
  },
  {
    id: '3',
    title: 'Y2K Revival',
    description: 'Channel the 2000s with futuristic and retro elements.',
    participants: 153,
    type: 'challenge',
    aesthetics: ['2', '6', '7', '10'], // Cyber Y2K, Vaporwave, Kidcore, Baddie
    icon: '👾',
  },
  {
    id: '4',
    title: 'Academia Style',
    description: 'Embrace scholarly looks from dark to light academia.',
    participants: 132,
    type: 'challenge',
    aesthetics: ['3', '5'], // Minimalism, Dark Academia
    icon: '🏛️',
  },
];

// Mock data for trending topics
const trendingTopics = [
  {
    id: '1',
    name: 'Summer Capsule Wardrobe',
    posts: 423,
    icon: '☀️',
  },
  {
    id: '2',
    name: 'Sustainable Brands',
    posts: 367,
    icon: '🌱',
  },
  {
    id: '3',
    name: 'Thrift Hauls',
    posts: 298,
    icon: '👗',
  },
  {
    id: '4',
    name: 'Outfit Layering',
    posts: 245,
    icon: '🧥',
  },
];

const ExploreScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('1'); // 'All' category by default
  const [selectedAesthetics, setSelectedAesthetics] = useState([]);
  const [outfits, setOutfits] = useState(mockOutfits);
  const [filteredOutfits, setFilteredOutfits] = useState(mockOutfits);
  const [filteredChallenges, setFilteredChallenges] = useState(mockChallenges);
  const [isLoading, setIsLoading] = useState(false);
  const [showAestheticFilters, setShowAestheticFilters] = useState(false);

  // In a real app, we would get the user's selected aesthetics from the redux store
  // For now, we'll use mock data
  const userAesthetics = ['1', '3', '9']; // Soft, Minimalism, Eco

  useEffect(() => {
    // Initialize with user's aesthetics
    setSelectedAesthetics(userAesthetics);
  }, []);

  useEffect(() => {
    filterContent();
  }, [selectedCategory, selectedAesthetics, searchQuery]);

  const filterContent = () => {
    setIsLoading(true);

    // Filter outfits
    let filtered = [...mockOutfits];

    // Filter by category
    if (selectedCategory !== '1') { // Not 'All'
      const category = styleCategories.find(cat => cat.id === selectedCategory);
      if (category) {
        filtered = filtered.filter(outfit => outfit.styleCategory === category.name);
      }
    }

    // Filter by selected aesthetics (show outfits that match ANY of the selected aesthetics)
    if (selectedAesthetics.length > 0) {
      filtered = filtered.filter(outfit => 
        outfit.aesthetics.some(aesthetic => selectedAesthetics.includes(aesthetic))
      );
    }

    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(outfit => 
        outfit.user.name.toLowerCase().includes(query) ||
        outfit.styleCategory.toLowerCase().includes(query) ||
        outfit.caption.toLowerCase().includes(query) ||
        aesthetics.some(aesthetic => 
          selectedAesthetics.includes(aesthetic.id) && 
          aesthetic.name.toLowerCase().includes(query)
        )
      );
    }

    // Filter challenges based on selected aesthetics
    const filteredChallenges = selectedAesthetics.length > 0 
      ? mockChallenges.filter(challenge => 
          challenge.aesthetics.some(aesthetic => selectedAesthetics.includes(aesthetic))
        )
      : mockChallenges;

    setFilteredOutfits(filtered);
    setFilteredChallenges(filteredChallenges);
    setIsLoading(false);
  };

  const toggleAestheticSelection = (aestheticId) => {
    if (selectedAesthetics.includes(aestheticId)) {
      setSelectedAesthetics(selectedAesthetics.filter(id => id !== aestheticId));
    } else {
      setSelectedAesthetics([...selectedAesthetics, aestheticId]);
    }
  };

  const renderTrendingTopic = ({ item }) => (
    <TouchableOpacity style={styles.trendingTopic}>
      <View style={styles.trendingIconContainer}>
        <Text style={styles.trendingIcon}>{item.icon}</Text>
      </View>
      <View style={styles.trendingInfo}>
        <Text style={styles.trendingName}>{item.name}</Text>
        <Text style={styles.trendingPosts}>{item.posts} posts</Text>
      </View>
      <Icon name="chevron-right" size={20} color={COLORS.gray} />
    </TouchableOpacity>
  );

  const renderAestheticFilters = () => (
    <View style={styles.aestheticFiltersContainer}>
      <View style={styles.aestheticFiltersHeader}>
        <Text style={styles.aestheticFiltersTitle}>Filter by Aesthetic</Text>
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={() => setShowAestheticFilters(false)}
        >
          <Icon name="x" size={20} color={COLORS.darkGray} />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.aestheticFiltersList}>
        <View style={styles.aestheticFiltersGrid}>
          {aesthetics.map((aesthetic) => (
            <AestheticFilter
              key={aesthetic.id}
              aesthetic={aesthetic}
              isSelected={selectedAesthetics.includes(aesthetic.id)}
              onPress={() => toggleAestheticSelection(aesthetic.id)}
            />
          ))}
        </View>
      </ScrollView>
      
      <TouchableOpacity 
        style={styles.applyFiltersButton}
        onPress={() => setShowAestheticFilters(false)}
      >
        <Text style={styles.applyFiltersText}>Apply Filters</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore</Text>
        <TouchableOpacity onPress={() => setShowAestheticFilters(true)}>
          <Icon name="sliders" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color={COLORS.gray} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search outfits by style, item..."
          placeholderTextColor={COLORS.gray}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={() => setSearchQuery('')}
          >
            <Icon name="x" size={16} color={COLORS.gray} />
          </TouchableOpacity>
        )}
      </View>

      {/* Style Categories */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {styleCategories.map((category) => (
          <StyleCategoryButton
            key={category.id}
            category={category}
            isSelected={selectedCategory === category.id}
            onPress={() => setSelectedCategory(category.id)}
          />
        ))}
      </ScrollView>

      {/* Selected Aesthetics Pills */}
      {selectedAesthetics.length > 0 && (
        <View style={styles.selectedAestheticsContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.selectedAestheticsContent}
          >
            {selectedAesthetics.map((id) => {
              const aesthetic = aesthetics.find(a => a.id === id);
              return (
                <TouchableOpacity
                  key={id}
                  style={styles.selectedAestheticPill}
                  onPress={() => toggleAestheticSelection(id)}
                >
                  <Text style={styles.selectedAestheticIcon}>{aesthetic.icon}</Text>
                  <Text style={styles.selectedAestheticName}>{aesthetic.name}</Text>
                  <Icon name="x" size={14} color={COLORS.primary} />
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity
              style={styles.addAestheticButton}
              onPress={() => setShowAestheticFilters(true)}
            >
              <Icon name="plus" size={16} color={COLORS.primary} />
              <Text style={styles.addAestheticText}>Add</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Finding your style...</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Challenges Section */}
          {filteredChallenges.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Challenges</Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.challengesContent}
              >
                {filteredChallenges.map((challenge) => (
                  <ChallengePreview
                    key={challenge.id}
                    challenge={challenge}
                    onPress={() => navigation.navigate('ChallengeDetails', { challengeId: challenge.id })}
                  />
                ))}
              </ScrollView>
            </View>
          )}

          {/* Trending Topics */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Trending Topics</Text>
            <FlatList
              data={trendingTopics}
              renderItem={renderTrendingTopic}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>

          {/* This or That Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>This or That</Text>
            <TouchableOpacity 
              style={styles.thisOrThatCard}
              onPress={() => navigation.navigate('ThisOrThat')}
            >
              <View style={styles.thisOrThatContent}>
                <View style={styles.thisOrThatPlaceholder} />
                <View style={styles.orContainer}>
                  <View style={styles.orCircle}>
                    <Text style={styles.orText}>OR</Text>
                  </View>
                </View>
                <View style={styles.thisOrThatPlaceholder} />
              </View>
              <Text style={styles.thisOrThatDescription}>
                Help friends decide between outfit options!
              </Text>
            </TouchableOpacity>
          </View>

          {/* Outfit Grid */}
          <View style={styles.section}>
            <View style={styles.outfitsSectionHeader}>
              <Text style={styles.sectionTitle}>
                {filteredOutfits.length > 0 ? 'Discover Outfits' : 'No Outfits Found'}
              </Text>
              <View style={styles.sortingContainer}>
                <Text style={styles.sortingLabel}>Sort by:</Text>
                <TouchableOpacity style={styles.sortingButton}>
                  <Text style={styles.sortingButtonText}>Recent</Text>
                  <Icon name="chevron-down" size={16} color={COLORS.primary} />
                </TouchableOpacity>
              </View>
            </View>
            
            {filteredOutfits.length > 0 ? (
              <View style={styles.outfitsGrid}>
                {filteredOutfits.map((outfit, index) => (
                  <OutfitCard 
                    key={outfit.id}
                    outfit={outfit}
                    onPress={() => navigation.navigate('OutfitDetails', { outfitId: outfit.id })}
                    style={index % 2 === 0 ? styles.leftOutfitCard : styles.rightOutfitCard}
                  />
                ))}
              </View>
            ) : (
              <View style={styles.emptyOutfitsContainer}>
                <Icon name="search" size={48} color={COLORS.gray} />
                <Text style={styles.emptyOutfitsText}>
                  No outfits match your current filters.
                </Text>
                <TouchableOpacity 
                  style={styles.resetFiltersButton}
                  onPress={() => {
                    setSelectedCategory('1');
                    setSelectedAesthetics(userAesthetics);
                    setSearchQuery('');
                  }}
                >
                  <Text style={styles.resetFiltersText}>Reset Filters</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      )}

      {/* Aesthetic Filters Modal */}
      {showAestheticFilters && renderAestheticFilters()}
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
  },
  headerTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightPink,
    borderRadius: 24,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: FONTS.sizes.md,
    color: COLORS.darkGray,
  },
  clearButton: {
    padding: 8,
  },
  categoriesContainer: {
    marginVertical: 12,
  },
  categoriesContent: {
    paddingHorizontal: 16,
  },
  selectedAestheticsContainer: {
    marginBottom: 12,
  },
  selectedAestheticsContent: {
    paddingHorizontal: 16,
  },
  selectedAestheticPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lavender,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  selectedAestheticIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  selectedAestheticName: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.primary,
    marginRight: 8,
  },
  addAestheticButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  addAestheticText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.primary,
    marginLeft: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  loadingText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.primary,
    marginTop: 12,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 12,
  },
  challengesContent: {
    paddingRight: 16,
  },
  trendingTopic: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  trendingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lavender,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  trendingIcon: {
    fontSize: 20,
  },
  trendingInfo: {
    flex: 1,
  },
  trendingName: {
    fontSize: FONTS.sizes.md,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 2,
  },
  trendingPosts: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.gray,
  },
  thisOrThatCard: {
    backgroundColor: COLORS.lightPink,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  thisOrThatContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  thisOrThatPlaceholder: {
    width: '45%',
    height: 150,
    backgroundColor: COLORS.lavender,
    borderRadius: 8,
  },
  orContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orText: {
    fontSize: FONTS.sizes.sm,
    fontWeight: 'bold',
    color: COLORS.darkGray,
  },
  thisOrThatDescription: {
    fontSize: FONTS.sizes.md,
    color: COLORS.darkGray,
    textAlign: 'center',
  },
  outfitsSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sortingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortingLabel: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.gray,
    marginRight: 8,
  },
  sortingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  sortingButtonText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.primary,
    marginRight: 4,
  },
  outfitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  leftOutfitCard: {
    width: '48%',
    marginBottom: 16,
  },
  rightOutfitCard: {
    width: '48%',
    marginBottom: 16,
  },
  emptyOutfitsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 24,
    marginBottom: 20,
  },
  emptyOutfitsText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.darkGray,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  resetFiltersButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  resetFiltersText: {
    fontSize: FONTS.sizes.md,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  aestheticFiltersContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.background,
    zIndex: 999,
  },
  aestheticFiltersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  aestheticFiltersTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  closeButton: {
    padding: 8,
  },
  aestheticFiltersList: {
    flex: 1,
  },
  aestheticFiltersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
  },
  applyFiltersButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    alignItems: 'center',
    margin: 16,
    borderRadius: 12,
  },
  applyFiltersText: {
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});

export default ExploreScreen;