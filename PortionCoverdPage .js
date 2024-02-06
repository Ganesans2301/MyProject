import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PortionCoveredPage = ({ route }) => {
  const [portionDetails, setPortionDetails] = useState(null);
  const { studentName } = route.params || {};

  useEffect(() => {
    const fetchPortionDetails = async () => {
      try {
        const existingPortions = await AsyncStorage.getItem('student_portions');
        const parsedExistingPortions = existingPortions ? JSON.parse(existingPortions) : {};

        if (studentName && parsedExistingPortions[studentName]) {
          setPortionDetails(parsedExistingPortions[studentName]);
        } else {
          console.error('No corresponding portion found for the student.');
        }
      } catch (error) {
        console.error('Error fetching portion details:', error);
      }
    };

    fetchPortionDetails();
  }, [studentName]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Portion Covered</Text>
      {portionDetails ? (
        <>
          <Text>Subject: {portionDetails.subject}</Text>
          <Text>Standard: {portionDetails.standard}</Text>
          <Text>Lesson: {portionDetails.lesson}</Text>
          <Text>Covered Portion (%): {portionDetails.coveredPortion}</Text>
          <Text>Date: {portionDetails.Date}</Text>


        </>
      ) : (
        <Text>No portion details found for {studentName}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default PortionCoveredPage;
