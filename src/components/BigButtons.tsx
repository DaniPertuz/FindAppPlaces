import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { useIcons } from '../hooks';
import { IRatingList } from '../interfaces';

import styles from '../themes/AppTheme';

interface Props {
    category: string;
    favorites: number;
    rate: number;
    ratings: IRatingList;
}

const BigButtons = ({ category, favorites, rate, ratings }: Props) => {
    return (
        <View style={styles.flexDirectionRowJustifyCenter}>
            <View style={styles.largeItem}>
                <View style={styles.extraSmallMarginTop}>
                    {useIcons(category, 33, 33)}
                </View>
                <View style={styles.smallMediumMarginTop}>
                    <Text style={styles.bodySmall}>Categoría</Text>
                </View>
                <View style={styles.tinyMarginTop}>
                    <Text style={styles.footnote}>{category}</Text>
                </View>
            </View>
            <View style={styles.largeItem}>
                <View style={styles.extraSmallMarginTop}>
                    {useIcons('HeartFavorite', 33, 33)}
                </View>
                <View style={styles.smallMediumMarginTop}>
                    <Text style={styles.bodySmall}>Favoritos</Text>
                </View>
                <View style={styles.tinyMarginTop}>
                    <Text style={styles.footnote}>{favorites} usuarios</Text>
                </View>
            </View>
            <TouchableOpacity
                activeOpacity={1.0}
            >
                <View style={styles.largeItem}>
                    <View style={styles.extraSmallMarginTop}>
                        {useIcons('Star', 33, 33)}
                    </View>
                    <View style={styles.smallMediumMarginTop}>
                        <Text style={styles.bodySmall}>{rate.toFixed(1)}</Text>
                    </View>
                    <View style={styles.tinyMarginTop}>
                        <Text style={styles.footnoteLink}>{ratings.total} usuarios</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default BigButtons;