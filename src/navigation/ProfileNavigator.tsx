import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParams } from './MainNavigator';
import { ProfileScreen } from '../screens';

const Stack = createStackNavigator<RootStackParams>();

const ProfileNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        </Stack.Navigator>
    );
};

export default ProfileNavigator;