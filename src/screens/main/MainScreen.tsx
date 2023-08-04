import React from 'react';
import { Image, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { usePlace } from '../../hooks';
import { RootStackParams } from '../../navigation/MainNavigator';
import BigButtons from '../../components/BigButtons';
import PremiumLevel from '../../components/PremiumLevel';
import KeywordsChart from '../../components/KeywordsChart';
import SearchChart from '../../components/SearchChart';
import UsersChart from '../../components/UsersChart';

import styles from '../../themes/AppTheme';

const MainScreen = () => {

    const navigator = useNavigation<StackNavigationProp<RootStackParams>>();

    const { favorites, place, ratings } = usePlace();

    return (
        <View style={styles.mainContainer}>
            <View style={styles.flexDirectionRowJustifySpaceBetween}>
                <View>
                    <Text style={styles.subheadline}>Bienvenid@</Text>
                    <View style={styles.tinyMarginVertical}>
                        <Text numberOfLines={1} style={styles.bodySmall}>{place?.name}</Text>
                    </View>
                    <PremiumLevel place={place!} />
                </View>
                <TouchableOpacity
                    activeOpacity={1.0}
                    onPress={() => navigator.navigate('Profile')}
                >
                    <Image
                        source={(place?.photo === '' ? require('../../assets/fa_blue.png') : { uri: place?.photo })}
                        style={styles.placePhoto}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.mediumMarginTop}>
                <BigButtons category={place?.category!} favorites={favorites} rate={Number(place?.rate?.$numberDecimal!)} ratings={ratings} />
            </View>
            <View style={styles.mediumMarginTop}>
                <Text style={styles.subheadline}>Estadísticas</Text>
            </View>
            <View style={styles.mediumPaddingVertical}>
                <ScrollView showsVerticalScrollIndicator={false} contentInset={{ bottom: 450 }}>
                    <SearchChart />
                    <UsersChart />
                    <KeywordsChart />
                </ScrollView>
            </View>
        </View>
    );
};

export default MainScreen;