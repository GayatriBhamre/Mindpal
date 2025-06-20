import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';
import { audioTracks } from '../config/audio';

export default function MusicScreen({ navigation }) {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(null);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const playSound = async (track) => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync(track.audio());
      setSound(newSound);
      setSelectedTrack(track);
      setIsPlaying(true);
      await newSound.playAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const togglePlayPause = async () => {
    if (!sound) return;

    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  const stopSound = async () => {
    if (sound) {
      try {
        await sound.stopAsync();
        await sound.unloadAsync();
        setSound(null);
        setIsPlaying(false);
        setSelectedTrack(null);
      } catch (error) {
        console.error('Error stopping sound:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/meditation-bg.jpg')}
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
          <Text style={styles.title}>Relaxing Sounds</Text>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Welcome to Relaxing Sounds</Text>
            <Text style={styles.infoDescription}>
              Choose from a variety of calming sounds and guided meditations
            </Text>
          </View>

          <View style={styles.tracksContainer}>
            {audioTracks.map((track) => (
              <TouchableOpacity
                key={track.id}
                style={[
                  styles.trackCard,
                  selectedTrack?.id === track.id && styles.selectedTrack
                ]}
                onPress={() => playSound(track)}
              >
                <View style={styles.trackHeader}>
                  <Text style={styles.trackTitle}>{track.title}</Text>
                  <View style={styles.trackMeta}>
                    <Text style={styles.trackDuration}>{track.duration}</Text>
                    <Ionicons 
                      name={track.type === 'voice' ? 'mic' : 'musical-notes'} 
                      size={20} 
                      color={colors.primary} 
                    />
                  </View>
                </View>
                <Text style={styles.trackDescription}>{track.description}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {selectedTrack && (
            <View style={styles.playerContainer}>
              <Text style={styles.nowPlaying}>Now Playing: {selectedTrack.title}</Text>
              <View style={styles.controls}>
                <TouchableOpacity 
                  style={styles.controlButton}
                  onPress={stopSound}
                >
                  <Ionicons name="stop" size={24} color={colors.white} />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.controlButton}
                  onPress={togglePlayPause}
                >
                  <Ionicons 
                    name={isPlaying ? "pause" : "play"} 
                    size={32} 
                    color={colors.white} 
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}

          <View style={styles.tipsContainer}>
            <Text style={styles.tipsTitle}>Tips for Better Relaxation</Text>
            <View style={styles.tipCard}>
              <Ionicons name="bulb" size={24} color={colors.primary} />
              <Text style={styles.tipText}>
                Find a quiet space where you won't be disturbed
              </Text>
            </View>
            <View style={styles.tipCard}>
              <Ionicons name="bulb" size={24} color={colors.primary} />
              <Text style={styles.tipText}>
                Use headphones for better sound quality
              </Text>
            </View>
            <View style={styles.tipCard}>
              <Ionicons name="bulb" size={24} color={colors.primary} />
              <Text style={styles.tipText}>
                Adjust the volume to a comfortable level
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
  infoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
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
  tracksContainer: {
    marginBottom: spacing.lg,
  },
  trackCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  selectedTrack: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  trackHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trackTitle: {
    ...typography.h3,
    color: colors.text,
  },
  trackMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trackDuration: {
    ...typography.caption,
    color: colors.textSecondary,
    marginRight: spacing.sm,
  },
  trackDescription: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  playerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.md,
  },
  nowPlaying: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButton: {
    padding: spacing.md,
    marginHorizontal: spacing.sm,
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