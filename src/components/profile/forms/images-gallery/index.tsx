import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ImagePickerResponse } from 'react-native-image-picker';

import SinglePic from './SinglePic';
import MultiplePics from './MultiplesPics';

import { useImagesGallery } from '../../../../hooks';
import { IPlace } from '../../../../interfaces';

import { styles } from './styles';

interface Props {
    place: IPlace;
    handlePicsFromGallery: (response: ImagePickerResponse) => void;
}

const ImagesGallery = ({ place, handlePicsFromGallery }: Props) => {
    const { placeImages, response, addGalleryPic, addGalleryPics } = useImagesGallery({ place });

    const [editPics, setEditPics] = useState(false);

    const onPressEdit = () => {
        setEditPics(true);
    };

    useEffect(() => {
        if (response) {
            handlePicsFromGallery(response);
            setEditPics(false);
        }
    }, [response]);

    return (
        <View style={styles.containerMarginTop}>
            {(place.premium === 1)
                ?
                <SinglePic addGalleryPic={addGalleryPic} editPics={editPics} onPressEdit={onPressEdit} uri={placeImages[0]} />
                :
                <MultiplePics addGalleryPics={addGalleryPics} editPics={editPics} onPressEdit={onPressEdit} place={place} placeImages={placeImages} />
            }
        </View>
    );
};

export default ImagesGallery;