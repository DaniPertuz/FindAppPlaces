import React from 'react';
import { ScrollView, View } from 'react-native';
import AddImageButton from '../forms/images-gallery/AddImageButton';
import UpdateProfileRemoveImage from './UpdateProfileRemoveImage';

interface Props {
    images: string[];
    onAdd: () => void;
    onRemove: (value: number) => void;
}

const UpdateProfileMultipleImages = ({ images, onAdd, onRemove }: Props) => {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {images.map((image, index) => (
                <View key={index}>
                    <UpdateProfileRemoveImage uri={image} onRemove={() => onRemove(index)} />
                </View>
            ))}
            <AddImageButton onPress={onAdd} icon="CameraPlus" />
        </ScrollView>
    );
};

export default UpdateProfileMultipleImages;