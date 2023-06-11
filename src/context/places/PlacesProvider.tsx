import React, { useReducer } from 'react';
import findAPI from '../../api/findapi';
import { PlacesContext, PlacesReducer } from '.';
import { IPlace } from '../../interfaces';

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
            registerPlace,
            removeError
        }}
        >
            {children}
        </PlacesContext.Provider>
    );
};