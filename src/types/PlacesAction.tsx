import { IPlace } from '../interfaces';

export type PlacesAction =
    | { type: 'addPlace', payload: { place: IPlace; }; }
    | { type: 'addError', payload: string; }
    | { type: 'removeError'; };