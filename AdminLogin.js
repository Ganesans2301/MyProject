import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet} from 'react-native';

const AdminLogin = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  const handleLogin = () => {
    const adminUsername = 'admin';
    const adminPassword = 'admin123';
    // console.log(adminUsername)
    // console.log(adminPassword)

    if (username === adminUsername && password === adminPassword) {
      setLoginMessage('Login successful');
       navigation.navigate('StudentDetail');

    } else {
      setLoginMessage('Invalid username or password');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />

      <Text style={styles.message}>{loginMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  message: {
    marginTop: 20,
    color: 'green',
  },
});

export default AdminLogin;
