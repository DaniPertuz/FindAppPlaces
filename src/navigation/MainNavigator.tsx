import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';

export type RootStackParams = {
    BottomTabNavigator: undefined
    LoginScreen: undefined,
    MainScreen: undefined,
    NewPasswordScreen: undefined,
    RegisterScreen: undefined,
};

const Stack = createStackNavigator<RootStackParams>();

const MainNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
        </Stack.Navigator>
    );
};

export default MainNavigator;