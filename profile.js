import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({ route }) => {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const existingStudents = await AsyncStorage.getItem('student_registration');
        const studentsArray = existingStudents ? JSON.parse(existingStudents) : [];

        const { studentName } = route.params;
        const selectedStudent = studentsArray.find((student) => student.name === studentName);

        setStudent(selectedStudent);
      } catch (error) {
        console.error('Error fetching student data: ', error);
      }
    };

    fetchStudentData();
  }, [route.params]);

  if (!student) {
    return <InvalidDataMessage />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Profile</Text>
      <ProfileItem label="Name" value={student.name} />
      <ProfileItem label="Age" value={student.age} />
      <ProfileItem label="Email" value={student.email} />
      {/* For security reasons, it's not recommended to display passwords */}
      {/* If you need to show a password reset option, provide a secure way to handle it */}
    </View>
  );
};

const InvalidDataMessage = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Invalid Student Data</Text>
    <Text>Please provide valid student data.</Text>
  </View>
);

const ProfileItem = ({ label, value }) => (
  <View style={styles.profileItem}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ecf0f1',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  value: {
    flexShrink: 1,
  },
});

export default Profile;
