import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Animated } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';

export default function BreathingScreen({ navigation }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [breathPhase, setBreathPhase] = useState('inhale');
  const scale = new Animated.Value(1);

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        if (breathPhase === 'inhale') {
          Animated.timing(scale, {
            toValue: 1.5,
            duration: 4000,
            useNativeDriver: true,
          }).start(() => {
            setBreathPhase('hold');
          });
        } else if (breathPhase === 'hold') {
          setTimeout(() => {
            setBreathPhase('exhale');
          }, 4000);
        } else if (breathPhase === 'exhale') {
          Animated.timing(scale, {
            toValue: 1,
            duration: 4000,
            useNativeDriver: true,
          }).start(() => {
            setBreathPhase('inhale');
          });
        }
      }, 4000);
    }

    return () => clearInterval(timer);
  }, [isPlaying, breathPhase]);

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/breathing-bg.jpg')}
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
          <Text style={styles.title}>Breathing Exercise</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.instructions}>
            <Text style={styles.instructionText}>
              {breathPhase === 'inhale' ? 'Breathe In' : 
               breathPhase === 'hold' ? 'Hold' : 'Breathe Out'}
            </Text>
            <Text style={styles.durationText}>4 seconds</Text>
          </View>

          <Animated.View style={[styles.circle, { transform: [{ scale }] }]} />

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
              {isPlaying ? "Pause" : "Start"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>Breathing Tips</Text>
          <View style={styles.tipCard}>
            <Ionicons name="bulb" size={24} color={colors.primary} />
            <Text style={styles.tipText}>
              Sit in a comfortable position with your back straight
            </Text>
          </View>
          <View style={styles.tipCard}>
            <Ionicons name="bulb" size={24} color={colors.primary} />
            <Text style={styles.tipText}>
              Breathe deeply into your belly, not just your chest
            </Text>
          </View>
          <View style={styles.tipCard}>
            <Ionicons name="bulb" size={24} color={colors.primary} />
            <Text style={styles.tipText}>
              Focus on the sensation of your breath
            </Text>
          </View>
        </View>
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  instructions: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  instructionText: {
    ...typography.h2,
    color: colors.white,
    marginBottom: spacing.sm,
  },
  durationText: {
    ...typography.body,
    color: colors.white,
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 2,
    borderColor: colors.white,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    marginTop: spacing.xl,
    ...shadows.md,
  },
  playButtonText: {
    ...typography.h3,
    color: colors.white,
    marginLeft: spacing.md,
  },
  tipsContainer: {
    padding: spacing.lg,
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