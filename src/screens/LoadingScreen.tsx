import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import styles from '../themes/AppTheme';

const LoadingScreen = () => {
    return (
        <View style={styles.flexOneAlignJustifyCenter}>
            <ActivityIndicator size={50} color='#000000' />
        </View>
    );
};

export default LoadingScreen;