import React from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  RouteComponentProps,
} from 'react-router-dom';
import GlideSwitch from './components/GlideSwitch';
import ChatsListScreen from './components/ChatsListScreen';
import ChatRoomScreen from './components/ChatRoomScreen';

const App: React.FC = () => (
  <BrowserRouter>
    <GlideSwitch>
      <Route exact path="/chats" component={ChatsListScreen} />
      <Route
        exact
        path="/chats/:chatId"
        component={({ match }: RouteComponentProps<{ chatId: string }>) => (
          <ChatRoomScreen chatId={match.params.chatId}></ChatRoomScreen>
        )}
      />
    </GlideSwitch>
    <Route exact path="/" render={redirectToChats} />
  </BrowserRouter>
);

const redirectToChats = () => <Redirect to="/chats" />;

export default App;
