import React from 'react';
import { Alert } from 'react-native';
import findAPI from '../../api/findapi';
import { PlacesContext } from '.';
import { IPlace } from '../../interfaces';

export const PlacesProvider = ({ children }: any) => {

    const registerPlace = async (place: IPlace) => {
        try {
            await findAPI.post('/places', place);
        } catch (error: any) {
            Alert.alert('Error', error.response.data.errors.map(({ msg }: any) => ( msg )).join('\n'));
            // console.error(error.response.data.errors.map(({ msg }: any) => ( msg )).join('\n'));
        }
    }

return (
    <PlacesContext.Provider value={{
        registerPlace
    }}
    >
        {children}
    </PlacesContext.Provider>
);
};