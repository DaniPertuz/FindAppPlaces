import { useContext, useEffect, useState } from 'react';
import { IPlace, IRatingList } from '../interfaces';
import { AuthContext, PlacesContext } from '../context';

export const usePlace = () => {
    const [place, setPlace] = useState<IPlace>();
    const [ratings, setRatings] = useState<IRatingList>({ total: 0, rates: [] });
    const [favorites, setFavorites] = useState<number>(0);

    const { user } = useContext(AuthContext);
    const { getFavorites, getRatings, loadPlaceByEmail } = useContext(PlacesContext);

    const getPlaceInfo = async () => {
        const place = await loadPlaceByEmail(user?.email!);
        return place;
    };

    const getPlaceFavorites = async () => {
        const favorites = await getFavorites(place?._id!);
        return favorites;
    };

    const getPlaceRatings = async () => {
        const ratings = await getRatings(place?._id!);
        return ratings;
    };

    useEffect(() => {
        let mounted = true;
        getPlaceInfo().then((data) => {
            if (mounted) {
                setPlace(data);
            }
        });
        return () => {
            mounted = false;
        };
    }, []);

    useEffect(() => {
        let mounted = true;
        if (place) {
            getPlaceFavorites().then((data) => {
                if (mounted) {
                    setFavorites(data);
                }
            });
        }
        return () => {
            mounted = false;
        };
    }, [place]);

    useEffect(() => {
        let mounted = true;
        if (place) {
            getPlaceRatings().then((data) => {
                if (mounted) {
                    setRatings(data);
                }
            });
        }
        return () => {
            mounted = false;
        };
    }, [place]);

    return { favorites, place, ratings };
};