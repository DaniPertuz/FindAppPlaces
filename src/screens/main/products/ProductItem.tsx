import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { IProduct } from '../../../interfaces';
import { RootStackParams } from '../../../navigation/MainNavigator';

import styles from '../../../themes/AppTheme';
import { useIcons } from '../../../hooks';

interface Props {
    product: IProduct;
}

const ProductItem = ({ product }: Props) => {

    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

    return (
        <View style={styles.productItemContainer}>
            <View style={styles.flexDirectionRow}>
                <View style={styles.flexOne}>
                    <Image source={(product.img === '') ? require('../../../assets/fa_blue.png') : { uri: product.img }} style={{ borderRadius: 8, height: 42, width: 42 }} />
                </View>
                <View style={styles.productDetailsNameContainer}>
                    <Text numberOfLines={2} style={styles.subheadline}>{product.name}</Text>
                </View>
                <View style={styles.productDetailsButtonContainer}>
                    <TouchableOpacity activeOpacity={1.0} style={styles.productDetailsButton} onPress={() => navigation.navigate('ProductDetails', { product, newItem: false })}>
                        <Text style={styles.bodySmallWhite}>Detalles</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default ProductItem;