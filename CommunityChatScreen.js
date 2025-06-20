import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { db, auth } from '../firebase'; 
import {
  collection,
  query,
  orderBy,
  addDoc,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';

export default function CommunityChatScreen({ route }) {
  const { community } = route.params;  

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const q = query(
      collection(db, 'communityChats', community.id, 'messages'),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push({ id: doc.id, ...doc.data() });
      });
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [community.id]);

  const sendMessage = async () => {
    if (input.trim() === '') return;
    await addDoc(collection(db, 'communityChats', community.id, 'messages'), {
      text: input,
      createdAt: serverTimestamp(),
      userId: auth.currentUser.uid,
      userEmail: auth.currentUser.email,
    });
    setInput('');
  };

  const renderItem = ({ item }) => (
    <View style={styles.messageContainer}>
      <Text style={styles.messageUser}>{item.userEmail}</Text>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{community.name}</Text>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.messageList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
          style={styles.input}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={{ color: 'white' }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', color: 'purple', marginBottom: 10 },
  messageList: { flex: 1, marginBottom: 10 },
  messageContainer: { padding: 8, backgroundColor: '#f0e6ff', borderRadius: 5, marginBottom: 6 },
  messageUser: { fontWeight: 'bold', color: '#4a148c', marginBottom: 3 },
  messageText: { fontSize: 16, color: '#333' },
  inputContainer: { flexDirection: 'row', alignItems: 'center' },
  input: { flex: 1, borderColor: 'purple', borderWidth: 1, borderRadius: 20, paddingHorizontal: 15, height: 40 },
  sendButton: { marginLeft: 8, backgroundColor: 'purple', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 20 },
});
