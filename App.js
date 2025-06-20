import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Text, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from './firebase';
import { colors, typography } from './theme';

// Screens
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import CommunityScreen from './screens/CommunityScreen';
import ProfileScreen from './screens/ProfileScreen';
import JournalScreen from './screens/JournalScreen';
import CommunityChatScreen from './screens/CommunityChatScreen';
import MoodTrackingScreen from './screens/MoodTrackingScreen';
import RelaxingActivitiesScreen from './screens/RelaxingActivitiesScreen';
import FeelTheViewScreen from './screens/FeelTheViewScreen';
import MeditationScreen from './screens/MeditationScreen';
import BreathingScreen from './screens/BreathingScreen';
import YogaScreen from './screens/YogaScreen';
import YogaSessionScreen from './screens/YogaSessionScreen';
import MusicScreen from './screens/MusicScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Community':
              iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
              break;
            case 'Chatbot':
              iconName = focused ? 'chatbox' : 'chatbox-outline';
              break;
            case 'Journal':
              iconName = focused ? 'book' : 'book-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'alert-circle-outline'; // Default icon
              break;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopWidth: 1,
          borderTopColor: colors.surface,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          ...typography.caption,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Chatbot" component={ChatScreen} />
      <Tab.Screen name="Journal" component={JournalScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("User Auth State Changed:", user); // Debugging user data
      setUser(user);
      setLoading(false);
    });

    return unsubscribe; // Clean up on component unmount
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen name="CommunityChat" component={CommunityChatScreen} />
          </>
        )}

        {/* Global accessible screens */}
        <Stack.Screen name="MoodTracking" component={MoodTrackingScreen} />
        <Stack.Screen name="RelaxingActivities" component={RelaxingActivitiesScreen} />
        <Stack.Screen name="FeelTheView" component={FeelTheViewScreen} />
        <Stack.Screen name="Yoga" component={YogaScreen} />
        <Stack.Screen name="YogaSession" component={YogaSessionScreen} />
        <Stack.Screen name="Music" component={MusicScreen} />
        <Stack.Screen name="Meditation" component={MeditationScreen} />
        <Stack.Screen name="Breathing" component={BreathingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
