import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import { useState } from 'react';
import React from 'react';
import { initializeApp } from "firebase/app";
import {
  getAuth,
} from 'firebase/auth';
import {
    getFirestore,
    collection,
    addDoc,
  } from 'firebase/firestore';


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
  const db = getFirestore(app);

  export default function UploadFunction(props : any){
    const[name, setName] = useState("");
    const[item, setItem] = useState("");

    return(
        <View>
            <TextInput
                placeholder='name'
                onChangeText={text => {
                setName(text);
                }}
            />
            <TextInput
                placeholder='item'
                onChangeText={text => {
                setItem(text);
                }}
            />
            <Button 
                title="add"
                onPress={async () =>{

                try {


                    // get a reference to the collection
                    var itemCollection = collection(db, "items");

                    const newDoc = await addDoc(
                    itemCollection,
                    {
                        name: name,
                        item: item
                    }
                    );

                    console.log("ID of new item: " + newDoc.id);

                }catch(e){
                    console.log("EXCEPTION WHEN TRYING TO ADD AN ITEM: " + e);
                }
                }}
            />
        </View>
    );
}