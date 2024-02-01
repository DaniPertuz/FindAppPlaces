import React, { useReducer } from 'react';
import { ImagePickerResponse } from 'react-native-image-picker';

import { PlacesContext, PlacesReducer } from '.';
import { IFavorites, IHistory, IPlace, IRatingList } from '../../interfaces';
import { deleteCloudinaryPic, handleUpdateCloudinaryPic } from '../../hooks';
import findAPI from '../../api/findapi';

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
            throw new Error(`${error}`);
        }
    };

    const getHistory = async (placeId: string): Promise<IHistory> => {
        try {
            const { data } = await findAPI.get<IHistory>(`/services/place/${placeId}`);
            return data;
        } catch (error: any) {
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

    const registerPlace = async (place: IPlace): Promise<void> => {
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
                cityState,
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
                cityState,
                country,
                schedule,
                photo,
                premium,
                pics,
                rate,
                status
            });
        } catch (error: any) {
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

    const uploadPics = async (data: ImagePickerResponse): Promise<string[]> => await handleUpdateCloudinaryPic(data);

    const removeError = (): void => dispatch({ type: 'removeError' });

    const removePic = async (url: string): Promise<void> => await deleteCloudinaryPic(url);

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
            removeError,
            removePic
        }}
        >
            {children}
        </PlacesContext.Provider>
    );
};