// src/components/home/FriendOutfitCard.js
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS } from '../../theme/colors';
import { FONTS } from '../../theme/fonts';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 64) / 2.5;

const FriendOutfitCard = ({ friend, onPress, style }) => {
  return (
    <TouchableOpacity 
      style={[styles.container, style]} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        {friend.imageUrl ? (
          <Image 
            source={{ uri: friend.imageUrl }} 
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholderImage}>
            <Icon name="image" size={24} color={COLORS.primary} />
          </View>
        )}
        
        {/* Optional badge for new posts */}
        {friend.isNew && (
          <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>NEW</Text>
          </View>
        )}
        
        {/* Optional challenge badge */}
        {friend.challenge && (
          <View style={styles.challengeBadge}>
            <Text style={styles.challengeEmoji}>{friend.challenge.icon}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.infoContainer}>
        <View style={styles.userInfo}>
          <View style={styles.nameContainer}>
            <Text style={styles.name} numberOfLines={1}>{friend.name}</Text>
            {friend.isOnline && (
              <View style={styles.onlineIndicator} />
            )}
          </View>
          <Text style={styles.timestamp}>{friend.timestamp}</Text>
        </View>
        
        <View style={styles.interactionContainer}>
          {friend.interacted ? (
            <Icon name="check-circle" size={16} color={COLORS.success} />
          ) : (
            <Icon name="eye" size={16} color={COLORS.gray} />
          )}
          
          {friend.isSustainable && (
            <View style={styles.sustainableBadge}>
              <Icon name="leaf" size={12} color={COLORS.white} />
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    marginRight: 12,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: CARD_WIDTH * 1.3,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.lavender,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 10,
  },
  newBadgeText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.xxs,
    fontWeight: 'bold',
  },
  challengeBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: COLORS.white,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  challengeEmoji: {
    fontSize: 16,
  },
  infoContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: FONTS.sizes.sm,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginRight: 4,
  },
  onlineIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.success,
  },
  timestamp: {
    fontSize: FONTS.sizes.xxs,
    color: COLORS.gray,
  },
  interactionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sustainableBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.badge.sustainability,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
});

export default FriendOutfitCard;