import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';

export default function YogaScreen({ navigation }) {
  const [selectedSession, setSelectedSession] = useState(null);

  const sessions = [
    {
      id: '1',
      title: 'Morning Flow',
      duration: '15 min',
      difficulty: 'Beginner',
      description: 'Start your day with gentle movements',
    },
    {
      id: '2',
      title: 'Stress Relief',
      duration: '20 min',
      difficulty: 'Intermediate',
      description: 'Release tension and find calm',
    },
    {
      id: '3',
      title: 'Evening Relaxation',
      duration: '10 min',
      difficulty: 'Beginner',
      description: 'Wind down before bed',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Virtual Yoga</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Welcome to Virtual Yoga</Text>
          <Text style={styles.infoDescription}>
            Choose a session that fits your needs and follow along with our guided instructions
          </Text>
        </View>

        <View style={styles.sessionsContainer}>
          {sessions.map((session) => (
            <TouchableOpacity
              key={session.id}
              style={[
                styles.sessionCard,
                selectedSession === session.id && styles.selectedSession
              ]}
              onPress={() => setSelectedSession(session.id)}
            >
              <View style={styles.sessionHeader}>
                <Text style={styles.sessionTitle}>{session.title}</Text>
                <View style={styles.sessionMeta}>
                  <Text style={styles.sessionDuration}>{session.duration}</Text>
                  <Text style={styles.sessionDifficulty}>{session.difficulty}</Text>
                </View>
              </View>
              <Text style={styles.sessionDescription}>{session.description}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedSession && (
          <TouchableOpacity 
            style={styles.startButton}
            onPress={() => navigation.navigate('YogaSession', { 
              session: sessions.find(s => s.id === selectedSession)
            })}
          >
            <Text style={styles.startButtonText}>Start Session</Text>
          </TouchableOpacity>
        )}

        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>Yoga Tips</Text>
          <View style={styles.tipCard}>
            <Ionicons name="bulb" size={24} color={colors.primary} />
            <Text style={styles.tipText}>
              Find a quiet space with enough room to move
            </Text>
          </View>
          <View style={styles.tipCard}>
            <Ionicons name="bulb" size={24} color={colors.primary} />
            <Text style={styles.tipText}>
              Use a yoga mat or comfortable surface
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
  infoCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.md,
  },
  infoTitle: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  infoDescription: {
    ...typography.body,
    color: colors.textSecondary,
  },
  sessionsContainer: {
    marginBottom: spacing.lg,
  },
  sessionCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  selectedSession: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sessionTitle: {
    ...typography.h3,
    color: colors.text,
  },
  sessionMeta: {
    flexDirection: 'row',
  },
  sessionDuration: {
    ...typography.caption,
    color: colors.textSecondary,
    marginRight: spacing.sm,
  },
  sessionDifficulty: {
    ...typography.caption,
    color: colors.primary,
  },
  sessionDescription: {
    ...typography.body,
    color: colors.textSecondary,
  },
  startButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.xl,
    ...shadows.md,
  },
  startButtonText: {
    ...typography.h3,
    color: colors.background,
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