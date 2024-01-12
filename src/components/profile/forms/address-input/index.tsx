import React from 'react';
import { TextInput } from 'react-native';
import { View } from 'react-native';
import { useIcons } from '../../../../hooks';
import { styles } from './styles';

interface Props {
    field: string;
    onBlur: () => void;
    onChange: (value: string, field: 'address') => void;
}

const AddressInput = ({ field, onBlur, onChange }: Props) => {
    return (
        <View style={styles.inputFieldContainerWhite}>
            {useIcons('Mall', 20, 20)}
            <TextInput
                placeholder='Dirección, ciudad, depto, país'
                placeholderTextColor='#9A9A9A'
                keyboardType='default'
                style={styles.inputFieldBlack}
                selectionColor='#9A9A9A'
                autoCapitalize='none'
                autoCorrect={false}
                numberOfLines={1}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value, 'address')}
                value={field}
            />
        </View>
    );
};

export default AddressInput;