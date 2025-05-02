// src/components/challenges/PostItem.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS } from '../../theme/colors';
import { FONTS } from '../../theme/fonts';

const PostItem = ({ post, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          {post.user.avatarUrl ? (
            <Image source={{ uri: post.user.avatarUrl }} style={styles.userAvatar} />
          ) : (
            <View style={styles.placeholderAvatar}>
              <Text style={styles.avatarLetter}>{post.user.name.charAt(0)}</Text>
            </View>
          )}
          <View style={styles.nameContainer}>
            <Text style={styles.userName}>{post.user.name}</Text>
            <Text style={styles.timeAgo}>{post.timeAgo}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <Icon name="more-horizontal" size={20} color={COLORS.gray} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.imageContainer}>
        {post.imageUrl ? (
          <Image source={{ uri: post.imageUrl }} style={styles.postImage} />
        ) : (
          <View style={styles.placeholderImage}>
            <Icon name="image" size={32} color={COLORS.gray} />
          </View>
        )}
      </View>
      
      <View style={styles.footer}>
        <View style={styles.interactionContainer}>
          <View style={styles.interaction}>
            <Icon name="heart" size={18} color={COLORS.secondary} />
            <Text style={styles.interactionText}>{post.likes}</Text>
          </View>
          <View style={styles.interaction}>
            <Icon name="message-circle" size={18} color={COLORS.primary} />
            <Text style={styles.interactionText}>{post.comments}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.shareButton}>
          <Icon name="share-2" size={18} color={COLORS.gray} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  },
  placeholderAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.lavender,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  avatarLetter: {
    fontSize: FONTS.sizes.md,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  nameContainer: {
    justifyContent: 'center',
  },
  userName: {
    fontSize: FONTS.sizes.md,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 2,
  },
  timeAgo: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.gray,
  },
  moreButton: {
    padding: 4,
  },
  imageContainer: {
    width: '100%',
    height: 240,
  },
  postImage: {
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
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  interactionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  interaction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  interactionText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.darkGray,
    marginLeft: 4,
  },
  shareButton: {
    padding: 4,
  },
});

export default PostItem;