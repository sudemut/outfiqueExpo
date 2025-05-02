// src/screens/wardrobe/WardrobeScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  Modal,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../theme/colors';
import { FONTS } from '../../theme/fonts';
import ClothingItem from '../../components/wardrobe/ClothingItem';
import CategoryTab from '../../components/wardrobe/CategoryTab';

const { width } = Dimensions.get('window');

// Mock data for clothing categories
const categories = [
  { id: '1', name: 'All', icon: 'grid' },
  { id: '2', name: 'Tops', icon: 'layers' },
  { id: '3', name: 'Bottoms', icon: 'pocket' },
  { id: '4', name: 'Dresses', icon: 'gift' },
  { id: '5', name: 'Outerwear', icon: 'chevrons-up' },
  { id: '6', name: 'Shoes', icon: 'box' },
  { id: '7', name: 'Accessories', icon: 'watch' },
];

// Mock data for wardrobe items
const mockWardrobeItems = [
  {
    id: '1',
    name: 'White T-Shirt',
    category: 'Tops',
    brand: 'H&M',
    color: 'White',
    sustainable: true,
    wearCount: 12,
    imageUrl: null,
  },
  {
    id: '2',
    name: 'Blue Jeans',
    category: 'Bottoms',
    brand: 'Levi\'s',
    color: 'Blue',
    sustainable: false,
    wearCount: 23,
    imageUrl: null,
  },
  {
    id: '3',
    name: 'Black Dress',
    category: 'Dresses',
    brand: 'Zara',
    color: 'Black',
    sustainable: false,
    wearCount: 5,
    imageUrl: null,
  },
  {
    id: '4',
    name: 'Sneakers',
    category: 'Shoes',
    brand: 'Nike',
    color: 'White',
    sustainable: false,
    wearCount: 47,
    imageUrl: null,
  },
  {
    id: '5',
    name: 'Summer Hat',
    category: 'Accessories',
    brand: 'Local Brand',
    color: 'Beige',
    sustainable: true,
    wearCount: 8,
    imageUrl: null,
  },
  {
    id: '6',
    name: 'Denim Jacket',
    category: 'Outerwear',
    brand: 'Vintage',
    color: 'Blue',
    sustainable: true,
    wearCount: 18,
    imageUrl: null,
  },
  // Add more items
  {
    id: '7',
    name: 'Black Jeans',
    category: 'Bottoms',
    brand: 'H&M',
    color: 'Black',
    sustainable: false,
    wearCount: 15,
    imageUrl: null,
  },
  {
    id: '8',
    name: 'Red Blouse',
    category: 'Tops',
    brand: 'Mango',
    color: 'Red',
    sustainable: true,
    wearCount: 7,
    imageUrl: null,
  },
];

const WardrobeScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('1'); // 'All' category by default
  const [wardrobeItems, setWardrobeItems] = useState(mockWardrobeItems);
  const [filteredItems, setFilteredItems] = useState(mockWardrobeItems);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAIDetectionModal, setShowAIDetectionModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectedItems, setDetectedItems] = useState([]);
  
  useEffect(() => {
    filterItems(selectedCategory, searchText);
  }, [selectedCategory, searchText]);

  const filterItems = (categoryId, query = '') => {
    let filtered = [...wardrobeItems];
    
    // Filter by category
    if (categoryId !== '1') { // Not 'All'
      const category = categories.find(cat => cat.id === categoryId);
      if (category) {
        filtered = filtered.filter(item => item.category === category.name);
      }
    }
    
    // Filter by search query
    if (query.trim() !== '') {
      const lowercaseQuery = query.toLowerCase();
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(lowercaseQuery) ||
        item.brand.toLowerCase().includes(lowercaseQuery) ||
        item.color.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    setFilteredItems(filtered);
  };

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const handleAddItem = (item) => {
    const newItem = {
      ...item,
      id: Date.now().toString(),
    };
    
    setWardrobeItems(prev => [...prev, newItem]);
    setDetectedItems(prev => prev.filter(i => i.name !== item.name));
  };

  const simulateAIDetection = () => {
    setIsDetecting(true);
    setShowAIDetectionModal(true);
    
    // Simulate AI detecting items from an image
    setTimeout(() => {
      setIsDetecting(false);
      setDetectedItems([
        {
          name: 'Striped T-Shirt',
          category: 'Tops',
          brand: 'Unknown',
          color: 'Blue/White',
          sustainable: false,
          wearCount: 0,
          imageUrl: null,
        },
        {
          name: 'Denim Shorts',
          category: 'Bottoms',
          brand: 'Unknown',
          color: 'Blue',
          sustainable: false,
          wearCount: 0,
          imageUrl: null,
        },
        {
          name: 'Canvas Sneakers',
          category: 'Shoes',
          brand: 'Unknown',
          color: 'White',
          sustainable: false,
          wearCount: 0,
          imageUrl: null,
        },
      ]);
    }, 2000);
  };

  const renderClothingItem = ({ item }) => (
    <ClothingItem
      item={item}
      onWearCountIncrement={() => {
        // Handle incrementing wear count
        const updatedItems = wardrobeItems.map(wardrobeItem => {
          if (wardrobeItem.id === item.id) {
            return { ...wardrobeItem, wearCount: wardrobeItem.wearCount + 1 };
          }
          return wardrobeItem;
        });
        setWardrobeItems(updatedItems);
        filterItems(selectedCategory, searchText);
      }}
    />
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Icon name="search" size={48} color={COLORS.gray} />
      <Text style={styles.emptyText}>No items found</Text>
      <Text style={styles.emptySubtext}>Try a different search or category</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Wardrobe</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity 
            style={styles.headerButton} 
            onPress={() => simulateAIDetection()}
          >
            <Icon name="camera" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => setShowAddModal(true)}
          >
            <Icon name="plus" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color={COLORS.gray} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search your wardrobe..."
          placeholderTextColor={COLORS.gray}
          value={searchText}
          onChangeText={handleSearch}
        />
        {searchText ? (
          <TouchableOpacity onPress={() => setSearchText('')}>
            <Icon name="x" size={20} color={COLORS.gray} />
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={styles.statsBar}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{wardrobeItems.length}</Text>
          <Text style={styles.statLabel}>Items</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {wardrobeItems.filter(item => item.sustainable).length}
          </Text>
          <Text style={styles.statLabel}>Sustainable</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {wardrobeItems.reduce((total, item) => total + item.wearCount, 0)}
          </Text>
          <Text style={styles.statLabel}>Total Wears</Text>
        </View>
      </View>

      <View style={styles.categoryTabContainer}>
        <FlatList
          data={categories}
          renderItem={({ item }) => (
            <CategoryTab
              category={item}
              isSelected={selectedCategory === item.id}
              onPress={() => setSelectedCategory(item.id)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.categoryList}
        />
      </View>

      <View style={styles.clothingListContainer}>
        <FlatList
          data={filteredItems}
          renderItem={renderClothingItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.clothingList}
          ListEmptyComponent={renderEmptyComponent}
        />
      </View>

      {/* AI Detection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showAIDetectionModal}
        onRequestClose={() => setShowAIDetectionModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.aiDetectionModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>AI Detected Items</Text>
              <TouchableOpacity onPress={() => setShowAIDetectionModal(false)}>
                <Icon name="x" size={24} color={COLORS.darkGray} />
              </TouchableOpacity>
            </View>

            {isDetecting ? (
              <View style={styles.loadingContainer}>
                <MaterialIcon name="robot" size={60} color={COLORS.primary} />
                <Text style={styles.loadingText}>AI detecting items...</Text>
              </View>
            ) : (
              <>
                <Text style={styles.detectionInfo}>
                  AI has detected {detectedItems.length} items from your image. Add them to your wardrobe:
                </Text>
                <ScrollView style={styles.detectedItemsContainer}>
                  {detectedItems.map((item, index) => (
                    <View key={index} style={styles.detectedItem}>
                      <View style={styles.detectedItemLeft}>
                        <View style={styles.placeholderImage}>
                          <Icon name="shopping-bag" size={24} color={COLORS.primary} />
                        </View>
                        <View style={styles.detectedItemInfo}>
                          <Text style={styles.detectedItemName}>{item.name}</Text>
                          <Text style={styles.detectedItemDetails}>
                            {item.category} • {item.color}
                          </Text>
                        </View>
                      </View>
                      <TouchableOpacity 
                        style={styles.addToWardrobeButton}
                        onPress={() => handleAddItem(item)}
                      >
                        <Text style={styles.addToWardrobeText}>Add</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </ScrollView>
                <TouchableOpacity 
                  style={styles.addAllButton}
                  onPress={() => {
                    // Add all detected items to wardrobe
                    const newItems = detectedItems.map(item => ({
                      ...item,
                      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
                    }));
                    
                    setWardrobeItems(prev => [...prev, ...newItems]);
                    setShowAIDetectionModal(false);
                    setDetectedItems([]);
                  }}
                >
                  <Text style={styles.addAllButtonText}>Add All to Wardrobe</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Add Item Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showAddModal}
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.addItemModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add to Wardrobe</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <Icon name="x" size={24} color={COLORS.darkGray} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.addButtonsContainer}>
              <TouchableOpacity 
                style={styles.addOptionButton}
                onPress={() => {
                  setShowAddModal(false);
                  simulateAIDetection();
                }}
              >
                <Icon name="camera" size={32} color={COLORS.primary} />
                <Text style={styles.addOptionText}>AI Detect from Photo</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.addOptionButton}>
                <Icon name="edit-3" size={32} color={COLORS.primary} />
                <Text style={styles.addOptionText}>Add Manually</Text>
              </TouchableOpacity>
            </View>
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
  headerButtons: {
    flexDirection: 'row',
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    height: 40,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: FONTS.sizes.md,
    color: COLORS.darkGray,
  },
  statsBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.gray,
  },
  categoryTabContainer: {
    marginBottom: 8,
  },
  categoryList: {
    paddingHorizontal: 16,
  },
  clothingListContainer: {
    flex: 1,
  },
  clothingList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  emptyText: {
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    marginTop: 12,
  },
  emptySubtext: {
    fontSize: FONTS.sizes.md,
    color: COLORS.gray,
    marginTop: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  aiDetectionModal: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: '80%',
  },
  addItemModal: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: FONTS.sizes.lg,
    color: COLORS.primary,
    marginTop: 16,
  },
  detectionInfo: {
    fontSize: FONTS.sizes.md,
    color: COLORS.darkGray,
    marginBottom: 16,
  },
  detectedItemsContainer: {
    maxHeight: 300,
  },
  detectedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.lavender,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  detectedItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  placeholderImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  detectedItemInfo: {
    flex: 1,
  },
  detectedItemName: {
    fontSize: FONTS.sizes.md,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  detectedItemDetails: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.darkGray,
  },
  addToWardrobeButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  addToWardrobeText: {
    fontSize: FONTS.sizes.sm,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  addAllButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  addAllButtonText: {
    fontSize: FONTS.sizes.md,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  addButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  addOptionButton: {
    backgroundColor: COLORS.lavender,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    width: (width - 60) / 2,
    height: 140,
    justifyContent: 'center',
  },
  addOptionText: {
    fontSize: FONTS.sizes.md,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 12,
    textAlign: 'center',
  },
});

export default WardrobeScreen;