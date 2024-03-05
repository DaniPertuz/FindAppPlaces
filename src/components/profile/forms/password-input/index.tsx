import React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { useIcons, usePasswordVisibility } from '../../../../hooks';
import { styles } from './styles';

interface Props {
    field: string;
    fieldValue: 'password' | 'confirmPassword';
    placeholder: string;
    warning?: boolean;
    onChange: (value: string, field: 'password' | 'confirmPassword') => void;
}

const PasswordInput = ({ field, fieldValue, placeholder, warning, onChange }: Props) => {

    const { eyeIcon, passwordVisibility, handlePasswordVisibility } = usePasswordVisibility();

    return (
        <View style={[styles.inputFieldContainerWhite, (warning) && styles.warningBorder]}>
            <View style={styles.tinyButtonSize}>{useIcons('Lock', 20, 20)}</View>
            <TextInput
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={(value) => onChange(value, fieldValue)}
                placeholder={placeholder}
                placeholderTextColor='#9A9A9A'
                secureTextEntry={passwordVisibility}
                selectionColor='#9A9A9A'
                style={[styles.inputField, styles.flexTwo]}
                value={field}
            />
            <TouchableOpacity activeOpacity={1.0} onPress={handlePasswordVisibility}>
                <View style={styles.alignItemsCenter}>{useIcons(eyeIcon, 20, 20)}</View>
            </TouchableOpacity>
        </View>
    );
};

export default PasswordInput;