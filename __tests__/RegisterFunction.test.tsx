import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import RegisterFunction from '../components/RegisterFunction';

// Mock the Firebase methods
jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(),
  getAuth: jest.fn(() => ({})),
}));

describe('RegisterFunction Component - Registration', () => {
  beforeEach(() => {
    // Reset the mock function so we start with a clean slate for each test
    createUserWithEmailAndPassword.mockReset();
  });

  it('calls createUserWithEmailAndPassword with correct email and password on button press', async () => {
    const { getByPlaceholderText, getByText } = render(<RegisterFunction/>);

    const emailInput = getByPlaceholderText('email');
    const passwordInput = getByPlaceholderText('password');
    const signUpButton = getByText('sign up');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'testpassword');

    // Mock a successful response
    createUserWithEmailAndPassword.mockResolvedValue({
      user: { email: 'test@example.com' },
    });

    fireEvent.press(signUpButton);

    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(), // The auth object
        'test@example.com',
        'testpassword'
      );
    });
  });

  it('logs an error message when createUserWithEmailAndPassword fails', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const { getByPlaceholderText, getByText } = render(<RegisterFunction/>);

    const emailInput = getByPlaceholderText('email');
    const passwordInput = getByPlaceholderText('password');
    const signUpButton = getByText('sign up');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'weakpassword');

    // Mock a failed response for weak password
    createUserWithEmailAndPassword.mockRejectedValue({
      message: 'Weak password',
      code: 'auth/weak-password',
    });

    fireEvent.press(signUpButton);

    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith('ERROR: Weak password auth/weak-password');
    });
  });

  it('logs a success message when createUserWithEmailAndPassword is successful', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const { getByPlaceholderText, getByText } = render(<RegisterFunction/>);

    const emailInput = getByPlaceholderText('email');
    const passwordInput = getByPlaceholderText('password');
    const signUpButton = getByText('sign up');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'testpassword');

    // Mock a successful response
    createUserWithEmailAndPassword.mockResolvedValue({
      user: { email: 'test@example.com' },
    });

    fireEvent.press(signUpButton);

    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith('USER: test@example.com');
    });
  });
});
