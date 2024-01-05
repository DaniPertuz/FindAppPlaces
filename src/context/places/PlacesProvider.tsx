import React, { useReducer } from 'react';
import findAPI from '../../api/findapi';
import { ImagePickerResponse } from 'react-native-image-picker';
import { PlacesContext, PlacesReducer } from '.';
import { IFavorites, IHistory, IPlace, IRatingList } from '../../interfaces';

export interface PlacesState {
    place: IPlace | null;
    errors: string;
}

const PLACES_INITIAL_STATE: PlacesState = {
    place: null,
    errors: ''
};

export const PlacesProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(PlacesReducer, PLACES_INITIAL_STATE);

    const getFavorites = async (placeId: string): Promise<IFavorites> => {
        try {
            const { data } = await findAPI.get<IFavorites>(`/favorites/place/${placeId}`);
            return data;
        } catch (error: any) {
            console.log(error.response.data.message);
            throw new Error(`${error}`);
        }
    };

    const getHistory = async (placeId: string): Promise<IHistory> => {
        try {
            const { data } = await findAPI.get<IHistory>(`/services/place/${placeId}`);
            return data;
        } catch (error: any) {
            console.log(error.response.data.message);
            throw new Error(`${error}`);
        }
    };

    const getPlaceRatingAverage = async (placeID: string): Promise<number> => {
        try {
            const { data } = await findAPI.get<{ average: number; }>(`/ratings/place/${placeID}`);
            return data.average;
        } catch (error) {
            throw new Error(`${error}`);
        }
    };

    const getRatings = async (placeId: string): Promise<IRatingList> => {
        try {
            const { data } = await findAPI.get<IRatingList>(`/ratings/all/${placeId}`);
            return data;
        } catch (error: any) {
            console.log(error.response.data.message);
            throw new Error(`${error}`);
        }
    };

    const loadPlaceByEmail = async (email: string): Promise<IPlace> => {
        try {
            const resp = await findAPI.get<IPlace>('/places/email', { params: { email } });
            return resp.data;
        } catch (error) {
            throw new Error(`${error}`);
        }
    };

    const registerPlace = async (place: IPlace) => {
        try {
            const {
                name,
                description,
                category,
                address,
                email,
                coords,
                phone,
                whatsapp,
                instagram,
                city,
                state,
                country,
                schedule,
                photo,
                premium,
                pics,
                rate,
                status
            } = place;

            await findAPI.post<IPlace>('/places', {
                name,
                description,
                category,
                address,
                email,
                coords,
                phone,
                whatsapp,
                instagram,
                city,
                state,
                country,
                schedule,
                photo,
                premium,
                pics,
                rate,
                status
            });
        } catch (error: any) {
            console.log(error.response);
            throw new Error(`${error}`);
        }
    };

    const updatePlace = async (id: string, data: IPlace): Promise<IPlace> => {
        try {
            const resp = await findAPI.put<IPlace>(`/places/${id}`, data);
            return resp.data;
        } catch (error) {
            throw new Error(`${error}`);
        }
    };

    const updatePlacePhoto = async (id: string, photoURL: string): Promise<IPlace> => {
        try {
            const resp = await findAPI.put<IPlace>(`/places/photo/${id}`, { photo: photoURL });
            return resp.data;
        } catch (error) {
            throw new Error(`${error}`);
        }
    };

    const uploadPics = async (data: ImagePickerResponse) => {
        let pics: string[] = [];
        const headers = {
            'Content-Type': 'multipart/form-data'
        };

        for (let i = 0; i < data.assets!.length; i++) {
            const element = data.assets![i];
            const { uri, type, fileName } = element;

            const fileToUpload = {
                uri,
                type,
                name: fileName
            };
            const uploadData = new FormData();
            uploadData.append('file', fileToUpload);
            uploadData.append('upload_preset', 'findapp');

            const upload = await fetch('https://api.cloudinary.com/v1_1/dpertuzo/upload', {
                method: 'POST',
                headers,
                body: uploadData
            });
            const { secure_url } = await upload.json();
            pics.push(secure_url);
        }

        return pics;
    };

    const removeError = (): void => {
        dispatch({ type: 'removeError' });
    };

    return (
        <PlacesContext.Provider value={{
            ...state,
            getFavorites,
            getHistory,
            getPlaceRatingAverage,
            getRatings,
            loadPlaceByEmail,
            registerPlace,
            updatePlacePhoto,
            updatePlace,
            uploadPics,
            removeError
        }}
        >
            {children}
        </PlacesContext.Provider>
    );
};