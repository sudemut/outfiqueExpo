// src/components/share/TagItem.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../theme/colors';
import { FONTS } from '../../theme/fonts';

const TagItem = ({ name, isSelected, onPress }) => {
  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        isSelected && styles.selectedContainer
      ]}
      onPress={onPress}
    >
      <Text 
        style={[
          styles.text,
          isSelected && styles.selectedText
        ]}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.lavender,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
  },
  selectedContainer: {
    backgroundColor: COLORS.primary,
  },
  text: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.primary,
  },
  selectedText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

export default TagItem;