// src/screens/services/AIAssistantScreen.js
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  Animated,
  Dimensions,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../theme/colors';
import { FONTS } from '../../theme/fonts';

const { width, height } = Dimensions.get('window');

// Mock data for user's wardrobe
const userWardrobe = [
  {
    id: '1',
    name: 'White T-Shirt',
    category: 'Tops',
    color: 'White',
    imageUrl: null,
    wearCount: 12,
  },
  {
    id: '2',
    name: 'Blue Jeans',
    category: 'Bottoms',
    color: 'Blue',
    imageUrl: null,
    wearCount: 23,
  },
  {
    id: '3',
    name: 'Black Dress',
    category: 'Dresses',
    color: 'Black',
    imageUrl: null,
    wearCount: 5,
  },
  {
    id: '4',
    name: 'Sneakers',
    category: 'Shoes',
    color: 'White',
    imageUrl: null,
    wearCount: 47,
  },
  // more items...
];

// Mock data for AI-generated outfit suggestions
const suggestionTemplates = [
  {
    id: '1',
    title: 'Casual Day Out',
    description: 'Perfect for a coffee date or casual shopping',
    items: [
      { id: '1', name: 'White T-Shirt', category: 'Tops' },
      { id: '2', name: 'Blue Jeans', category: 'Bottoms' },
      { id: '4', name: 'Sneakers', category: 'Shoes' },
    ],
    imageUrl: null,
  },
  {
    id: '2',
    title: 'Office Ready',
    description: 'Professional look for the workplace',
    items: [
      { id: '7', name: 'Button-Up Shirt', category: 'Tops' },
      { id: '8', name: 'Black Slacks', category: 'Bottoms' },
      { id: '9', name: 'Leather Shoes', category: 'Shoes' },
    ],
    imageUrl: null,
  },
  {
    id: '3',
    title: 'Night Out',
    description: 'Stylish outfit for evening events',
    items: [
      { id: '3', name: 'Black Dress', category: 'Dresses' },
      { id: '10', name: 'Heels', category: 'Shoes' },
      { id: '11', name: 'Statement Necklace', category: 'Accessories' },
    ],
    imageUrl: null,
  },
];

