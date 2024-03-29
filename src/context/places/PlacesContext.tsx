import { createContext } from 'react';
import { ImagePickerResponse } from 'react-native-image-picker';
import { IFavorites, IHistory, IPlace, IRatingList } from '../../interfaces';

type PlaceContextProps = {
    place:                 IPlace | null;
    errors:                string;
    getFavorites:          (placeId: string) => Promise<IFavorites>;
    getHistory:            (placeId: string) => Promise<IHistory>;
    getPlaceRatingAverage: (placeId: string) => Promise<number>
    getRatings:            (placeId: string) => Promise<IRatingList>;
    loadPlaceByEmail:      (email: string) => Promise<IPlace>
    registerPlace:         (place: IPlace) => Promise<void>;
    updatePlace:           (id: string, data: IPlace) => Promise<IPlace>;
    updatePlacePhoto:      (id: string, photoURL: string) => Promise<IPlace>;
    uploadPics:            (data: ImagePickerResponse) => Promise<string[]>;
    removeError:           () => void;
    removePic:             (url: string) => void;
}

export const PlacesContext = createContext({} as PlaceContextProps);