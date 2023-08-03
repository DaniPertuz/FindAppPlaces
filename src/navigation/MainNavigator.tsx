import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ProfileNavigator } from './';
import BottomTabNavigator from './BottomTabNavigator';
import { IPlace, IProduct } from '../interfaces';
import { ProductsScreen, UpdateProfileScreen } from '../screens';
import ProductDetails from '../screens/main/products/ProductDetails';

export type RootStackParams = {
    BottomTabNavigator: undefined;
    LoginScreen: undefined,
    MainScreen: undefined,
    NewPasswordScreen: undefined,
    ProductsScreen: undefined,
    ProductDetails: { product: IProduct; },
    Profile: undefined,
    RegisterScreen: undefined,
    UpdateProfileScreen: { place: IPlace; };
};

const Stack = createStackNavigator<RootStackParams>();

const MainNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
            <Stack.Screen name="Profile" component={ProfileNavigator} />
            <Stack.Screen name="UpdateProfileScreen" component={UpdateProfileScreen} />
            <Stack.Screen name="ProductsScreen" component={ProductsScreen} />
            <Stack.Screen name="ProductDetails" component={ProductDetails} />
        </Stack.Navigator>
    );
};

export default MainNavigator;