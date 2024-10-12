import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import UploadFunction from '../components/UploadFunction';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Mock the Firestore methods
jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(() => ({})),
  collection: jest.fn(),
  addDoc: jest.fn(),
}));

describe('UploadFunction Integration Tests', () => {
  const name = 'Test Name';
  const item = 'Test Item';
  
  beforeEach(() => {
    // Reset mocks before each test
    addDoc.mockReset();
    collection.mockReset();
  });

  it('adds a new item to Firestore upon pressing the add button', async () => {
    const { getByPlaceholderText, getByText } = render(<UploadFunction />);

    // Fill in the form
    const nameInput = getByPlaceholderText('name');
    const itemInput = getByPlaceholderText('item');
    const addButton = getByText('add');

    fireEvent.changeText(nameInput, name);
    fireEvent.changeText(itemInput, item);

    // Mock successful response for addDoc
    addDoc.mockResolvedValueOnce({ id: 'new-doc-id' });

    // Simulate button press
    fireEvent.press(addButton);

    // Ensure the addDoc function is called with the correct arguments
    await waitFor(() => {
      // Get the firestore collection reference
      const firestore = getFirestore();
      const itemCollection = collection(firestore, 'items');

      expect(collection).toHaveBeenCalledWith(firestore, 'items');
      expect(addDoc).toHaveBeenCalledWith(itemCollection, {
        name: name,
        item: item,
      });
    });
  });

  it('handles errors during item addition', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const { getByPlaceholderText, getByText } = render(<UploadFunction />);

    // Fill in the form
    const nameInput = getByPlaceholderText('name');
    const itemInput = getByPlaceholderText('item');
    const addButton = getByText('add');

    fireEvent.changeText(nameInput, name);
    fireEvent.changeText(itemInput, item);

    // Mock an error response for addDoc
    addDoc.mockRejectedValueOnce(new Error('Firestore error'));

    // Simulate button press
    fireEvent.press(addButton);

    // Ensure that console logs the error
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith("EXCEPTION WHEN TRYING TO ADD AN ITEM: Error: Firestore error");
    });
  });
});