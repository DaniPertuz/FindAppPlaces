import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useIcons } from '../hooks';
import { Text, View } from 'react-native';
import styles from '../themes/AppTheme';

interface Props {
    level: number;
    icon: string;
}

const LinearGradientComponent = ({ level, icon }: Props) => {
    return (
        <LinearGradient
            colors={(level === 3) ? ['#D6B238', '#F6E074'] : (level === 2) ? ['#B8B8B8', '#E2E2E2'] : ['#C08E5E', '#FAC294']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.linearGradient}
        >
            {useIcons(icon, 22, 22)}
            <View style={styles.tinyMarginStart}>
                <Text style={styles.footnote}>Nivel {level}</Text>
            </View>
        </LinearGradient>
    );
};

export default LinearGradientComponent;