import React from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { useIcons } from '../../../hooks';
import AddImageButton from '../forms/images-gallery/Button';
import styles from '../../../themes/AppTheme';

interface Props {
    images: (string | undefined)[];
    onAdd: () => void;
    onRemove: (value: number) => void;
}

const UpdateProfileMultipleImages = ({ images, onAdd, onRemove }: Props) => {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {images.map((image, index) => (
                <View key={index}>
                    <TouchableOpacity
                        activeOpacity={1.0}
                        style={styles.minusButton}
                        onPress={() => onRemove(index)}
                    >
                        {useIcons('Minus', 20, 20)}
                    </TouchableOpacity>
                    <Image source={{ uri: image }} style={styles.imageFromGallery} />
                </View>
            ))}
            <AddImageButton onPress={onAdd} icon="CameraPlus" />
        </ScrollView>
    );
};

export default UpdateProfileMultipleImages;