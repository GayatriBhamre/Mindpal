import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';

export default function RelaxingActivitiesScreen({ navigation }) {
  const activities = [
    {
      id: '1',
      title: 'Meditation',
      description: 'Find your inner peace',
      icon: 'leaf',
      color: colors.primary,
      screen: 'Meditation',
    },
    {
      id: '2',
      title: 'Breathing',
      description: 'Calm your mind',
      icon: 'leaf',
      color: colors.primary,
      screen: 'Breathing',
    },
    {
      id: '3',
      title: 'Virtual Yoga',
      description: 'Gentle movements for relaxation',
      icon: 'fitness',
      color: colors.primary,
      screen: 'Yoga',
    },
    {
      id: '4',
      title: 'Nature Sounds',
      description: 'Relaxing ambient sounds',
      icon: 'musical-notes',
      color: colors.primary,
      screen: 'Music',
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
        <Text style={styles.title}>Relaxing Activities</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Choose Your Activity</Text>
          <Text style={styles.infoDescription}>
            Select an activity to help you relax and find your inner peace
          </Text>
        </View>

        <View style={styles.activitiesContainer}>
          {activities.map((activity) => (
            <TouchableOpacity
              key={activity.id}
              style={[styles.activityCard, { backgroundColor: activity.color }]}
              onPress={() => navigation.navigate(activity.screen)}
            >
              <View style={styles.activityIconContainer}>
                <Ionicons name={activity.icon} size={40} color="#FFFFFF" />
              </View>
              <Text style={styles.activityTitle}>{activity.title}</Text>
              <Text style={styles.activityDescription}>{activity.description}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>Tips for Relaxation</Text>
          <View style={styles.tipCard}>
            <Ionicons name="bulb" size={24} color={colors.primary} />
            <Text style={styles.tipText}>
              Find a quiet and comfortable space
            </Text>
          </View>
          <View style={styles.tipCard}>
            <Ionicons name="bulb" size={24} color={colors.primary} />
            <Text style={styles.tipText}>
              Set aside dedicated time for relaxation
            </Text>
          </View>
          <View style={styles.tipCard}>
            <Ionicons name="bulb" size={24} color={colors.primary} />
            <Text style={styles.tipText}>
              Focus on your breathing and let go of distractions
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
  activitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  activityCard: {
    width: '48%',
    height: 180,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.md,
  },
  activityIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  activityTitle: {
    ...typography.h3,
    color: colors.background,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  activityDescription: {
    ...typography.caption,
    color: colors.background,
    textAlign: 'center',
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