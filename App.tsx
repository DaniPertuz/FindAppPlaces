import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { Navigation } from './src/navigation';
import { AuthProvider, PlacesProvider, UsersProvider } from './src/context';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['EventEmitter.removeListener']);

const AppState = ({ children }: { children: JSX.Element | JSX.Element[]; }) => {
  return (
    <AuthProvider>
      <PlacesProvider>
        <UsersProvider>
          {children}
        </UsersProvider>
      </PlacesProvider>
    </AuthProvider>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <Navigation />
      </AppState>
    </NavigationContainer>
  );
};

export default App;