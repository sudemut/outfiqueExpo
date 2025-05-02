import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

// Main Screens
import HomeScreen from '../screens/home/HomeScreen';
import ExploreScreen from '../screens/explore/ExploreScreen';
import ShareScreen from '../screens/share/ShareScreen';
import WardrobeScreen from '../screens/wardrobe/WardrobeScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import ChallengeDetailsScreen from '../screens/challenges/ChallengeDetailsScreen';
import OutfitDetailsScreen from '../screens/home/OutfitDetailsScreen';
import ThisOrThatScreen from '../screens/home/ThisOrThatScreen';

import { COLORS } from '../theme/colors';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Home Stack
const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeMain" component={HomeScreen} />
    <Stack.Screen name="OutfitDetails" component={OutfitDetailsScreen} />
    <Stack.Screen name="ChallengeDetails" component={ChallengeDetailsScreen} />
    <Stack.Screen name="ThisOrThat" component={ThisOrThatScreen} />
  </Stack.Navigator>
);

// Explore Stack
const ExploreStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ExploreMain" component={ExploreScreen} />
    <Stack.Screen name="OutfitDetails" component={OutfitDetailsScreen} />
    <Stack.Screen name="ChallengeDetails" component={ChallengeDetailsScreen} />
  </Stack.Navigator>
);

// Wardrobe Stack
const WardrobeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="WardrobeMain" component={WardrobeScreen} />
  </Stack.Navigator>
);

// Profile Stack
const ProfileStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ProfileMain" component={ProfileScreen} />
  </Stack.Navigator>
);

// Tab Navigator
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarStyle: styles.tabBar,
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: COLORS.gray,
      tabBarShowLabel: true,
      headerShown: false,
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeStack}
      options={{
        tabBarIcon: ({ color, size }) => <Icon name="home" color={color} size={size} />,
      }}
    />
    <Tab.Screen
      name="Explore"
      component={ExploreStack}
      options={{
        tabBarIcon: ({ color, size }) => <Icon name="search" color={color} size={size} />,
      }}
    />
    <Tab.Screen
      name="Share"
      component={ShareScreen}
      options={{
        tabBarIcon: ({ color, size }) => <Icon name="plus-circle" color={color} size={size} />,
      }}
    />
    <Tab.Screen
      name="Wardrobe"
      component={WardrobeStack}
      options={{
        tabBarIcon: ({ color, size }) => <Icon name="shopping-bag" color={color} size={size} />,
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileStack}
      options={{
        tabBarIcon: ({ color, size }) => <Icon name="user" color={color} size={size} />,
      }}
    />
  </Tab.Navigator>
);

// Main App Navigator
const AppNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MainApp" component={TabNavigator} />
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.white,
    borderTopWidth: 0,
    elevation: 10,
    height: 60,
    paddingBottom: 5,
  },
});

export default AppNavigator;
