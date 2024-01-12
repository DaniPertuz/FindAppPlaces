import React from 'react';
import { TextInput, View } from 'react-native';
import { useIcons } from '../../../../hooks';
import { styles } from './styles';

interface Props {
    email: string;
}

const DisabledInput = ({ email }: Props) => {
    return (
        <View style={styles.inputFieldContainerGray}>
            {useIcons('Envelope', 20, 20)}
            <TextInput editable={false} style={styles.inputFieldGray} value={email} />
        </View>
    );
};

export default DisabledInput;