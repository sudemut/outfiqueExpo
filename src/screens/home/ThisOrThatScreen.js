// src/screens/home/ThisOrThatScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  Image,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS } from '../../theme/colors';
import { FONTS } from '../../theme/fonts';

// Mock data for existing polls
const mockPolls = [
  {
    id: '1',
    creator: {
      id: '1',
      name: 'JaneStyle',
      avatarUrl: null,
    },
    options: [
      {
        id: '1',
        imageUrl: null,
        votes: 12,
      },
      {
        id: '2',
        imageUrl: null,
        votes: 8,
      },
    ],
    comments: [
      {
        id: '1',
        user: {
          id: '2',
          name: 'JaneStyle',
          avatarUrl: null,
        },
        text: 'I think the first option looks better!',
      },
      {
        id: '2',
        user: {
          id: '3',
          name: 'FashionPro',
          avatarUrl: null,
        },
        text: 'The second one seems more versatile for different occasions.',
      },
    ],
    voted: false,
  },
];

const ThisOrThatScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('friends'); // 'friends' or 'public'
  const [polls, setPolls] = useState(mockPolls);
  const [comment, setComment] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleVote = (pollId, optionId) => {
    setPolls(
      polls.map((poll) => {
        if (poll.id === pollId) {
          return {
            ...poll,
            options: poll.options.map((option) => {
              if (option.id === optionId) {
                return { ...option, votes: option.votes + 1 };
              }
              return option;
            }),
            voted: true,
          };
        }
        return poll;
      })
    );
  };

  const handleAddComment = (pollId) => {
    if (comment.trim() === '') return;

    setPolls(
      polls.map((poll) => {
        if (poll.id === pollId) {
          return {
            ...poll,
            comments: [
              ...poll.comments,
              {
                id: Date.now().toString(),
                user: {
                  id: 'current_user',
                  name: 'You',
                  avatarUrl: null,
                },
                text: comment,
              },
            ],
          };
        }
        return poll;
      })
    );

    setComment('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>This or That</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => setShowCreateModal(true)}
        >
          <Icon name="plus" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'friends' && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab('friends')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'friends' && styles.activeTabText,
            ]}
          >
            Friends
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'public' && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab('public')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'public' && styles.activeTabText,
            ]}
          >
            Public
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.helpText}>
        Can't decide? Let your friends help you choose the best option!
      </Text>

      <ScrollView style={styles.pollsContainer}>
        {polls.map((poll) => (
          <View key={poll.id} style={styles.pollCard}>
            <View style={styles.pollOptions}>
              <TouchableOpacity
                style={styles.optionContainer}
                onPress={() => !poll.voted && handleVote(poll.id, poll.options[0].id)}
                disabled={poll.voted}
              >
                {poll.options[0].imageUrl ? (
                  <Image
                    source={{ uri: poll.options[0].imageUrl }}
                    style={styles.optionImage}
                  />
                ) : (
                  <View style={styles.placeholderImage}>
                    <Text style={styles.optionText}>Option 1</Text>
                  </View>
                )}
                {poll.voted && (
                  <View style={styles.voteCount}>
                    <Text style={styles.voteCountText}>
                      {poll.options[0].votes} votes
                    </Text>
                  </View>
                )}
              </TouchableOpacity>

              <View style={styles.orContainer}>
                <View style={styles.orCircle}>
                  <Text style={styles.orText}>or</Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.optionContainer}
                onPress={() => !poll.voted && handleVote(poll.id, poll.options[1].id)}
                disabled={poll.voted}
              >
                {poll.options[1].imageUrl ? (
                  <Image
                    source={{ uri: poll.options[1].imageUrl }}
                    style={styles.optionImage}
                  />
                ) : (
                  <View style={styles.placeholderImage}>
                    <Text style={styles.optionText}>Option 2</Text>
                  </View>
                )}
                {poll.voted && (
                  <View style={styles.voteCount}>
                    <Text style={styles.voteCountText}>
                      {poll.options[1].votes} votes
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            {!poll.voted && (
              <Text style={styles.tapToVoteText}>Tap an option to vote</Text>
            )}

            <View style={styles.commentsContainer}>
              <Text style={styles.commentsTitle}>Comments</Text>
              {poll.comments.map((comment) => (
                <View key={comment.id} style={styles.commentItem}>
                  <View style={styles.commentAvatar}>
                    {comment.user.avatarUrl ? (
                      <Image
                        source={{ uri: comment.user.avatarUrl }}
                        style={styles.avatarImage}
                      />
                    ) : (
                      <View style={styles.placeholderAvatar} />
                    )}
                  </View>
                  <View style={styles.commentContent}>
                    <Text style={styles.commentUserName}>{comment.user.name}</Text>
                    <Text style={styles.commentText}>{comment.text}</Text>
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.addCommentContainer}>
              <TextInput
                style={styles.commentInput}
                placeholder="Add a comment..."
                value={comment}
                onChangeText={setComment}
              />
              <TouchableOpacity
                style={styles.sendButton}
                onPress={() => handleAddComment(poll.id)}
              >
                <Text style={styles.sendButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Create Poll Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showCreateModal}
        onRequestClose={() => setShowCreateModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Create Poll</Text>
              <TouchableOpacity onPress={() => setShowCreateModal(false)}>
                <Icon name="x" size={24} color={COLORS.darkGray} />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalSubtitle}>
              Upload two outfit options and let your friends help you decide!
            </Text>

            <View style={styles.uploadOptions}>
              <TouchableOpacity style={styles.uploadButton}>
                <Icon name="plus" size={32} color={COLORS.gray} />
                <Text style={styles.uploadText}>Option 1</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.uploadButton}>
                <Icon name="plus" size={32} color={COLORS.gray} />
                <Text style={styles.uploadText}>Option 2</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.visibilityOptions}>
              <Text style={styles.visibilityTitle}>Who can see this poll?</Text>
              <View style={styles.visibilityButtonsContainer}>
                <TouchableOpacity
                  style={[styles.visibilityButton, styles.activeVisibilityButton]}
                >
                  <Text
                    style={[styles.visibilityButtonText, styles.activeVisibilityButtonText]}
                  >
                    Friends
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.visibilityButton}>
                  <Text style={styles.visibilityButtonText}>Public</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.createPollButton}>
              <Text style={styles.createPollButtonText}>Create Poll</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  createButton: {
    padding: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 12,
  },
  activeTabButton: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.gray,
  },
  activeTabText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  helpText: {
    textAlign: 'center',
    fontSize: FONTS.sizes.md,
    color: COLORS.darkGray,
    marginVertical: 16,
    paddingHorizontal: 32,
  },
  pollsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  pollCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
  },
  pollOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionContainer: {
    flex: 1,
    position: 'relative',
  },
  placeholderImage: {
    height: 200,
    backgroundColor: COLORS.lavender,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionImage: {
    height: 200,
    width: '100%',
    borderRadius: 8,
  },
  optionText: {
    fontSize: FONTS.sizes.lg,
    color: COLORS.primary,
  },
  orContainer: {
    width: 40,
    alignItems: 'center',
  },
  orCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.darkGray,
  },
  voteCount: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  voteCountText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.xs,
  },
  tapToVoteText: {
    textAlign: 'center',
    fontSize: FONTS.sizes.sm,
    color: COLORS.gray,
    marginTop: 12,
  },
  commentsContainer: {
    marginTop: 16,
  },
  commentsTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  commentAvatar: {
    marginRight: 8,
  },
  placeholderAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.lavender,
  },
  avatarImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  commentContent: {
    flex: 1,
    backgroundColor: COLORS.lightPink,
    borderRadius: 12,
    padding: 8,
  },
  commentUserName: {
    fontSize: FONTS.sizes.sm,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 2,
  },
  commentText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.darkGray,
  },
  addCommentContainer: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
  },
  commentInput: {
    flex: 1,
    backgroundColor: COLORS.lavender,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: FONTS.sizes.sm,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sendButtonText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.sm,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    width: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  modalSubtitle: {
    fontSize: FONTS.sizes.md,
    color: COLORS.darkGray,
    marginBottom: 24,
  },
  uploadOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  uploadButton: {
    flex: 0.48,
    height: 150,
    backgroundColor: COLORS.lavender,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadText: {
    marginTop: 8,
    fontSize: FONTS.sizes.md,
    color: COLORS.gray,
  },
  visibilityOptions: {
    marginBottom: 24,
  },
  visibilityTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
  },
  visibilityButtonsContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.lavender,
    borderRadius: 16,
    padding: 4,
  },
  visibilityButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 12,
  },
  activeVisibilityButton: {
    backgroundColor: COLORS.primary,
  },
  visibilityButtonText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.gray,
  },
  activeVisibilityButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  createPollButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  createPollButtonText: {
    fontSize: FONTS.sizes.md,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});

export default ThisOrThatScreen;