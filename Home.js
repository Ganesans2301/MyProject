// Home.js

import React from 'react';
import { View, Button, StyleSheet, Text, Image } from 'react-native';

const Home = ({ navigation }) => {
  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const navigateToPortionPage = (subject, std, lesson, isDone) => {
    navigation.navigate('PortionPage', { subject, std, lesson, isDone });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./images (1).png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Welcome to the Portal</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Student"
          onPress={() => navigation.navigate('StudentLogin')}
          color="#3498db"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Admin"
          onPress={() => navigation.navigate('AdminLogin')}
          color="#e74c3c"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Parent"
          onPress={() => navigateToPortionPage('Math', '10th', 'Algebra', true)}
          color="#2ecc71"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Tutor"
          onPress={() => navigateToPortionPage('Physics', '11th', 'Mechanics', false)}
          color="#f39c12"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ecf0f1',
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  buttonContainer: {
    marginVertical: 10,
    width: '80%',
  },
});

export default Home;
