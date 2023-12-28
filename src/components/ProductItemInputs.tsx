import React, { useContext, useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker';
import Snackbar from 'react-native-snackbar';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { ProductsContext } from '../context';
import { useForm, useIcons, usePlace } from '../hooks';
import { IProduct } from '../interfaces';
import { RootStackParams } from '../navigation/MainNavigator';
import { LoadingScreen } from '../screens';

import styles from '../themes/AppTheme';

interface Props {
    product: IProduct;
    newItem: boolean;
}

const ProductItemInputs = ({ product, newItem }: Props) => {

    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

    const { name, description, price, onChange } = useForm({
        name: (newItem) ? '' : product.name,
        description: (newItem) ? '' : product.description,
        price: (newItem) ? '' : product.price
    });
    const { place } = usePlace();

    const [productImage, setProductImage] = useState<string>(product.img!);
    const [loading, setLoading] = useState(false);
    const [displayCamera, setDisplayCamera] = useState(false);
    const [imagePickerResp, setImagePickerResp] = useState<any>(null);

    const { addProduct, updateProduct, deleteProduct, uploadImage, updateProductImage } = useContext(ProductsContext);

    const addGalleryImage = () => {
        launchImageLibrary({
            mediaType: 'photo',
            quality: 0.8,
            selectionLimit: 1
        }, (resp: ImagePickerResponse) => {
            if (resp.didCancel) return;
            if (!resp.assets![0].uri) return;

            const uri = resp.assets![0].uri;

            setImagePickerResp(resp);
            setProductImage(uri);
            setDisplayCamera(false);
        });
    };

    const onAdd = async () => {
        setLoading(true);
        const p = Number(price);
        const response = await addProduct({ name, description, category: place?.category!, price: p, place: place?._id!, img: '' });
        if (response) {
            if (imagePickerResp !== undefined) {
                const res = await uploadImage(imagePickerResp, response._id!);
                const upd = await updateProductImage(response._id!, res);
                if (upd !== undefined) {
                    setLoading(false);
                    Snackbar.show({ text: 'Producto agregado', duration: Snackbar.LENGTH_SHORT });
                    navigation.goBack();
                }
            }
        }
    };

    const onDelete = async () => {
        const response = await deleteProduct(product._id!);
        if (response) {
            Snackbar.show({ text: 'Producto eliminado', duration: Snackbar.LENGTH_SHORT });
            navigation.goBack();
        }
    };

    const onUpdate = async () => {
        const p = Number(price);
        const resp = await updateProduct(product._id!, { name, description, category: place?.category!, price: p, place: place?._id! });
        if (resp) {
            Snackbar.show({ text: 'Producto actualizado', duration: Snackbar.LENGTH_SHORT });
            navigation.goBack();
        }
    };

    return (
        <>
            {(loading)
                ? <LoadingScreen />
                :
                <View>
                    <View style={styles.mediumMarginTop}>
                        <Text style={styles.captionTwoBlack}>Nombre</Text>
                        <View style={styles.inputFieldContainerWhite}>
                            {useIcons('Edit', 15, 15)}
                            <TextInput
                                placeholder='Nombre del producto'
                                placeholderTextColor='#9A9A9A'
                                keyboardType='default'
                                style={styles.inputFieldBlack}
                                selectionColor='#9A9A9A'
                                autoCapitalize='none'
                                autoCorrect={false}
                                multiline
                                onChangeText={(value) => onChange(value, 'name')}
                                value={name}
                            />
                        </View>
                    </View>
                    <View style={styles.mediumMarginTop}>
                        <Text style={styles.captionTwoBlack}>Descripción</Text>
                        <View style={styles.inputFieldDescriptionContainerWhite}>
                            <TextInput
                                placeholder='Descripción'
                                placeholderTextColor='#9A9A9A'
                                keyboardType='default'
                                style={styles.inputFieldBlackDescription}
                                selectionColor='#9A9A9A'
                                autoCapitalize='none'
                                autoCorrect={false}
                                multiline
                                onChangeText={(value) => onChange(value, 'description')}
                                value={description}
                            />
                        </View>
                    </View>
                    <View style={styles.mediumMarginTop}>
                        <Text style={styles.captionTwoBlack}>Precio</Text>
                        <View style={styles.inputFieldContainerWhite}>
                            {useIcons('Currency', 15, 15)}
                            <TextInput
                                placeholder='Precio'
                                placeholderTextColor='#9A9A9A'
                                keyboardType='number-pad'
                                style={styles.inputFieldBlack}
                                selectionColor='#9A9A9A'
                                autoCapitalize='none'
                                autoCorrect={false}
                                multiline
                                onChangeText={(value) => onChange(value, 'price')}
                                value={String(price)}
                            />
                        </View>
                    </View>
                    <View style={styles.mediumMarginTop}>
                        <Text style={styles.captionTwoBlack}>Imagen</Text>
                    </View>
                    <View style={styles.flexDirectionRowTinyMarginTop}>
                        {productImage !== '' &&
                            <View>
                                <TouchableOpacity
                                    activeOpacity={1.0}
                                    style={styles.minusButton}
                                    onPress={() => { setProductImage(''); setDisplayCamera(true); }}
                                >
                                    {useIcons('Minus', 20, 20)}
                                </TouchableOpacity>
                                <Image source={{ uri: productImage }} style={styles.imageFromGallery} />
                            </View>
                        }
                        {(displayCamera || productImage === '') &&
                            <View>
                                <TouchableOpacity
                                    activeOpacity={1.0}
                                    style={styles.addImagesButton}
                                    onPress={addGalleryImage}
                                >
                                    {useIcons('CameraPlus', 20, 20)}
                                </TouchableOpacity>
                            </View>
                        }
                    </View>
                    <View style={styles.flexDirectionRowJustifyAround}>
                        <View style={styles.buttonContainerMarginTop}>
                            <TouchableOpacity
                                activeOpacity={1.0}
                                style={styles.button}
                                onPress={(newItem) ? onAdd : onUpdate}
                            >
                                <Text style={styles.buttonText}>{(newItem) ? 'Guardar' : 'Actualizar'}</Text>
                            </TouchableOpacity>
                        </View>
                        {((product.name !== '') || (product.description !== '') || (product.img !== '')) &&
                            <View style={styles.buttonContainerMarginTop}>
                                <TouchableOpacity
                                    activeOpacity={1.0}
                                    style={styles.warningButton}
                                    onPress={onDelete}
                                >
                                    <Text style={styles.buttonText}>Eliminar</Text>
                                </TouchableOpacity>
                            </View>
                        }
                    </View>
                </View>
            }
        </>
    );
};

export default ProductItemInputs;