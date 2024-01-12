import React from 'react';
import { Text, View } from 'react-native';
import { useIcons } from '../../../hooks';
import { styles } from './styles';

interface Props {
    warningText: string;
}

const WarningMessage = ({ warningText }: Props) => {
    return (
        <View style={styles.flexDirectionRowTinyMarginTop}>
            <View style={styles.warningIconMargins}>
                {useIcons('Warning', 15, 15)}
            </View>
            <Text style={styles.warningText}>{warningText}</Text>
        </View>
    );
};

export default WarningMessage;