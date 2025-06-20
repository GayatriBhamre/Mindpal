import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, StackActions } from '@react-navigation/native';

const Chatbot = () => {
  const [inputData, setInputData] = useState('');
  const [messages, setMessages] = useState([
    { message: 'Hi there! 😊 How can I help you today?', sender: 'bot' },
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  const navigation = useNavigation();

  const API_KEY = 'AIzaSyCdd7gQv0GqJgSQeTLfS02ZwFD7EqK0qjY';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

  // Load chat from local storage on startup
  useEffect(() => {
    const loadChat = async () => {
      const stored = await AsyncStorage.getItem('chatHistory');
      if (stored) setMessages(JSON.parse(stored));
    };
    loadChat();
  }, []);

  // Save chat every update
  useEffect(() => {
    AsyncStorage.setItem('chatHistory', JSON.stringify(messages));
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const getData = async () => {
    if (!inputData.trim()) return;
    const userMsg = inputData;
    setMessages((prev) => [...prev, { message: userMsg, sender: 'user' }]);
    setInputData('');
    setLoading(true);
    Keyboard.dismiss();

    try {
      const { data } = await axios.post(
        url,
        { contents: [{ parts: [{ text: userMsg }] }] },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const answer =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't understand that.";

      setMessages((prev) => [...prev, { message: answer, sender: 'bot' }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { message: '❌ Oops! Network error. Try again.', sender: 'bot' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = async () => {
    const defaultMsg = [
      { message: 'Hi there! 😊 How can I help you today?', sender: 'bot' },
    ];
    setMessages(defaultMsg);
    await AsyncStorage.setItem('chatHistory', JSON.stringify(defaultMsg));
  };

  const handleBackPress = () => {
    if (navigation.canGoBack()) navigation.goBack();
    else navigation.dispatch(StackActions.replace('LandingPage'));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress}>
          <MaterialIcons name="arrow-back" size={24} color="#673AB7" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Your Buddy! 🤖💬</Text>
      </View>

      {/* Chat body */}
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.chatContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((msg, i) => (
          <View
            key={i}
            style={[
              styles.message,
              msg.sender === 'user' ? styles.userMsg : styles.botMsg,
            ]}
          >
            <Text style={{ color: msg.sender === 'user' ? '#fff' : '#000' }}>
              {msg.message}
            </Text>
          </View>
        ))}
        {loading && <ActivityIndicator size="small" color="#673AB7" />}
      </ScrollView>

      {/* Input + clear */}
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={clearChat} style={styles.clearBtn}>
          <Text style={styles.clearBtnText}>🗑️</Text>
        </TouchableOpacity>

        <TextInput
          placeholder="Type your message..."
          value={inputData}
          onChangeText={setInputData}
          onSubmitEditing={getData}
          returnKeyType="send"
          multiline
          style={styles.input}
        />

        <TouchableOpacity style={styles.sendBtn} onPress={getData}>
          <MaterialIcons name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  headerText: {
    fontSize: 20,
    color: '#673AB7',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  chatContent: {
    padding: 16,
    paddingBottom: 80,
  },
  message: {
    marginBottom: 10,
    padding: 12,
    borderRadius: 10,
    maxWidth: '85%',
  },
  userMsg: {
    backgroundColor: '#673AB7',
    alignSelf: 'flex-end',
  },
  botMsg: {
    backgroundColor: '#f0f0f0',
    alignSelf: 'flex-start',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#eee',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    fontSize: 16,
    maxHeight: 120,
  },
  sendBtn: {
    backgroundColor: '#673AB7',
    borderRadius: 25,
    padding: 10,
    marginLeft: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearBtn: {
    marginRight: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearBtnText: {
    fontSize: 20,
  },
});

export default Chatbot;
