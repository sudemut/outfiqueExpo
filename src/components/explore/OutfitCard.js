// src/components/explore/OutfitCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS } from '../../theme/colors';
import { FONTS } from '../../theme/fonts';

const OutfitCard = ({ outfit, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      {outfit.imageUrl ? (
        <Image source={{ uri: outfit.imageUrl }} style={styles.image} />
      ) : (
        <View style={styles.placeholderImage}>
          <Icon name="shopping-bag" size={24} color={COLORS.primary} />
        </View>
      )}
      
      <View style={styles.userInfo}>
        <View style={styles.avatarContainer}>
          {outfit.user.avatarUrl ? (
            <Image source={{ uri: outfit.user.avatarUrl }} style={styles.avatar} />
          ) : (
            <View style={styles.placeholderAvatar} />
          )}
        </View>
        <Text style={styles.username}>{outfit.user.name}</Text>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Icon name="heart" size={16} color={COLORS.secondary} />
          <Text style={styles.statText}>{outfit.likes}</Text>
        </View>
        <View style={styles.stat}>
          <Icon name="message-circle" size={16} color={COLORS.primary} />
          <Text style={styles.statText}>{outfit.comments}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
  },
  placeholderImage: {
    width: '100%',
    height: 200,
    backgroundColor: COLORS.lavender,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  avatarContainer: {
    marginRight: 8,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  placeholderAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.lavender,
  },
  username: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '500',
    color: COLORS.primary,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 8,
    paddingTop: 0,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    marginLeft: 4,
    fontSize: FONTS.sizes.xs,
    color: COLORS.darkGray,
  },
});

export default OutfitCard;