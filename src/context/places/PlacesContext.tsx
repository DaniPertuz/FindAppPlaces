import { createContext } from 'react';
import { IPlace } from '../../interfaces';

type PlaceContextProps = {
    registerPlace: (place: IPlace) => Promise<void>;
}

export const PlacesContext = createContext({} as PlaceContextProps);