// src/screens/share/ShareScreen.js
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Switch,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS } from '../../theme/colors';
import { FONTS } from '../../theme/fonts';
import TagItem from '../../components/share/TagItem';

// Mock data for sustainable brands
const sustainableBrands = [
  { id: '1', name: 'Patagonia' },
  { id: '2', name: 'Reformation' },
  { id: '3', name: 'Everlane' },
  { id: '4', name: 'Girlfriend Collective' },
  { id: '5', name: 'Veja' },
  { id: '6', name: 'Thrifted' },
  { id: '7', name: 'Vintage' },
];

const ShareScreen = ({ navigation }) => {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [isPrivate, setIsPrivate] = useState(false);
  const [isPartOfChallenge, setIsPartOfChallenge] = useState(false);
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [challengesList, setChallengesList] = useState([
    { id: '1', name: 'Color Theme Challenge', selected: false },
    { id: '2', name: 'Second-Hand Day', selected: false },
    { id: '3', name: 'Outfit Swap', selected: false },
  ]);

  const toggleBrandSelection = (brandId) => {
    if (selectedBrands.includes(brandId)) {
      setSelectedBrands(selectedBrands.filter(id => id !== brandId));
    } else {
      setSelectedBrands([...selectedBrands, brandId]);
    }
  };

  const toggleChallengeSelection = (challengeId) => {
    setChallengesList(
      challengesList.map(challenge => {
        if (challenge.id === challengeId) {
          return { ...challenge, selected: !challenge.selected };
        }
        return challenge;
      })
    );
  };

  const handlePost = () => {
    // In a real app, this would upload the image and post details to the server
    // For now, we'll just show a success modal
    setShowSuccessModal(true);
  };

  const resetForm = () => {
    setCaption('');
    setImage(null);
    setSelectedBrands([]);
    setIsPrivate(false);
    setIsPartOfChallenge(false);
    setChallengesList(
      challengesList.map(challenge => ({ ...challenge, selected: false }))
    );
    setShowSuccessModal(false);
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Share Your Outfit</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="x" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Image Upload Section */}
        <View style={styles.imageSection}>
          {image ? (
            <View style={styles.imagePreviewContainer}>
              <Image source={{ uri: image }} style={styles.imagePreview} />
              <TouchableOpacity
                style={styles.removeImageButton}
                onPress={() => setImage(null)}
              >
                <Icon name="trash-2" size={20} color={COLORS.white} />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.uploadButton}>
              <Icon name="camera" size={32} color={COLORS.primary} />
              <Text style={styles.uploadText}>Take a photo or upload from gallery</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Caption Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Write a caption</Text>
          <TextInput
            style={styles.captionInput}
            placeholder="Share your outfit story..."
            multiline={true}
            value={caption}
            onChangeText={setCaption}
          />
        </View>

        {/* Sustainable Brands Tags */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Tag sustainable brands (optional)</Text>
          <View style={styles.tagsContainer}>
            {sustainableBrands.map((brand) => (
              <TagItem
                key={brand.id}
                name={brand.name}
                isSelected={selectedBrands.includes(brand.id)}
                onPress={() => toggleBrandSelection(brand.id)}
              />
            ))}
          </View>
        </View>

        {/* Challenge Participation */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Part of a challenge?</Text>
          <View style={styles.switchContainer}>
            <Switch
              value={isPartOfChallenge}
              onValueChange={setIsPartOfChallenge}
              trackColor={{ false: COLORS.lavender, true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
            <Text style={styles.switchLabel}>
              {isPartOfChallenge ? 'Yes' : 'No'}
            </Text>
            {isPartOfChallenge && (
              <TouchableOpacity
                style={styles.selectButton}
                onPress={() => setShowChallengeModal(true)}
              >
                <Text style={styles.selectButtonText}>Select Challenges</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Privacy Setting */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Privacy</Text>
          <View style={styles.switchContainer}>
            <Switch
              value={isPrivate}
              onValueChange={setIsPrivate}
              trackColor={{ false: COLORS.lavender, true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
            <Text style={styles.switchLabel}>
              {isPrivate ? 'Only Friends' : 'Public'}
            </Text>
          </View>
        </View>

        {/* Post Button */}
        <TouchableOpacity style={styles.postButton} onPress={handlePost}>
          <Text style={styles.postButtonText}>Post Outfit</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Challenge Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showChallengeModal}
        onRequestClose={() => setShowChallengeModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Challenges</Text>
              <TouchableOpacity onPress={() => setShowChallengeModal(false)}>
                <Icon name="x" size={24} color={COLORS.darkGray} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.challengesList}>
              {challengesList.map((challenge) => (
                <TouchableOpacity
                  key={challenge.id}
                  style={[
                    styles.challengeItem,
                    challenge.selected && styles.selectedChallengeItem,
                  ]}
                  onPress={() => toggleChallengeSelection(challenge.id)}
                >
                  <Text
                    style={[
                      styles.challengeName,
                      challenge.selected && styles.selectedChallengeName,
                    ]}
                  >
                    {challenge.name}
                  </Text>
                  {challenge.selected && (
                    <Icon name="check" size={20} color={COLORS.white} />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={styles.doneButton}
              onPress={() => setShowChallengeModal(false)}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Success Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showSuccessModal}
        onRequestClose={() => setShowSuccessModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.successModalContent}>
            <Icon name="check-circle" size={60} color={COLORS.primary} />
            <Text style={styles.successTitle}>Posted Successfully!</Text>
            <Text style={styles.successText}>
              Your outfit has been shared with your friends.
              {isPartOfChallenge &&
                challengesList.some((challenge) => challenge.selected) &&
                ' You\'ve also participated in the selected challenges.'}
            </Text>
            <TouchableOpacity
              style={styles.doneButton}
              onPress={resetForm}
            >
              <Text style={styles.doneButtonText}>Done</Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  imageSection: {
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: COLORS.lavender,
    borderRadius: 12,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadText: {
    marginTop: 12,
    fontSize: FONTS.sizes.md,
    color: COLORS.primary,
    textAlign: 'center',
  },
  imagePreviewContainer: {
    position: 'relative',
  },
  imagePreview: {
    width: '100%',
    height: 300,
    borderRadius: 12,
  },
  removeImageButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: FONTS.sizes.md,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
  },
  captionInput: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: {
    fontSize: FONTS.sizes.md,
    color: COLORS.darkGray,
    marginLeft: 8,
  },
  selectButton: {
    backgroundColor: COLORS.lightPink,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginLeft: 12,
  },
  selectButtonText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.primary,
    fontWeight: '500',
  },
  postButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 32,
  },
  postButtonText: {
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
    color: COLORS.white,
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
    width: '90%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  challengesList: {
    padding: 16,
  },
  challengeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: COLORS.lavender,
  },
  selectedChallengeItem: {
    backgroundColor: COLORS.primary,
  },
  challengeName: {
    fontSize: FONTS.sizes.md,
    color: COLORS.primary,
  },
  selectedChallengeName: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  doneButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    margin: 16,
  },
  doneButtonText: {
    fontSize: FONTS.sizes.md,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  successModalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    width: '80%',
  },
  successTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 16,
    marginBottom: 8,
  },
  successText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.darkGray,
    textAlign: 'center',
    marginBottom: 24,
  },
});

export default ShareScreen;