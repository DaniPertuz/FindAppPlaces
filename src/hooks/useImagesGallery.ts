import { useContext, useEffect, useState } from 'react';
import { ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker';

import { PlacesContext } from '../context';
import { IPlace } from '../interfaces';

interface Props {
    place: IPlace;
}

export const useImagesGallery = ({ place }: Props) => {
    const { uploadPics, removePic } = useContext(PlacesContext);

    const [placeImages, setPlaceImages] = useState<string[]>([]);
    const [response, setResponse] = useState<ImagePickerResponse>();

    const launchImageLibraryAsync = (selectionLimit: number) => {
        return new Promise<ImagePickerResponse>((resolve) => {
            launchImageLibrary({
                mediaType: 'photo',
                quality: 0.8,
                selectionLimit
            }, (resp: ImagePickerResponse) => {
                const modifiedResp: ImagePickerResponse = {
                    ...resp,
                    assets: resp.assets ? ((place.premium === 2 && place.pics.length === 0) ? resp.assets.slice(0, 2) : (place.premium === 2 && place.pics.length === 1) ? resp.assets.slice(0, 1) : resp.assets) : [],
                };

                resolve(modifiedResp);
            });
        });
    };

    const addGalleryPic = async () => {
        try {
            const resp = await launchImageLibraryAsync(1);
            if (resp.didCancel || !resp.assets![0].uri) return;

            const uri = resp.assets![0].uri;

            setPlaceImages([uri]);
            setResponse(resp);
        } catch (error) {
            console.error(error);
        }
    };

    const addGalleryPics = async () => {
        try {
            const resp = await launchImageLibraryAsync(0);

            if (!resp.assets || resp.didCancel) return;

            const uris = resp.assets.map((asset) => asset.uri).filter(Boolean) as string[];

            setPlaceImages([...uris]);
            setResponse(resp);
        } catch (error) {
            console.error(error);
        }
    };

    const handleUploadPics = async (response: ImagePickerResponse) => {
        if (!response) return;

        try {
            await Promise.all(place.pics.map((pic) => removePic(pic)));
            return await uploadPics(response);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        setPlaceImages(place.pics);
    }, []);

    return {
        placeImages,
        response,
        addGalleryPic,
        addGalleryPics,
        handleUploadPics,
        setPlaceImages
    };
};
