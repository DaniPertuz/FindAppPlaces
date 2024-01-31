import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { useIcons } from '../../../hooks';
import { styles } from './styles';

interface Props {
    uri: string;
    onRemove: () => void;
}

const UpdateProfileRemoveImage = ({ uri, onRemove }: Props) => {
    return (
        <View>
            {uri && (
                <>
                    <TouchableOpacity activeOpacity={1.0} style={styles.minusButton} onPress={onRemove}>
                        {useIcons('Minus', 20, 20)}
                    </TouchableOpacity>
                    <Image source={{ uri }} style={styles.imageFromGallery} />
                </>
            )}
        </View>
    );
};

export default UpdateProfileRemoveImage;