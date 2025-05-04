// src/screens/messaging/MessagingScreen.js
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Modal,
  ScrollView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../theme/colors';
import { FONTS } from '../../theme/fonts';

const { width, height } = Dimensions.get('window');

// Mock data for conversations
const conversations = [
  {
    id: '1',
    user: {
      id: '1',
      name: 'Emma',
      username: 'emma_style',
      avatar: null,
    },
    lastMessage: {
      text: 'I love your newest outfit! Where did you get that top?',
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      isRead: true,
    },
    unreadCount: 0,
  },
  {
    id: '2',
    user: {
      id: '2',
      name: 'Michael',
      username: 'michael_fashion',
      avatar: null,
    },
    lastMessage: {
      text: 'Check out this outfit I created for you from my wardrobe!',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      isRead: false,
    },
    unreadCount: 2,
    hasOutfitSuggestion: true,
  },
  {
    id: '3',
    user: {
      id: '3',
      name: 'Sarah',
      username: 'sarah_styles',
      avatar: null,
    },
    lastMessage: {
      text: 'Are you joining the Second-Hand Day challenge?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      isRead: true,
    },
    unreadCount: 0,
  },
  {
    id: '4',
    user: {
      id: '4',
      name: 'Jake',
      username: 'jake_fashion',
      avatar: null,
    },
    lastMessage: {
      text: 'Thanks for the outfit suggestions! The colors work really well together.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      isRead: true,
    },
    unreadCount: 0,
  },
];

