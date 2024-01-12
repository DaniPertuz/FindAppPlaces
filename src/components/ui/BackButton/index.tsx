import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useIcons } from '../../../hooks';

interface Props {
    onPress: () => void;
}

const BackButton = ({ onPress }: Props) => {
    return (
        <TouchableOpacity activeOpacity={1.0} onPress={onPress}>
            {useIcons('Back', 25, 25)}
        </TouchableOpacity>
    );
};

export default BackButton;