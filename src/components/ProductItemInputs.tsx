import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker';

import { useForm, useIcons } from '../hooks';
import { IProduct } from '../interfaces';

import styles from '../themes/AppTheme';

interface Props {
    product: IProduct;
}

const ProductItemInputs = ({ product }: Props) => {

    const { name, description, price, onChange } = useForm({
        name: product.name,
        description: product.description,
        price: (product.price === 0) ? '' : product.price
    });

    const [productImage, setProductImage] = useState<string>(product.img!);
    const [displayCamera, setDisplayCamera] = useState(false);

    const addGalleryImage = () => {
        launchImageLibrary({
            mediaType: 'photo',
            quality: 0.8,
            selectionLimit: 1
        }, (resp: ImagePickerResponse) => {
            if (resp.didCancel) return;
            if (!resp.assets![0].uri) return;

            const uri = resp.assets![0].uri;

            setProductImage(uri);
            setDisplayCamera(false);
        });
    };

    const onDelete = () => {

    };

    const onUpdate = () => {

    };

    return (
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
                {(displayCamera === true || productImage === '') &&
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
                        onPress={onUpdate}
                    >
                        <Text style={styles.buttonText}>Guardar</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainerMarginTop}>
                    <TouchableOpacity
                        activeOpacity={1.0}
                        style={styles.warningButton}
                        onPress={onDelete}
                    >
                        <Text style={styles.buttonText}>Eliminar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default ProductItemInputs;