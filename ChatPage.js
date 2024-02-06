import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';

const ChatPage = ({ route }) => {
  const { studentName } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim() !== '') {
      const newMsg = {
        id: messages.length + 1,
        text: newMessage,
        sender: 'Me', // You can change this to the sender's name
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat with {studentName}</Text>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={item.sender === 'Me' ? styles.myMessage : styles.otherMessage}>
            <Text style={styles.sender}>{item.sender}</Text>
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type your message..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  myMessage: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginVertical: 5,
    marginRight: 10,
    marginLeft: 'auto',
    backgroundColor: '#DCF8C6',
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  otherMessage: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginVertical: 5,
    marginRight: 'auto',
    marginLeft: 10,
    backgroundColor: '#E5E5EA',
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  sender: {
    fontSize: 12,
    marginBottom: 3,
  },
  messageText: {
    fontSize: 16,
  },
  time: {
    fontSize: 10,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: 'blue',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ChatPage;
