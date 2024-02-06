import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StudentLogin = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async () => {
    try {
      const storedStudents = await AsyncStorage.getItem('student_registration');
      if (storedStudents) {
        const studentsArray = JSON.parse(storedStudents);
        const matchingStudent = studentsArray.find(
          (student) => student.email === email && student.password === password
        );
  
        if (matchingStudent) {
          Alert.alert('Login Successful!');
          navigation.navigate('WelcomePage', { studentName: matchingStudent.name });
        } else {
          Alert.alert('Invalid email or password');
        }
      } else {
        Alert.alert('No registered students found. Please register first.');
      }
    } catch (error) {
      Alert.alert('An error occurred');
      console.error(error);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('StudentRegistration')}>
        <Text style={styles.registerButton}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'blue',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  registerButton: {
    marginTop: 10,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default StudentLogin;
