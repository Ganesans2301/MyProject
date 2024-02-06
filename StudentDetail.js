import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const StudentDetail = () => {
  const navigation = useNavigation();
  const [registeredStudents, setRegisteredStudents] = useState([]);
  const [timetableData, setTimetableData] = useState({});
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const fetchRegisteredStudents = async () => {
      try {
        const storedStudents = await AsyncStorage.getItem('student_registration');
        if (storedStudents !== null) {
          const students = JSON.parse(storedStudents);
          setRegisteredStudents(students);
        }
      } catch (error) {
        console.error('Error fetching student data: ', error);
      }
    };

    const fetchTimetableData = async () => {
      try {
        const storedTimetables = await AsyncStorage.getItem('student_timetables');
        if (storedTimetables !== null) {
          const timetables = JSON.parse(storedTimetables);
          setTimetableData(timetables);
        }
      } catch (error) {
        console.error('Error fetching timetable data: ', error);
      }
    };

    fetchRegisteredStudents();
    fetchTimetableData();
  }, []);

  const removeStudent = async (student) => {
    try {
      const updatedStudents = registeredStudents.filter((s) => s.name !== student.name);
      await AsyncStorage.setItem('student_registration', JSON.stringify(updatedStudents));
      setRegisteredStudents(updatedStudents);
    } catch (error) {
      console.error('Error removing student: ', error);
    }
  };

  const addStudentToTimetable = (student) => {
    setSelectedStudent(student);
    navigation.navigate('TimetablePage', { student });
  };

  const navigateToStudentProfile = (student) => {
    navigation.navigate('StudentProfilePage', { student });
  };

  // const navigateToStudentWelcomePage = () => {
  //   navigation.navigate('StudentWelcomePage', { timetableData });
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registered Students:</Text>
      <FlatList
        data={registeredStudents}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.studentCard}
            onPress={() => navigateToStudentProfile(item)}
          >
            <Text style={styles.studentName}>{item.name}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => addStudentToTimetable(item)}
              >
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeStudent(item)}
              >
                <Text style={styles.buttonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

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
    marginBottom: 10,
  },
  studentCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
  },
  studentName: {
    fontSize: 18,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  removeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  viewTimetableButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  viewTimetableButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default StudentDetail;