// Mock conversation with AI assistant
const initialMessages = [
  {
    id: '1',
    sender: 'ai',
    text: 'Hello! I\'m your OUTFIQUE AI style assistant. I can help you create outfits, give fashion advice, or answer questions about sustainable fashion. What can I help you with today?',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
];

const AIAssistantScreen = ({ navigation, route }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestionModal, setShowSuggestionModal] = useState(false);
  const [currentSuggestion, setCurrentSuggestion] = useState(null);
  const [outfitSuggestions, setOutfitSuggestions] = useState([]);
  const [isGeneratingSuggestion, setIsGeneratingSuggestion] = useState(false);
  
  const scrollViewRef = useRef(null);
  const typingAnimation = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    // Simulate initial suggestions loading
    setOutfitSuggestions(suggestionTemplates);
  }, []);
  
  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);
  
  // Setup typing animation
  useEffect(() => {
    if (isTyping) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(typingAnimation, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(typingAnimation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      typingAnimation.setValue(0);
    }
  }, [isTyping]);
  
  const handleSendMessage = () => {
    if (inputText.trim() === '') return;
    
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText,
      timestamp: new Date(),
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputText('');
    setIsTyping(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      processUserMessage(userMessage.text);
    }, 1500);
  };
  
  const processUserMessage = (text) => {
    const lowercaseText = text.toLowerCase();
    
    // Check for outfit creation request
    if (lowercaseText.includes('outfit') && 
        (lowercaseText.includes('create') || 
         lowercaseText.includes('make') || 
         lowercaseText.includes('generate') || 
         lowercaseText.includes('suggest'))) {
      generateOutfitSuggestion();
      return;
    }
    
    // Check for weather-based outfit request
    if ((lowercaseText.includes('weather') || lowercaseText.includes('rain') || lowercaseText.includes('cold') || lowercaseText.includes('hot')) && 
        lowercaseText.includes('wear')) {
      generateWeatherBasedOutfit(lowercaseText);
      return;
    }
    
    // Check for sustainable fashion question
    if (lowercaseText.includes('sustainable') || lowercaseText.includes('eco')) {
      provideSustainableFashionInfo();
      return;
    }
    
    // Default response
    const aiMessage = {
      id: Date.now().toString(),
      sender: 'ai',
      text: "I'm happy to help with your fashion needs! You can ask me to create outfits based on occasion, weather, or color. I can also provide sustainable fashion tips or help you organize your wardrobe. What would you like to know?",
      timestamp: new Date(),
    };
    
    setMessages(prevMessages => [...prevMessages, aiMessage]);
    setIsTyping(false);
  };
  
  const generateOutfitSuggestion = () => {
    setIsTyping(true);
    
    // Simulate AI generating outfit suggestions
    setTimeout(() => {
      const aiMessage = {
        id: Date.now().toString(),
        sender: 'ai',
        text: "I've created some outfit suggestions based on your wardrobe. Would you like to see them?",
        timestamp: new Date(),
        hasOutfitSuggestions: true,
      };
      
      setMessages(prevMessages => [...prevMessages, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };
  
  const generateWeatherBasedOutfit = (query) => {
    setIsTyping(true);
    
    // Determine weather type from query
    let weatherType = 'normal';
    if (query.includes('rain') || query.includes('rainy')) {
      weatherType = 'rainy';
    } else if (query.includes('cold') || query.includes('winter')) {
      weatherType = 'cold';
    } else if (query.includes('hot') || query.includes('summer')) {
      weatherType = 'hot';
    }
    
    // Simulate AI response
    setTimeout(() => {
      let responseText = '';
      let suggestedItems = [];
      
      switch(weatherType) {
        case 'rainy':
          responseText = "For rainy weather, I recommend these items from your wardrobe:";
          suggestedItems = [
            { id: '12', name: 'Rain Jacket', category: 'Outerwear' },
            { id: '2', name: 'Blue Jeans', category: 'Bottoms' },
            { id: '13', name: 'Waterproof Boots', category: 'Shoes' },
          ];
          break;
        case 'cold':
          responseText = "For cold weather, these items would keep you warm and stylish:";
          suggestedItems = [
            { id: '14', name: 'Sweater', category: 'Tops' },
            { id: '2', name: 'Blue Jeans', category: 'Bottoms' },
            { id: '15', name: 'Winter Coat', category: 'Outerwear' },
            { id: '16', name: 'Boots', category: 'Shoes' },
          ];
          break;
        case 'hot':
          responseText = "For hot weather, here's a cool and comfortable outfit:";
          suggestedItems = [
            { id: '1', name: 'White T-Shirt', category: 'Tops' },
            { id: '17', name: 'Shorts', category: 'Bottoms' },
            { id: '4', name: 'Sneakers', category: 'Shoes' },
            { id: '18', name: 'Sunglasses', category: 'Accessories' },
          ];
          break;
        default:
          responseText = "Based on typical weather, I suggest this outfit:";
          suggestedItems = [
            { id: '1', name: 'White T-Shirt', category: 'Tops' },
            { id: '2', name: 'Blue Jeans', category: 'Bottoms' },
            { id: '4', name: 'Sneakers', category: 'Shoes' },
          ];
      }
      
      const suggestion = {
        id: Date.now().toString(),
        title: `${weatherType.charAt(0).toUpperCase() + weatherType.slice(1)} Weather Outfit`,
        description: `Perfect outfit for ${weatherType} weather`,
        items: suggestedItems,
        imageUrl: null,
      };
      
      setOutfitSuggestions(prev => [suggestion, ...prev]);
      
      const aiMessage = {
        id: Date.now().toString(),
        sender: 'ai',
        text: responseText,
        timestamp: new Date(),
        hasWeatherOutfit: true,
        outfitSuggestion: suggestion,
      };
      
      setMessages(prevMessages => [...prevMessages, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };
  
  const provideSustainableFashionInfo = () => {
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        id: Date.now().toString(),
        sender: 'ai',
        text: "Sustainable fashion is about choosing environmentally friendly and ethical clothing options. Here are some tips:\n\n• Wear items at least 30 times before replacing them\n• Choose quality over quantity\n• Look for organic or recycled materials\n• Support brands with ethical manufacturing\n• Consider second-hand or vintage items\n• Repair clothes instead of replacing them\n\nYour wardrobe already has 4 sustainable items! Would you like more specific advice?",
        timestamp: new Date(),
      };
      
      setMessages(prevMessages => [...prevMessages, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };
  
  const showOutfitSuggestions = () => {
    setShowSuggestionModal(true);
  };
  
  const handleViewSuggestion = (suggestion) => {
    setCurrentSuggestion(suggestion);
  };
  
  const handleSaveSuggestion = () => {
    // Save outfit to user's saved outfits
    // In a real app, this would dispatch to Redux
    
    // Show feedback
    const aiMessage = {
      id: Date.now().toString(),
      sender: 'ai',
      text: "I've saved this outfit to your collection! You can view it anytime in your saved outfits section.",
      timestamp: new Date(),
    };
    
    setMessages(prevMessages => [...prevMessages, aiMessage]);
    setCurrentSuggestion(null);
    setShowSuggestionModal(false);
  };
  
  const generateNewOutfit = () => {
    setIsGeneratingSuggestion(true);
    
    // Simulate AI generating a new outfit
    setTimeout(() => {
      const newSuggestion = {
        id: Date.now().toString(),
        title: 'Fresh Style Mix',
        description: 'A new combination from your wardrobe',
        items: [
          userWardrobe[Math.floor(Math.random() * userWardrobe.length)],
          userWardrobe[Math.floor(Math.random() * userWardrobe.length)],
          userWardrobe[Math.floor(Math.random() * userWardrobe.length)],
        ],
        imageUrl: null,
      };
      
      setOutfitSuggestions(prev => [newSuggestion, ...prev]);
      setCurrentSuggestion(newSuggestion);
      setIsGeneratingSuggestion(false);
    }, 2000);
  };
  
  const renderMessage = ({ item }) => {
    const isUserMessage = item.sender === 'user';
    
    return (
      <View style={[
        styles.messageContainer,
        isUserMessage ? styles.userMessageContainer : styles.aiMessageContainer
      ]}>
        {!isUserMessage && (
          <View style={styles.aiAvatarContainer}>
            <MaterialIcon name="robot" size={24} color={COLORS.primary} />
          </View>
        )}
        
        <View style={[
          styles.messageBubble,
          isUserMessage ? styles.userMessageBubble : styles.aiMessageBubble
        ]}>
          <Text style={[
            styles.messageText,
            isUserMessage ? styles.userMessageText : styles.aiMessageText
          ]}>
            {item.text}
          </Text>
          
          {item.hasOutfitSuggestions && (
            <TouchableOpacity 
              style={styles.suggestionButton}
              onPress={showOutfitSuggestions}
            >
              <Text style={styles.suggestionButtonText}>View Suggestions</Text>
            </TouchableOpacity>
          )}
          
          {item.hasWeatherOutfit && (
            <View style={styles.weatherOutfitContainer}>
              <Text style={styles.weatherOutfitTitle}>{item.outfitSuggestion.title}</Text>
              <View style={styles.weatherOutfitItems}>
                {item.outfitSuggestion.items.map((item, index) => (
                  <View key={index} style={styles.weatherOutfitItem}>
                    <View style={styles.weatherOutfitItemIcon}>
                      <Icon 
                        name={
                          item.category === 'Tops' ? 'layers' :
                          item.category === 'Bottoms' ? 'pocket' :
                          item.category === 'Shoes' ? 'box' :
                          item.category === 'Outerwear' ? 'chevrons-up' :
                          item.category === 'Accessories' ? 'watch' : 'shopping-bag'
                        } 
                        size={16} 
                        color={COLORS.primary} 
                      />
                    </View>
                    <Text style={styles.weatherOutfitItemText}>{item.name}</Text>
                  </View>
                ))}
              </View>
              <TouchableOpacity 
                style={styles.viewOutfitButton}
                onPress={() => handleViewSuggestion(item.outfitSuggestion)}
              >
                <Text style={styles.viewOutfitButtonText}>View Full Outfit</Text>
              </TouchableOpacity>
            </View>
          )}
          
          <Text style={styles.messageTimestamp}>
            {formatTimestamp(item.timestamp)}
          </Text>
        </View>
      </View>
    );
  };
  
  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    
    // Less than a minute
    if (diff < 60000) {
      return 'Just now';
    }
    
    // Less than an hour
    if (diff < 3600000) {
      const minutes = Math.floor(diff / 60000);
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    }
    
    // Less than a day
    if (diff < 86400000) {
      const hours = Math.floor(diff / 3600000);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    }
    
    // Format as date
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const renderSuggestionItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.suggestionItem}
      onPress={() => handleViewSuggestion(item)}
    >
      <View style={styles.suggestionImageContainer}>
        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} style={styles.suggestionImage} />
        ) : (
          <View style={styles.suggestionImagePlaceholder}>
            <Icon name="image" size={24} color={COLORS.gray} />
          </View>
        )}
      </View>
      <Text style={styles.suggestionTitle}>{item.title}</Text>
      <Text style={styles.suggestionDescription} numberOfLines={2}>
        {item.description}
      </Text>
      <View style={styles.suggestionItemsPreview}>
        <Text style={styles.itemsCount}>{item.items.length} items</Text>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI Style Assistant</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Icon name="info" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      
      <FlatList
        ref={scrollViewRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messagesContainer}
      />
      
      {isTyping && (
        <View style={styles.typingContainer}>
          <View style={styles.typingBubble}>
            <View style={styles.typingIndicator}>
              <Animated.View 
                style={[
                  styles.typingDot,
                  {
                    opacity: typingAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.3, 1],
                    }),
                  },
                ]}
              />
              <Animated.View 
                style={[
                  styles.typingDot,
                  {
                    opacity: typingAnimation.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [0.3, 1, 0.3],
                    }),
                  },
                ]}
              />
              <Animated.View 
                style={[
                  styles.typingDot,
                  {
                    opacity: typingAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 0.3],
                    }),
                  },
                ]}
              />
            </View>
          </View>
        </View>
      )}
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ask for outfit ideas or advice..."
          placeholderTextColor={COLORS.gray}
          value={inputText}
          onChangeText={setInputText}
          multiline
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            !inputText.trim() && styles.disabledSendButton,
          ]}
          onPress={handleSendMessage}
          disabled={!inputText.trim()}
        >
          <Icon
            name="send"
            size={24}
            color={inputText.trim() ? COLORS.white : COLORS.gray}
          />
        </TouchableOpacity>
      </View>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={showSuggestionModal}
        onRequestClose={() => setShowSuggestionModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Outfit Suggestions</Text>
              <TouchableOpacity onPress={() => setShowSuggestionModal(false)}>
                <Icon name="x" size={24} color={COLORS.darkGray} />
              </TouchableOpacity>
            </View>
            
            {currentSuggestion ? (
              <View style={styles.outfitDetailContainer}>
                <TouchableOpacity 
                  style={styles.backToSuggestionsButton}
                  onPress={() => setCurrentSuggestion(null)}
                >
                  <Icon name="chevron-left" size={20} color={COLORS.primary} />
                  <Text style={styles.backToSuggestionsText}>All Suggestions</Text>
                </TouchableOpacity>
                
                <Text style={styles.outfitDetailTitle}>{currentSuggestion.title}</Text>
                <Text style={styles.outfitDetailDescription}>{currentSuggestion.description}</Text>
                
                <View style={styles.outfitImageContainer}>
                  {currentSuggestion.imageUrl ? (
                    <Image source={{ uri: currentSuggestion.imageUrl }} style={styles.outfitImage} />
                  ) : (
                    <View style={styles.outfitImagePlaceholder}>
                      <Icon name="image" size={48} color={COLORS.gray} />
                      <Text style={styles.placeholderText}>Outfit Preview</Text>
                    </View>
                  )}
                </View>
                
                <Text style={styles.outfitItemsTitle}>Items in this Outfit</Text>
                <View style={styles.outfitItemsList}>
                  {currentSuggestion.items.map((item, index) => (
                    <View key={index} style={styles.outfitItemRow}>
                      <View style={styles.outfitItemCategoryIcon}>
                        <Icon 
                          name={
                            item.category === 'Tops' ? 'layers' :
                            item.category === 'Bottoms' ? 'pocket' :
                            item.category === 'Shoes' ? 'box' :
                            item.category === 'Outerwear' ? 'chevrons-up' :
                            item.category === 'Accessories' ? 'watch' : 'shopping-bag'
                          } 
                          size={20} 
                          color={COLORS.primary} 
                        />
                      </View>
                      <View style={styles.outfitItemInfo}>
                        <Text style={styles.outfitItemName}>{item.name}</Text>
                        <Text style={styles.outfitItemCategory}>{item.category}</Text>
                      </View>
                    </View>
                  ))}
                </View>
                
                <View style={styles.outfitDetailButtonsContainer}>
                  <TouchableOpacity 
                    style={styles.generateNewButton}
                    onPress={generateNewOutfit}
                    disabled={isGeneratingSuggestion}
                  >
                    {isGeneratingSuggestion ? (
                      <Text style={styles.generateNewButtonText}>Generating...</Text>
                    ) : (
                      <>
                        <Icon name="refresh-cw" size={16} color={COLORS.primary} />
                        <Text style={styles.generateNewButtonText}>Generate New</Text>
                      </>
                    )}
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.saveOutfitButton}
                    onPress={handleSaveSuggestion}
                  >
                    <Icon name="save" size={16} color={COLORS.white} />
                    <Text style={styles.saveOutfitButtonText}>Save Outfit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <FlatList
                data={outfitSuggestions}
                renderItem={renderSuggestionItem}
                keyExtractor={item => item.id}
                numColumns={2}
                contentContainerStyle={styles.suggestionsGrid}
              />
            )}
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
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  headerButton: {
    padding: 8,
  },
  messagesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    maxWidth: '80%',
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
    marginLeft: 'auto',
  },
  aiMessageContainer: {
    alignSelf: 'flex-start',
    marginRight: 'auto',
  },
  aiAvatarContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.lavender,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  messageBubble: {
    borderRadius: 16,
    padding: 12,
    maxWidth: '90%',
  },
  userMessageBubble: {
    backgroundColor: COLORS.primary,
    borderTopRightRadius: 4,
  },
  aiMessageBubble: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 4,
  },
  messageText: {
    fontSize: FONTS.sizes.md,
    lineHeight: 20,
  },
  userMessageText: {
    color: COLORS.white,
  },
  aiMessageText: {
    color: COLORS.darkGray,
  },
  messageTimestamp: {
    fontSize: FONTS.sizes.xxs,
    color: COLORS.gray,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  typingContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  typingBubble: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 12,
    alignSelf: 'flex-start',
    marginLeft: 44, // To align with the AI avatar
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.gray,
    marginRight: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.lighterGray,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 100,
    fontSize: FONTS.sizes.md,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  disabledSendButton: {
    backgroundColor: COLORS.lightGray,
  },
  suggestionButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  suggestionButtonText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.sm,
    fontWeight: 'bold',
  },
  weatherOutfitContainer: {
    backgroundColor: COLORS.lavender,
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
  },
  weatherOutfitTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
  },
  weatherOutfitItems: {
    marginBottom: 12,
  },
  weatherOutfitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  weatherOutfitItemIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  weatherOutfitItemText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.darkGray,
  },
  viewOutfitButton: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
  viewOutfitButtonText: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.sm,
    fontWeight: 'bold',
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
    height: height * 0.8,
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
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  suggestionsGrid: {
    padding: 8,
  },
  suggestionItem: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    margin: 8,
    width: (width - 64) / 2,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  suggestionImageContainer: {
    height: 120,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
  },
  suggestionImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  suggestionImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.lavender,
    justifyContent: 'center',
    alignItems: 'center',
  },
  suggestionTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  suggestionDescription: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.darkGray,
    marginBottom: 8,
    height: 36,
  },
  suggestionItemsPreview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemsCount: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.gray,
  },
  outfitDetailContainer: {
    padding: 16,
  },
  backToSuggestionsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backToSuggestionsText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.primary,
    marginLeft: 4,
  },
  outfitDetailTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
  },
  outfitDetailDescription: {
    fontSize: FONTS.sizes.md,
    color: COLORS.darkGray,
    marginBottom: 16,
  },
  outfitImageContainer: {
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  outfitImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  outfitImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.lavender,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.gray,
    marginTop: 8,
  },
  outfitItemsTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 12,
  },
  outfitItemsList: {
    marginBottom: 24,
  },
  outfitItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  outfitItemCategoryIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.lavender,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  outfitItemInfo: {
    flex: 1,
  },
  outfitItemName: {
    fontSize: FONTS.sizes.md,
    fontWeight: 'bold',
    color: COLORS.darkGray,
  },
  outfitItemCategory: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.gray,
  },
  outfitDetailButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  generateNewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flex: 1,
    marginRight: 8,
  },
  generateNewButtonText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  saveOutfitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flex: 1,
    marginLeft: 8,
  },
  saveOutfitButtonText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.white,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default AIAssistantScreen;