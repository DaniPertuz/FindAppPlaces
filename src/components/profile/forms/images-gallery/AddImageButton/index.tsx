import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useIcons } from '../../../../../hooks';
import { styles } from './styles';

interface Props {
    icon: string;
    onPress: () => void;
}

const AddImageButton = ({ icon, onPress }: Props) => {
    return (
        <TouchableOpacity activeOpacity={1.0} style={styles.addImagesButton} onPress={onPress}>
            {useIcons(icon, 20, 20)}
        </TouchableOpacity>
    );
};

export default AddImageButton;