// src/components/profile/BadgeItem.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../theme/colors';
import { FONTS } from '../../theme/fonts';

const BadgeItem = ({ badge }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: badge.color }]}>
        <Text style={styles.icon}>{badge.icon}</Text>
      </View>
      <Text style={styles.name} numberOfLines={2}>
        {badge.name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 80,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  icon: {
    fontSize: 20,
  },
  name: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.primary,
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default BadgeItem;