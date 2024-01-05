import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import ProductItemInputs from '../../../components/ProductItemInputs';
import { useIcons } from '../../../hooks';
import { RootStackParams } from '../../../navigation/MainNavigator';

import styles from '../../../themes/AppTheme';

interface Props extends StackScreenProps<RootStackParams, 'ProductDetails'> { };

const ProductDetails = ({ navigation, route }: Props) => {

    const { product, newItem } = route.params;

    return (
        <View style={styles.mainContainer}>
            <View style={{ ...styles.flexDirectionRow, ...styles.smallMediumMarginBottom }}>
                <View style={styles.flexOneAlignJustifyCenter}>
                    <TouchableOpacity
                        activeOpacity={1.0}
                        onPress={() => navigation.goBack()}
                    >
                        {useIcons('Back', 25, 25)}
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 200, ...styles.alignJustifyCenter }}>
                    <Text numberOfLines={1} style={styles.captionTwoBlack}>{product.name}</Text>
                </View>
            </View>
            <View style={{ marginHorizontal: 15 }}>
                <ProductItemInputs product={product} newItem={newItem} />
            </View>
        </View>
    );
};

export default ProductDetails;