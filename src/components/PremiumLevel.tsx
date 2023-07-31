import React from 'react';
import { Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { useIcons } from '../hooks';
import { IPlace } from '../interfaces';

import styles from '../themes/AppTheme';

interface Props {
    place: IPlace;
}

const PremiumLevel = ({ place }: Props) => {
    return (
        <View style={styles.tinyMarginTop}>
            <LinearGradient
                colors={(place?.premium === 3) ? ['#D6B238', '#F6E074'] : (place?.premium === 2) ? ['#B8B8B8', '#E2E2E2'] : ['#C08E5E', '#FAC294']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                    alignItems: 'center',
                    borderRadius: 999,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                    paddingVertical: 3
                }}
            >
                {useIcons(((place?.premium === 3) ? 'Trophy' : (place?.premium === 2) ? 'MediumLevel' : 'BasicLevel'), 22, 22)}
                <View style={styles.tinyMarginStart}>
                    <Text style={styles.footnote}>Nivel {place?.premium}</Text>
                </View>
            </LinearGradient>
        </View>
    );
};

export default PremiumLevel;