import { createContext } from 'react';
import { IPlace, IRatingList } from '../../interfaces';

type PlaceContextProps = {
    place:            IPlace | null;
    errors:           string;
    getFavorites:     (placeId: string) => Promise<number>
    getRatings:       (placeId: string) => Promise<IRatingList>;
    loadPlaceByEmail: (email: string) => Promise<IPlace>
    registerPlace:    (place: IPlace) => Promise<void>;
    updatePlace:      (id: string, data: IPlace) => Promise<IPlace>;
    updatePlacePhoto: (id: string, photoURL: string) => Promise<IPlace>;
    removeError:      () => void;
}

export const PlacesContext = createContext({} as PlaceContextProps);