import {  View, TextInput, Button} from 'react-native';
import { useState } from 'react';
import { initializeApp } from "firebase/app";
import React from 'react';

import {
  getAuth,
  signInWithEmailAndPassword,
  UserCredential,
} from 'firebase/auth'

const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_API_KEY,
    authDomain: process.env.EXPLO_PUBLIC_AUTH_KEY,
    projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_MESSAGE_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_APP_ID
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function LoginFunction(props : any){
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    return(
        <View>
            <TextInput
                placeholder='email'
                value={email}
                onChangeText={text => {
                setEmail(text);
                }}
            />

            <TextInput
                placeholder='Password'
                secureTextEntry={true}
                value={password}
                onChangeText={text => {
                    setPassword(text);
                }}
            />

            <Button
                title = "Sign Up"
                onPress={() => {
                    signInWithEmailAndPassword(auth, email, password)
                    .then((userCrendential : UserCredential) => {
                        console.log("Succesful Login");
                    })
                    .catch((error : any) => {
                        console.log("ERROR" + error.message + " " + error.code);
                    });
                }}
            />
            
        </View>
    );
}
