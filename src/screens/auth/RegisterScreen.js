// src/screens/auth/RegisterScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS } from '../../theme/colors';
import { FONTS } from '../../theme/fonts';

const { width } = Dimensions.get('window');

// Aesthetics data
// Aesthetics data
const aesthetics = [
  {
    id: '1',
    name: 'Soft Aesthetic / Pastelcore',
    description: 'Pastel renkler, yumuşak tonlar, sade tipografi',
    colors: ['#B9E6FF', '#E4C1F9', '#FFD6EC'],
    sticker: require('../../assets/images/aesthetics/soft.jpg'),
  },
  {
    id: '2',
    name: 'Cyber Y2K',
    description: 'Chrome efektler, retro-fütüristik grafikler, siyah-yeşil kontrastlar',
    colors: ['#C7C7C7', '#BB00EA', '#000000', '#00FF84'],
    sticker: require('../../assets/images/aesthetics/y2k.jpg'),
  },
  {
    id: '3',
    name: 'Clean Minimalism',
    description: 'Bol boşluk, sade çizgiler, düz renkli ikonlar',
    colors: ['#FFFFFF', '#D1D1D6', '#1C1C1E'],
    sticker: require('../../assets/images/aesthetics/clean.jpg'),
  },
  {
    id: '4',
    name: 'Coquette / Romantic Core',
    description: 'Dantel benzeri detaylar, zarif serif fontlar, çiçek illüstrasyonları',
    colors: ['#FFE6E6', '#E5D3B3', '#9E2B25'],
    sticker: require('../../assets/images/aesthetics/coquette.jpg'),
  },
  {
    id: '5',
    name: 'Dark Academia',
    description: 'Felsefe, kitaplar, koyu toprak tonları',
    colors: ['#0A1045', '#4F5D2F', '#8B4513'],
    sticker: require('../../assets/images/aesthetics/dark.jpg'),
  },
  {
    id: '6',
    name: 'Vaporwave / Synthwave',
    description: '80\'ler retro renkler, gradient arka planlar, glitch efektleri',
    colors: ['#9900FF', '#0096FF', '#FF00FF'],
    sticker: require('../../assets/images/aesthetics/vapor.jpg'),
  },
  {
    id: '7',
    name: 'Kidcore / Nostalgia UI',
    description: '90\'lar oyun stili, büyük yazılar, eğlenceli ikonlar',
    colors: ['#FF0000', '#0000FF', '#FFFF00'],
    sticker: require('../../assets/images/aesthetics/kid.jpg'),
  },
  {
    id: '8',
    name: 'Grunge Revival',
    description: 'Fotoğraf filtresi hissi, isyan hissi, bohem tipografi',
    colors: ['#A9A9A9', '#8B0000', '#000000', '#F5F5DC'],
    sticker: require('../../assets/images/aesthetics/grunge.jpg'),
  },
  {
    id: '9',
    name: 'Eco Aesthetic / Sustainable UX',
    description: 'Geri dönüştürülmüş doku simülasyonları, toprak tonları',
    colors: ['#708238', '#C19A6B', '#A2A2A2'],
    sticker: require('../../assets/images/aesthetics/eco.jpg'),
  },
  {
    id: '10',
    name: 'Baddie Aesthetic / IG-Model UI',
    description: 'Lüks ama feminen, bold fontlar, gradient arka planlar',
    colors: ['#FF69B4', '#DA70D6', '#F5F5DC'],
    sticker: require('../../assets/images/aesthetics/baddie.png'),
  },
  {
    id: '11',
    name: 'Cottagecore',
    description: 'Doğa teması, yazı tipi olarak el yazısına benzer fontlar',
    colors: ['#90EE90', '#F5F5DC', '#FFA500'],
    sticker: require('../../assets/images/aesthetics/cottagore.png'),
  },

  {
    id: '12',
    name: 'Indie',
    description: 'Indie tarzı, ana akımın dışında kalan özgün, yaratıcı ve bireysel estetik anlayışı',
    colors:['#FFB6C1', '#FFD700', '#9370DB'],
    sticker: require('../../assets/images/aesthetics/indie.jpg')
  }
];

