import React, { useContext, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { ProductsContext } from '../../../context';
import { useIcons, usePlace } from '../../../hooks';
import { IProduct } from '../../../interfaces';
import { RootStackParams } from '../../../navigation/MainNavigator';
import ProductsList from './ProductsList';

import styles from '../../../themes/AppTheme';

interface Props extends StackScreenProps<RootStackParams, 'ProductsScreen'> { };

const ProductsScreen = ({ navigation }: Props) => {

    const { getProductsByPlace } = useContext(ProductsContext);

    const [products, setProducts] = useState<IProduct[]>([]);

    const { place } = usePlace();

    const getProducts = async () => {
        const products: IProduct[] = await getProductsByPlace(place?._id!);
        return products;
    };

    useEffect(() => {
        let mounted = true;
        if (place) {
            getProducts().then((data) => {
                if (mounted) {
                    setProducts(data);
                }
            });
        }
        return () => {
            mounted = false;
        };
    }, [place]);

    return (
        <View style={styles.mainContainer}>
            <View style={{ ...styles.flexDirectionRow, ...styles.smallMediumMarginBottom }}>
                <View style={styles.flexOneAlignJustifyCenter}>
                    <TouchableOpacity
                        activeOpacity={1.0}
                        onPress={() => navigation.goBack()}
                    >
                        {useIcons('Back', 20, 20)}
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 200, ...styles.alignJustifyCenter }}>
                    <Text style={styles.captionTwoBlack}>Mis productos</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <TouchableOpacity
                    activeOpacity={1.0}
                    style={styles.buttonAddProduct}
                    onPress={() => navigation.navigate('ProductDetails', {
                        product: {
                            name: '',
                            description: '',
                            category: '',
                            price: 0,
                            place: place!,
                            img: ''
                        }
                    })}
                >
                    <Text style={styles.buttonAddProductText}>Agregar</Text>
                </TouchableOpacity>
            </View>
            <ProductsList products={products} />
        </View>
    );
};

export default ProductsScreen;