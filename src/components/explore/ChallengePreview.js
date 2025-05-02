
// src/components/explore/ChallengePreview.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS } from '../../theme/colors';
import { FONTS } from '../../theme/fonts';

const ChallengePreview = ({ challenge, onPress }) => {
  const getIcon = () => {
    switch (challenge.type) {
      case 'poll':
        return 'help-circle';
      case 'challenge':
        return 'award';
      default:
        return 'star';
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Icon name={getIcon()} size={24} color={COLORS.primary} />
      </View>
      <Text style={styles.title}>{challenge.title}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {challenge.description}
      </Text>
      <Text style={styles.participants}>
        {challenge.participants} participants
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.lightPink,
    width: 200,
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lavender,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
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
    marginBottom: 12,
    height: 36,
  },
  participants: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.primary,
    fontWeight: '500',
  },
});

export default ChallengePreview;