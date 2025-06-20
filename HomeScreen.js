import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      {/* Logo and Welcome Section */}
      <View style={styles.logoSection}>
        <Image 
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.welcomeText}>Welcome to MindPal</Text>
        <Text style={styles.tagline}>Feeling stressed? Here's the solution</Text>
      </View>

      {/* Main Features Section */}
      <View style={styles.featuresSection}>
        <TouchableOpacity 
          style={styles.featureCard}
          onPress={() => navigation.navigate('RelaxingActivities')}
        >
          <View style={styles.featureIconContainer}>
            <Ionicons name="heart-outline" size={32} color={colors.primary} />
          </View>
          <Text style={styles.featureTitle}>Relaxing Activities</Text>
          <Text style={styles.featureDescription}>Find peace through guided exercises</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.featureCard}
          onPress={() => navigation.navigate('Community')}
        >
          <View style={styles.featureIconContainer}>
            <Ionicons name="people-outline" size={32} color={colors.primary} />
          </View>
          <Text style={styles.featureTitle}>Community</Text>
          <Text style={styles.featureDescription}>Connect with supportive peers</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.featureCard}
          onPress={() => navigation.navigate('MoodTracking')}
        >
          <View style={styles.featureIconContainer}>
            <Ionicons name="happy-outline" size={32} color={colors.primary} />
          </View>
          <Text style={styles.featureTitle}>Mood Tracking</Text>
          <Text style={styles.featureDescription}>Track and understand your emotions</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.featureCard}
          onPress={() => navigation.navigate('FeelTheView')} // <-- Renamed screen here
        >
          <View style={styles.featureIconContainer}>
            <Ionicons name="cube-outline" size={32} color={colors.primary} />
          </View>
          <Text style={styles.featureTitle}>Feel The View</Text>
          <Text style={styles.featureDescription}>Experience immersive relaxation</Text>
        </TouchableOpacity>
      </View>

      {/* Daily Tip Section */}
      <View style={styles.tipSection}>
        <Text style={styles.tipTitle}>Daily Wellness Tip</Text>
        <Text style={styles.tipText}>
          Take a moment to breathe deeply. Inhale for 4 seconds, hold for 4, exhale for 4.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  logoSection: {
    alignItems: 'center',
    padding: spacing.xl,
    paddingTop: spacing.xxl,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: spacing.md,
  },
  welcomeText: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  tagline: {
    ...typography.body,
    color: colors.textSecondary,
  },
  featuresSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: spacing.lg,
  },
  featureCard: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.sm,
  },
  featureIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  featureTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  featureDescription: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  tipSection: {
    backgroundColor: colors.surface,
    margin: spacing.lg,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    ...shadows.sm,
  },
  tipTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  tipText: {
    ...typography.body,
    color: colors.textSecondary,
  },
});
