// src/components/challenges/ChallengeCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../theme/colors';
import { FONTS } from '../../theme/fonts';

const ChallengeCard = ({ challenge, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <Text style={styles.title}>{challenge.title}</Text>
        <Text style={styles.description}>{challenge.description}</Text>
        <Text style={styles.participants}>{challenge.participants} participants</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.lightPink,
    borderRadius: 12,
    marginBottom: 12,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  description: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.darkGray,
    marginBottom: 8,
  },
  participants: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.primary,
    textAlign: 'right',
  },
});

export default ChallengeCard;