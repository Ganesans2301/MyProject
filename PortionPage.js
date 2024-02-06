import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const PortionPage = ({ route }) => {
  const { student } = route.params;
  const [subject, setSubject] = useState('');
  const [standard, setStandard] = useState('');
  const [lesson, setLesson] = useState('');
  const [Date , setdate]= useState('');
  const [coveredPortion, setCoveredPortion] = useState('');

  const [savedPortions, setSavedPortions] = useState([]);

  const navigation = useNavigation();


  useEffect(() => {
    const fetchSavedPortions = async () => {
      try {
        const existingPortions = await AsyncStorage.getItem('student_portions');
        const parsedExistingPortions = existingPortions ? JSON.parse(existingPortions) : {};

        const studentPortions = parsedExistingPortions[student.name];
        if (studentPortions) {
          setSavedPortions([studentPortions]);
        } else {
          setSavedPortions([]);
        }
      } catch (error) {
        console.error('Error fetching saved portions:', error);
      }
    };

    fetchSavedPortions();
  }, [student]);

  const handleSavePortion = async () => {
    try {
      if (!subject || !standard || !lesson || !coveredPortion || !Date ) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }

      const portionDetails = { subject, standard, lesson, coveredPortion,Date };
      const studentName = student.name;

      // Retrieve existing portions from AsyncStorage
      const existingPortions = await AsyncStorage.getItem('student_portions');
      const parsedExistingPortions = existingPortions ? JSON.parse(existingPortions) : {};

      // Add the new portionDetails to the existing portions
      parsedExistingPortions[studentName] = portionDetails;

      // Save the updated portions back to AsyncStorage
      await AsyncStorage.setItem('student_portions', JSON.stringify(parsedExistingPortions));

      Alert.alert('Success', 'Portion saved successfully');

      // Update the saved portions state
      setSavedPortions([...savedPortions, portionDetails]);

      // Clear input fields
      setSubject('');
      setStandard('');
      setLesson('');
      setCoveredPortion('');
      setdate('');
    } catch (error) {
      console.error('Error saving portion:', error);
      Alert.alert('Error', 'Failed to save portion. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.studentName}>{student.name}</Text>
      <Text style={styles.title}>Enter Portion Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Subject"
        value={subject}
        onChangeText={setSubject}
      />
      <TextInput
        style={styles.input}
        placeholder="Standard"
        value={standard}
        onChangeText={setStandard}
      />
      <TextInput
        style={styles.input}
        placeholder="Lesson"
        value={lesson}
        onChangeText={setLesson}
      />
      <TextInput
        style={styles.input}
        placeholder="Covered Portion (%)"
        value={coveredPortion}
        onChangeText={setCoveredPortion}
        keyboardType="numeric"
      />
       <TextInput
        style={styles.input}
        placeholder="Date"
        value={Date}
        onChangeText={setdate}
        keyboardType="Date"
      />
      {/* <TextInput
        style={styles.input}
        placeholder="Date"
        value={Date}
        onChangeText={setdate}
        keyboardType="Date"
      />
      */}
      <Button title="Save Portion" onPress={handleSavePortion} />

      {/* Display saved portion details */}
      <View style={styles.savedPortionContainer}>
        <Text style={styles.savedPortionTitle}>Saved Portions:</Text>
        {savedPortions.map((portion, index) => (
          <View key={index} style={styles.savedPortionItem}>
            <Text>Subject: {portion.subject}</Text>
            <Text>Standard: {portion.standard}</Text>
            <Text>Lesson: {portion.lesson}</Text>
            <Text>Covered Portion (%): {portion.coveredPortion}</Text>
            <Text>Date: {portion.setdate}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  studentName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  savedPortionContainer: {
    marginTop: 20,
  },
  savedPortionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  savedPortionItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
});

export default PortionPage;
