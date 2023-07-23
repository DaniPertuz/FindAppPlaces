import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ProfileNavigator } from './';
import BottomTabNavigator from './BottomTabNavigator';
import { IPlace } from '../interfaces';
import { UpdateProfileScreen } from '../screens';

export type RootStackParams = {
    BottomTabNavigator: undefined;
    LoginScreen: undefined,
    MainScreen: undefined,
    NewPasswordScreen: undefined,
    Profile: undefined,
    RegisterScreen: undefined,
    UpdateProfileScreen: { place: IPlace}
};

const Stack = createStackNavigator<RootStackParams>();

const MainNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
            <Stack.Screen name="Profile" component={ProfileNavigator} />
            <Stack.Screen name="UpdateProfileScreen" component={UpdateProfileScreen} />
        </Stack.Navigator>
    );
};

export default MainNavigator;