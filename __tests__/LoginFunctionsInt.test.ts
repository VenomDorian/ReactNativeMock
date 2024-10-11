import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";

// Use your emulator URL and ports
const useEmulator = process.env.USE_FIREBASE_EMULATOR === 'true';

const firebaseConfig = {
  apiKey:"AIzaSyDDjUerU0cY6Mt841RUeaF3RbLzwDNMBIk",
  authDomain:"fir-androidtest-8efcb.firebaseapp.com",
  projectId:"fir-androidtest-8efcb",
  storageBucket:"fir-androidtest-8efcb.appspot.com",
  messagingSenderId:"943950636261",
  appId:"1:943950636261:web:25200583a060567ebf200c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

console.log(firebaseConfig);
console.log(auth);

describe("Firebase Auth Integration Tests", () => {
  it("should sign in successfully with valid credentials", async () => {
    const email = "testuser@example.com";
    const password = "securepassword";

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    expect(userCredential.user.email).toBe(email);
  });

  it("should throw an error for invalid credentials", async () => {
    const email = "wronguser@example.com";
    const password = "wrongpassword";

    await expect(signInWithEmailAndPassword(auth, email, password)).rejects.toThrow();
  });

  it("should sign out the user", async () => {
    await signOut(auth);
    expect(auth.currentUser).toBe(null);
  });
});
