import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { LoginScreen, RegisterScreen, RegisterDetailsScreen, MainPictureScreen } from '../screens/auth';
import { MainScreen } from '../screens/main';

const Stack = createStackNavigator();

export type RootStackParams = {
    RegisterDetailsScreen: { name: string, email: string; },
    MainPictureScreen: undefined,
    MainScreen: undefined;
};

export const Navigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: '#FFFFFF'
                }
            }}
        >
            <Stack.Screen name='LoginScreen' component={LoginScreen} />
            <Stack.Screen name='RegisterScreen' component={RegisterScreen} />
            <Stack.Screen name='RegisterDetailsScreen' component={RegisterDetailsScreen} />
            <Stack.Screen name='MainPictureScreen' component={MainPictureScreen} />
            <Stack.Screen name='MainScreen' component={MainScreen} />
        </Stack.Navigator>
    );
};