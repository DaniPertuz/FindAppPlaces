import React, { useContext, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Snackbar from 'react-native-snackbar';

import { AuthContext, PlacesContext } from '../context';
import { useEmailValidation, useEmptyFieldValidation, usePasswordVisibility } from '../hooks';
import { roles } from '../interfaces';
import { RootStackParams } from '../navigation/MainNavigator';

import DefaultInput from './profile/forms/default-input';
import EmailInput from './profile/forms/email-input';
import PasswordInput from './profile/forms/password-input';
import SubmitButton from './profile/ui/SubmitButton';
import WarningMessage from './ui/WarningMessage';

import styles from '../themes/AppTheme';

interface Props {
    name: string;
    email: string;
    password: string;
    onChange: (value: string, field: 'name' | 'password' | 'confirmPassword' | 'email' | 'category' | 'other' | 'phone' | 'whatsapp' | 'instagram') => void;
}

const RegisterFormInputs = ({ name, email, password, onChange }: Props) => {

    const navigator = useNavigation<StackNavigationProp<RootStackParams>>();

    const { signUp } = useContext(AuthContext);
    const { registerPlace } = useContext(PlacesContext);

    const [emailValid, setEmailValid] = useState(true);
    const [loading, setLoading] = useState(false);
    const [warning, setWarning] = useState(false);

    const isValidEmail = useEmailValidation(email);
    const { isEmpty: isEmailEmpty, checkEmptyFields: checkEmailEmpty } = useEmptyFieldValidation();
    const { isEmpty: isNameEmpty, checkEmptyFields: checkNameEmpty } = useEmptyFieldValidation();
    const { isEmpty: isPasswordEmpty, checkEmptyFields: checkPasswordEmpty } = useEmptyFieldValidation();
    const { eyeIcon, passwordVisibility, handlePasswordVisibility } = usePasswordVisibility();

    const onLogin = () => {
        Keyboard.dismiss();
        setLoading(true);

        checkNameEmpty(name);
        checkEmailEmpty(email);
        checkPasswordEmpty(password);
        setEmailValid(isValidEmail);
        setWarning(!isValidEmail);

        if (isNameEmpty || !isEmailEmpty || !isPasswordEmpty || !isValidEmail) {
            setLoading(false);
        }

        if (!isNameEmpty && !isEmailEmpty && !isPasswordEmpty && isValidEmail) {
            signUp({
                name,
                email,
                password,
                role: roles.PLACE,
                status: true
            });

            registerPlace({
                name,
                description: '',
                category: '',
                address: '',
                email,
                coords: { latitude: 0, longitude: 0 },
                phone: 3000000,
                city: '',
                cityState: '',
                country: '',
                schedule: [],
                premium: 3,
                pics: [],
                rate: {
                    $numberDecimal: '0'
                },
                status: true,
            });

            setLoading(false);
            Snackbar.show({ text: 'Registro exitoso', duration: Snackbar.LENGTH_SHORT });
        }
    };

    return (
        <KeyboardAvoidingView behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}>
            <View style={styles.mediumMarginTop}>
                <View style={styles.tinyMarginBottom}>
                    <Text style={styles.footnote}>Nombre de la Empresa</Text>
                </View>
                <DefaultInput field={name} fieldValue={'name'} placeholder={'Ingresa el nombre de la empresa'} icon={'Users'} keyboardType={'default'} onChange={onChange} />
                {(isNameEmpty) &&
                    <WarningMessage warningText='Ingresa el nombre de tu empresa' />
                }
            </View>
            <View style={styles.mediumMarginTop}>
                <View style={styles.tinyMarginBottom}>
                    <Text style={styles.footnote}>Correo corporativo</Text>
                </View>
                <EmailInput field={email} fieldValue={'email'} placeholder={'Ingresa tu correo'} warning={(isEmailEmpty || warning)} onChange={onChange} />
                {(isEmailEmpty) &&
                    <WarningMessage warningText='Ingresa tu correo' />
                }
                {(!emailValid && !isEmailEmpty) &&
                    <WarningMessage warningText='Correo inválido' />
                }
            </View>
            <View style={styles.mediumMarginTop}>
                <View style={styles.tinyMarginBottom}>
                    <Text style={styles.footnote}>Contraseña</Text>
                </View>
                <PasswordInput field={password} fieldValue={'password'} placeholder={'Ingresa tu contraseña'} warning={isPasswordEmpty} onChange={onChange} />
                {(isPasswordEmpty) &&
                    <WarningMessage warningText='Ingresa tu contraseña' />
                }
            </View>
            <View style={{ marginTop: 29 }}>
                <SubmitButton loading={loading} value={'Crear Cuenta'} onPress={onLogin} />
            </View>
            <View style={styles.createAccountButtonsContainer}>
                <View style={styles.tinyMarginEnd}>
                    <Text style={styles.plainMediumText}>¿Ya tienes una empresa registrada?</Text>
                </View>
                <TouchableOpacity
                    activeOpacity={0.9}
                    style={styles.justifyContentCenter}
                    onPress={() => navigator.replace('LoginScreen')}
                >
                    <Text style={styles.plainMediumTextLink}>Inicia Sesión</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default RegisterFormInputs;