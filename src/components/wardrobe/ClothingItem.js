// src/components/wardrobe/ClothingItem.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS } from '../../theme/colors';
import { FONTS } from '../../theme/fonts';

const ClothingItem = ({ item, onWearCountIncrement }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
        ) : (
          <View style={styles.placeholderImage}>
            <Icon name="shopping-bag" size={24} color={COLORS.primary} />
          </View>
        )}
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Category:</Text>
            <Text style={styles.detailValue}>{item.category}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Brand:</Text>
            <Text style={styles.detailValue}>{item.brand || 'Not specified'}</Text>
          </View>
        </View>
        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Color:</Text>
            <Text style={styles.detailValue}>{item.color || 'Not specified'}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Sustainable:</Text>
            <Text style={[
              styles.detailValue,
              item.sustainable ? styles.sustainableValue : {}
            ]}>
              {item.sustainable ? 'Yes' : 'No'}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.wearCountContainer}>
        <Text style={styles.wearCountLabel}>Wear Count</Text>
        <Text style={styles.wearCountValue}>{item.wearCount}</Text>
        <TouchableOpacity 
          style={styles.incrementButton}
          onPress={onWearCountIncrement}
        >
          <Icon name="plus" size={16} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 12,
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
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: FONTS.sizes.md,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  detailsRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  detailItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.gray,
    marginRight: 4,
  },
  detailValue: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.darkGray,
  },
  sustainableValue: {
    color: 'green',
    fontWeight: 'bold',
  },
  wearCountContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 8,
  },
  wearCountLabel: {
    fontSize: FONTS.sizes.xxs,
    color: COLORS.gray,
    marginBottom: 2,
  },
  wearCountValue: {
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  incrementButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ClothingItem;