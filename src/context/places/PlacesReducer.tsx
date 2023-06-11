import { PlacesAction } from '../../types';
import { PlacesState } from '.';

export const PlacesReducer = (state: PlacesState, action: PlacesAction): PlacesState => {
    switch (action.type) {
        case 'addPlace':
            return {
                ...state,
                place: action.payload.place,
                errors: ''
            };

        case 'addError':
            return {
                ...state,
                place: null,
                errors: action.payload
            };

        case 'removeError':
            return {
                ...state,
                errors: ''
            };

        default:
            return state;
    }
};
