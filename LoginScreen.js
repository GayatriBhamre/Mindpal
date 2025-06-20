import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { auth } from "../firebase"; 
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [secureText, setSecureText] = useState(true);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in!");
      
      // ✅ FIX: Reset stack and navigate to MainTabs
      navigation.reset({
        index: 0,
        routes: [{ name: "MainTabs" }],
      });

    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage(error.message); 
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={secureText}
        />
        <TouchableOpacity onPress={() => setSecureText(!secureText)}>
          <Text style={styles.toggleText}>{secureText ? "Show" : "Hide"}</Text>
        </TouchableOpacity>
      </View>
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.registerLink}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.registerText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f9", 
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#5c0c8e", 
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 50,
    borderColor: "#5c0c8e", 
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 15,
    backgroundColor: "#fff", 
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    marginBottom: 15,
  },
  toggleText: {
    color: "#5c0c8e",
    marginLeft: 10,
    fontWeight: "bold",
  },
  button: {
    width: "80%",
    padding: 15,
    backgroundColor: "#5c0c8e", 
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerLink: {
    marginTop: 20,
  },
  registerText: {
    color: "#5c0c8e", 
    fontSize: 16,
  },
  errorText: {
    color: "red", 
    marginBottom: 10,
  },
});

export default LoginScreen;
