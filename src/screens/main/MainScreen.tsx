import React, { useContext, useEffect, useState } from 'react';
import { Image, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';

import { AuthContext, PlacesContext } from '../../context';
import { useIcons } from '../../hooks';
import { IPlace, IRatingList } from '../../interfaces';
import { RootStackParams } from '../../navigation/MainNavigator';
import BigButtons from '../../components/BigButtons';

import styles from '../../themes/AppTheme';

const MainScreen = () => {

    const navigator = useNavigation<StackNavigationProp<RootStackParams>>();

    const { user } = useContext(AuthContext);
    const { getFavorites, getRatings, loadPlaceByEmail } = useContext(PlacesContext);

    const [place, setPlace] = useState<IPlace>();
    const [ratings, setRatings] = useState<IRatingList>({ total: 0, rates: [] });
    const [favorites, setFavorites] = useState<number>(0);

    const getPlaceFavorites = async () => {
        const favorites = await getFavorites(place?._id!);
        return favorites;
    };

    const getPlaceInfo = async () => {
        const place = await loadPlaceByEmail(user?.email!);
        return place;
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

    return (
        <View style={{ paddingHorizontal: 20, paddingTop: 63 }}>
            <View style={styles.flexDirectionRowJustifySpaceBetween}>
                <View>
                    <Text style={styles.subheadline}>Bienvenid@</Text>
                    <View style={{ marginVertical: 3 }}>
                        <Text numberOfLines={1} style={styles.bodySmall}>{user?.name}</Text>
                    </View>

                    <LinearGradient
                        colors={(place?.premium === 3) ? ['#D6B238', '#F6E074'] : (place?.premium === 2) ? ['#B8B8B8', '#E2E2E2'] : ['#C08E5E', '#FAC294']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{
                            alignItems: 'center',
                            borderRadius: 999,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 10,
                            paddingVertical: 3
                        }}
                    >
                        {useIcons('Trophy', 22, 22)}
                        <Text style={styles.footnote}>Nivel {place?.premium}</Text>
                    </LinearGradient>
                </View>
                <TouchableOpacity
                    activeOpacity={1.0}
                    onPress={() => navigator.navigate('Profile')}
                >
                    <Image
                        source={(user?.photo === '' ? require('../../assets/fa_blue.png') : { uri: user?.photo })}
                        style={{ borderRadius: 32, height: 62, width: 62 }}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.mediumMarginTop}>
                <BigButtons category={place?.category!} favorites={favorites} rate={Number(place?.rate.$numberDecimal!)} ratings={ratings} />
            </View>
            <View style={{ marginTop: 25 }}>
                <Text style={styles.subheadline}>Estadísticas</Text>
            </View>
            <View style={{ paddingVertical: 25 }}>
                <ScrollView showsVerticalScrollIndicator={false} contentInset={{ bottom: 250 }}>

                </ScrollView>
            </View>
        </View>
    );
};

export default MainScreen;