// src/screens/messaging/ConversationDetailsScreen.js
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
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../theme/colors';
import { FONTS } from '../../theme/fonts';

const { width } = Dimensions.get('window');

// Import mock data from MessagingScreen
// In a real app, these would come from a central store or API
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
      text: 'Thanks! Ive been trying to mix and match items from my wardrobe more.',
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

const ConversationDetailsScreen = ({ navigation, route }) => {
  const { conversationId } = route.params;
  const [messages, setMessages] = useState([]);
  const [conversation, setConversation] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [showSaveOutfitModal, setShowSaveOutfitModal] = useState(false);
  const [selectedOutfitMessage, setSelectedOutfitMessage] = useState(null);
  
  const flatListRef = useRef(null);
  
  useEffect(() => {
    // Fetch conversation details
    const conversationData = conversations.find(c => c.id === conversationId);
    setConversation(conversationData);
    
    // Fetch messages
    const messageData = getMessages(conversationId);
    setMessages(messageData);
    
    // Mark messages as read in a real app
    // This would update the unread count in the conversation list
  }, [conversationId]);
  
  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    // Create a new message
    const newMessage = {
      id: Date.now().toString(),
      senderId: 'current_user',
      text: messageText.trim(),
      timestamp: new Date(),
    };
    
    // Add it to the messages list
    setMessages(prevMessages => [...prevMessages, newMessage]);
    
    // Clear the input
    setMessageText('');
    
    // Scroll to bottom
    setTimeout(() => {
      flatListRef.current?.scrollToEnd();
    }, 100);
  };
  
  const handleSaveOutfit = (outfitMessage) => {
    setSelectedOutfitMessage(outfitMessage);
    setShowSaveOutfitModal(true);
    // In a real app, this would open a modal to save the outfit to your wardrobe
    // For now, we'll just show an alert
    alert(`Outfit "${outfitMessage.outfitSuggestion.title}" saved to your wardrobe!`);
  };
  
  const formatMessageTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };
  
  const renderMessageItem = ({ item }) => {
    const isCurrentUser = item.senderId === 'current_user';
    
    // Handle outfit suggestion
    if (item.outfitSuggestion) {
      return (
        <View style={[
          styles.messageContainer,
          isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage
        ]}>
          <View style={styles.outfitSuggestionContainer}>
            <Text style={styles.outfitSuggestionTitle}>
              {item.outfitSuggestion.title}
            </Text>
            
            {item.outfitSuggestion.items.map((outfitItem, index) => (
              <View key={index} style={styles.outfitItemRow}>
                <MaterialIcon 
                  name={
                    outfitItem.category === 'Tops' ? 'tshirt-crew' : 
                    outfitItem.category === 'Bottoms' ? 'sine-wave' :
                    outfitItem.category === 'Outerwear' ? 'coat-rack' : 
                    outfitItem.category === 'Shoes' ? 'shoe-heel' : 
                    outfitItem.category === 'Accessories' ? 'sunglasses' : 
                    'hanger'
                  } 
                  size={18} 
                  color={COLORS.darkGray} 
                />
                <Text style={styles.outfitItemText}>{outfitItem.name}</Text>
              </View>
            ))}
            
            <TouchableOpacity
              style={styles.saveOutfitButton}
              onPress={() => handleSaveOutfit(item)}
            >
              <Text style={styles.saveOutfitButtonText}>Save to Wardrobe</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.messageTime}>
            {formatMessageTime(item.timestamp)}
          </Text>
        </View>
      );
    }
    
    // Regular text message
    return (
      <View style={[
        styles.messageContainer,
        isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage
      ]}>
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.messageTime}>
          {formatMessageTime(item.timestamp)}
        </Text>
      </View>
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={COLORS.darkText} />
        </TouchableOpacity>
        
        <View style={styles.userInfo}>
          {conversation?.user.avatar ? (
            <Image source={{ uri: conversation.user.avatar }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.placeholderAvatar]}>
              <Text style={styles.avatarText}>
                {conversation?.user.name.charAt(0)}
              </Text>
            </View>
          )}
          <View style={styles.userTextInfo}>
            <Text style={styles.userName}>{conversation?.user.name}</Text>
            <Text style={styles.userUsername}>@{conversation?.user.username}</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.profileButton}>
          <Icon name="user" size={22} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messageList}
        onLayout={() => flatListRef.current?.scrollToEnd()}
      />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.mediaButton}>
            <Icon name="image" size={22} color={COLORS.primary} />
          </TouchableOpacity>
          
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={messageText}
            onChangeText={setMessageText}
            multiline
            placeholderTextColor={COLORS.gray}
          />
          
          <TouchableOpacity 
            style={[
              styles.sendButton,
              !messageText.trim() && styles.disabledSendButton
            ]}
            onPress={handleSendMessage}
            disabled={!messageText.trim()}
          >
            <Icon 
              name="send" 
              size={22} 
              color={!messageText.trim() ? COLORS.lightGray : COLORS.white} 
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  backButton: {
    padding: 4,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  placeholderAvatar: {
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.white,
  },
  userTextInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: COLORS.darkText,
  },
  userUsername: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.gray,
  },
  profileButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: COLORS.ultraLightGray,
  },
  messageList: {
    padding: 16,
  },
  messageContainer: {
    maxWidth: '80%',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
  },
  currentUserMessage: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.primary,
  },
  otherUserMessage: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.lightGray,
  },
  messageText: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: COLORS.white,
    lineHeight: 22,
  },
  messageTime: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: 'rgba(255, 255, 255, 0.7)',
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  outfitSuggestionContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  outfitSuggestionTitle: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: COLORS.darkText,
    marginBottom: 8,
  },
  outfitItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  outfitItemText: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.darkText,
    marginLeft: 8,
  },
  saveOutfitButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  saveOutfitButtonText: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: COLORS.white,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    backgroundColor: COLORS.white,
  },
  mediaButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: COLORS.ultraLightGray,
    marginRight: 8,
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.ultraLightGray,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 100,
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: COLORS.darkText,
  },
  sendButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    marginLeft: 8,
  },
  disabledSendButton: {
    backgroundColor: COLORS.ultraLightGray,
  },
});

export default ConversationDetailsScreen;