// Mock messages for a conversation
const getMessages = (conversationId) => {
  const conversation = conversations.find(c => c.id === conversationId);
  if (!conversation) return [];
  
  const user = conversation.user;
  const baseMessages = [
    {
      id: '1',
      senderId: user.id,
      text: 'Hey! I saw your latest outfit post. It looks amazing!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    },
    {
      id: '2',
      senderId: 'current_user',
      text: 'Thanks! I have been trying to mix and match items from my wardrobe more.',
      timestamp: new Date(Date.now() - 1000 * 60 * 59), // 59 minutes ago
    },
    {
      id: '3',
      senderId: user.id,
      text: 'That is a great approach! Are you participating in any of the current challenges?',
      timestamp: new Date(Date.now() - 1000 * 60 * 58), // 58 minutes ago
    },
    {
      id: '4',
      senderId: 'current_user',
      text: 'Yes, Im doing the Color Theme Challenge this week. Its been fun coordinating with friends!',
      timestamp: new Date(Date.now() - 1000 * 60 * 57), // 57 minutes ago
    },
  ];
  
  // For conversation with Michael, add outfit suggestion
  if (conversationId === '2') {
    baseMessages.push(
      {
        id: '5',
        senderId: user.id,
        text: 'I created an outfit for you using items from my wardrobe that would match your style!',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      },
      {
        id: '6',
        senderId: user.id,
        outfitSuggestion: {
          title: 'Casual Weekend Look',
          items: [
            { name: 'Striped T-Shirt', category: 'Tops' },
            { name: 'Denim Jacket', category: 'Outerwear' },
            { name: 'Black Jeans', category: 'Bottoms' },
            { name: 'White Sneakers', category: 'Shoes' },
          ],
        },
        timestamp: new Date(Date.now() - 1000 * 60 * 29), // 29 minutes ago
      }
    );
  }
  
  return baseMessages;
};

// Mock user's wardrobe
const myWardrobe = [
  {
    id: '1',
    name: 'White T-Shirt',
    category: 'Tops',
    imageUrl: null,
  },
  {
    id: '2',
    name: 'Blue Jeans',
    category: 'Bottoms',
    imageUrl: null,
  },
  {
    id: '3',
    name: 'Black Dress',
    category: 'Dresses',
    imageUrl: null,
  },
  {
    id: '4',
    name: 'Sneakers',
    category: 'Shoes',
    imageUrl: null,
  },
  {
    id: '5',
    name: 'Summer Hat',
    category: 'Accessories',
    imageUrl: null,
  },
  {
    id: '6',
    name: 'Denim Jacket',
    category: 'Outerwear',
    imageUrl: null,
  },
];

const MessagingScreen = ({ navigation, route }) => {
  const [activeTab, setActiveTab] = useState('conversations');
  const [allConversations, setAllConversations] = useState(conversations);
  const [showCreateOutfitModal, setShowCreateOutfitModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedOutfitItems, setSelectedOutfitItems] = useState([]);
  const [outfitTitle, setOutfitTitle] = useState('');
  
  const navigateToConversation = (conversation) => {
    navigation.navigate('ConversationDetails', { conversationId: conversation.id });
  };
  
  const navigateToNewMessage = () => {
    navigation.navigate('NewMessage');
  };
  
  const handleCreateOutfit = (user) => {
    setSelectedUser(user);
    setShowCreateOutfitModal(true);
  };
  
  const toggleItemSelection = (item) => {
    if (selectedOutfitItems.some(i => i.id === item.id)) {
      setSelectedOutfitItems(selectedOutfitItems.filter(i => i.id !== item.id));
    } else {
      setSelectedOutfitItems([...selectedOutfitItems, item]);
    }
  };
  
  const handleSendOutfit = () => {
    if (selectedOutfitItems.length === 0 || !outfitTitle.trim()) {
      // Show error or alert
      return;
    }
    
    // In a real app, this would send the outfit to the backend
    // For now, we'll just close the modal and pretend it was sent
    setShowCreateOutfitModal(false);
    setSelectedOutfitItems([]);
    setOutfitTitle('');
    
    // Show success message or notification
    alert(`Outfit "${outfitTitle}" sent to ${selectedUser.name}`);
  };
  
  const renderConversationItem = ({ item }) => {
    const formattedTime = formatMessageTime(item.lastMessage.timestamp);
    
    return (
      <TouchableOpacity
        style={styles.conversationItem}
        onPress={() => navigateToConversation(item)}
      >
        <View style={styles.avatarContainer}>
          {item.user.avatar ? (
            <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.placeholderAvatar]}>
              <Text style={styles.avatarText}>{item.user.name.charAt(0)}</Text>
            </View>
          )}
        </View>
        
        <View style={styles.conversationContent}>
          <View style={styles.conversationHeader}>
            <Text style={styles.userName}>{item.user.name}</Text>
            <Text style={styles.timeText}>{formattedTime}</Text>
          </View>
          
          <View style={styles.messagePreviewContainer}>
            <Text 
              style={[
                styles.messagePreview,
                !item.lastMessage.isRead && styles.unreadMessage
              ]}
              numberOfLines={1}
            >
              {item.lastMessage.text}
            </Text>
            
            {item.unreadCount > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadBadgeText}>{item.unreadCount}</Text>
              </View>
            )}
          </View>
          
          {item.hasOutfitSuggestion && (
            <View style={styles.outfitSuggestionTag}>
              <MaterialIcon name="hanger" size={14} color={COLORS.primary} />
              <Text style={styles.outfitSuggestionText}>Outfit Suggestion</Text>
            </View>
          )}
        </View>
        
        <TouchableOpacity
          style={styles.outfitActionButton}
          onPress={() => handleCreateOutfit(item.user)}
        >
          <MaterialIcon name="tshirt-crew" size={22} color={COLORS.primary} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
  
  const renderEmptyConversations = () => (
    <View style={styles.emptyContainer}>
      <MaterialIcon name="message-text-outline" size={48} color={COLORS.gray} />
      <Text style={styles.emptyTitle}>No conversations yet</Text>
      <Text style={styles.emptyText}>
        Start sharing outfits and connecting with friends to see your conversations here
      </Text>
      <TouchableOpacity 
        style={styles.emptyButton}
        onPress={navigateToNewMessage}
      >
        <Text style={styles.emptyButtonText}>New Message</Text>
      </TouchableOpacity>
    </View>
  );
  
  const renderCategorizedWardrobe = () => {
    const categories = [...new Set(myWardrobe.map(item => item.category))];
    
    return (
      <View style={styles.wardrobeContainer}>
        {categories.map((category) => (
          <View key={category} style={styles.categorySection}>
            <Text style={styles.categoryTitle}>{category}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {myWardrobe
                .filter(item => item.category === category)
                .map(item => (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.wardrobeItem,
                      selectedOutfitItems.some(i => i.id === item.id) && 
                      styles.selectedWardrobeItem
                    ]}
                    onPress={() => toggleItemSelection(item)}
                  >
                    {item.imageUrl ? (
                      <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
                    ) : (
                      <View style={styles.placeholderImage}>
                        <MaterialIcon name="tshirt-crew" size={24} color={COLORS.darkGray} />
                      </View>
                    )}
                    <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                    
                    {selectedOutfitItems.some(i => i.id === item.id) && (
                      <View style={styles.selectedItemCheck}>
                        <Icon name="check" size={16} color={COLORS.white} />
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </View>
        ))}
      </View>
    );
  };
  
  const formatMessageTime = (timestamp) => {
    const now = new Date();
    const messageDate = new Date(timestamp);
    
    const diffInDays = Math.floor((now - messageDate) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      // Today, show time
      return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else if (diffInDays < 7) {
      // Within a week, show day name
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return days[messageDate.getDay()];
    } else {
      // More than a week ago, show date
      return messageDate.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity 
          style={styles.newMessageButton}
          onPress={navigateToNewMessage}
        >
          <Icon name="edit" size={22} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'conversations' && styles.activeTab
          ]}
          onPress={() => setActiveTab('conversations')}
        >
          <Text 
            style={[
              styles.tabText,
              activeTab === 'conversations' && styles.activeTabText
            ]}
          >
            Conversations
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'outfits' && styles.activeTab
          ]}
          onPress={() => setActiveTab('outfits')}
        >
          <Text 
            style={[
              styles.tabText,
              activeTab === 'outfits' && styles.activeTabText
            ]}
          >
            Outfit Suggestions
          </Text>
        </TouchableOpacity>
      </View>
      
      {activeTab === 'conversations' && (
        <FlatList
          data={allConversations}
          renderItem={renderConversationItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={renderEmptyConversations}
          contentContainerStyle={
            allConversations.length === 0 ? { flex: 1 } : styles.listContent
          }
        />
      )}
      
      {activeTab === 'outfits' && (
        <FlatList
          data={allConversations.filter(c => c.hasOutfitSuggestion)}
          renderItem={renderConversationItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <MaterialIcon name="hanger" size={48} color={COLORS.gray} />
              <Text style={styles.emptyTitle}>No outfit suggestions</Text>
              <Text style={styles.emptyText}>
                Friends haven't sent you any outfit suggestions yet
              </Text>
            </View>
          )}
          contentContainerStyle={
            allConversations.filter(c => c.hasOutfitSuggestion).length === 0 
              ? { flex: 1 } 
              : styles.listContent
          }
        />
      )}
      
      {/* Create Outfit Modal */}
      <Modal
        visible={showCreateOutfitModal}
        animationType="slide"
        transparent={true}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Create Outfit for {selectedUser?.name}
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  setShowCreateOutfitModal(false);
                  setSelectedOutfitItems([]);
                  setOutfitTitle('');
                }}
              >
                <Icon name="x" size={24} color={COLORS.darkGray} />
              </TouchableOpacity>
            </View>
            
            <TextInput
              style={styles.outfitTitleInput}
              placeholder="Give your outfit a name..."
              value={outfitTitle}
              onChangeText={setOutfitTitle}
              placeholderTextColor={COLORS.gray}
            />
            
            <Text style={styles.selectionInfoText}>
              Select items from your wardrobe ({selectedOutfitItems.length} selected)
            </Text>
            
            <ScrollView style={styles.modalScrollContent}>
              {renderCategorizedWardrobe()}
            </ScrollView>
            
            <TouchableOpacity
              style={[
                styles.sendOutfitButton,
                (selectedOutfitItems.length === 0 || !outfitTitle.trim()) && 
                styles.disabledButton
              ]}
              onPress={handleSendOutfit}
              disabled={selectedOutfitItems.length === 0 || !outfitTitle.trim()}
            >
              <Text style={styles.sendOutfitButtonText}>Send Outfit</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    color: COLORS.darkText,
  },
  newMessageButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: COLORS.lightGray,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: COLORS.darkGray,
  },
  activeTabText: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
  },
  listContent: {
    paddingVertical: 8,
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.ultraLightGray,
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  placeholderAvatar: {
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.white,
  },
  conversationContent: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: COLORS.darkText,
  },
  timeText: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.gray,
  },
  messagePreviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  messagePreview: {
    flex: 1,
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.darkGray,
    marginRight: 8,
  },
  unreadMessage: {
    fontFamily: FONTS.medium,
    color: COLORS.darkText,
  },
  unreadBadge: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadBadgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontFamily: FONTS.bold,
  },
  outfitSuggestionTag: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  outfitSuggestionText: {
    fontSize: 12,
    fontFamily: FONTS.medium,
    color: COLORS.primary,
    marginLeft: 4,
  },
  outfitActionButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: COLORS.ultraLightGray,
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.darkText,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.darkGray,
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: COLORS.primary,
    borderRadius: 24,
  },
  emptyButtonText: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: COLORS.white,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: Platform.OS === 'ios' ? 34 : 24,
    height: height * 0.85,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.darkText,
  },
  closeButton: {
    padding: 4,
  },
  outfitTitleInput: {
    marginHorizontal: 16,
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: COLORS.darkText,
  },
  selectionInfoText: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: COLORS.darkGray,
  },
  modalScrollContent: {
    flex: 1,
  },
  wardrobeContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  categorySection: {
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: COLORS.darkText,
    marginBottom: 8,
  },
  wardrobeItem: {
    width: 100,
    marginRight: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    padding: 8,
    alignItems: 'center',
  },
  selectedWardrobeItem: {
    borderColor: COLORS.primary,
    borderWidth: 2,
    backgroundColor: 'rgba(51, 153, 255, 0.05)',
  },
  placeholderImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
    backgroundColor: COLORS.ultraLightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
    marginBottom: 8,
  },
  itemName: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.darkText,
    textAlign: 'center',
  },
  selectedItemCheck: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendOutfitButton: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: COLORS.primary,
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: COLORS.lightGray,
  },
  sendOutfitButtonText: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: COLORS.white,
  },
});

export default MessagingScreen;