import React from 'react';
import { TextInput, View } from 'react-native';
import { useIcons } from '../../../../hooks';
import { styles } from './styles';

interface Props {
    field: string;
    fieldValue: 'name' | 'category' | 'other' | 'phone' | 'whatsapp' | 'instagram'
    placeholder: string;
    icon: string;
    keyboardType: 'default' | 'numeric' | 'email-address' | "ascii-capable" | 'numbers-and-punctuation' | 'url' | 'number-pad' | 'phone-pad' | 'name-phone-pad' | 'decimal-pad' | 'twitter' | 'web-search' | 'visible-password';
    onChange: (value: string, field: 'name' | 'category' | 'other' | 'phone' | 'whatsapp' | 'instagram') => void;
}

const DefaultInput = ({ field, fieldValue, placeholder, icon, keyboardType, onChange }: Props) => {
    return (
        <View style={styles.inputFieldContainerWhite}>
            {useIcons(icon, 20, 20)}
            <TextInput
                placeholder={placeholder}
                placeholderTextColor='#9A9A9A'
                keyboardType={keyboardType}
                style={styles.inputFieldBlack}
                selectionColor='#9A9A9A'
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={(value) => onChange(value, fieldValue)}
                value={field}
            />
        </View>
    );
};

export default DefaultInput;