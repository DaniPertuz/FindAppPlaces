import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext, useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';

import { MainNavigator } from './';
import { AuthContext } from '../context';
import { LoginScreen, RegisterScreen, NewPasswordScreen, LoadingScreen } from '../screens';

const Stack = createStackNavigator();

const Navigation = () => {

    const { status, user } = useContext(AuthContext);

    useEffect(() => {
        SplashScreen.hide();
    }, []);

    if (status === 'checking') return <LoadingScreen />;

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            {(!user || status !== 'authenticated')
                ?
                (
                    <>
                        <Stack.Screen name='LoginScreen' component={LoginScreen} />
                        <Stack.Screen name='RegisterScreen' component={RegisterScreen} />
                        <Stack.Screen name='NewPasswordScreen' component={NewPasswordScreen} />
                    </>
                )
                :
                <>
                    <Stack.Screen name='MainScreen' component={MainNavigator} />
                </>
            }
        </Stack.Navigator>
    );
};

export default Navigation;