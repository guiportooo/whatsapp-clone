import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import { createBrowserHistory } from 'history';
import ChatsList from './ChatsList';

describe('ChatsList', () => {
  afterEach(() => {
    delete window.location;
    window = Object.create(window);
    Object.defineProperty(window, 'location', {
      value: {
        href: '/',
      },
      writable: true,
    });
  });

  it('renders fetched chats data', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        data: {
          chats: [
            {
              id: 1,
              name: 'Foo Bar',
              picture: 'https://localhost:4000/picture.jpg',
              lastMessage: {
                id: 1,
                content: 'Hello',
                createdAt: new Date('1 Jan 2019 GMT'),
              },
            },
          ],
        },
      })
    );

    const history = createBrowserHistory();
    const { container, getByTestId } = render(<ChatsList history={history} />);

    await waitFor(() => container);

    expect(getByTestId('name')).toHaveTextContent('Foo Bar');
    expect(getByTestId('picture')).toHaveAttribute(
      'src',
      'https://localhost:4000/picture.jpg'
    );
    expect(getByTestId('content')).toHaveTextContent('Hello');
    expect(getByTestId('date')).toHaveTextContent('00:00');
  });

  it('should navigate to the target chat room on chat item click', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        data: {
          chats: [
            {
              id: 1,
              name: 'Foo Bar',
              picture: 'https://localhost:4000/picture.jpg',
              lastMessage: {
                id: 1,
                content: 'Hello',
                createdAt: new Date('1 Jan 2019 GMT'),
              },
            },
          ],
        },
      })
    );

    const history = createBrowserHistory();
    const { container, getByTestId } = render(<ChatsList history={history} />);

    await waitFor(() => container);

    fireEvent.click(getByTestId('chat'));

    await waitFor(() => expect(history.location.pathname).toEqual('/chats/1'));
  });
});
