import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainScreen, ProfileScreen, SubscriptionScreen } from '../screens';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={MainScreen} />
            <Tab.Screen name="Subscriptions" component={SubscriptionScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;