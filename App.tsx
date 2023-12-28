import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootSiblingParent } from 'react-native-root-siblings';

import { Navigation } from './src/navigation';
import { AuthProvider, PlacesProvider, ProductsProvider, UsersProvider } from './src/context';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['EventEmitter.removeListener']);

const AppState = ({ children }: { children: JSX.Element | JSX.Element[]; }) => {
  return (
    <RootSiblingParent>
      <AuthProvider>
        <PlacesProvider>
          <ProductsProvider>
            <UsersProvider>
              {children}
            </UsersProvider>
          </ProductsProvider>
        </PlacesProvider>
      </AuthProvider>
    </RootSiblingParent>
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