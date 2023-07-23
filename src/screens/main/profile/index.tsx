import React, { useContext, useEffect, useState } from 'react';
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Snackbar from 'react-native-snackbar';

import { AuthContext, PlacesContext, UsersContext } from '../../../context';
import { useIcons } from '../../../hooks';
import { IPlace, IUser } from '../../../interfaces';
import { RootStackParams } from '../../../navigation/MainNavigator';
import LoadingScreen from '../../LoadingScreen';

import styles from '../../../themes/AppTheme';

const ProfileScreen = () => {
    const isFocused = useIsFocused();

    const { logOut, user } = useContext(AuthContext);
    const { loadPlaceByEmail, updatePlacePhoto } = useContext(PlacesContext);
    const { updateUser, updatePhoto, loadUserByID } = useContext(UsersContext);

    const [modalVisible, setModalVisible] = useState(false);
    const [imageModalVisible, setImageModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [place, setPlace] = useState<IPlace>();
    const [response, setResponse] = useState<any>(null);
    const [userDB, setUserDB] = useState<IUser>();

    const navigator = useNavigation<StackNavigationProp<RootStackParams>>();

    const addPhoto = () => {
        launchCamera({
            mediaType: 'photo',
            quality: 0.8
        }, (resp) => {
            if (resp.didCancel) return;
            if (!resp.assets![0].uri) return;

            onUpdate(resp);
        });
    };

    const addGalleryImage = () => {
        launchImageLibrary({
            mediaType: 'photo',
            quality: 0.8
        }, (resp) => {
            if (resp.didCancel) return;
            if (!resp.assets![0].uri) return;

            onUpdate(resp);
        });
    };

    const onUpdate = async (response: any) => {
        if (response && response.assets[0].uri !== '') {
            setLoading(false);
            const photoURL = await updatePhoto(response, userDB?._id!);
            updateUser(userDB?._id!, userDB?.name!, photoURL);
            console.log(place)
            updatePlacePhoto(place?._id!, photoURL);
            setLoading(true);
            Snackbar.show({
                text: 'Foto actualizada',
                duration: Snackbar.LENGTH_SHORT,
            });
        }
    };

    const updateMainPhoto = () => {
        setModalVisible(true);
    };

    const load = async () => {
        const usr = await loadUserByID(user?._id!);
        setUserDB(usr);
    };

    useEffect(() => {
        if (isFocused === true) {
            load();
        }
    }, [isFocused, userDB]);

    useEffect(() => {
        setLoading(loading);
    }, [userDB?.photo]);

    useEffect(() => {
        let mounted = true;
        if (userDB) {
            loadPlaceByEmail(userDB?.email!).then((data) => {
                if (mounted) {
                    setPlace(data);
                }
            });
        }
        return () => {
            mounted = false;
        };
    }, [userDB]);

    return (
        <>
            {(loading === false) && <LoadingScreen />}

            {(loading === true) &&
                <>
                    <View style={{ paddingHorizontal: 20, paddingTop: 60 }}>
                        <View style={styles.flexDirectionRowJustifyCenter}>
                            <Image
                                source={(!userDB || userDB?.photo === '')
                                    ? require('../../../assets/fa_blue.png')
                                    : (response?.assets && response.assets[0].uri !== '')
                                        ? { uri: response.assets[0].uri }
                                        : { uri: userDB?.photo }}
                                style={{ borderRadius: 50, height: 97, width: 97 }}
                            />
                            <TouchableOpacity
                                activeOpacity={1.0}
                                onPress={updateMainPhoto}
                                style={styles.editProfilePhotoButton}
                            >
                                {useIcons('Camera', 30, 30)}
                            </TouchableOpacity>
                        </View>
                        <View style={{ paddingHorizontal: 40 }}>
                            <View style={{ ...styles.flexDirectionRowJustifyCenter, ...styles.mediumMarginTop }}>
                                <Text numberOfLines={2} style={styles.h3}>{user?.name}</Text>
                                <View style={styles.alignJustifyCenter}>
                                    <TouchableOpacity
                                        activeOpacity={0.9}
                                        onPress={() => { navigator.navigate('UpdateProfileScreen', { place: place! }); }}
                                        style={styles.editProfileButton}
                                    >
                                        {useIcons('Edit', 20, 20)}
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{ ...styles.flexDirectionRowJustifyCenter, ...styles.tinyMarginTop }}>
                            <Text numberOfLines={1} style={styles.bodySmallGray}>{userDB?.email}</Text>
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.captionTwo}>Descripción</Text>
                            <Text numberOfLines={5} style={styles.bodySmall}>{place?.description} Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
                        </View>
                        <View style={styles.mediumMarginTop}>
                            <Text style={styles.captionTwo}>Nombre de la empresa</Text>
                            <View style={{ ...styles.flexDirectionRow, marginTop: 4 }}>
                                <View style={styles.editProfileIconMargins}>
                                    {useIcons('Users', 18, 18)}
                                </View>
                                <Text style={styles.bodySmall}>{place?.name}</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.captionTwo}>Email</Text>
                            <View style={{ ...styles.flexDirectionRow, marginTop: 4 }}>
                                <View style={styles.editProfileIconMargins}>
                                    {useIcons(`${place?.category}`, 18, 18)}
                                </View>
                                <Text style={styles.bodySmall}>{place?.category}</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.captionTwo}>Email</Text>
                            <View style={{ ...styles.flexDirectionRow, marginTop: 4 }}>
                                <View style={styles.editProfileIconMargins}>
                                    {useIcons('Envelope', 18, 18)}
                                </View>
                                <Text style={styles.bodySmall}>{place?.email}</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <View style={styles.alignItemsBaseline}>
                                <TouchableOpacity
                                    activeOpacity={1.0}
                                    style={styles.alignItemsBaseline}
                                    onPress={logOut}
                                >
                                    <Text style={styles.captionWarning}>Cerrar sesión</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <View style={styles.editProfileModal}>
                                <View style={styles.editProfileModalBackButtonContainer}>
                                    <TouchableOpacity
                                        activeOpacity={1.0}
                                        style={styles.modalBackButtonMargins}
                                        onPress={() => setModalVisible(false)}
                                    >
                                        {useIcons('Down', 30, 30)}
                                    </TouchableOpacity>
                                </View>
                                <View style={{ ...styles.flexDirectionRowJustifyAround, marginHorizontal: 10 }}>
                                    <View style={styles.alignItemsCenter}>
                                        <TouchableOpacity
                                            activeOpacity={0.9}
                                            onPress={() => { addGalleryImage(); setModalVisible(false); }}
                                            style={styles.editProfileGalleryButton}
                                        >
                                            <Image source={require('../../../assets/gallery.png')} style={{ height: 25, width: 25 }} />
                                        </TouchableOpacity>
                                        <Text>Galería</Text>
                                    </View>
                                    <View style={styles.alignItemsCenter}>
                                        <TouchableOpacity
                                            activeOpacity={0.9}
                                            onPress={() => { addPhoto(); setModalVisible(false); }}
                                            style={styles.editProfileGalleryButton}
                                        >
                                            <Image source={require('../../../assets/camera.png')} style={{ height: 25, width: 25 }} />
                                        </TouchableOpacity>
                                        <Text>Cámara</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Modal>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={imageModalVisible}
                        onRequestClose={() => {
                            setImageModalVisible(!imageModalVisible);
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: 'rgba(250, 250, 250, 0.98)',
                                height: '85%',
                                top: '180%',
                                borderTopEndRadius: 10,
                                borderTopStartRadius: 10,
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 1,
                                },
                                shadowOpacity: 0.22,
                                shadowRadius: 2.22,
                                elevation: 3
                            }}
                        >
                            <Image
                                source={response === null ? require('../../../assets/fa_blue.png') : { uri: response.assets[0].uri }} style={{ height: 25, width: 25 }}
                            />
                        </View>
                    </Modal>
                </>
            }
        </>
    );
};

export default ProfileScreen;