import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import { useState } from 'react';
import React from 'react';
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  UserCredential,
} from 'firebase/auth';


const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_MESSAGE_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_APP_ID
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  export default function RegisterFunction(props : any){
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    return(
        <View>
            <TextInput
                placeholder='email'
                onChangeText={text => {
                setEmail(text);
                }}
            />
            <TextInput
                placeholder='password'
                secureTextEntry={true}
                onChangeText={text => {
                setPassword(text);
                }}
            />
            <Button 
                title="sign up"
                onPress={() => {

                // this method returns a Promise (as some async methods do)
                createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential : UserCredential) => {
                    // this will run when the promise is solved
                    console.log("USER: " + userCredential.user.email);
                })
                .catch((error : any) => {
                    if(error.code == "auth/weak-password") {
                    }
                    console.log("ERROR: " + error.message +  " " + error.code);
                });
                }}
            />
        </View>
    );
}