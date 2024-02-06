import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-picker';

// import ImagePicker from 'react-native-image-picker'; 
// import * as ImagePicker from 'react-native-image-picker';

const StudentProfilePage = ({ route, navigation }) => {
  const { student, timetableData } = route.params;
  const [profileImage, setProfileImage] = useState(null);

  const handleViewTimetable = () => {
    navigation.navigate('ViewTimeTable', { student, timetableData });
  };

  const handlePortion = () => {
    navigation.navigate('PortionPage', { student });
  };

  const handleDeleteTimetable = async () => {
    try {
      const storedTimetables = await AsyncStorage.getItem('student_timetables');
      if (storedTimetables) {
        const existingTimetables = JSON.parse(storedTimetables);
        delete existingTimetables[student.name];
        await AsyncStorage.setItem('student_timetables', JSON.stringify(existingTimetables));
        Alert.alert('Success', 'Timetable data deleted successfully.');
      }
    } catch (error) {
      console.error('Error deleting timetable data: ', error);
    }
  };

  const handleSelectPhoto = () => {
    const options = {
      title: 'Select Photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
  
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setProfileImage(response.uri);
      }
    });
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Profile</Text>
      <TouchableOpacity onPress={handleSelectPhoto}>
        <Image
          source={profileImage ? { uri: profileImage } : require('./download.png')}
          style={styles.profileImage}
        />
      </TouchableOpacity>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Name:</Text>
        <Text>{student.name}</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Age:</Text>
        <Text>{student.age}</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Email ID:</Text>
        <Text>{student.email}</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Password:</Text>
        <Text>{student.password}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="View Timetable" onPress={handleViewTimetable} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Portion" onPress={handlePortion} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Delete Timetable" onPress={handleDeleteTimetable} color="red" />
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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 15,
    alignSelf: 'center',
  },
  profileInfo: {
    marginBottom: 15,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  buttonContainer: {
    marginVertical: 20,
    width: '80%',
    marginLeft: 40,
  },
});

export default StudentProfilePage;
