import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Calendar, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['en'] = {
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  monthNamesShort: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'],
};

LocaleConfig.defaultLocale = 'en';

const TimetablePage = ({ route, navigation }) => {
  const { student } = route.params;
  const [timetable, setTimetable] = useState({
    monday: { subject: '', time: '' },
    tuesday: { subject: '', time: '' },
    wednesday: { subject: '', time: '' },
    thursday: { subject: '', time: '' },
    friday: { subject: '', time: '' },
    saturday: { subject: '', time: '' },
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventData, setEventData] = useState([]);

  // Function to handle changes in subject or time
  const handleSubjectChange = (field, value) => {
    setTimetable((prevTimetable) => ({
      ...prevTimetable,
      [selectedDate]: {
        ...prevTimetable[selectedDate],
        [field]: value,
      },
    }));
  };

  // Function to fetch timetable data for the selected date
  const fetchTimetableData = async () => {
    try {
      const storedTimetables = await AsyncStorage.getItem('student_timetables');
      if (storedTimetables !== null) {
        const timetables = JSON.parse(storedTimetables);
        setTimetable(timetables[student.name]?.[selectedDate] || {});
      }
    } catch (error) {
      console.error('Error fetching timetable data: ', error);
    }
  };

  // Function to fetch event data for the selected date
  const fetchEventData = async () => {
    try {
      const storedEvents = await AsyncStorage.getItem('student_events');
      if (storedEvents !== null) {
        const events = JSON.parse(storedEvents);
        setEventData(events[selectedDate] || []);
      }
    } catch (error) {
      console.error('Error fetching event data: ', error);
    }
  };

  // UseEffect to fetch both event and timetable data when selectedDate changes
  useEffect(() => {
    if (selectedDate) {
      fetchEventData();
      fetchTimetableData();
    }
  }, [selectedDate]);

  // Function to save timetable data to AsyncStorage
  const saveTimetable = async () => {
    try {
      const storedTimetables = await AsyncStorage.getItem('student_timetables');
      const existingTimetables = storedTimetables ? JSON.parse(storedTimetables) : {};

      existingTimetables[student.name] = {
        ...existingTimetables[student.name],
        [selectedDate]: timetable[selectedDate],
      };

      await AsyncStorage.setItem('student_timetables', JSON.stringify(existingTimetables));

      // Pass timetable data to StudentProfilePage
      const timetableData = {
        selectedDate,
        ...timetable[selectedDate],
      };
      navigation.navigate('StudentProfilePage', { student, timetableData });
    } catch (error) {
      console.error('Error saving timetable: ', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{student.name}'s Timetable</Text>

      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: { selected: true, marked: true },
        }}
      />

      {selectedDate && (
        <ScrollView style={styles.timetableContainer}>
          <Text>{`Selected Date: ${selectedDate}`}</Text>
          <Text>Subject:</Text>
          <TextInput
            style={styles.input}
            value={timetable[selectedDate]?.subject}
            onChangeText={(text) => handleSubjectChange('subject', text)}
          />
          <Text>Time:</Text>
          <TextInput
            style={styles.input}
            value={timetable[selectedDate]?.time}
            onChangeText={(text) => handleSubjectChange('time', text)}
          />
          <Text style={styles.title}>Events for {selectedDate}:</Text>
          {eventData.map((event, index) => (
            <Text key={index} style={styles.text}>{event}</Text>
          ))}
        </ScrollView>
      )}

      <Button title="Save Timetable" onPress={saveTimetable} />
    </ScrollView>
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
  timetableContainer: {
    maxHeight: 200,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  text: {
    marginVertical: 5,
  },
})

export default TimetablePage;
