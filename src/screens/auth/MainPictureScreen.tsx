import React, { useContext, useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import { AuthContext } from '../../context';
import { RootStackParams } from '../../navigation';

import styles from '../../themes/AppTheme';

interface Props extends StackScreenProps<RootStackParams, 'MainPictureScreen'> { };

const MainPictureScreen = ({ navigation }: Props) => {

    const { top } = useSafeAreaInsets();

    const { uploadImage, user } = useContext(AuthContext);

    const [tempUri, setTempUri] = useState<string>('');

    const addPhoto = () => {
        launchCamera({
            mediaType: 'photo',
            quality: 0.8
        }, (resp) => {
            if (resp.didCancel) return;
            if (!resp.assets![0].uri) return;

            setTempUri(resp.assets![0].uri);
            uploadImage(resp, user?._id!);
        });
    };

    const addGalleryImage = () => {
        launchImageLibrary({
            mediaType: 'photo',
            quality: 0.8
        }, (resp) => {
            if (resp.didCancel) return;
            if (!resp.assets![0].uri) return;

            setTempUri(resp.assets![0].uri);
            uploadImage(resp, user?._id!);
        });
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
                <View
                    style={{
                        ...styles.formContainer,
                        paddingTop: (Platform.OS === 'ios') ? top : top + 50
                    }}
                >
                    <Text
                        style={styles.subtitle}
                    >
                        ¿Deseas agregar tu foto de perfil?
                    </Text>
                    {
                        (tempUri !== '') && (
                            <Image
                                source={{ uri: tempUri }}
                                style={{
                                    alignSelf: 'center',
                                    marginTop: 25,
                                    height: 170,
                                    width: '40%'
                                }}
                            />
                        )
                    }
                    <View
                        style={styles.buttonImagesContainer}
                    >
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.button}
                            onPress={addPhoto}
                        >
                            <Text style={styles.buttonText}>Tomar foto</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.button}
                            onPress={addGalleryImage}
                        >
                            <Text style={styles.buttonText}>Galería</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View
                    style={styles.decisionContainer}
                >
                    <TouchableOpacity
                        onPress={() => navigation.replace('MainScreen')}
                        activeOpacity={0.8}
                        style={styles.buttonSkip}
                    >
                        <Text style={styles.buttonText}>
                            {(tempUri !== '')
                                ?
                                'Continuar'
                                :
                                'Omitir'
                            }
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </>
    );
};

export default MainPictureScreen;