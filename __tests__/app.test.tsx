import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import { useState } from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import App from '../App';
import { createUserWithEmailAndPassword } from 'firebase/auth';

// Mock the Firebase methods
jest.mock('firebase/auth', () => ({
    signInWithEmailAndPassword: jest.fn(() => Promise.resolve({ user: { email: 'test@example.com' } })),
    createUserWithEmailAndPassword: jest.fn(() => Promise.resolve({ user: { email: 'test@example.com' } })),
    signOut: jest.fn(() => Promise.resolve()),
    getAuth: jest.fn(() => Promise.resolve),
}));
jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  getDocs: jest.fn(),
}));

describe('Firebase Authentication', () => {
  it('registers a new user', async () => {
    const { getByPlaceholderText, getByText } = render(<App />);

    const emailInput = getByPlaceholderText('email');
    const passwordInput = getByPlaceholderText('password');
    const signUpButton = getByText('sign up');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'testpassword');
    fireEvent.press(signUpButton);

    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        'test@example.com',
        'testpassword'
      );
    });
  });
});