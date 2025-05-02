// src/components/wardrobe/CategoryTab.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS } from '../../theme/colors';
import { FONTS } from '../../theme/fonts';

const CategoryTab = ({ category, isSelected, onPress }) => {
  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        isSelected && styles.selectedContainer
      ]}
      onPress={onPress}
    >
      <Icon 
        name={category.icon} 
        size={20} 
        color={isSelected ? COLORS.white : COLORS.primary} 
      />
      <Text 
        style={[
          styles.text,
          isSelected && styles.selectedText
        ]}
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lavender,
    borderRadius: 18,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  selectedContainer: {
    backgroundColor: COLORS.primary,
  },
  text: {
    marginLeft: 6,
    fontSize: FONTS.sizes.sm,
    fontWeight: '500',
    color: COLORS.primary,
  },
  selectedText: {
    color: COLORS.white,
  },
});

export default CategoryTab;