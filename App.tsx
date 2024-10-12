import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import { useState } from 'react';

export default function App() {

  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[name, setName] = useState("");
  const[breed, setBreed] = useState("");

  return (
    <View style={styles.container}>
      <Text>Sample</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});