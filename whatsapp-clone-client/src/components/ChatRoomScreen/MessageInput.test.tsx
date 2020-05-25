import React from 'react';
import { createMemoryHistory } from 'history';
import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import MessageInput from './MessageInput';

describe('MessageInput', () => {
  it('triggers callback on send button click', async () => {
    const onSendMessage = jest.fn(() => {});

    render(<MessageInput onSendMessage={onSendMessage} />);

    const messageInput = screen.getByTestId('message-input');
    const sendButton = screen.getByRole('button');

    fireEvent.change(messageInput, { target: { value: 'foo' } });

    await waitFor(() => messageInput);

    fireEvent.click(sendButton);

    await waitFor(() => expect(onSendMessage.mock.calls.length).toBe(1));
  });

  it('triggers callback on Enter press', async () => {
    const onSendMessage = jest.fn(() => {});

    render(<MessageInput onSendMessage={onSendMessage} />);

    const messageInput = screen.getByTestId('message-input');
    const sendButton = screen.getByRole('button');

    fireEvent.change(messageInput, { target: { value: 'foo' } });

    await waitFor(() => messageInput);

    fireEvent.keyPress(messageInput, {
      key: 'Enter',
      code: 13,
      charCode: 13,
    });

    await waitFor(() => expect(onSendMessage.mock.calls.length).toBe(1));
  });
});
