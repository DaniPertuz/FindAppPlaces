import React from 'react';
import { TextInput, View } from 'react-native';
import { styles } from './styles';

interface Props {
    description: string;
    onChange: (value: string, field: 'description') => void;
}

const UpdateProfileDescriptionInput = ({ description, onChange }: Props) => {
    return (
        <View style={styles.inputFieldDescriptionContainerWhite}>
            <TextInput
                placeholder='Descripción'
                placeholderTextColor='#9A9A9A'
                keyboardType='default'
                style={styles.inputField}
                selectionColor='#9A9A9A'
                autoCapitalize='none'
                autoCorrect={false}
                multiline
                onChangeText={(value) => onChange(value, 'description')}
                value={description}
            />
        </View>
    );
};

export default UpdateProfileDescriptionInput;