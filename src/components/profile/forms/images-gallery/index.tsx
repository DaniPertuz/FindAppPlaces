import React, { useEffect } from 'react';
import { View } from 'react-native';
import { ImagePickerResponse } from 'react-native-image-picker';

import AddImageButton from './AddImageButton';
import { UpdateProfilePlaceImages, UpdateProfileRemoveImage } from '../../update-profile';
import { useImagesGallery } from '../../../../hooks';
import { IPlace } from '../../../../interfaces';

import { styles } from './styles';

interface Props {
    place: IPlace;
    handlePicsFromGallery: (response: ImagePickerResponse) => void;
}

const ImagesGallery = ({ place, handlePicsFromGallery }: Props) => {
    const {
        displayCamera,
        displayCameraOne,
        displayCameraTwo,
        placeImage,
        placeImageOne,
        placeImages,
        placeImageTwo,
        response,
        addGalleryPic,
        addGalleryPics,
        handleRemovePic,
        removeImageOne,
        removeImageOneFromAllImages,
        removeImageTwo,
        removeImageTwoFromAllImages,
        removeSingleImage,
        setDisplayCameraOne,
        setDisplayCameraTwo,
        setPlaceImage,
        setPlaceImageOne,
        setPlaceImageTwo
    } = useImagesGallery({ place });

    useEffect(() => {
        if (response) handlePicsFromGallery(response);
    }, [response]);

    return (
        <>
            {(!place.pics) ?
                <AddImageButton onPress={() => addGalleryPics()} icon="CameraPlus" />
                :
                <>
                    {(place.premium === 1) &&
                        <>
                            {(placeImages.length === 1)
                                ?
                                <>
                                    <UpdateProfileRemoveImage uri={placeImages[0]!} onRemove={removeSingleImage} />
                                    {(displayCamera) &&
                                        <View>
                                            <AddImageButton onPress={() => addGalleryPic(setPlaceImage)} icon="CameraPlus" />
                                        </View>
                                    }
                                </>
                                :
                                <View style={styles.flexDirectionRow}>
                                    {(placeImage === '')
                                        ?
                                        <AddImageButton onPress={() => addGalleryPic(setPlaceImage)} icon="CameraPlus" />
                                        :
                                        <UpdateProfileRemoveImage uri={placeImage} onRemove={() => setPlaceImage('')} />
                                    }
                                </View>
                            }
                        </>
                    }
                    {(place.premium === 2) &&
                        <>
                            {(placeImages.length === 2) ?
                                <View style={styles.flexDirectionRow}>
                                    <View>
                                        {(placeImages[0] !== '') &&
                                            <UpdateProfileRemoveImage uri={placeImages[0]!} onRemove={removeImageOneFromAllImages} />
                                        }
                                        {(placeImageOne !== '') &&
                                            <UpdateProfileRemoveImage uri={placeImageOne} onRemove={removeImageOne} />
                                        }
                                    </View>
                                    {(displayCameraOne && (placeImages[0] === '' || placeImageOne === '')) &&
                                        <AddImageButton onPress={() => addGalleryPic(setPlaceImage, setDisplayCameraOne)} icon="CameraPlus" />
                                    }
                                    <View>
                                        {(placeImages[1] !== '') &&
                                            <UpdateProfileRemoveImage uri={placeImages[1]!} onRemove={removeImageTwoFromAllImages} />
                                        }
                                        {(placeImageTwo !== '') &&
                                            <UpdateProfileRemoveImage uri={placeImageTwo} onRemove={removeImageTwo} />
                                        }
                                    </View>
                                    {(displayCameraTwo) &&
                                        <View>
                                            <AddImageButton onPress={() => addGalleryPic(setPlaceImage, setDisplayCameraTwo)} icon="CameraPlus" />
                                        </View>
                                    }
                                </View>
                                :
                                <View style={styles.flexDirectionRow}>
                                    {(placeImageOne === '')
                                        ?
                                        <AddImageButton onPress={() => addGalleryPic(setPlaceImage, setDisplayCameraOne)} icon="CameraPlus" />
                                        :
                                        <UpdateProfileRemoveImage uri={placeImageOne} onRemove={() => setPlaceImageOne('')} />
                                    }
                                    {(placeImageTwo === '')
                                        ?
                                        <AddImageButton onPress={() => addGalleryPic(setPlaceImage, setDisplayCameraTwo)} icon="CameraPlus" />
                                        :
                                        <UpdateProfileRemoveImage uri={placeImageTwo} onRemove={() => setPlaceImageTwo('')} />
                                    }
                                </View>
                            }
                        </>
                    }
                    {(place.premium === 3) &&
                        <UpdateProfilePlaceImages images={placeImages} onAdd={() => addGalleryPics()} onRemove={handleRemovePic} />
                    }
                </>
            }
        </>
    );
};

export default ImagesGallery;