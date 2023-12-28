import React, { useContext, useEffect, useState } from 'react';
import { Image, Keyboard, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Dropdown } from 'react-native-element-dropdown';
import { ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker';
import { Row, Rows, Table } from 'react-native-reanimated-table';
import Snackbar from 'react-native-snackbar';

import BusinessDaysSchedule from './BusinessDaysSchedule';
import CustomizedSchedule from './CustomizedSchedule';
import { AuthContext, PlacesContext, UsersContext } from '../context';
import { useCoords, useForm, useIcons } from '../hooks';
import { IPlace, Location } from '../interfaces';
import { RootStackParams } from '../navigation/MainNavigator';
import { categories, headers, scheduleData } from '../utils';

import styles from '../themes/AppTheme';
import { LoadingScreen } from '../screens';

interface Props {
    place: IPlace;
}

const UpdateProfileInputs = ({ place }: Props) => {

    const navigator = useNavigation<StackNavigationProp<RootStackParams>>();

    const { user } = useContext(AuthContext);
    const { updateUserPassword } = useContext(UsersContext);
    const { updatePlace, uploadPics } = useContext(PlacesContext);

    const [response, setResponse] = useState<any>(null);
    const [placeCategory, setPlaceCategory] = useState('');
    const [coordinates, setCoordinates] = useState<Location>();
    const [city, setCity] = useState('');
    const [cityState, setCityState] = useState('');
    const [country, setCountry] = useState('');
    const [days, setDays] = useState<string>('');
    const [placeSchedule, setPlaceSchedule] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [display, setDisplay] = useState(false);
    const [displayCamera, setDisplayCamera] = useState(false);
    const [displayCameraOne, setDisplayCameraOne] = useState(false);
    const [displayCameraTwo, setDisplayCameraTwo] = useState(false);
    const [placeImage, setPlaceImage] = useState<string>('');
    const [placeImageOne, setPlaceImageOne] = useState<string>('');
    const [placeImageTwo, setPlaceImageTwo] = useState<string>('');
    const [allImages, setAllImages] = useState<(string | undefined)[]>([]);
    const [placeImages, setPlaceImages] = useState<(string | undefined)[]>([]);
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [passwordConfirmVisibility, setPasswordConfirmVisibility] = useState(true);
    const [fieldLength, setFieldLength] = useState({ password: false, confirmPassword: false });
    const [eyeIcon] = useState('../../assets/eye-closed.png');
    const [eyeIconConfirm] = useState('../../assets/eye-closed.png');

    const { description, name, category, address, phone, whatsapp, instagram, password, confirmPassword, other, onChange } = useForm({
        description: place.description,
        name: place.name,
        address: place.address,
        category: place.category,
        phone: String(place.phone),
        whatsapp: place.whatsapp,
        instagram: place.instagram,
        password: '',
        confirmPassword: '',
        other: ''
    });

    const getCoords = async () => {
        const { lat, lng } = await useCoords(address);
        if (lat && lng) {
            Snackbar.show({ text: 'Dirección encontrada', duration: Snackbar.LENGTH_SHORT, });
            setCoordinates({ latitude: lat, longitude: lng });
        } else {
            Snackbar.show({ text: 'Dirección no encontrada\nIngresa nuevamente', duration: Snackbar.LENGTH_SHORT, });
        }
    };

    const splitAddress = (address: string) => {
        const sp = address.split(', ');
        sp.shift();
        setCity(sp[0]);
        setCityState(sp[1]);
        setCountry(sp[2]);
    };

    const handleSchedule = (schedule: string[]) => setPlaceSchedule(schedule);

    const setDisplaySchedule = () => {
        const sch = place.schedule.map((schedule) => schedule.split(' '));
        return sch.map((schedule) => schedule.map((s) => {
            return s.replace('AM', ' AM').replace('PM', ' PM');
        }));
    };

    const handleFieldLength = (password: boolean, confirmPassword: boolean) => {
        setFieldLength({
            password,
            confirmPassword
        });
    };

    const handlePasswordVisibility = () => {
        if (eyeIcon === '../../assets/eye-closed.png') {
            setPasswordVisibility(!passwordVisibility);
        } else if (eyeIcon === '../../assets/eye.png') {
            setPasswordVisibility(!passwordVisibility);
        }
    };

    const handleConfirmPasswordVisibility = () => {
        if (eyeIconConfirm === '../../assets/eye-closed.png') {
            setPasswordConfirmVisibility(!passwordConfirmVisibility);
        } else if (eyeIconConfirm === '../../assets/eye.png') {
            setPasswordConfirmVisibility(!passwordConfirmVisibility);
        }
    };

    const addGalleryImage = () => {
        launchImageLibrary({
            mediaType: 'photo',
            quality: 0.8,
            selectionLimit: 1
        }, (resp: ImagePickerResponse) => {
            if (resp.didCancel) return;
            if (!resp.assets![0].uri) return;

            const uri = resp.assets![0].uri;

            setPlaceImage(uri);
            setResponse(resp);
        });
    };

    const addGalleryImageOne = () => {
        launchImageLibrary({
            mediaType: 'photo',
            quality: 0.8,
            selectionLimit: 1
        }, (resp: ImagePickerResponse) => {
            if (resp.didCancel) return;
            if (!resp.assets![0].uri) return;

            const uri = resp.assets![0].uri;

            setPlaceImageOne(uri);
            setDisplayCameraOne(false);
            setResponse(resp);
        });
    };

    const addGalleryImageTwo = () => {
        launchImageLibrary({
            mediaType: 'photo',
            quality: 0.8,
            selectionLimit: 1
        }, (resp: ImagePickerResponse) => {
            if (resp.didCancel) return;
            if (!resp.assets![0].uri) return;

            const uri = resp.assets![0].uri;

            setPlaceImageTwo(uri);
            setDisplayCameraTwo(false);
            setResponse(resp);
        });
    };

    const addGalleryImages = () => {
        launchImageLibrary({
            mediaType: 'photo',
            quality: 0.8,
            selectionLimit: 0
        }, (resp: ImagePickerResponse) => {
            if (resp.didCancel) return;
            if (!resp.assets![0].uri) return;

            const uris = resp.assets!.map((asset) => asset.uri);
            setPlaceImages([...placeImages, ...uris]);
            setResponse(resp);
        });
    };

    const handlePics = async () => {
        if (response.didCancel) return;
        if (!response.assets![0].uri) return;

        const upload = await uploadPics(response);
        return upload;
    };

    const onUpdate = async () => {
        Keyboard.dismiss();

        setLoading(true);

        const pics = await handlePics();

        if (address.length === 0) {
            return;
        }

        if (password!.length !== 0 && confirmPassword!.length !== 0) {
            if (password !== confirmPassword) {
                setDisplay(true);
                return;
            }

            updateUserPassword(user?.email!, password!);
            navigator.goBack();
            Snackbar.show({ text: 'Contraseña actualizada', duration: Snackbar.LENGTH_SHORT });
        }

        if (password!.length === 0 && confirmPassword!.length !== 0) {
            handleFieldLength(true, false);
            return;
        }

        if (password!.length !== 0 && confirmPassword!.length === 0) {
            handleFieldLength(false, true);
            return;
        }

        if (password!.length === 0 && confirmPassword!.length === 0) {
            const data: IPlace = {
                name,
                description,
                category: (other !== '') ? other[0].toUpperCase() + other.slice(1) : category,
                address,
                email: place.email,
                coords: coordinates!,
                phone: Number(phone),
                whatsapp: (whatsapp === undefined) ? '' : whatsapp,
                instagram: (instagram === undefined) ? '' : instagram,
                city,
                state: cityState,
                country,
                schedule: (placeSchedule.length === 0) ? place.schedule : placeSchedule,
                pics: (place.premium === 3) ? [...allImages, ...pics!] : pics,
                status: true
            };

            const update = await updatePlace(place._id!, data);

            if (update !== null) {
                setLoading(false);
            }

            if (loading === false) {
                navigator.goBack();
            }
        }
    };

    useEffect(() => {
        setPlaceCategory(category);
    }, []);

    useEffect(() => {
        setAllImages(place.pics!);
        setPlaceImages(place.pics!);
    }, [place.pics]);

    return (
        <>
            {(loading === true) && <LoadingScreen />}

            {(loading === false) &&
                <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
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
                        <View style={styles.mediumMarginTop}>
                            <Text style={styles.captionTwoBlack}>Nombre de la empresa</Text>
                            <View style={styles.inputFieldContainerWhite}>
                                {useIcons('Users', 20, 20)}
                                <TextInput
                                    placeholder='Nombre de la empresa'
                                    placeholderTextColor='#9A9A9A'
                                    keyboardType='default'
                                    style={styles.inputFieldBlack}
                                    selectionColor='#9A9A9A'
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    onChangeText={(value) => onChange(value, 'name')}
                                    value={name}
                                />
                            </View>
                        </View>
                        <View style={styles.mediumMarginTop}>
                            <Text style={styles.captionTwoBlack}>Correo corporativo</Text>
                            <View style={styles.inputFieldContainerGray}>
                                {useIcons('Envelope', 20, 20)}
                                <TextInput editable={false} style={styles.inputFieldGray} value={place.email} />
                            </View>
                        </View>
                        <View style={styles.mediumMarginTop}>
                            <Text style={styles.captionTwoBlack}>Dirección</Text>
                            <View style={styles.inputFieldContainerWhite}>
                                {useIcons('Mall', 20, 20)}
                                <TextInput
                                    placeholder='Dirección, ciudad, depto, país'
                                    placeholderTextColor='#9A9A9A'
                                    keyboardType='default'
                                    style={styles.inputFieldBlack}
                                    selectionColor='#9A9A9A'
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    numberOfLines={1}
                                    onBlur={() => {
                                        setLoading(true);
                                        getCoords();
                                        splitAddress(address);
                                        setLoading(false);
                                    }}
                                    onChangeText={(value) => onChange(value, 'address')}
                                    value={address}
                                />
                            </View>
                        </View>
                        <View style={styles.mediumMarginTop}>
                            <Text style={styles.captionTwoBlack}>Categoría</Text>
                            <View style={styles.inputFieldContainerWhite}>
                                <Dropdown
                                    data={categories}
                                    labelField={'category'}
                                    valueField={'category'}
                                    placeholder='Categoría'
                                    placeholderStyle={styles.caption}
                                    mode='modal'
                                    showsVerticalScrollIndicator={false}
                                    containerStyle={{ alignSelf: 'center', marginVertical: 100, width: 310 }}
                                    itemTextStyle={styles.caption}
                                    selectedTextStyle={styles.caption}
                                    style={styles.categoriesDropdown}
                                    onChange={(item) => { setPlaceCategory(item.category); }}
                                    value={placeCategory}
                                />
                            </View>
                            {(category === 'Otro') &&
                                <View style={styles.inputFieldContainerWhiteOther}>
                                    {useIcons('Mall', 20, 20)}
                                    <TextInput
                                        placeholder='Escribe tu categoría'
                                        placeholderTextColor='#9A9A9A'
                                        keyboardType='default'
                                        style={styles.inputFieldBlack}
                                        selectionColor='#9A9A9A'
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        onChangeText={(value) => onChange(value, 'other')}
                                        value={other}
                                    />
                                </View>
                            }
                        </View>
                        <View style={styles.mediumMarginTop}>
                            <Text style={styles.captionTwoBlack}>Horario</Text>
                            {(place.schedule.length !== 0)
                                ?
                                <View style={{ flex: 1, marginTop: 10 }}>
                                    <Table borderStyle={{ borderWidth: 1, borderColor: '#081023' }}>
                                        <Row data={headers} style={{ height: 40 }} textStyle={{ ...styles.caption, ...styles.tinyMarginStart }} />
                                        <Rows data={setDisplaySchedule()} textStyle={{ ...styles.caption, margin: 6 }} />
                                    </Table>
                                </View>
                                :
                                <View>
                                    <View style={styles.inputFieldContainerWhite}>
                                        <Dropdown data={scheduleData.map(({ days }) => {
                                            return { days };
                                        })}
                                            labelField={'days'}
                                            valueField={'days'}
                                            placeholder='Días de atención'
                                            placeholderStyle={styles.caption}
                                            showsVerticalScrollIndicator={false}
                                            iconStyle={{ tintColor: '#858585' }}
                                            containerStyle={{ alignSelf: 'center', width: 310 }}
                                            itemTextStyle={styles.caption}
                                            selectedTextStyle={styles.caption}
                                            style={styles.categoriesDropdown}
                                            onChange={(item) => { setDays(item.days); }}
                                            value={days}
                                        />
                                    </View>
                                    {days === 'Lunes a Viernes' &&
                                        <BusinessDaysSchedule everyday={false} sendSchedule={handleSchedule} />
                                    }
                                    {days === 'Lunes a Domingo' &&
                                        <BusinessDaysSchedule everyday={true} sendSchedule={handleSchedule} />
                                    }
                                    {days === 'Personalizado' &&
                                        <CustomizedSchedule everyday={true} />
                                    }
                                </View>
                            }
                        </View>
                        <View style={styles.mediumMarginTop}>
                            <Text style={styles.captionTwoBlack}>Imágenes</Text>
                            <View style={styles.mediumMarginTop}>
                                {(place === null)
                                    ?
                                    <TouchableOpacity
                                        activeOpacity={1.0}
                                        style={styles.addImagesNoImagesButton}
                                        onPress={addGalleryImages}
                                    >
                                        {useIcons('CameraPlus', 20, 20)}
                                    </TouchableOpacity>
                                    : (place.premium === 1)
                                        ? (allImages.length === 1)
                                            ?
                                            <>
                                                <View>
                                                    <TouchableOpacity
                                                        activeOpacity={1.0}
                                                        style={styles.minusButton}
                                                        onPress={() => { setAllImages(allImages.splice(0, 1)); setDisplayCamera(true); }}
                                                    >
                                                        {useIcons('Minus', 20, 20)}
                                                    </TouchableOpacity>
                                                    <Image source={{ uri: allImages[0] }} style={styles.imageFromGallery} />
                                                </View>
                                                {(displayCamera) &&
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
                                            </>
                                            :
                                            <View style={styles.flexDirectionRow}>
                                                {(placeImage === '')
                                                    ?
                                                    <TouchableOpacity
                                                        activeOpacity={1.0}
                                                        style={styles.addImagesButton}
                                                        onPress={addGalleryImage}
                                                    >
                                                        {useIcons('CameraPlus', 20, 20)}
                                                    </TouchableOpacity>
                                                    :
                                                    <View>
                                                        <TouchableOpacity
                                                            activeOpacity={1.0}
                                                            style={styles.minusButton}
                                                            onPress={() => setPlaceImage('')}
                                                        >
                                                            {useIcons('Minus', 20, 20)}
                                                        </TouchableOpacity>
                                                        <Image source={{ uri: placeImage }} style={styles.imageFromGallery} />
                                                    </View>
                                                }
                                            </View>
                                        : (place.premium === 2)
                                            ? (allImages.length === 2)
                                                ?
                                                <>
                                                    <View style={styles.flexDirectionRow}>
                                                        <View>
                                                            {(allImages[0] !== '') &&
                                                                <>
                                                                    <TouchableOpacity
                                                                        activeOpacity={1.0}
                                                                        style={styles.minusButton}
                                                                        onPress={() => { allImages[0] = ''; setDisplayCameraOne(true); }}
                                                                    >
                                                                        {useIcons('Minus', 20, 20)}
                                                                    </TouchableOpacity>
                                                                    <Image source={{ uri: allImages[0] }} style={styles.imageFromGallery} />
                                                                </>
                                                            }
                                                            {(placeImageOne !== '') &&
                                                                <>
                                                                    <TouchableOpacity
                                                                        activeOpacity={1.0}
                                                                        style={styles.minusButton}
                                                                        onPress={() => { setPlaceImageOne(''); setDisplayCameraOne(true); }}
                                                                    >
                                                                        {useIcons('Minus', 20, 20)}
                                                                    </TouchableOpacity>
                                                                    <Image source={{ uri: placeImageOne }} style={styles.imageFromGallery} />
                                                                </>
                                                            }
                                                        </View>
                                                        {(displayCameraOne && (allImages[0] === '' || placeImageOne === '')) &&
                                                            <View>
                                                                <TouchableOpacity
                                                                    activeOpacity={1.0}
                                                                    style={styles.addImagesButton}
                                                                    onPress={addGalleryImageOne}
                                                                >
                                                                    {useIcons('CameraPlus', 20, 20)}
                                                                </TouchableOpacity>
                                                            </View>
                                                        }
                                                        <View>
                                                            {(allImages[1] !== '') &&
                                                                <>
                                                                    <TouchableOpacity
                                                                        activeOpacity={1.0}
                                                                        style={styles.minusButton}
                                                                        onPress={() => { allImages[1] = ''; setDisplayCameraTwo(true); }}
                                                                    >
                                                                        {useIcons('Minus', 20, 20)}
                                                                    </TouchableOpacity>
                                                                    <Image source={{ uri: allImages[1] }} style={styles.imageFromGallery} />
                                                                </>
                                                            }
                                                            {(placeImageTwo !== '') &&
                                                                <>
                                                                    <TouchableOpacity
                                                                        activeOpacity={1.0}
                                                                        style={styles.minusButton}
                                                                        onPress={() => { setPlaceImageTwo(''); setDisplayCameraTwo(true); }}
                                                                    >
                                                                        {useIcons('Minus', 20, 20)}
                                                                    </TouchableOpacity>
                                                                    <Image source={{ uri: placeImageTwo }} style={styles.imageFromGallery} />
                                                                </>
                                                            }
                                                        </View>
                                                        {(displayCameraTwo) &&
                                                            <View>
                                                                <TouchableOpacity
                                                                    activeOpacity={1.0}
                                                                    style={styles.addImagesButton}
                                                                    onPress={addGalleryImageTwo}
                                                                >
                                                                    {useIcons('CameraPlus', 20, 20)}
                                                                </TouchableOpacity>
                                                            </View>
                                                        }
                                                    </View>
                                                </>
                                                :
                                                <View style={styles.flexDirectionRow}>
                                                    {(placeImageOne === '')
                                                        ?
                                                        <TouchableOpacity
                                                            activeOpacity={1.0}
                                                            style={styles.addImagesButton}
                                                            onPress={addGalleryImageOne}
                                                        >
                                                            {useIcons('CameraPlus', 20, 20)}
                                                        </TouchableOpacity>
                                                        :
                                                        <View>
                                                            <TouchableOpacity
                                                                activeOpacity={1.0}
                                                                style={styles.minusButton}
                                                                onPress={() => setPlaceImageOne('')}
                                                            >
                                                                {useIcons('Minus', 20, 20)}
                                                            </TouchableOpacity>
                                                            <Image source={{ uri: placeImageOne }} style={styles.imageFromGallery} />
                                                        </View>
                                                    }
                                                    {(placeImageTwo === '')
                                                        ?
                                                        <TouchableOpacity
                                                            activeOpacity={1.0}
                                                            style={styles.addImagesButton}
                                                            onPress={addGalleryImageTwo}
                                                        >
                                                            {useIcons('CameraPlus', 20, 20)}
                                                        </TouchableOpacity>
                                                        :
                                                        <View>
                                                            <TouchableOpacity
                                                                activeOpacity={1.0}
                                                                style={styles.minusButton}
                                                                onPress={() => setPlaceImageTwo('')}
                                                            >
                                                                {useIcons('Minus', 20, 20)}
                                                            </TouchableOpacity>
                                                            <Image source={{ uri: placeImageTwo }} style={styles.imageFromGallery} />
                                                        </View>
                                                    }
                                                </View>
                                            :
                                            <View style={styles.flexDirectionRowJustifySpaceBetween}>
                                                {(allImages.length === 0)
                                                    ?
                                                    <TouchableOpacity
                                                        activeOpacity={1.0}
                                                        style={styles.addImagesNoImagesButton}
                                                        onPress={addGalleryImages}
                                                    >
                                                        {useIcons('CameraPlus', 20, 20)}
                                                    </TouchableOpacity>
                                                    :
                                                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                                        {placeImages.map((image, index) => (
                                                            <View key={index}>
                                                                <TouchableOpacity
                                                                    activeOpacity={1.0}
                                                                    style={styles.minusButton}
                                                                    onPress={() => {
                                                                        if (placeImages.length === 1) {
                                                                            placeImages.splice(0, 1);
                                                                            setPlaceImages(placeImages);
                                                                        }

                                                                        setPlaceImages(placeImages.splice(placeImages.indexOf(image), 1));
                                                                    }}
                                                                >
                                                                    {useIcons('Minus', 20, 20)}
                                                                </TouchableOpacity>
                                                                <Image source={{ uri: image }} style={styles.imageFromGallery} />
                                                            </View>
                                                        ))}
                                                        <TouchableOpacity
                                                            activeOpacity={1.0}
                                                            style={styles.addImagesButton}
                                                            onPress={addGalleryImages}
                                                        >
                                                            {useIcons('CameraPlus', 20, 20)}
                                                        </TouchableOpacity>
                                                    </ScrollView>
                                                }
                                            </View>
                                }
                            </View>
                        </View>
                        <View style={styles.mediumMarginTop}>
                            <Text style={styles.captionTwoBlack}>Teléfono</Text>
                            <View style={styles.inputFieldContainerWhite}>
                                {useIcons('Phone', 20, 20)}
                                <TextInput
                                    placeholder='Teléfono'
                                    placeholderTextColor='#9A9A9A'
                                    keyboardType='default'
                                    style={styles.inputFieldBlack}
                                    selectionColor='#9A9A9A'
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    onChangeText={(value) => onChange(value, 'phone')}
                                    value={phone}
                                />
                            </View>
                        </View>
                        {(place.premium !== 1) &&
                            <>
                                <View style={styles.mediumMarginTop}>
                                    <Text style={styles.captionTwoBlack}>Whatsapp</Text>
                                    <View style={styles.inputFieldContainerWhite}>
                                        {useIcons('Whatsapp', 20, 20)}
                                        <TextInput
                                            placeholder='Whatsapp'
                                            placeholderTextColor='#9A9A9A'
                                            keyboardType='default'
                                            style={styles.inputFieldBlack}
                                            selectionColor='#9A9A9A'
                                            autoCapitalize='none'
                                            autoCorrect={false}
                                            onChangeText={(value) => onChange(value, 'whatsapp')}
                                            value={whatsapp}
                                        />
                                    </View>
                                </View>
                                <View style={styles.mediumMarginTop}>
                                    <Text style={styles.captionTwoBlack}>Instagram</Text>
                                    <View style={styles.inputFieldContainerWhite}>
                                        {useIcons('Instagram', 20, 20)}
                                        <TextInput
                                            placeholder='Instagram'
                                            placeholderTextColor='#9A9A9A'
                                            keyboardType='default'
                                            style={styles.inputFieldBlack}
                                            selectionColor='#9A9A9A'
                                            autoCapitalize='none'
                                            autoCorrect={false}
                                            onChangeText={(value) => onChange(value, 'instagram')}
                                            value={instagram}
                                        />
                                    </View>
                                </View>
                            </>
                        }
                        <View style={styles.mediumMarginTop}>
                            <Text style={styles.captionTwoBlack}>Contraseña</Text>
                            <View style={[
                                styles.inputFieldContainerWhite,
                                (fieldLength.password) && styles.warningBorder
                            ]}>
                                <View style={styles.tinyButtonSize}>
                                    {useIcons('Lock', 20, 20)}
                                </View>
                                <TextInput
                                    placeholder='Ingresa tu contraseña'
                                    placeholderTextColor='#9A9A9A'
                                    secureTextEntry={passwordVisibility}
                                    style={[
                                        styles.inputField,
                                        styles.newPasswordInputTextSize
                                    ]}
                                    selectionColor='#9A9A9A'
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    onChangeText={(value) => onChange(value, 'password')}
                                    value={password}
                                />
                                <TouchableOpacity
                                    activeOpacity={1.0}
                                    onPress={handlePasswordVisibility}
                                >
                                    <View style={styles.alignItemsCenter}>
                                        {(passwordVisibility === false)
                                            ? useIcons('Eye', 20, 20)
                                            : useIcons('EyeClosed', 20, 20)
                                        }
                                    </View>
                                </TouchableOpacity>
                            </View>
                            {(fieldLength.password) &&
                                <View style={styles.flexDirectionRowTinyMarginTop}>
                                    <View style={styles.warningIconMargins}>
                                        {useIcons('Warning', 15, 15)}
                                    </View>
                                    <Text style={styles.warningText}>Ingresa tu contraseña</Text>
                                </View>
                            }
                            <View style={styles.mediumMarginTop}>
                                <Text style={styles.footnote}>Repetir contraseña</Text>
                                <View style={[
                                    styles.inputFieldContainerWhite,
                                    (fieldLength.confirmPassword) && styles.warningBorder
                                ]}>
                                    <View style={styles.tinyButtonSize}>
                                        {useIcons('Lock', 20, 20)}
                                    </View>
                                    <TextInput
                                        placeholder='Repite tu contraseña'
                                        placeholderTextColor='#9A9A9A'
                                        secureTextEntry={passwordConfirmVisibility}
                                        style={[
                                            styles.inputField,
                                            styles.newPasswordInputTextSize
                                        ]}
                                        selectionColor='#9A9A9A'
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        onChangeText={(value) => onChange(value, 'confirmPassword')}
                                        value={confirmPassword}
                                    />
                                    <TouchableOpacity
                                        activeOpacity={1.0}
                                        onPress={handleConfirmPasswordVisibility}
                                    >
                                        <View style={styles.alignItemsCenter}>
                                            {(passwordConfirmVisibility === false)
                                                ? useIcons('Eye', 20, 20)
                                                : useIcons('EyeClosed', 20, 20)
                                            }
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {(fieldLength.confirmPassword) &&
                                <View style={styles.flexDirectionRowTinyMarginTop}>
                                    <View style={styles.warningIconMargins}>
                                        {useIcons('Warning', 15, 15)}
                                    </View>
                                    <Text style={styles.warningText}>Ingresa tu contraseña</Text>
                                </View>
                            }
                            {(display) &&
                                <View style={styles.flexDirectionRowTinyMarginTop}>
                                    <View style={styles.warningIconMargins}>
                                        {useIcons('Warning', 15, 15)}
                                    </View>
                                    <Text style={styles.warningText}>
                                        Contraseñas no coinciden
                                    </Text>
                                </View>
                            }
                        </View>
                        <View style={styles.buttonContainerMarginTop}>
                            <TouchableOpacity
                                activeOpacity={1.0}
                                style={styles.button}
                                onPress={onUpdate}
                            >
                                <Text style={styles.buttonText}>Guardar cambios</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            }
        </>
    );
};

export default UpdateProfileInputs;