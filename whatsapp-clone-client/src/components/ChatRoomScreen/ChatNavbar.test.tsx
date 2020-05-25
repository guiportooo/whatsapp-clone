import React from 'react';
import { createMemoryHistory } from 'history';
import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import ChatNavbar from './ChatNavbar';

describe('ChatNavbar', () => {
  it('renders chat data', () => {
    const time = new Date('1 Jan 2019 GMT');
    const chat = {
      id: '1',
      name: 'Foo Bar',
      picture: 'https://localhost:4000/picture.jpg',
      messages: [
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
      ],
    };

    const history = createMemoryHistory();

    render(<ChatNavbar chat={chat} history={history} />);

    expect(screen.getByTestId('chat-name')).toHaveTextContent('Foo Bar');
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      'https://localhost:4000/picture.jpg'
    );
  });

  it('goes back on arrow click', async () => {
    const time = new Date('1 Jan 2019 GMT');
    const chat = {
      id: '1',
      name: 'Foo Bar',
      picture: 'https://localhost:4000/picture.jpg',
      messages: [
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
      ],
    };

    const history = createMemoryHistory();

    history.push('/chats/1');

    await waitFor(() => expect(history.location.pathname).toEqual('/chats/1'));

    render(<ChatNavbar chat={chat} history={history} />);

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(history.location.pathname).toEqual('/chats'));
  });
});
