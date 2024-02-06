// ViewTimeTable.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ViewTimeTable = ({ route }) => {
  const { student } = route.params;
  const [timetableData, setTimetableData] = useState({});
  const [tableData, setTableData] = useState([]);
  const navigation = useNavigation();

  // Function to update timetable data
  const updateTableData = (timetable) => {
    if (timetable) {
      const data = Object.entries(timetable).map(([day, { subject, time }]) => ({ day, subject, time }));
      setTableData(data);
    } else {
      setTableData([]);
    }
  };

  useEffect(() => {
    const fetchTimetableData = async () => {
      try {
        const storedTimetables = await AsyncStorage.getItem('student_timetables');
        if (storedTimetables !== null) {
          const timetables = JSON.parse(storedTimetables);
          setTimetableData(timetables);
          updateTableData(timetables[student.name]);
        }
      } catch (error) {
        console.error('Error fetching timetable data: ', error);
      }
    };

    fetchTimetableData();
  }, [student.name]);

  const handleDateClick = (date) => {
    // Navigate to TimetablePage with the selected date and timetable data
    navigation.navigate('TimetablePage', { student, timetableData, selectedDate: date });
  };

  const handleRemoveRow = async (index) => {
    try {
      const updatedTimetable = { ...timetableData };
      const selectedDay = tableData[index].day;
      delete updatedTimetable[student.name]?.[selectedDay];

      // Save the updated timetable data to AsyncStorage
      await AsyncStorage.setItem('student_timetables', JSON.stringify(updatedTimetable));

      // Update the state to trigger a re-render with the new data
      setTimetableData(updatedTimetable);
      updateTableData(updatedTimetable[student.name]);
    } catch (error) {
      console.error('Error handling remove row:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Timetable:</Text>
      {tableData.length > 0 ? (
        <FlatList
          data={tableData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.rowContainer} key={index}>
              <TouchableOpacity onPress={() => handleDateClick(item.day)}>
                <Text style={styles.text}>{item.day}</Text>
                <Text style={styles.text}>{item.subject}</Text>
                <Text style={styles.text}>{item.time}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveRow(index)}>
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text>No timetable data found for {student.name}</Text>
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
    marginBottom: 10,
  },
  text: {
    margin: 6,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
  },
  removeButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 5,
  },
  removeButtonText: {
    color: 'white',
  },
});

export default ViewTimeTable;
