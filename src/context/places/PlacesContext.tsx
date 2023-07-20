import { createContext } from 'react';
import { IPlace, IRatingList } from '../../interfaces';

type PlaceContextProps = {
    place:            IPlace | null;
    errors:           string;
    getRatings:       (placeId: string) => Promise<IRatingList>;
    loadPlaceByEmail: (email: string) => Promise<IPlace>
    registerPlace:    (place: IPlace) => Promise<void>;
    removeError:      () => void;
}

export const PlacesContext = createContext({} as PlaceContextProps);