const RegisterScreen = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedAesthetics, setSelectedAesthetics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAestheticSelection = (aestheticId) => {
    if (selectedAesthetics.includes(aestheticId)) {
      setSelectedAesthetics(selectedAesthetics.filter(id => id !== aestheticId));
    } else {
      setSelectedAesthetics([...selectedAesthetics, aestheticId]);
    }
  };

  const handleRegister = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // For now, just navigate to the main app
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainApp' }],
      });
    }, 1500);
  };

  const isFirstStepValid = () => {
    return name.trim() !== '' && username.trim() !== '' && 
           phoneNumber.trim() !== '' && password.trim() !== '';
  };

  const renderPersonalInfoStep = () => {
    return (
      <ScrollView contentContainerStyle={styles.formContainer}>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '50%' }]} />
          </View>
          <Text style={styles.progressText}>Step 1 of 2</Text>
        </View>

        <Text style={styles.stepTitle}>Tell us about yourself</Text>
        <Text style={styles.stepDescription}>
          Create your profile to start sharing your outfits
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Full Name</Text>
          <View style={styles.inputWrapper}>
            <Icon name="user" size={20} color={COLORS.gray} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              placeholderTextColor={COLORS.gray}
              value={name}
              onChangeText={setName}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Username</Text>
          <View style={styles.inputWrapper}>
            <Icon name="at-sign" size={20} color={COLORS.gray} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Choose a username"
              placeholderTextColor={COLORS.gray}
              value={username}
              onChangeText={setUsername}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Phone Number</Text>
          <View style={styles.inputWrapper}>
            <Icon name="phone" size={20} color={COLORS.gray} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              placeholderTextColor={COLORS.gray}
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.inputWrapper}>
            <Icon name="lock" size={20} color={COLORS.gray} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Create a password"
              placeholderTextColor={COLORS.gray}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              style={styles.visibilityButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Icon
                name={showPassword ? 'eye-off' : 'eye'}
                size={20}
                color={COLORS.gray}
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.nextButton,
            !isFirstStepValid() && styles.nextButtonDisabled,
          ]}
          onPress={() => setCurrentStep(2)}
          disabled={!isFirstStepValid()}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
        
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Log In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };

  const renderAestheticItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.aestheticCard,
        selectedAesthetics.includes(item.id) && styles.selectedAestheticCard,
      ]}
      onPress={() => handleAestheticSelection(item.id)}
    >
      <View style={styles.stickerContainer}>
        <Image source={item.sticker} style={styles.stickerImage} />
      </View>
      <Text style={styles.aestheticName}>{item.name}</Text>
      {selectedAesthetics.includes(item.id) && (
        <View style={styles.selectedCheck}>
          <Icon name="check" size={16} color={COLORS.white} />
        </View>
      )}
      <View style={styles.colorPalette}>
        {item.colors.map((color, index) => (
          <View
            key={index}
            style={[styles.colorDot, { backgroundColor: color }]}
          />
        ))}
      </View>
    </TouchableOpacity>
  );

  const renderAestheticSelectionStep = () => {
    return (
      <View style={styles.formContainer}>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '100%' }]} />
          </View>
          <Text style={styles.progressText}>Step 2 of 2</Text>
        </View>

        <Text style={styles.stepTitle}>Choose your style aesthetics</Text>
        <Text style={styles.stepDescription}>
          Select the aesthetics you love to personalize your experience
        </Text>
        <Text style={styles.selectionHint}>You can select multiple options</Text>

        <FlatList
          data={aesthetics}
          numColumns={2}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.aestheticsGrid}
          renderItem={renderAestheticItem}
          showsVerticalScrollIndicator={false}
        />

        <View style={styles.buttonsRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setCurrentStep(1)}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.registerButton,
              selectedAesthetics.length === 0 && styles.registerButtonDisabled,
            ]}
            onPress={handleRegister}
            disabled={selectedAesthetics.length === 0 || isLoading}
          >
            {isLoading ? (
              <View style={styles.loadingIndicator}>
                <Text style={styles.registerButtonText}>Creating account...</Text>
              </View>
            ) : (
              <Text style={styles.registerButtonText}>Create Account</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backToWelcomeButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" size={24} color={COLORS.primary} />
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <Text style={styles.appName}>OUTFIQUE</Text>
          </View>
        </View>

        {currentStep === 1 ? renderPersonalInfoStep() : renderAestheticSelectionStep()}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardView: {
    flex: 1,
  },
  headerContainer: {
    padding: 24,
    paddingBottom: 0,
  },
  formContainer: {
    padding: 24,
    flex: 1,
  },
  backToWelcomeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  appName: {
    fontSize: FONTS.sizes.xxxl,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  progressContainer: {
    marginBottom: 24,
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.lavender,
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.gray,
    textAlign: 'right',
  },
  stepTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: FONTS.sizes.md,
    color: COLORS.darkGray,
    marginBottom: 24,
  },
  selectionHint: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.gray,
    fontStyle: 'italic',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: FONTS.sizes.sm,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: FONTS.sizes.md,
    color: COLORS.darkGray,
  },
  visibilityButton: {
    padding: 8,
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  nextButtonDisabled: {
    backgroundColor: COLORS.lightPink,
  },
  nextButtonText: {
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  loginText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.gray,
  },
  loginLink: {
    fontSize: FONTS.sizes.md,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  aestheticsGrid: {
    paddingBottom: 16,
  },
  aestheticCard: {
    width: (width - 64) / 2,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 8,
    marginBottom: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    position: 'relative',
  },
  selectedAestheticCard: {
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  stickerContainer: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  stickerImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  aestheticName: {
    fontSize: FONTS.sizes.sm,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  selectedCheck: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: COLORS.primary,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
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
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  backButton: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginRight: 8,
  },
  backButtonText: {
    fontSize: FONTS.sizes.md,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  registerButton: {
    flex: 2,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginLeft: 8,
  },
  registerButtonDisabled: {
    backgroundColor: COLORS.lightPink,
  },
  registerButtonText: {
    fontSize: FONTS.sizes.md,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  loadingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RegisterScreen;