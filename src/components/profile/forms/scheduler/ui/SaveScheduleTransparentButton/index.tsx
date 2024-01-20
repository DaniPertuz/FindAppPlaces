import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

interface Props {
    onPress: () => void;
}

const SaveScheduleTransparentButton = ({ onPress }: Props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.8} style={styles.buttonTransparent} onPress={onPress}>
                <Text style={styles.captionLink}>Guardar</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SaveScheduleTransparentButton;