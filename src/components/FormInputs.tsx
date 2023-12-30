import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParams } from '../navigation/MainNavigator';
import LoginButton from './LoginButton';
import { useEmptyFieldValidation, useIcons, usePasswordVisibility } from '../hooks';

import styles from '../themes/AppTheme';

interface Props {
    email: string;
    password: string;
    onChange: (value: string, field: 'email' | 'password') => void;
}

const FormInputs = ({ email, password, onChange }: Props) => {

    const navigator = useNavigation<StackNavigationProp<RootStackParams>>();

    const [validEmail, setValidEmail] = useState(true);
    const [warning, setWarning] = useState(false);

    const { isEmpty: isEmailEmpty, checkEmptyFields: checkEmailEmpty } = useEmptyFieldValidation();
    const { isEmpty: isPasswordEmpty, checkEmptyFields: checkPasswordEmpty } = useEmptyFieldValidation();
    const { eyeIcon, passwordVisibility, handlePasswordVisibility } = usePasswordVisibility();

    const handleFieldLength = (emailEmpty: string, passwordEmpty: string) => {
        checkEmailEmpty(emailEmpty);
        checkPasswordEmpty(passwordEmpty);
    };

    const handleEmailValidation = (emailValid: boolean) => {
        setValidEmail(emailValid);
        setWarning(!emailValid);
    };

    return (
        <KeyboardAvoidingView behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}>
            <View style={styles.tinyMarginBottom}>
                <Text style={styles.footnote}>Correo corporativo</Text>
            </View>
            <View style={[styles.inputFieldContainer, (isEmailEmpty || warning) && styles.warningBorder]}>
                <View style={{ ...styles.flexOne, ...styles.alignItemsCenter }}>
                    {useIcons('Envelope', 20, 20)}
                </View>
                <TextInput
                    placeholder='Ingresa tu usuario o correo'
                    placeholderTextColor='#9A9A9A'
                    keyboardType='email-address'
                    style={[
                        styles.inputField,
                        { flex: 9, marginStart: 10 }
                    ]}
                    selectionColor='#9A9A9A'
                    autoCapitalize='none'
                    autoCorrect={false}
                    onChangeText={(value) => onChange(value, 'email')}
                    value={email}
                />
            </View>
            {(isEmailEmpty) &&
                <View style={styles.flexDirectionRowTinyMarginTop}>
                    <View style={styles.warningIconMargins}>
                        {useIcons('Warning', 15, 15)}
                    </View>
                    <Text style={styles.warningText}>Ingresa tu correo</Text>
                </View>
            }
            {(!validEmail && !isEmailEmpty) &&
                <View style={styles.flexDirectionRowTinyMarginTop}>
                    <View style={styles.warningIconMargins}>
                        {useIcons('Warning', 15, 15)}
                    </View>
                    <Text style={styles.warningText}>Correo inválido</Text>
                </View>
            }
            <View style={styles.mediumMarginTop}>
                <View style={styles.tinyMarginBottom}>
                    <Text style={styles.footnote}>Contraseña</Text>
                </View>
                <View style={[styles.inputFieldContainer, (isPasswordEmpty) && styles.warningBorder]}>
                    <View style={{ ...styles.flexOne, ...styles.alignItemsCenter }}>
                        {useIcons('Lock', 20, 20)}
                    </View>
                    <TextInput
                        placeholder='Ingresa tu contraseña'
                        placeholderTextColor='#9A9A9A'
                        secureTextEntry={passwordVisibility}
                        style={[
                            styles.inputField,
                            { flex: 9, marginHorizontal: 10 }
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
                        {useIcons(eyeIcon, 20, 20)}
                    </TouchableOpacity>
                </View>
                <View style={styles.flexDirectionRowJustifySpaceBetween}>
                    <View style={styles.forgotPasswordContainerWarning}>
                        {(isPasswordEmpty) &&
                            <View style={styles.flexDirectionRowTinyMarginTop}>
                                <View style={styles.warningIconMargins}>
                                    {useIcons('Warning', 15, 15)}
                                </View>
                                <Text style={styles.warningText}>Ingresa tu contraseña</Text>
                            </View>
                        }
                    </View>
                    <View style={styles.forgotPasswordContainer}>
                        <TouchableOpacity
                            activeOpacity={1.0}
                            onPress={() => navigator.navigate('NewPasswordScreen')}
                        >
                            <Text style={styles.captionLink}>¿Olvidaste tu contraseña?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <LoginButton email={email} password={password} handleFieldLength={handleFieldLength} handleEmailValidation={handleEmailValidation} />
            <View style={styles.createAccountButtonsContainer}>
                <View style={styles.tinyMarginEnd}>
                    <Text style={styles.plainMediumText}>¿No tienes una empresa registrada?</Text>
                </View>
                <TouchableOpacity
                    activeOpacity={1.0}
                    style={styles.justifyContentCenter}
                    onPress={() => navigator.replace('RegisterScreen')}
                >
                    <Text style={styles.plainMediumTextLink}>Crear cuenta</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default FormInputs;