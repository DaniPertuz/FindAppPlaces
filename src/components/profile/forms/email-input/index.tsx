import React from 'react';
import { TextInput, View } from 'react-native';
import { useIcons } from '../../../../hooks';
import styles from './styles';

interface Props {
    field: string;
    fieldValue: 'email';
    placeholder: string;
    warning?: boolean;
    onChange: (value: string, field: 'email') => void;
}

const EmailInput = ({ field, fieldValue, placeholder, warning, onChange }: Props) => {
    return (
        <View style={[styles.inputFieldContainerWhite, (warning) && styles.warningBorder]}>
            {useIcons('Envelope', 20, 20)}
            <TextInput
                placeholder={placeholder}
                placeholderTextColor='#9A9A9A'
                keyboardType='email-address'
                style={[styles.inputField, { flex: 9 }]}
                selectionColor='#9A9A9A'
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={(value) => onChange(value, fieldValue)}
                value={field}
            />
        </View>
    );
};

export default EmailInput;