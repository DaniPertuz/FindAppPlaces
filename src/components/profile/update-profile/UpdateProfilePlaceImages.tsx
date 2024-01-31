import React from 'react';
import { View } from 'react-native';
import UpdateProfileMultipleImages from './UpdateProfileMultipleImages';
import AddImageButton from '../forms/images-gallery/AddImageButton';
import { styles } from './styles';

interface Props {
    images: string[];
    onAdd: () => void;
    onRemove: (value: number) => void;
}

const UpdateProfilePlaceImages = ({ images, onAdd, onRemove }: Props) => {
    return (
        <View style={styles.flexDirectionRowJustifySpaceBetween}>
            {(images.length === 0) ? (
                <AddImageButton onPress={onAdd} icon="CameraPlus" />
            ) : (
                <UpdateProfileMultipleImages images={images} onRemove={onRemove} onAdd={onAdd} />
            )}
        </View>
    );
};

export default UpdateProfilePlaceImages;