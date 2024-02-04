import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import AddImageButton from '../AddImageButton';
import EditButton from '../../../../ui/EditButton';
import { IPlace } from '../../../../../interfaces';
import { styles } from './styles';

interface Props {
    editPics: boolean;
    place: IPlace;
    placeImages: string[];
    addGalleryPics: () => void;
    onPressEdit: () => void;
}

const MultiplePics = ({ editPics, place, placeImages, addGalleryPics, onPressEdit }: Props) => {
    return (
        <>
            {(editPics)
                ?
                <>
                    <View style={styles.flexDirectionRow}>
                        <AddImageButton onPress={addGalleryPics} icon="CameraPlus" />
                    </View>
                    {(place.premium === 2) && <Text style={styles.warningText}>Hasta 2 imágenes</Text>}
                </>
                :
                <>
                    <View style={styles.flexDirectionRow}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {placeImages.map((image, index) => (
                                <View key={index}>
                                    <Image source={{ uri: image }} style={styles.imageFromGallery} />
                                </View>
                            ))}
                            {(placeImages.length === 0 && (place.premium === 2 || place.premium === 3)) && <AddImageButton onPress={addGalleryPics} icon="CameraPlus" />}
                        </ScrollView>
                    </View>
                    {(placeImages.length !== 0) && <EditButton onPress={onPressEdit} />}
                </>
            }
        </>
    );
};

export default MultiplePics;