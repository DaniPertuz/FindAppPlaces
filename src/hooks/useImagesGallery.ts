import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker';

import { PlacesContext } from '../context';
import { IPlace } from '../interfaces';

interface Props {
    place: IPlace;
}

export const useImagesGallery = ({ place }: Props) => {
    const { updatePlace, uploadPics, removePic } = useContext(PlacesContext);

    const [displayCamera, setDisplayCamera] = useState(false);
    const [displayCameraOne, setDisplayCameraOne] = useState(false);
    const [displayCameraTwo, setDisplayCameraTwo] = useState(false);
    const [placeImage, setPlaceImage] = useState<string>('');
    const [placeImageOne, setPlaceImageOne] = useState<string>('');
    const [placeImageTwo, setPlaceImageTwo] = useState<string>('');
    const [placeImages, setPlaceImages] = useState<string[]>([]);
    const [response, setResponse] = useState<ImagePickerResponse>();

    const removeSingleImage = () => {
        setPlaceImages(placeImages.splice(0, 1));
        setDisplayCamera(true);
    };

    const removeImageOneFromAllImages = () => {
        placeImages[0] = '';
        setDisplayCameraOne(true);
    };

    const removeImageOne = () => {
        setPlaceImageOne('');
        setDisplayCameraOne(true);
    };

    const removeImageTwoFromAllImages = () => {
        placeImages[1] = '';
        setDisplayCameraTwo(true);
    };

    const removeImageTwo = () => {
        setPlaceImageTwo('');
        setDisplayCameraTwo(true);
    };

    const launchImageLibraryAsync = () => {
        return new Promise<ImagePickerResponse>((resolve) => {
            launchImageLibrary({
                mediaType: 'photo',
                quality: 0.8,
                selectionLimit: 1
            }, (resp: ImagePickerResponse) => {
                resolve(resp);
            });
        });
    };

    const addGalleryPic = async (setImage: (uri: string) => void, setDisplayCamera?: Dispatch<SetStateAction<boolean>>) => {
        try {
            const resp = await launchImageLibraryAsync();
            if (resp.didCancel || !resp.assets![0].uri) return;

            const uri = resp.assets![0].uri;

            setImage(uri);

            if (setDisplayCamera) {
                setDisplayCamera(false);
            }

            setResponse(resp);
        } catch (error) {
            console.error(error);
        }
    };

    const addGalleryPics = async () => {
        try {
            const resp = await launchImageLibraryAsync();
            if (!resp.assets || resp.didCancel || !resp.assets[0]?.uri) return;

            const uris = resp.assets!.map((asset) => asset.uri).filter(Boolean) as string[];

            setPlaceImages(prevImages => [...prevImages, ...uris]);
            setResponse(resp);
        } catch (error) {
            console.error(error);
        }
    };

    const handleUploadPics = async (response: ImagePickerResponse) => {
        if (response) {
            const upload = await uploadPics(response);
            return upload;
        }
    };

    const handleRemovePic = (index: number) => {
        const updatedImages = [...placeImages];
        const imageToDelete: string = updatedImages[index];
        removePic(imageToDelete);
        updatedImages.splice(index, 1);
        updatePlace(place._id!, { ...place, pics: updatedImages });
        setPlaceImages(updatedImages);
    };

    useEffect(() => {
        setPlaceImages(place.pics);
    }, []);

    return {
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
        handleUploadPics,
        removeImageOne,
        removeImageOneFromAllImages,
        removeImageTwo,
        removeImageTwoFromAllImages,
        removeSingleImage,
        setDisplayCameraOne,
        setDisplayCameraTwo,
        setPlaceImage,
        setPlaceImageOne,
        setPlaceImageTwo,
        setPlaceImages
    };
};
