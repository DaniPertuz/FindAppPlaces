import { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ImagePickerResponse } from 'react-native-image-picker';
import Snackbar from 'react-native-snackbar';

import { AuthContext, PlacesContext, UsersContext } from '../context';
import { IPlace, Location } from '../interfaces';
import { RootStackParams } from '../navigation/MainNavigator';
import { useCoords, useForm, useImagesGallery } from './';

interface Props {
    place: IPlace;
}

export const useUpdateProfileProps = ({ place }: Props) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

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

    const { user } = useContext(AuthContext);
    const { updatePlace } = useContext(PlacesContext);
    const { updateUserPassword } = useContext(UsersContext);

    const [loading, setLoading] = useState(false);
    const [validPassword, setValidPassword] = useState(true);
    const [coordinates, setCoordinates] = useState<Location>();
    const [city, setCity] = useState('');
    const [cityState, setCityState] = useState('');
    const [country, setCountry] = useState('');
    const [placeCategory, setPlaceCategory] = useState('');
    const [placeSchedule, setPlaceSchedule] = useState<string[]>([]);
    const [placeImages, setPlaceImages] = useState<string[]>([]);
    const [response, setResponse] = useState<ImagePickerResponse>();

    const { handleUploadPics } = useImagesGallery({ place });

    const handlePicsFromGallery = (response: ImagePickerResponse) => setResponse(response);

    const handleSchedule = (schedule: string[]) => setPlaceSchedule(schedule);

    const splitAddress = (address: string) => {
        const sp = address.split(', ');
        sp.shift();
        setCity(sp[0]);
        setCityState(sp[1]);
        setCountry(sp[2]);
    };

    const getCoords = async () => {
        try {
            const { lat, lng } = await useCoords(address);
            if (lat && lng) {
                setCoordinates({ latitude: lat, longitude: lng });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const onAddressBlur = () => {
        getCoords();
        if (!coordinates) {
            Snackbar.show({ text: 'Dirección no encontrada\nIngresa nuevamente', duration: Snackbar.LENGTH_SHORT });
            return;
        }

        Snackbar.show({ text: 'Dirección encontrada', duration: Snackbar.LENGTH_SHORT });
    };

    const onSubmit = async () => {
        setLoading(true);

        if (password !== confirmPassword) {
            setValidPassword(false);
            setLoading(false);
            return;
        }

        if (password.length !== 0 && confirmPassword.length !== 0) {
            updateUserPassword(user?.email!, password);
            setValidPassword(true);
            Snackbar.show({ text: 'Contraseña actualizada', duration: Snackbar.LENGTH_SHORT });
            navigation.replace('Profile');
        }

        if (password.length === 0 && confirmPassword.length === 0) {
            const pics = await handleUploadPics(response!);

            const data: IPlace = {
                name,
                description,
                category: other !== '' ? other[0].toUpperCase() + other.slice(1) : category,
                address,
                email: place.email,
                coords: coordinates!,
                phone: Number(phone),
                whatsapp: whatsapp || '',
                instagram: instagram || '',
                city,
                cityState,
                country,
                schedule: placeSchedule.length === 0 ? place.schedule : placeSchedule,
                pics: pics ? (place.premium === 3 ? [...placeImages, ...pics!] : pics) : place.pics,
                status: true
            };

            await updatePlace(place._id!, data);
            setLoading(false);
            Snackbar.show({ text: 'Cambios registrados', duration: Snackbar.LENGTH_SHORT });
            navigation.goBack();
        }
    };

    useEffect(() => {
        setPlaceCategory(category);
        setPlaceImages(place.pics);
    }, []);

    useEffect(() => {
        getCoords();
    }, [address]);

    useEffect(() => {
        splitAddress(address);
    }, [coordinates, address]);

    return {
        loading,
        validPassword,
        placeCategory,
        description,
        name,
        category,
        address,
        phone,
        whatsapp,
        instagram,
        password,
        confirmPassword,
        other,
        handlePicsFromGallery,
        handleSchedule,
        onAddressBlur,
        onChange,
        onSubmit,
        setPlaceCategory
    };
};
