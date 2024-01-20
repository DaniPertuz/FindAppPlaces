import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

interface Props {
    onPress: () => void;
}

const SchedulerEditButton = ({ onPress }: Props) => {
    return (
        <View style={styles.scheduleMarginTop}>
            <TouchableOpacity activeOpacity={1.0} onPress={onPress}>
                <Text style={styles.captionLink}>Editar</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SchedulerEditButton;