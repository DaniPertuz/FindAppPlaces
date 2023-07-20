import { createContext } from 'react';
import { IPlace } from '../../interfaces';

type PlaceContextProps = {
    place:            IPlace | null;
    errors:           string;
    loadPlaceByEmail: (email: string) => Promise<IPlace>
    registerPlace:    (place: IPlace) => Promise<void>;
    removeError:      () => void;
}

export const PlacesContext = createContext({} as PlaceContextProps);