import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MainScreen, ProfileScreen, SubscriptionScreen } from '../screens';
import { useIcons } from '../hooks';

import styles from '../themes/AppTheme';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                labelStyle: styles.bottomTabNavigatorLabStyle,
                style: styles.bottomTabNavigatorMinHeight
            }}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    switch (route.name) {
                        case 'Home':
                            return <View style={styles.bottomTabNavigatorItem}>
                                {(focused)
                                    ? useIcons('HouseFocused', 22, 22)
                                    : useIcons('House', 22, 22)
                                }
                                <View style={styles.mediumMarginStart}>
                                    <Text style={{ ...styles.bottomTabNavigatorItemFont, color: (focused) ? '#207CFD' : '#5A5A5A' }}>Inicio</Text>
                                </View>
                            </View>;

                        case 'Subscriptions':
                            return <View style={styles.bottomTabNavigatorItem}>
                                {(focused)
                                    ? useIcons('TrophyFocused', 22, 22)
                                    : useIcons('Trophy', 22, 22)
                                }
                                <View style={styles.mediumMarginStart}>
                                    <Text style={{ ...styles.bottomTabNavigatorItemFont, color: (focused) ? '#207CFD' : '#5A5A5A' }}>Suscripción</Text>
                                </View>
                            </View>;

                        case 'Profile':
                            return <View style={styles.bottomTabNavigatorItem}>
                                {(focused)
                                    ? useIcons('UserCircleFocused', 22, 22)
                                    : useIcons('UserCircle', 22, 22)
                                }
                                <View style={styles.mediumMarginStart}>
                                    <Text style={{ ...styles.bottomTabNavigatorItemFont, color: (focused) ? '#207CFD' : '#5A5A5A' }}>Perfil</Text>
                                </View>
                            </View>;
                    }
                }
            })}
        >
            <Tab.Screen name="Home" options={{ title: '' }} component={MainScreen} />
            <Tab.Screen name="Subscriptions" options={{ title: '' }} component={SubscriptionScreen} />
            <Tab.Screen name="Profile" options={{ title: '' }} component={ProfileScreen} />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;