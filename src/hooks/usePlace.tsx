import { useContext, useEffect, useState } from 'react';
import { IFavorites, IHistory, IPlace, IRatingList } from '../interfaces';
import { AuthContext, PlacesContext } from '../context';

export const usePlace = () => {
    const [history, setHistory] = useState<IHistory>({ total: 0, services: []});
    const [place, setPlace] = useState<IPlace>();
    const [ratings, setRatings] = useState<IRatingList>({ total: 0, rates: [] });
    const [favorites, setFavorites] = useState<IFavorites>({ total: 0, favorites: [] });

    const { user } = useContext(AuthContext);
    const { getFavorites, getHistory, getRatings, loadPlaceByEmail } = useContext(PlacesContext);

    const getPlaceInfo = async () => {
        const place = await loadPlaceByEmail(user?.email!);
        return place;
    };

    const getPlaceFavorites = async () => {
        const favorites = await getFavorites(place?._id!);
        return favorites;
    };

    const getPlaceHistory = async () => {
        const history = await getHistory(place?._id!);
        return history;
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
            getPlaceHistory().then((data) => {
                if (mounted) {
                    setHistory(data);
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

    return { favorites, history, place, ratings };
};