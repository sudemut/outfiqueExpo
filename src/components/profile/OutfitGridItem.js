// src/components/profile/OutfitGridItem.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS } from '../../theme/colors';
import { FONTS } from '../../theme/fonts';

const OutfitGridItem = ({ outfit, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {outfit.imageUrl ? (
        <Image source={{ uri: outfit.imageUrl }} style={styles.image} />
      ) : (
        <View style={styles.placeholderImage} />
      )}
      
      <View style={styles.dateTag}>
        <Text style={styles.dateTeaxt}>{outfit.date}</Text>
      </View>
      
      <View style={styles.likesContainer}>
        <Icon name="heart" size={12} color={COLORS.primary} />
        <Text style={styles.likesText}>{outfit.likes}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '33.33%',
    aspectRatio: 1,
    padding: 2,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.lavender,
    borderRadius: 4,
  },
  dateTag: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  dateText: {
    fontSize: FONTS.sizes.xxs,
    color: COLORS.primary,
    fontWeight: '500',
  },
  likesContainer: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  likesText: {
    fontSize: FONTS.sizes.xxs,
    color: COLORS.primary,
    marginLeft: 2,
  },
});

export default OutfitGridItem;