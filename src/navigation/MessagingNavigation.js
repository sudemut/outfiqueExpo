// src/navigation/MessagingNavigation.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MessagingScreen from '../screens/messaging/MessagingScreen';
import ConversationDetailsScreen from '../screens/messaging/ConversationDetailsScreen';
import NewMessageScreen from '../screens/messaging/NewMessageScreen';

const Stack = createStackNavigator();

const MessagingNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Messages"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'white' },
      }}
    >
      <Stack.Screen name="Messages" component={MessagingScreen} />
      <Stack.Screen name="ConversationDetails" component={ConversationDetailsScreen} />
      <Stack.Screen name="NewMessage" component={NewMessageScreen} />
    </Stack.Navigator>
  );
};

export default MessagingNavigation;