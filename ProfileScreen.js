import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
  TextInput,
  Switch,
} from 'react-native';
import { auth } from '../firebase';

const avatars = [
  'https://i.pravatar.cc/150?img=3',
  'https://i.pravatar.cc/150?img=5',
  'https://i.pravatar.cc/150?img=7',
  'https://i.pravatar.cc/150?img=10',
  'https://i.pravatar.cc/150?img=12',
];

const quotes = [
  "Believe you can and you're halfway there.",
  "Do something today that your future self will thank you for.",
  "Success is not final, failure is not fatal.",
  "Keep going. Be all in.",
  "Dream it. Wish it. Do it.",
];

const ProfileScreen = () => {
  const user = auth.currentUser;

  const [avatar, setAvatar] = useState(avatars[0]);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.displayName || '');
  const [tempName, setTempName] = useState(name);
  const [modalVisible, setModalVisible] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [quote, setQuote] = useState('');

  useEffect(() => {
    setAvatar(avatars[Math.floor(Math.random() * avatars.length)]);
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  const handleEditPress = () => {
    setTempName(name);
    setEditing(true);
  };

  const handleSave = () => {
    setName(tempName.trim() || 'User');
    setEditing(false);
    Alert.alert('Profile Updated', 'Your name has been updated locally.');
  };

  const handleCancel = () => {
    setTempName(name);
    setEditing(false);
  };

  const handleLogout = () => {
    setModalVisible(true);
  };

  const confirmLogout = () => {
    setModalVisible(false);
    auth.signOut().catch(error => {
      Alert.alert('Logout Error', error.message);
    });
  };

  const toggleTheme = () => {
    setIsDarkTheme(prev => !prev);
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.info}>You are not logged in.</Text>
      </View>
    );
  }

  const accountCreated = new Date(user.metadata.creationTime).toDateString();

  return (
    <View style={[styles.container, isDarkTheme && styles.darkContainer]}>
      <Image source={{ uri: avatar }} style={styles.avatar} />

      <Text style={[styles.heading, isDarkTheme && styles.darkText]}>Welcome, {name}!</Text>

      <View style={styles.infoBox}>
        <Text style={[styles.infoLabel, isDarkTheme && styles.darkText]}>Name:</Text>
        {editing ? (
          <TextInput
            style={[styles.input, isDarkTheme && styles.darkInput]}
            value={tempName}
            onChangeText={setTempName}
            autoFocus
            maxLength={30}
            placeholder="Enter your name"
            placeholderTextColor="#999"
          />
        ) : (
          <Text style={[styles.infoText, isDarkTheme && styles.darkText]}>{name || 'Not set'}</Text>
        )}
      </View>

      <View style={styles.infoBox}>
        <Text style={[styles.infoLabel, isDarkTheme && styles.darkText]}>Account Created:</Text>
        <Text style={[styles.infoText, isDarkTheme && styles.darkText]}>{accountCreated}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={[styles.infoLabel, isDarkTheme && styles.darkText]}>User ID:</Text>
        <Text style={[styles.infoText, isDarkTheme && styles.darkText]}>{user.uid}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={[styles.infoLabel, isDarkTheme && styles.darkText]}>Theme:</Text>
        <Switch
          value={isDarkTheme}
          onValueChange={toggleTheme}
          trackColor={{ false: '#9c27b0', true: '#ce93d8' }}
          thumbColor={isDarkTheme ? '#ba68c8' : '#7b1fa2'}
        />
      </View>

      <View style={styles.quoteBox}>
        <Text style={styles.quoteText}>"{quote}"</Text>
      </View>

      {editing ? (
        <View style={styles.editButtonsRow}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure you want to logout?</Text>
            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalButton, { backgroundColor: '#9c27b0' }]}
                onPress={confirmLogout}
              >
                <Text style={styles.modalButtonText}>Yes</Text>
              </Pressable>

              <Pressable
                style={[styles.modalButton, { backgroundColor: '#ce93d8' }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa', // light cyan background for freshness (you can change this too if needed)
    alignItems: 'center',
    paddingTop: 40,
  },
  darkContainer: {
    backgroundColor: '#263238', // dark slate gray
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: '#9c27b0', // purple border around avatar (was green)
    marginBottom: 25,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 35,
    color: '#7b1fa2', // deep purple (was dark teal)
    textShadowColor: '#ce93d8',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  darkText: {
    color: '#b2dfdb',
  },
  infoBox: {
    flexDirection: 'row',
    marginBottom: 18,
    width: '85%',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ce93d8', // light purple (was light cyan)
    paddingBottom: 7,
  },
  infoLabel: {
    fontSize: 17,
    fontWeight: '700',
    color: '#6a1b9a', // purple (was dark cyan)
  },
  infoText: {
    fontSize: 17,
    color: '#4a148c', // very dark purple (was very dark teal)
    maxWidth: '60%',
    textAlign: 'right',
  },
  input: {
    fontSize: 17,
    color: '#4a148c',
    borderBottomWidth: 2,
    borderColor: '#9c27b0',
    width: '60%',
    paddingVertical: 4,
  },
  darkInput: {
    color: '#d1c4e9',
    borderColor: '#7b1fa2',
  },
  quoteBox: {
    marginVertical: 35,
    paddingHorizontal: 40,
    borderLeftWidth: 6,
    borderLeftColor: '#9c27b0',
  },
  quoteText: {
    fontSize: 20,
    fontStyle: 'italic',
    color: '#7b1fa2',
  },
  editButtonsRow: {
    flexDirection: 'row',
    marginTop: 25,
  },
  saveButton: {
    backgroundColor: '#9c27b0', // purple (was green)
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 28,
    marginRight: 18,
  },
  cancelButton: {
    backgroundColor: '#7b1fa2', // darker purple (was red)
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 28,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 17,
  },
  editButton: {
    marginTop: 38,
    backgroundColor: '#9c27b0',
    paddingVertical: 15,
    paddingHorizontal: 48,
    borderRadius: 32,
    elevation: 4,
  },
  editButtonText: {
    color: 'white',
    fontWeight: '800',
    fontSize: 19,
  },
  logoutButton: {
    marginTop: 45,
    backgroundColor: '#7b1fa2', // darker purple (was red)
    paddingVertical: 16,
    paddingHorizontal: 55,
    borderRadius: 38,
    elevation: 5,
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: '800',
    fontSize: 19,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: 290,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    elevation: 12,
  },
  modalText: {
    fontSize: 19,
    marginBottom: 23,
    textAlign: 'center',
    fontWeight: '600',
    color: '#222',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 6,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: '800',
    fontSize: 17,
  },
});

export default ProfileScreen;
