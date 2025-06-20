import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';

const moods = [
  { id: '1', name: 'Happy', icon: 'happy', color: '#4CAF50' },
  { id: '2', name: 'Calm', icon: 'leaf', color: '#2196F3' },
  { id: '3', name: 'Neutral', icon: 'help-circle', color: '#FFC107' },
  { id: '4', name: 'Anxious', icon: 'alert', color: '#FF9800' },
  { id: '5', name: 'Sad', icon: 'sad', color: '#9C27B0' },
];

const activities = [
  { id: '1', name: 'Meditation', icon: 'leaf' },
  { id: '2', name: 'Exercise', icon: 'fitness' },
  { id: '3', name: 'Reading', icon: 'book' },
  { id: '4', name: 'Music', icon: 'musical-notes' },
  { id: '5', name: 'Social', icon: 'people' },
  { id: '6', name: 'Sleep', icon: 'moon' },
];

export default function MoodTrackingScreen({ navigation }) {
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedActivities, setSelectedActivities] = useState([]);

  const toggleActivity = (activityId) => {
    if (selectedActivities.includes(activityId)) {
      setSelectedActivities(selectedActivities.filter(id => id !== activityId));
    } else {
      setSelectedActivities([...selectedActivities, activityId]);
    }
  };

  const saveMoodEntry = () => {
    if (!selectedMood) return;
    
    // Here you would save the mood entry to Firebase
    console.log('Saving mood entry:', {
      mood: selectedMood,
      activities: selectedActivities,
      timestamp: new Date(),
    });

    // Reset selections
    setSelectedMood(null);
    setSelectedActivities([]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>How are you feeling?</Text>
        <Text style={styles.subtitle}>Select your current mood</Text>
      </View>

      <View style={styles.moodsContainer}>
        {moods.map(mood => (
          <TouchableOpacity
            key={mood.id}
            style={[
              styles.moodButton,
              selectedMood?.id === mood.id && { backgroundColor: mood.color }
            ]}
            onPress={() => setSelectedMood(mood)}
          >
            <Ionicons 
              name={mood.icon} 
              size={32} 
              color={selectedMood?.id === mood.id ? '#FFFFFF' : mood.color} 
            />
            <Text style={[
              styles.moodText,
              selectedMood?.id === mood.id && { color: '#FFFFFF' }
            ]}>
              {mood.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedMood && (
        <>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What helped you today?</Text>
            <Text style={styles.sectionSubtitle}>Select activities that improved your mood</Text>
            
            <View style={styles.activitiesContainer}>
              {activities.map(activity => (
                <TouchableOpacity
                  key={activity.id}
                  style={[
                    styles.activityButton,
                    selectedActivities.includes(activity.id) && styles.selectedActivity
                  ]}
                  onPress={() => toggleActivity(activity.id)}
                >
                  <Ionicons 
                    name={activity.icon} 
                    size={24} 
                    color={selectedActivities.includes(activity.id) ? '#FFFFFF' : colors.primary} 
                  />
                  <Text style={[
                    styles.activityText,
                    selectedActivities.includes(activity.id) && { color: '#FFFFFF' }
                  ]}>
                    {activity.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity 
            style={styles.saveButton}
            onPress={saveMoodEntry}
          >
            <Text style={styles.saveButtonText}>Save Mood Entry</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  title: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
  },
  moodsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  moodButton: {
    width: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    margin: spacing.sm,
    ...shadows.sm,
  },
  moodText: {
    ...typography.body,
    marginLeft: spacing.md,
  },
  section: {
    padding: spacing.lg,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  sectionSubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  activitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  activityButton: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  selectedActivity: {
    backgroundColor: colors.primary,
  },
  activityText: {
    ...typography.body,
    marginLeft: spacing.md,
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    margin: spacing.lg,
    alignItems: 'center',
  },
  saveButtonText: {
    ...typography.body,
    color: colors.background,
    fontWeight: 'bold',
  },
}); 