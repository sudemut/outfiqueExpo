// src/components/explore/AestheticFilter.js
import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS } from '../../theme/colors';
import { FONTS } from '../../theme/fonts';

const AestheticFilter = ({ aesthetic, isSelected, onPress }) => {
  return (
    <TouchableOpacity 
      style={[
        styles.container,
        isSelected && styles.selectedContainer
      ]}
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{aesthetic.icon}</Text>
      </View>
      <Text style={[
        styles.name,
        isSelected && styles.selectedName
      ]}>
        {aesthetic.name}
      </Text>
      <View style={styles.colorPalette}>
        {aesthetic.colors.map((color, index) => (
          <View 
            key={index} 
            style={[styles.colorDot, { backgroundColor: color }]} 
          />
        ))}
      </View>
      {isSelected && (
        <View style={styles.checkmark}>
          <Icon name="check" size={16} color={COLORS.white} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '45%',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: '2.5%',
    marginBottom: 16,
    alignItems: 'center',
    position: 'relative',
  },
  selectedContainer: {
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  iconContainer: {
    width: 48,
    height: 48,
    backgroundColor: COLORS.lavender,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    fontSize: 24,
  },
  name: {
    fontSize: FONTS.sizes.md,
    fontWeight: '500',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  selectedName: {
    fontWeight: 'bold',
  },
  colorPalette: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  colorDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginHorizontal: 2,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  checkmark: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AestheticFilter;