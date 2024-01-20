import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

interface Props {
    onPress: () => void;
}

const SaveScheduleButton = ({ onPress }: Props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={1.0} style={styles.alignJustifyCenter} onPress={onPress}>
                <Text style={styles.captionLink}>Guardar</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SaveScheduleButton;