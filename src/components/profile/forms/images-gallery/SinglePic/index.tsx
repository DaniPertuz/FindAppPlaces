import React from 'react';
import { Image, Text, View } from 'react-native';
import AddImageButton from '../AddImageButton';
import EditButton from '../../../../ui/EditButton';
import { styles } from './styles';

interface Props {
    editPics: boolean;
    uri: string;
    addGalleryPic: () => void;
    onPressEdit: () => void;
}

const SinglePic = ({ editPics, uri, addGalleryPic, onPressEdit }: Props) => {
    return (
        <>
            {(editPics)
                ?
                <>
                    <View style={styles.flexDirectionRow}>
                        <AddImageButton onPress={addGalleryPic} icon="CameraPlus" />
                    </View>
                    <Text style={styles.warningText}>Hasta 1 imagen</Text>
                </>
                :
                <>
                    <View style={styles.flexDirectionRow}>
                        <Image source={{ uri }} style={styles.imageFromGallery} />
                    </View>
                    <EditButton onPress={onPressEdit} />
                </>
            }
        </>
    );
};

export default SinglePic;