import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';

export default function MeditationScreen({ navigation }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(5);

  const durations = [5, 10, 15, 20];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Meditation</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Guided Meditation</Text>
          <Text style={styles.cardDescription}>
            Find your inner peace with our guided meditation sessions
          </Text>
          
          <View style={styles.durationContainer}>
            <Text style={styles.durationTitle}>Select Duration</Text>
            <View style={styles.durationButtons}>
              {durations.map((duration) => (
                <TouchableOpacity
                  key={duration}
                  style={[
                    styles.durationButton,
                    selectedDuration === duration && styles.selectedDuration
                  ]}
                  onPress={() => setSelectedDuration(duration)}
                >
                  <Text style={[
                    styles.durationText,
                    selectedDuration === duration && styles.selectedDurationText
                  ]}>
                    {duration} min
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity 
            style={styles.playButton}
            onPress={() => setIsPlaying(!isPlaying)}
          >
            <Ionicons 
              name={isPlaying ? "pause" : "play"} 
              size={40} 
              color="#FFFFFF" 
            />
          </TouchableOpacity>
        </View>

        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>Meditation Tips</Text>
          <View style={styles.tipCard}>
            <Ionicons name="bulb" size={24} color={colors.primary} />
            <Text style={styles.tipText}>
              Find a quiet and comfortable place to sit
            </Text>
          </View>
          <View style={styles.tipCard}>
            <Ionicons name="bulb" size={24} color={colors.primary} />
            <Text style={styles.tipText}>
              Focus on your breath and let thoughts come and go
            </Text>
          </View>
          <View style={styles.tipCard}>
            <Ionicons name="bulb" size={24} color={colors.primary} />
            <Text style={styles.tipText}>
              Start with shorter sessions and gradually increase duration
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    paddingTop: spacing.xl,
    backgroundColor: colors.surface,
    ...shadows.sm,
  },
  backButton: {
    marginRight: spacing.md,
  },
  title: {
    ...typography.h1,
    color: colors.text,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.md,
    alignItems: 'center',
  },
  cardTitle: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  cardDescription: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  durationContainer: {
    width: '100%',
    marginBottom: spacing.xl,
  },
  durationTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  durationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  durationButton: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.background,
    ...shadows.sm,
  },
  selectedDuration: {
    backgroundColor: colors.primary,
  },
  durationText: {
    ...typography.body,
    color: colors.text,
  },
  selectedDurationText: {
    color: colors.background,
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.lg,
  },
  tipsContainer: {
    marginTop: spacing.lg,
  },
  tipsTitle: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.md,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
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