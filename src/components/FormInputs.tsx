import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParams } from '../navigation';
import LoginButton from './LoginButton';
import { useIcons } from '../hooks';

import styles from '../themes/AppTheme';

interface Props {
    email: string;
    password: string;
    onChange: (value: string, field: 'email' | 'password') => void;
}

const FormInputs = ({ email, password, onChange }: Props) => {

    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [eyeIcon] = useState('../assets/eye-closed.png');
    const [fieldLength, setFieldLength] = useState({
        email: false,
        password: false
    });
    const navigator = useNavigation<StackNavigationProp<RootStackParams>>();

    const handlePasswordVisibility = () => {
        if (eyeIcon === '../assets/eye-closed.png') {
            setPasswordVisibility(!passwordVisibility);
        } else if (eyeIcon === '../assets/eye.png') {
            setPasswordVisibility(!passwordVisibility);
        }
    };

    const handleFieldLength = (email: boolean, password: boolean) => {
        setFieldLength({
            email,
            password
        });
    };

    return (
        <View>
            <View style={styles.tinyMarginBottom}>
                <Text style={styles.footnote}>
                    Correo corporativo
                </Text>
            </View>
            <View style={[
                styles.inputFieldContainer,
                (fieldLength.email === true) && styles.warningBorder
            ]}>
                {useIcons('Envelope', 20, 20)}
                <TextInput
                    placeholder='Ingresa tu usuario o correo'
                    placeholderTextColor='#9A9A9A'
                    keyboardType='email-address'
                    style={styles.inputField}
                    selectionColor='#9A9A9A'
                    autoCapitalize='none'
                    autoCorrect={false}
                    onChangeText={(value) => onChange(value, 'email')}
                    value={email}
                />
            </View>
            {(fieldLength.email === true) &&
                <View style={styles.flexDirectionRowTinyMarginTop}>
                    <View style={styles.warningIconMargins}>
                        {useIcons('Warning', 15, 15)}
                    </View>
                    <Text style={styles.warningText}>Ingresa tu correo</Text>
                </View>
            }
            <View style={{ marginTop: 20 }}>
                <View style={styles.tinyMarginBottom}>
                    <Text style={styles.footnote}>
                        Contraseña
                    </Text>
                </View>
                <View style={[styles.inputFieldContainer, (fieldLength.password === true) && styles.warningBorder]}>
                    <View style={{ flex: 0.35 }}>
                        {useIcons('Lock', 20, 20)}
                    </View>
                    <TextInput
                        placeholder='Ingresa tu contraseña'
                        placeholderTextColor='#9A9A9A'
                        secureTextEntry={passwordVisibility}
                        style={[
                            styles.inputField,
                            { flex: 3, marginEnd: 10 }
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
                        {(passwordVisibility === false)
                            ? <View style={styles.hideButtonContainer}>
                                {useIcons('Eye', 20, 20)}
                            </View>
                            : <View style={styles.hideButtonContainer}>
                                {useIcons('EyeClosed', 20, 20)}
                            </View>
                        }
                    </TouchableOpacity>
                </View>
                {(fieldLength.password === true) &&
                    <View style={styles.flexDirectionRowTinyMarginTop}>
                        <View style={styles.warningIconMargins}>
                            {useIcons('Warning', 15, 15)}
                        </View>
                        <Text style={styles.warningText}>
                            Ingresa tu contraseña
                        </Text>
                    </View>
                }
            </View>
            <View style={styles.forgotPasswordContainer}>
                <TouchableOpacity
                    activeOpacity={1.0}
                    onPress={() => navigator.navigate('NewPasswordScreen')}
                >
                    <Text style={styles.captionLink}>
                        ¿Olvidaste tu contraseña?
                    </Text>
                </TouchableOpacity>
            </View>
            <LoginButton email={email} password={password} handleFieldLength={handleFieldLength} />
            <View style={styles.createAccountButtonsContainer}>
                <View style={styles.tinyMarginEnd}>
                    <Text style={styles.plainMediumText}>
                        ¿No tienes una empresa registrada?
                    </Text>
                </View>
                <TouchableOpacity
                    activeOpacity={0.9}
                    style={styles.justifyContentCenter}
                    onPress={() => navigator.replace('RegisterScreen')}
                >
                    <Text style={styles.plainMediumTextLink}>
                        Crear cuenta
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default FormInputs;