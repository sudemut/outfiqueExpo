// src/components/challenges/ChallengeCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS } from '../../theme/colors';
import { FONTS } from '../../theme/fonts';

const ChallengeCard = ({ challenge, onPress, style }) => {
  // Get icon based on challenge type or use the provided icon
  const getIcon = () => {
    if (challenge.icon) return challenge.icon;
    
    switch (challenge.type) {
      case 'color':
        return '🎨';
      case 'sustainable':
        return '🍃';
      case 'swap':
        return '👯';
      case 'thrifting':
        return '♻️';
      case 'vintage':
        return '📷';
      case 'y2k':
        return '💾';
      default:
        return '🏆';
    }
  };

  // Get background color based on challenge type or aesthetics
  const getBackgroundColor = () => {
    if (challenge.backgroundColor) return { backgroundColor: challenge.backgroundColor };
    
    // If the challenge has aesthetics, use the first one's color
    if (challenge.aesthetics && challenge.aesthetics.length > 0) {
      switch (challenge.aesthetics[0]) {
        case '1': // Soft Aesthetic
          return { backgroundColor: COLORS.aesthetics.softAesthetic.primary };
        case '2': // Cyber Y2K
          return { backgroundColor: COLORS.aesthetics.cyberY2K.primary };
        case '3': // Minimalism
          return { backgroundColor: COLORS.aesthetics.minimalism.primary };
        case '4': // Romantic
          return { backgroundColor: COLORS.aesthetics.romantic.primary };
        case '5': // Dark Academia
          return { backgroundColor: COLORS.aesthetics.darkAcademia.primary };
        case '6': // Vaporwave
          return { backgroundColor: COLORS.aesthetics.vaporwave.primary };
        case '7': // Kidcore
          return { backgroundColor: COLORS.aesthetics.kidcore.primary };
        case '8': // Grunge
          return { backgroundColor: COLORS.aesthetics.grunge.primary };
        case '9': // Eco
          return { backgroundColor: COLORS.aesthetics.ecoAesthetic.primary };
        case '10': // Baddie
          return { backgroundColor: COLORS.aesthetics.baddie.primary };
        case '11': // Cottagecore
          return { backgroundColor: COLORS.aesthetics.cottagecore.primary };
        default:
          return {};
      }
    }
    
    return {}; // Default to the component's base style
  };

  // Format participants number
  const formatParticipants = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num;
  };

  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        getBackgroundColor(),
        style
      ]} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <View style={styles.iconContainer}>
            <Text style={styles.iconText}>{getIcon()}</Text>
          </View>
          
          {challenge.daysLeft && (
            <View style={styles.daysLeftContainer}>
              <Text style={styles.daysLeftText}>{challenge.daysLeft} days left</Text>
            </View>
          )}
        </View>
        
        <Text style={styles.title} numberOfLines={2}>{challenge.title}</Text>
        <Text style={styles.description} numberOfLines={2}>{challenge.description}</Text>
        
        <View style={styles.statsRow}>
          <View style={styles.participantsContainer}>
            <Icon name="users" size={14} color={COLORS.primary} style={styles.participantsIcon} />
            <Text style={styles.participantsText}>
              {formatParticipants(challenge.participants)} participants
            </Text>
          </View>
          
          {challenge.startDate && challenge.endDate && (
            <Text style={styles.dateText}>{challenge.startDate} - {challenge.endDate}</Text>
          )}
        </View>
        
        {challenge.friends && challenge.friends.length > 0 && (
          <View style={styles.friendsContainer}>
            <Text style={styles.friendsLabel}>Friends participating:</Text>
            <View style={styles.friendAvatars}>
              {challenge.friends.map((friend, index) => (
                <View 
                  key={index} 
                  style={[
                    styles.friendAvatar,
                    { marginLeft: index > 0 ? -10 : 0 }
                  ]}
                >
                  {friend.avatarUrl ? (
                    <Image source={{ uri: friend.avatarUrl }} style={styles.avatarImage} />
                  ) : (
                    <View style={styles.placeholderAvatar}>
                      <Text style={styles.avatarLetter}>{friend.name.charAt(0)}</Text>
                    </View>
                  )}
                </View>
              ))}
              
              {challenge.friends.length > 3 && (
                <View style={[styles.friendAvatar, styles.moreAvatar, { marginLeft: -10 }]}>
                  <Text style={styles.moreAvatarText}>+{challenge.friends.length - 3}</Text>
                </View>
              )}
            </View>
          </View>
        )}
        
        {challenge.progress !== undefined && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill,
                  { width: `${challenge.progress}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>{challenge.progress}% complete</Text>
          </View>
        )}
        
        {challenge.badge && (
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeLabel}>Badge:</Text>
            <View style={styles.badgeWrapper}>
              <Text style={styles.badgeIcon}>{challenge.badge.icon}</Text>
              <Text style={styles.badgeName}>{challenge.badge.name}</Text>
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.lightPink,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  content: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 20,
  },
  daysLeftContainer: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  daysLeftText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.xs,
    fontWeight: 'bold',
  },
  title: {
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 6,
  },
  description: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.darkGray,
    marginBottom: 12,
    lineHeight: 18,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  participantsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  participantsIcon: {
    marginRight: 4,
  },
  participantsText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.primary,
    fontWeight: '500',
  },
  dateText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.darkGray,
  },
  friendsContainer: {
    marginBottom: 12,
  },
  friendsLabel: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.darkGray,
    marginBottom: 6,
  },
  friendAvatars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  friendAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  placeholderAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    backgroundColor: COLORS.lavender,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarLetter: {
    fontSize: FONTS.sizes.sm,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  moreAvatar: {
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreAvatarText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.xs,
    fontWeight: 'bold',
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 3,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },
  progressText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.darkGray,
    textAlign: 'right',
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeLabel: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.darkGray,
    marginRight: 8,
  },
  badgeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  badgeName: {
    fontSize: FONTS.sizes.xs,
    fontWeight: 'bold',
    color: COLORS.primary,
  }
});

export default ChallengeCard;