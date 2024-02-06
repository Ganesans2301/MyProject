import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StudentRegistration = ({ navigation }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const handleRegistration = async () => {
    if (name && age && email && password) {
      try {
        // Retrieve existing students data
        const existingStudents = await AsyncStorage.getItem('student_registration');
        const studentsArray = existingStudents ? JSON.parse(existingStudents) : [];

        // Check if the email is already registered
        const isEmailRegistered = studentsArray.some((student) => student.email === email);
        if (isEmailRegistered) {
          Alert.alert('Email Already Registered', 'This email is already registered. Please use a different email.');
          return;
        }

        // Create a new student object
        const newStudent = { name, age, email, password };

        // Add the new student to the existing array
        studentsArray.push(newStudent);

        // Save the updated array to AsyncStorage
        await AsyncStorage.setItem('student_registration', JSON.stringify(studentsArray));

        Alert.alert('Registration Successful', 'You are now registered!');
        navigation.navigate('StudentLogin');
      } catch (error) {
        Alert.alert('Error', 'Registration failed. Please try again.');
      }
    } else {
      Alert.alert('Incomplete Details', 'Please fill in all fields.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegistration} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default StudentRegistration;
