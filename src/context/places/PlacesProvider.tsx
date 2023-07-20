import React, { useReducer } from 'react';
import findAPI from '../../api/findapi';
import { PlacesContext, PlacesReducer } from '.';
import { IPlace, IRatingList } from '../../interfaces';

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

    const getFavorites = async (placeId: string): Promise<number> => {
        try {
            const { data } = await findAPI.get<number>(`/favorites/place/${placeId}`);
            return data;
        } catch (error: any) {
            console.log(error.response.data.message);
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
            const { data } = await findAPI.post<IPlace>('/places', place);
            dispatch({ type: 'addPlace', payload: { place: data } });
        } catch (error: any) {
            dispatch({ type: 'addError', payload: error.response.data.errors.map(({ msg }: any) => (msg)).join('\n') });
        }
    };

    const removeError = (): void => {
        dispatch({ type: 'removeError' });
    };

    return (
        <PlacesContext.Provider value={{
            ...state,
            getFavorites,
            getRatings,
            loadPlaceByEmail,
            registerPlace,
            removeError
        }}
        >
            {children}
        </PlacesContext.Provider>
    );
};