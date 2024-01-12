import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker';
import { PlacesContext } from '../context';

export const useImages = () => {

    const [allImages, setAllImages] = useState<(string)[]>([]);
    const [response, setResponse] = useState<ImagePickerResponse>();

    const { uploadPics } = useContext(PlacesContext);

    const addGalleryImage = (setImage: (uri: string) => void, setDisplayCamera?: Dispatch<SetStateAction<boolean>>) => {
        launchImageLibrary({
            mediaType: 'photo',
            quality: 0.8,
            selectionLimit: 1
        }, (resp: ImagePickerResponse) => {
            if (resp.didCancel) return;
            if (!resp.assets![0].uri) return;

            const uri = resp.assets![0].uri;

            setImage(uri);

            if (setDisplayCamera) {
                setDisplayCamera(false);
            }

            setResponse(resp);
        });
    };

    const addGalleryImages = () => {
        launchImageLibrary({
            mediaType: 'photo',
            quality: 0.8,
            selectionLimit: 0
        }, (resp: ImagePickerResponse) => {
            if (resp.didCancel) return;
            if (!resp.assets![0].uri) return;

            const uris = resp.assets!.map((asset) => asset.uri).filter(Boolean) as string[];
            setAllImages((prevImages) => [...prevImages, ...uris]);
            setResponse(resp);
        });
    };

    const handleUploadPics = async () => {
        if (response) {
            if (response.didCancel) return;
            if (!response.assets![0].uri) return;

            const upload = await uploadPics(response);
            return upload;
        }
    };

    const handleRemoveImage = (index: number) => {
        const updatedImages = [...allImages];
        updatedImages.splice(index, 1);
        setAllImages(updatedImages);
    };

    return {
        allImages,
        addGalleryImage,
        addGalleryImages,
        handleRemoveImage,
        handleUploadPics
    };
};
