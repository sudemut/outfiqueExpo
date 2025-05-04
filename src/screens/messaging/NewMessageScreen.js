// src/screens/messaging/NewMessageScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../theme/colors';
import { FONTS } from '../../theme/fonts';

// Mock data for contacts
const contacts = [
  {
    id: '1',
    name: 'Emma Johnson',
    username: 'emma_style',
    avatar: null,
    followingStatus: 'following',
  },
  {
    id: '2',
    name: 'Michael Chen',
    username: 'michael_fashion',
    avatar: null,
    followingStatus: 'following',
  },
  {
    id: '3',
    name: 'Sarah Wilson',
    username: 'sarah_styles',
    avatar: null,
    followingStatus: 'following',
  },
  {
    id: '4',
    name: 'Jake Miller',
    username: 'jake_fashion',
    avatar: null,
    followingStatus: 'following',
  },
  {
    id: '5',
    name: 'Olivia Smith',
    username: 'olivia_outfits',
    avatar: null,
    followingStatus: 'not_following',
  },
  {
    id: '6',
    name: 'David Brown',
    username: 'david_style',
    avatar: null,
    followingStatus: 'not_following',
  },
];

const NewMessageScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredContacts, setFilteredContacts] = useState(contacts);
  
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredContacts(contacts);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = contacts.filter(
        contact => 
          contact.name.toLowerCase().includes(query) || 
          contact.username.toLowerCase().includes(query)
      );
      setFilteredContacts(filtered);
    }
  }, [searchQuery]);
  
  const handleSelectContact = (contact) => {
    // In a real app, this would create a new conversation or navigate to an existing one
    // For now, we'll navigate to a dummy conversation
    navigation.navigate('ConversationDetails', { 
      conversationId: contact.id,
      newConversation: true,
      contactInfo: contact,
    });
  };
  
  const renderContactItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.contactItem}
        onPress={() => handleSelectContact(item)}
      >
        <View style={styles.avatarContainer}>
          {item.avatar ? (
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.placeholderAvatar]}>
              <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
            </View>
          )}
        </View>
        
        <View style={styles.contactInfo}>
          <Text style={styles.contactName}>{item.name}</Text>
          <Text style={styles.contactUsername}>@{item.username}</Text>
        </View>
        
        {item.followingStatus === 'following' ? (
          <View style={styles.followingBadge}>
            <Text style={styles.followingText}>Following</Text>
          </View>
        ) : (
          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.followButtonText}>Follow</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };
  
  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <MaterialIcon name="account-search-outline" size={48} color={COLORS.gray} />
      <Text style={styles.emptyTitle}>No contacts found</Text>
      <Text style={styles.emptyText}>
        Try searching by name or username
      </Text>
    </View>
  );
  
  const renderListHeader = () => (
    <View style={styles.listHeader}>
      <Text style={styles.sectionTitle}>Contacts</Text>
    </View>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={COLORS.darkText} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>New Message</Text>
        
        <View style={styles.placeholder} />
      </View>
      
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color={COLORS.gray} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or username"
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={COLORS.gray}
          autoCapitalize="none"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={() => setSearchQuery('')}
          >
            <Icon name="x" size={20} color={COLORS.gray} />
          </TouchableOpacity>
        )}
      </View>
      
      <FlatList
        data={filteredContacts}
        renderItem={renderContactItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyList}
        ListHeaderComponent={renderListHeader}
      />
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
    width: 40,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.darkText,
  },
  placeholder: {
    width: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: COLORS.darkText,
  },
  clearButton: {
    padding: 4,
  },
  listContent: {
    paddingBottom: 16,
  },
  listHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.ultraLightGray,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: COLORS.darkGray,
  },
  contactItem: {
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
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: COLORS.darkText,
    marginBottom: 2,
  },
  contactUsername: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.gray,
  },
  followingBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: COLORS.ultraLightGray,
  },
  followingText: {
    fontSize: 12,
    fontFamily: FONTS.medium,
    color: COLORS.darkGray,
  },
  followButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
  },
  followButtonText: {
    fontSize: 12,
    fontFamily: FONTS.medium,
    color: COLORS.white,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    marginTop: 80,
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
  },
});

export default NewMessageScreen;