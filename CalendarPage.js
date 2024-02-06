import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';

LocaleConfig.locales['en'] = {
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  monthNamesShort: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'],
  today: 'Today'
};

LocaleConfig.defaultLocale = 'en';

const CalendarPage = ({ route }) => {
  const { studentName } = route.params;
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventData, setEventData] = useState([]);
  const [timetableData, setTimetableData] = useState([]);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const storedEvents = await AsyncStorage.getItem('student_events');
        if (storedEvents) {
          const events = JSON.parse(storedEvents);
          setEventData(events[selectedDate] || []);
        }
      } catch (error) {
        console.error('Error fetching event data: ', error);
      }
    };

    const fetchTimetableData = async () => {
      try {
        const storedTimetables = await AsyncStorage.getItem('student_timetables');
        if (storedTimetables) {
          const timetables = JSON.parse(storedTimetables);
          setTimetableData(timetables[studentName]?.[selectedDate] || []);
        }
      } catch (error) {
        console.error('Error fetching timetable data: ', error);
      }
    };

    if (selectedDate) {
      fetchEventData();
      fetchTimetableData();
    }
  }, [selectedDate, studentName]);

  const handleDayPress = (day) => {
    // Set the selected date when a day is pressed
    setSelectedDate(day.dateString);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.studentName}>Hello, {studentName}!</Text>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={{
          '2024-02-01': { marked: true, dotColor: 'red' },
          '2024-02-10': { marked: true, dotColor: 'green' },
          [selectedDate]: { selected: true, marked: true },
        }}
        theme={{
          todayTextColor: 'green',
          selectedDayTextColor: 'white',
          selectedDayBackgroundColor: 'blue',
        }}
      />

      {selectedDate && (
        <View style={styles.eventContainer}>
          {/* ... (previous code) */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  studentName: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  eventContainer: {
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    marginVertical: 5,
    fontSize: 16,
  },
});

export default CalendarPage;
