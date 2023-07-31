import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import LinearGradientComponent from '../../../components/LinearGradientComponent';
import { useIcons } from '../../../hooks';
import styles from '../../../themes/AppTheme';

interface Props {
    level: number;
}

const SubscriptionItem = ({ level }: Props) => {
    return (
        <View>
            <View style={styles.flexDirectionRow}>
                <LinearGradientComponent level={level} icon={(level === 3) ? 'Trophy' : (level === 2) ? 'MediumLevel' : 'BasicLevel'} />
                <View style={{ ...styles.smallMediumMarginStart, ...styles.justifyContentCenter }}>
                    <Text style={styles.subheadline}>{(level === 3) ? 'Paquete Premium' : (level === 2) ? 'Paquete Regular' : 'Paquete Básico'}</Text>
                </View>
            </View>
            <View style={{ marginTop: 12 }}>
                <View style={styles.flexDirectionRowAlignCenter}>
                    {useIcons('Money', 15, 15)}
                    <View style={styles.tinyMarginStart}>
                        <Text style={styles.captionTwo}>{(level === 3) ? '$ 20' : (level === 2) ? '$ 15' : '$ 10'}.000/Mensuales</Text>
                    </View>
                </View>
                <View style={styles.smallMediumMarginTop}>
                    <View style={{ ...styles.flexDirectionRowAlignCenter, ...styles.smallMediumMarginTop }}>
                        {useIcons('Check', 15, 15)}
                        <View style={styles.tinyMarginStart}>
                            <Text style={styles.caption}>{(level === 3) ? 'Alta' : (level === 2) ? 'Media' : 'Baja'} prioridad en búsquedas.</Text>
                        </View>
                    </View>
                    <View style={{ ...styles.flexDirectionRowAlignCenter, ...styles.smallMediumMarginTop }}>
                        {useIcons('Check', 15, 15)}
                        <View style={styles.tinyMarginStart}>
                            <Text style={styles.caption}>Puedes subir {(level === 3) ? 'fotos ilimitadas' : (level === 2) ? 'hasta 2 fotos' : 'hasta 1 foto'} del lugar.</Text>
                        </View>
                    </View>
                    {((level === 2) || (level === 3)) &&
                        <View style={{ ...styles.flexDirectionRow, ...styles.justifyContentFlexStart, ...styles.smallMediumMarginTop }}>
                            {useIcons('Check', 15, 15)}
                            <View style={styles.tinyMarginStart}>
                                <Text style={styles.caption}>Registrar más canales de comunicación del lugar (Instagram & WhatsApp).</Text>
                            </View>
                        </View>
                    }
                </View>
            </View>
        </View>
    );
};

export default SubscriptionItem;