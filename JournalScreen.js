import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ActivityIndicator, Alert } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';
import { auth, db } from '../firebase';
import { collection, addDoc, query, where, getDocs, orderBy, serverTimestamp, limit, updateDoc, doc, deleteDoc } from 'firebase/firestore';

const moods = [
  { id: 'happy', name: 'Happy', icon: 'emoticon-happy-outline', color: '#4CAF50' },
  { id: 'calm', name: 'Calm', icon: 'emoticon-outline', color: '#2196F3' },
  { id: 'neutral', name: 'Neutral', icon: 'emoticon-neutral-outline', color: '#FFC107' },
  { id: 'anxious', name: 'Anxious', icon: 'emoticon-sad-outline', color: '#FF9800' },
  { id: 'sad', name: 'Sad', icon: 'emoticon-cry-outline', color: '#9C27B0' },
];

export default function JournalScreen({ navigation }) {
  const [entry, setEntry] = useState({ title: '', content: '', mood: null });
  const [entries, setEntries] = useState([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingEntryId, setEditingEntryId] = useState(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadEntries();
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  const loadEntries = async () => {
    try {
      setLoading(true);
      const entriesRef = collection(db, 'journalEntries');
      const q = query(
        entriesRef,
        where('userId', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc'),
        limit(10)
      );
      const querySnapshot = await getDocs(q);
      const entriesList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEntries(entriesList);
    } catch (error) {
      console.error('Error loading entries:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveEntry = async () => {
    if (!entry.title.trim() || !entry.content.trim() || !entry.mood) return;

    try {
      setSaving(true);
      const entriesRef = collection(db, 'journalEntries');

      if (editingEntryId) {
        const entryDocRef = doc(db, 'journalEntries', editingEntryId);
        await updateDoc(entryDocRef, {
          title: entry.title.trim(),
          content: entry.content.trim(),
          mood: entry.mood,
          timestamp: serverTimestamp(),
        });
        setEditingEntryId(null);
      } else {
        await addDoc(entriesRef, {
          title: entry.title.trim(),
          content: entry.content.trim(),
          mood: entry.mood,
          userId: auth.currentUser.uid,
          timestamp: serverTimestamp(),
        });
      }

      setEntry({ title: '', content: '', mood: null });
      loadEntries();
    } catch (error) {
      console.error('Error saving entry:', error);
    } finally {
      setSaving(false);
    }
  };

  const editEntry = (item) => {
    setEntry({ title: item.title, content: item.content, mood: item.mood });
    setEditingEntryId(item.id);
  };

  const deleteEntry = async (id) => {
    Alert.alert(
      "Delete Entry",
      "Are you sure you want to delete this entry?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'journalEntries', id));
              loadEntries();
            } catch (error) {
              console.error('Error deleting entry:', error);
            }
          }
        }
      ]
    );
  };

  const renderEntry = ({ item }) => (
    <View style={styles.entryCard}>
      <View style={styles.entryHeader}>
        <Text style={styles.entryTitle}>{item.title}</Text>
        <MaterialCommunityIcons 
          name={moods.find(m => m.id === item.mood)?.icon} 
          size={24} 
          color={moods.find(m => m.id === item.mood)?.color} 
        />
      </View>
      <Text style={styles.entryText}>{item.content}</Text>
      <Text style={styles.entryDate}>
        {item.timestamp?.toDate().toLocaleDateString()}
      </Text>
      <View style={styles.entryActions}>
        <TouchableOpacity onPress={() => editEntry(item)} style={styles.actionButton}>
          <Ionicons name="create-outline" size={20} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteEntry(item.id)} style={styles.actionButton}>
          <Ionicons name="trash-outline" size={20} color={colors.error} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Journal</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={entry.title}
          onChangeText={(text) => setEntry({ ...entry, title: text })}
          placeholder="Title"
          placeholderTextColor={colors.textSecondary}
        />
        <TextInput
          style={[styles.input, styles.contentInput]}
          value={entry.content}
          onChangeText={(text) => setEntry({ ...entry, content: text })}
          placeholder="Write your thoughts..."
          placeholderTextColor={colors.textSecondary}
          multiline
        />
        <View style={styles.moodContainer}>
          {moods.map((mood) => (
            <TouchableOpacity
              key={mood.id}
              style={[styles.moodButton, entry.mood === mood.id && { backgroundColor: mood.color }]}
              onPress={() => setEntry({ ...entry, mood: mood.id })}
            >
              <MaterialCommunityIcons 
                name={mood.icon} 
                size={24} 
                color={entry.mood === mood.id ? '#FFFFFF' : mood.color} 
              />
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={saveEntry}
          disabled={saving}
        >
          <Ionicons name="save" size={24} color={colors.background} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={entries}
        renderItem={renderEntry}
        keyExtractor={item => item.id}
        initialNumToRender={5}
        removeClippedSubviews={true}
        onRefresh={loadEntries}
        refreshing={loading}
        contentContainerStyle={styles.entriesList}
      />

      {saving && <ActivityIndicator size="large" color={colors.primary} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.lg,
    paddingTop: spacing.xl,
    backgroundColor: colors.surface,
    ...shadows.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: spacing.md,
  },
  title: {
    ...typography.h1,
    color: colors.text,
  },
  inputContainer: {
    padding: spacing.lg,
    backgroundColor: colors.surface,
    ...shadows.sm,
  },
  input: {
    ...typography.body,
    color: colors.text,
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  contentInput: {
    minHeight: 100,
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  moodButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    ...shadows.sm,
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  entriesList: {
    padding: spacing.lg,
  },
  entryCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  entryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  entryText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  entryDate: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  entryActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: spacing.md,
  },
  actionButton: {
    marginLeft: spacing.md,
  },
});
