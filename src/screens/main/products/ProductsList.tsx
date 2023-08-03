import React, { useEffect, useRef } from 'react';
import { Dimensions, ScrollView, View } from 'react-native';

import { IProduct } from '../../../interfaces';

import styles from '../../../themes/AppTheme';
import ProductItem from './ProductItem';

interface Props {
    products: IProduct[];
}

const ProductsList = ({ products }: Props) => {

    const height = Dimensions.get('window').height;

    const scrollViewRef = useRef(null);
    const contentHeightRef = useRef(0);

    const handleContentSizeChange = (contentHeight: number) => {
        contentHeightRef.current = contentHeight;
    };

    return (
        <View style={styles.mediumMarginTop}>
            <ScrollView scrollEnabled={(contentHeightRef.current === height - 20)} ref={scrollViewRef} onContentSizeChange={handleContentSizeChange} contentContainerStyle={{ marginVertical: 20 }} showsVerticalScrollIndicator={false}>
                {products.map((product, index) => (
                    <ProductItem key={index} product={product} />
                ))}
            </ScrollView>
        </View>
    );
};

export default ProductsList;