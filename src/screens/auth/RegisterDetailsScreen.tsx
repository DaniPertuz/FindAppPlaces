import React, { useEffect, useContext, useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Dropdown } from 'react-native-element-dropdown';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { RootStackParams } from '../../navigation';
import { useForm } from '../../hooks/useForm';

import { PlacesContext } from '../../context';
import CustomizedSchedule from '../../components/CustomizedSchedule';
import BusinessDaysSchedule from '../../components/BusinessDaysSchedule';
import { Location } from '../../interfaces';
import { useCoords } from '../../hooks/useCoords';

import styles from '../../themes/AppTheme';

interface Props extends StackScreenProps<RootStackParams, 'RegisterDetailsScreen'> { };

const scheduleData = [
    { days: 'Lunes a Viernes' },
    { days: 'Lunes a Domingo' },
    { days: 'Personalizado' }
];

const RegisterDetailsScreen = ({ navigation, route }: Props) => {

    const { name, email } = route.params;

    const { registerPlace } = useContext(PlacesContext);

    const [days, setDays] = useState<string>('');
    const [placeSchedule, setPlaceSchedule] = useState<string[]>([]);
    const [categoryInput, setCategoryInput] = useState<string>('');
    const [categories, setCategories] = useState<string[]>([]);
    const [coordinates, setCoordinates] = useState<Location>();
    const [placeAddress, setPlaceAddress] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [placeState, setPlaceState] = useState<string>('');
    const [country, setCountry] = useState<string>('');

    const { description, address, phone, whatsapp, instagram, onChange } = useForm({
        description: '',
        address: '',
        phone: '',
        whatsapp: '',
        instagram: ''
    });

    const handleSchedule = (schedule: string[]) => {
        setPlaceSchedule(schedule);
    };

    useEffect(() => { }, [coordinates]);

    const getCoords = async () => {
        const { lat, lng } = await useCoords(address);
        setCoordinates({ latitude: lat, longitude: lng });
    };

    const onCategory = () => {
        categories.push(categoryInput);
        setCategories(categories);
        setCategoryInput('');
    };

    const splitAddress = () => {
        const split = address.split(', ');
        setPlaceAddress(split[0]);
        setCity(split[1]);
        setPlaceState(split[2]);
        setCountry(split[3]);
    }

    const onRegister = () => {
        Keyboard.dismiss();

        registerPlace({
            name,
            description,
            category: categories,
            address: placeAddress,
            email,
            coords: coordinates!,
            phone: Number(phone),
            city,
            state: placeState,
            country,
            instagram,
            whatsapp,
            schedule: placeSchedule,
            photo: '',
            rate: {
                $numberDecimal: '0'
            },
            status: true
        });

        Alert.alert('Lugar registrado exitosamente', '', [
            {text: 'OK', onPress: () => navigation.replace('MainPictureScreen')}
          ]);
    };

    return (
        <>
            <KeyboardAvoidingView
                style={{
                    flex: 1,
                    backgroundColor: '#5856D6'
                }}
                behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
            >
                <ScrollView
                    keyboardShouldPersistTaps='always'
                    nestedScrollEnabled
                    showsVerticalScrollIndicator={false}
                    scrollEnabled
                    style={styles.registerFormContainer}
                    contentContainerStyle={{
                        justifyContent: 'center',
                        paddingVertical: 10
                    }}>
                    <Text style={styles.mediumTitle}>
                        Detalles del lugar
                    </Text>
                    <TextInput
                        placeholder='Descripción'
                        placeholderTextColor='rgba(255,255,255,0.4)'
                        underlineColorAndroid='#FFFFFF'
                        style={[
                            styles.inputField,
                            { marginTop: 20 },
                            (Platform.OS === 'ios') && styles.inputFieldIOS
                        ]}
                        selectionColor='#FFFFFF'
                        autoCorrect={false}
                        returnKeyType='none'
                        multiline
                        onChangeText={(value) => onChange(value, 'description')}
                        value={description}
                    />
                    <TextInput
                        placeholder='Dirección'
                        placeholderTextColor='rgba(255,255,255,0.4)'
                        underlineColorAndroid='#FFFFFF'
                        style={[
                            styles.inputField,
                            { marginTop: 20 },
                            (Platform.OS === 'ios') && styles.inputFieldIOS
                        ]}
                        selectionColor='#FFFFFF'
                        autoCapitalize='words'
                        autoCorrect={false}
                        multiline
                        onEndEditing={() => { getCoords(); splitAddress(); }}
                        onChangeText={(value) => onChange(value, 'address')}
                        value={address}
                    />
                    <TextInput
                        placeholder='Palabras clave'
                        placeholderTextColor='rgba(255,255,255,0.4)'
                        underlineColorAndroid='#FFFFFF'
                        style={[
                            styles.inputField,
                            { marginTop: 20 },
                            (Platform.OS === 'ios') && styles.inputFieldIOS
                        ]}
                        selectionColor='#FFFFFF'
                        autoCapitalize='words'
                        autoCorrect={false}
                        clearButtonMode='always'
                        returnKeyType='done'
                        blurOnSubmit={false}
                        onSubmitEditing={onCategory}
                        onChangeText={setCategoryInput}
                        value={categoryInput}
                    />
                    {/* 
                    <Dropdown data={countries.all().map(country => {
                        return { label: country.isoCode, name: country.name };
                    })}
                        labelField={'name'}
                        valueField={'label'}
                        onChange={(item) => { setCountry(item.name); }}
                    />
                    {country !== '' &&
                        <>
                            
                            <Dropdown data={states.getByCountry(country).map(state => {
                                return { label: state.isoCode, name: state.name };
                            })}
                                labelField={'name'}
                                valueField={'label'}
                                onChange={(item) => { setCountryState(item.name); }}
                            />
                        </>
                    }
                    {countryState !== '' &&
                        <>
                            
                            <Dropdown data={cities.getByState(countryState, country).map(({ name }) => {
                                return { city: name };
                            })}
                                labelField={'city'}
                                valueField={'city'}
                                onChange={(item) => { setCity(item.city); }}
                            />
                        </>
                    } */}

                    {/*                     
                    <ScrollView
                        horizontal
                        keyboardShouldPersistTaps='always'
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ width: '100%', paddingTop: 15, marginHorizontal: 4 }}
                    >
                        <GooglePlacesAutocomplete
                            styles={{
                                textInput: {
                                    backgroundColor: '#5856D6',
                                    borderBottomColor: "#FFFFFF",
                                    borderBottomWidth: 2,
                                    borderRadius: 0,
                                    color: '#FFFFFF',
                                    fontSize: 20
                                }
                            }}
                            placeholder='Dirección'
                            textInputProps={{
                                placeholderTextColor: '#FFFFFF',
                                onChangeText: (value) => onChange(value, 'address')
                            }}
                            onPress={(data, details = null) => console.log(data.description.split(','), details?.geometry.location)}
                            query={{ key: 'AIzaSyB9cUia0ri1C91zl989CEftXgJ4OHwa2hQ' }}
                            fetchDetails={true}
                            onFail={error => console.log(error)}
                            onNotFound={() => console.log('No results')}
                            listEmptyComponent={() => (
                                <View style={{ flex: 1 }}>
                                    <Text style={{ color: '#FFFFFF' }}>No se encontró ningún lugar</Text>
                                </View>
                            )}
                        />
                    </ScrollView> */}
                    <TextInput
                        placeholder='Instagram'
                        placeholderTextColor='rgba(255,255,255,0.4)'
                        underlineColorAndroid='#FFFFFF'
                        style={[
                            styles.inputField,
                            { marginTop: 20 },
                            (Platform.OS === 'ios') && styles.inputFieldIOS
                        ]}
                        selectionColor='#FFFFFF'
                        autoCapitalize='words'
                        autoCorrect={false}
                        onChangeText={(value) => onChange(value, 'instagram')}
                        value={instagram}
                    />
                    <View
                        style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15 }}
                    >
                        <TextInput
                            placeholder='WhatsApp'
                            placeholderTextColor='rgba(255,255,255,0.4)'
                            underlineColorAndroid='#FFFFFF'
                            style={[
                                styles.inputField,
                                { width: '50%' },
                                (Platform.OS === 'ios') && styles.inputFieldIOS
                            ]}
                            selectionColor='#FFFFFF'
                            keyboardType='phone-pad'
                            autoCorrect={false}
                            onChangeText={(value) => onChange(value, 'whatsapp')}
                            value={whatsapp}
                        />
                        <TextInput
                            placeholder='Teléfono'
                            placeholderTextColor='rgba(255,255,255,0.4)'
                            underlineColorAndroid='#FFFFFF'
                            style={[
                                styles.inputField,
                                { width: '50%' },
                                (Platform.OS === 'ios') && styles.inputFieldIOS
                            ]}
                            selectionColor='#FFFFFF'
                            keyboardType='phone-pad'
                            autoCorrect={false}
                            onChangeText={(value) => onChange(value, 'phone')}
                            value={phone}
                        />
                    </View>
                    <Dropdown data={scheduleData.map(({ days }) => {
                        return { days };
                    })}
                        labelField={'days'}
                        valueField={'days'}
                        placeholder='Días de atención'
                        placeholderStyle={{ color: '#FFFFFF' }}
                        showsVerticalScrollIndicator={false}
                        selectedTextStyle={{ color: '#FFFFFF' }}
                        style={{ height: 25, borderColor: '#FFFFFF', borderWidth: 2, borderRadius: 8, marginTop: 25, marginBottom: 10, paddingHorizontal: 15, paddingVertical: 20 }}
                        iconStyle={{ tintColor: '#FFFFFF' }}
                        onChange={(item) => { setDays(item.days); }}
                        value={days}
                    />
                    {days === 'Lunes a Viernes' &&
                        <BusinessDaysSchedule everyday={false} sendSchedule={handleSchedule} />
                    }
                    {days === 'Lunes a Domingo' &&
                        <BusinessDaysSchedule everyday={true} sendSchedule={handleSchedule} />
                    }
                    {days === 'Personalizado' &&
                        <CustomizedSchedule everyday={true} />
                    }
                    <View style={styles.loginButtonContainer}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.button}
                            onPress={onRegister}
                        >
                            <Text style={styles.buttonText}>Continuar</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    );
};

export default RegisterDetailsScreen;