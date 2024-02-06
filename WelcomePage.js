import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';

const WelcomePage = ({ navigation, route }) => {
  const { studentName } = route.params;

  const handleCalendarPress = () => {
    // Navigate to the CalendarPage when the "Calendar" button is pressed
    navigation.navigate('CalendarPage', { studentName });
  };

  const handleProfilePress = () => {
    // Navigate to the StudentProfilePage when the "Profile" button is pressed
    navigation.navigate('Profile', { studentName });
  };

  const handlePortionCoverdPress = () => {
    // Navigate to the PortionCoverdPage when the "Portion Covert" button is pressed
    navigation.navigate('PortionCoverdPage', { studentName });
  };

  const handleHomeWorkPress = () => {
    // Navigate to the HomeworkPage when the "Home Work" button is pressed
    navigation.navigate('HomeworkPage', { studentName });
  };

  const handleChatPress = () => {
    // Navigate to the ChatPage when the "Chat" button is pressed
    navigation.navigate('ChatPage', { studentName });
  };

  return (
    <View style={styles.container}>
      {/* Welcome image at the top */}
      <Image
        source={require('./welcome.png')} // Replace with your image path
        style={styles.welcomeImage}
      />

      {/* Display student name */}
      <Text style={styles.studentName}>Welcome, {studentName}!</Text>

      {/* Circular buttons at the bottom */}
      <View style={styles.circleButtonContainer}>
        <TouchableOpacity style={styles.circleButton} onPress={handleCalendarPress}>
          <Text style={styles.buttonText}>Calendar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.circleButton} onPress={handleProfilePress}>
          <Text style={styles.buttonText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.circleButton} onPress={handlePortionCoverdPress}>
          <Text style={styles.buttonText}>Portion Covert</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.circleButton} onPress={handleHomeWorkPress}>
          <Text style={styles.buttonText}>Home Work</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.circleButton} onPress={handleChatPress}>
          <Text style={styles.buttonText}>Chat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    // Add other styles for your page content
  },
  welcomeImage: {
    width: '100%', // Adjust the width as needed
    height: 200, // Adjust the height as needed
    resizeMode: 'cover',
    marginTop: 100,
  },
  studentName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  circleButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
    
  },
  circleButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'blue', // Customize the button color
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 150 ,
  },
  buttonText: {
    color: 'white', // Customize the text color
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default WelcomePage;
