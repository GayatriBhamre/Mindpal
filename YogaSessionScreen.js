import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';

export default function YogaSessionScreen({ route, navigation }) {
  const { session } = route.params;
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/yoga-bg.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <View style={styles.overlay}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.title}>{session.title}</Text>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.sessionInfo}>
            <View style={styles.metaContainer}>
              <View style={styles.metaItem}>
                <Ionicons name="time-outline" size={20} color={colors.primary} />
                <Text style={styles.metaText}>{session.duration}</Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons name="fitness-outline" size={20} color={colors.primary} />
                <Text style={styles.metaText}>{session.difficulty}</Text>
              </View>
            </View>

            <Text style={styles.description}>{session.description}</Text>
          </View>

          <View style={styles.controls}>
            <TouchableOpacity 
              style={styles.playButton}
              onPress={() => setIsPlaying(!isPlaying)}
            >
              <Ionicons 
                name={isPlaying ? "pause" : "play"} 
                size={32} 
                color={colors.white} 
              />
              <Text style={styles.playButtonText}>
                {isPlaying ? "Pause Session" : "Start Session"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tipsContainer}>
            <Text style={styles.tipsTitle}>Tips for Your Practice</Text>
            <View style={styles.tipCard}>
              <Ionicons name="bulb" size={24} color={colors.primary} />
              <Text style={styles.tipText}>
                Find a quiet, comfortable space with enough room to move
              </Text>
            </View>
            <View style={styles.tipCard}>
              <Ionicons name="bulb" size={24} color={colors.primary} />
              <Text style={styles.tipText}>
                Use a yoga mat or soft surface for comfort
              </Text>
            </View>
            <View style={styles.tipCard}>
              <Ionicons name="bulb" size={24} color={colors.primary} />
              <Text style={styles.tipText}>
                Listen to your body and modify poses as needed
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    paddingTop: spacing.xl,
    backgroundColor: 'transparent',
  },
  backButton: {
    marginRight: spacing.md,
  },
  title: {
    ...typography.h1,
    color: colors.white,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  sessionInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.md,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    ...typography.body,
    color: colors.text,
    marginLeft: spacing.sm,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  controls: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    ...shadows.md,
  },
  playButtonText: {
    ...typography.h3,
    color: colors.white,
    marginLeft: spacing.md,
  },
  tipsContainer: {
    marginBottom: spacing.lg,
  },
  tipsTitle: {
    ...typography.h2,
    color: colors.white,
    marginBottom: spacing.md,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  tipText: {
    ...typography.body,
    color: colors.text,
    marginLeft: spacing.md,
    flex: 1,
  },
}); 