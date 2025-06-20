import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';  

const defaultCommunities = [
  {
    id: '1',
    name: 'Motivational Vibes 💪',
    description: 'Stay inspired with daily motivational quotes!',
  },
  {
    id: '2',
    name: 'Stress Relief 🌿',
    description: 'Relax, unwind, and share stress-busting tips.',
  },
  {
    id: '3',
    name: 'Funny Memes 😂',
    description: 'Your daily dose of laughs and memes!',
  },
  {
    id: '4',
    name: 'Academic Group 📚',
    description: 'Discuss homework, exams & academic doubts.',
  },
  {
    id: '5',
    name: 'Career Talk 🎯',
    description: 'Get career advice, resume tips, and more.',
  },
  {
    id: '6',
    name: 'Fitness Buddies 🏋️',
    description: 'Share your fitness journey and tips!',
  },
  {
    id: '7',
    name: 'Tech Explorers 💻',
    description: 'Explore coding, gadgets, and tech trends.',
  },
  {
    id: '8',
    name: 'Book Club 📖',
    description: 'Read, share, and discuss amazing books.',
  },
];

export default function Community({ onSelectCommunity }) {
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const navigation = useNavigation();  

  const handleSelect = (community) => {
    setSelectedCommunity(community);
    if (onSelectCommunity) {
      onSelectCommunity(community);
    }
    
    navigation.navigate('CommunityChat', { community });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.item,
        selectedCommunity?.id === item.id && styles.selectedItem,
      ]}
      onPress={() => handleSelect(item)}
    >
      <Text style={styles.itemTitle}>{item.name}</Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
      <View style={styles.joinContainer}>
        <Text
          style={[
            styles.joinText,
            selectedCommunity?.id === item.id && styles.joinedText,
          ]}
        >
          {selectedCommunity?.id === item.id ? 'Joined' : 'Join'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Community</Text>
      <FlatList
        data={defaultCommunities}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'purple',
  },
  item: {
    padding: 16,
    backgroundColor: '#f0f0f0',
    marginBottom: 12,
    borderRadius: 8,
    borderLeftWidth: 5,
    borderLeftColor: 'purple',
  },
  selectedItem: {
    backgroundColor: '#d1c4e9',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4a148c',
  },
  itemDescription: {
    marginTop: 6,
    fontSize: 14,
    color: '#555',
  },
  joinContainer: {
    marginTop: 8,
    alignItems: 'flex-end',
  },
  joinText: {
    fontSize: 14,
    color: 'purple',
    fontWeight: 'bold',
  },
  joinedText: {
    color: '#4a148c',
  },
});
