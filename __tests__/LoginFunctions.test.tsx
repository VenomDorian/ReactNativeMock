import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginFunction from '../components/LoginFunction';
import { signInWithEmailAndPassword, getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

// Mock the Firebase methods 
jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
  getAuth: jest.fn(() => ({})),
}));

describe('LoginFunction Component', () => {

  // Reseting of the mock before all
  beforeEach(() => {
    // Reset the mock function so we start with a clean slate for each test
    signInWithEmailAndPassword.mockReset();
  });

  it('renders email and password inputs and the sign-up button', () => {
    const { getByPlaceholderText, getByText } = render(<LoginFunction />);

    expect(getByPlaceholderText('email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Sign Up')).toBeTruthy();
  });

  it('updates email and password states on input', () => {
    const { getByPlaceholderText } = render(<LoginFunction />);

    const emailInput = getByPlaceholderText('email');
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'testpassword');

    expect(emailInput.props.value).toBe('test@example.com');
    expect(passwordInput.props.value).toBe('testpassword');
  });

  it('calls signInWithEmailAndPassword with correct email and password on button press', async () => {
    const { getByPlaceholderText, getByText } = render(<LoginFunction />);

    const emailInput = getByPlaceholderText('email');
    const passwordInput = getByPlaceholderText('Password');
    const signUpButton = getByText('Sign Up');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'testpassword');

    // Mock a successful response for this test
    signInWithEmailAndPassword.mockResolvedValue({
      user: { email: 'test@example.com' },
    });

    fireEvent.press(signUpButton);

    await waitFor(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(), // The auth object
        'test@example.com',
        'testpassword'
      );
    });
  });

  it('logs an error message when signInWithEmailAndPassword fails', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const { getByPlaceholderText, getByText } = render(<LoginFunction />);

    const emailInput = getByPlaceholderText('email');
    const passwordInput = getByPlaceholderText('Password');
    const signUpButton = getByText('Sign Up');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'wrongpassword');

    // Mock a failed response for this test
    signInWithEmailAndPassword.mockRejectedValue({
      message: 'Invalid credentials',
      code: 'auth/wrong-password',
    });

    fireEvent.press(signUpButton);

    await waitFor(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith('ERRORInvalid credentials auth/wrong-password');
    });
  });

  it('logs a success message when signInWithEmailAndPassword is successful', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const { getByPlaceholderText, getByText } = render(<LoginFunction />);

    const emailInput = getByPlaceholderText('email');
    const passwordInput = getByPlaceholderText('Password');
    const signUpButton = getByText('Sign Up');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'testpassword');

    // Mock a successful response for this test
    signInWithEmailAndPassword.mockResolvedValue({
      user: { email: 'test@example.com' },
    });

    fireEvent.press(signUpButton);

    await waitFor(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith('Succesful Login');
    });
  });
});

