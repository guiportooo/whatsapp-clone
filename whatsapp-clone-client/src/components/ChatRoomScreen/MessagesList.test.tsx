import { createMemoryHistory } from 'history';
import React from 'react';
import { render, screen, within } from '@testing-library/react';
import MessagesList from './MessagesList';

describe('MessagesList', () => {
  const time = new Date('1 Jan 2019 GMT');

  it('renders messages data', () => {
    const messages = [
      {
        id: '1',
        content: 'foo',
        createdAt: time,
      },
      {
        id: '2',
        content: 'bar',
        createdAt: time,
      },
    ];

    render(<MessagesList messages={messages} />);

    const match = screen.getAllByTestId('message-item');
    const message1 = match[0];
    const message2 = match[1];

    expect(within(message1).getByTestId('message-content')).toHaveTextContent(
      'foo'
    );
    expect(within(message1).getByTestId('message-date')).toHaveTextContent(
      '00:00'
    );

    expect(within(message2).getByTestId('message-content')).toHaveTextContent(
      'bar'
    );
    expect(within(message2).getByTestId('message-date')).toHaveTextContent(
      '00:00'
    );
  });
});
