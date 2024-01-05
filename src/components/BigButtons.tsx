import React, { useState } from 'react';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';

import RateItem from './RateItem';
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

    const [modalVisible, setModalVisible] = useState(false);

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
                    <Text style={styles.footnote}>{favorites} {(favorites === 1) ? 'usuario' : 'usuarios'}</Text>
                </View>
            </View>
            <TouchableOpacity
                activeOpacity={1.0}
                onPress={() => setModalVisible(true)}
            >
                <View style={styles.largeItem}>
                    <View style={styles.extraSmallMarginTop}>
                        {useIcons('Star', 33, 33)}
                    </View>
                    <View style={styles.smallMediumMarginTop}>
                        <Text style={styles.bodySmall}>{(isNaN(rate) ? 0.0 : rate.toFixed(1))}</Text>
                    </View>
                    <View style={styles.tinyMarginTop}>
                        <Text style={styles.footnoteLink}>{ratings.total} {(ratings.total === 1) ? 'usuario' : 'usuarios'}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <TouchableOpacity style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }} onPress={() => setModalVisible(false)}>
                    <View style={styles.reviewsModal}>
                        <View style={{ ...styles.mediumMarginTop, marginHorizontal: 21 }}>
                            <View style={styles.flexDirectionRow}>
                                <View style={styles.flexOne}>
                                    <TouchableOpacity
                                        activeOpacity={1.0}
                                        onPress={() => setModalVisible(false)}
                                    >
                                        {useIcons('Down', 24, 24)}
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.flexOne}>
                                    <Text style={styles.bodyText}>Opiniones</Text>
                                </View>
                                <View style={styles.flexOne} />
                            </View>
                            <View style={styles.mediumMarginTop}>
                                <FlatList
                                    data={ratings.rates}
                                    keyExtractor={m => m.createdAt}
                                    renderItem={({ item }) => (
                                        <RateItem item={item} />
                                    )}
                                />
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

export default BigButtons;