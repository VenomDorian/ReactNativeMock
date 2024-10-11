import {  View, TextInput, Button} from 'react-native';
import { useState } from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import LoginFunction from '../functions/LoginFunction';
LoginFunction


// Mock the Firebase methods
jest.mock('firebase/auth', () => ({
    signInWithEmailAndPassword: jest.fn(() => Promise.resolve({ user: { email: 'test@example.com' } })),
    createUserWithEmailAndPassword: jest.fn(() => Promise.resolve({ user: { email: 'test@example.com' } })),
    signOut: jest.fn(() => Promise.resolve()),
    getAuth: jest.fn(() => Promise.resolve),
}));

it('logs in successfully with valid credentials', async () => {
    const { getByPlaceholderText, getByRole} = render(<LoginFunction/>);
    const email = 'test@example.com';
    const password = 'validPassword';
    
    fireEvent.changeText(getByPlaceholderText('email'), email);
    fireEvent.changeText(getByPlaceholderText('Password'), password);
    fireEvent.press(getByRole('button'))

    
    await waitFor(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(expect.anything(), email, password);
      // Add further assertions for successful login behavior (e.g., navigation, UI state changes)
    });
});

describe('LoginFunction Component', () => {
  it('renders email and password inputs and the sign-up button', () => {
    const { getByPlaceholderText, getByText } = render(<LoginFunction />);

    expect(getByPlaceholderText('email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Sign Up')).toBeTruthy();
  });
});

