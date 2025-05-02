// src/screens/auth/WelcomeScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { COLORS } from '../../theme/colors';
import { FONTS } from '../../theme/fonts';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/welcome.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <View style={styles.logoContainer}>
            <Text style={styles.appName}>OUTFIQUE</Text>
            <Text style={styles.tagline}>YOUR OUTFIT, YOUR STORY</Text>
          </View>

          <View style={styles.contentContainer}>
            <View style={styles.featureContainer}>
              <View style={styles.featureIcon}>
                <Text style={styles.featureEmoji}>👗</Text>
              </View>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>Fast Outfit Sharing</Text>
                <Text style={styles.featureDescription}>
                  Share your daily outfits with friends instantly
                </Text>
              </View>
            </View>

            <View style={styles.featureContainer}>
              <View style={styles.featureIcon}>
                <Text style={styles.featureEmoji}>🌱</Text>
              </View>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>Sustainable Fashion</Text>
                <Text style={styles.featureDescription}>
                  Track wear count and participate in eco-challenges
                </Text>
              </View>
            </View>

            <View style={styles.featureContainer}>
              <View style={styles.featureIcon}>
                <Text style={styles.featureEmoji}>✨</Text>
              </View>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>Style Inspiration</Text>
                <Text style={styles.featureDescription}>
                  Get inspired by friends and fashionistas around you
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.loginButtonText}>Log In</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.signupButton}
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={styles.signupButtonText}>Create Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: width,
    height: height,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'space-between',
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: height * 0.1,
  },
  appName: {
    fontSize: FONTS.sizes.xxxl * 1.5,
    fontWeight: 'bold',
    color: COLORS.white,
    letterSpacing: 2,
  },
  tagline: {
    fontSize: FONTS.sizes.md,
    color: COLORS.white,
    marginTop: 8,
    letterSpacing: 1,
  },
  contentContainer: {
    marginTop: 40,
  },
  featureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureEmoji: {
    fontSize: 24,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: FONTS.sizes.sm,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  buttonContainer: {
    marginBottom: height * 0.08,
  },
  loginButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.white,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonText: {
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  signupButton: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  signupButtonText: {
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});

export default WelcomeScreen;