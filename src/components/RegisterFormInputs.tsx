import React, { useContext, useState } from 'react';
import { Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { AuthContext, PlacesContext } from '../context';
import { useEmailValidation, useFieldValidation, useIcons, usePasswordVisibility } from '../hooks';
import { roles } from '../interfaces';
import { RootStackParams } from '../navigation/MainNavigator';

import styles from '../themes/AppTheme';

interface Props {
    name: string;
    email: string;
    password: string;
    onChange: (value: string, field: 'name' | 'email' | 'password') => void;
    handleResize: (value: string) => void;
}

const RegisterFormInputs = ({ name, email, password, onChange, handleResize }: Props) => {

    const [display, setDisplay] = useState(false);
    const { signUp } = useContext(AuthContext);
    const { registerPlace } = useContext(PlacesContext);
    const { fieldLength, validateFields } = useFieldValidation();
    const { eyeIcon, passwordVisibility, handlePasswordVisibility } = usePasswordVisibility();

    const navigator = useNavigation<StackNavigationProp<RootStackParams>>();

    const onLogin = () => {
        Keyboard.dismiss();

        validateFields({
            name: name.length === 0,
            email: email.length === 0,
            password: password.length === 0
        });

        const isValidEmail = useEmailValidation(email);
        const isEmailEmpty = email.length === 0;
        const isNameEmpty = name.length === 0;
        const isPasswordEmpty = password.length === 0;

        if (isEmailEmpty) {
            if (isNameEmpty && isPasswordEmpty) {
                handleResize('12%');
                return;
            }

            if (isNameEmpty && !isPasswordEmpty) {
                handleResize('18%');
                return;
            }

            if (!isNameEmpty && isPasswordEmpty) {
                handleResize('18%');
                return;
            }

            setDisplay(false);
            handleResize('24%');
            return;
        }

        let resizePercentage = '12%';

        if (!isEmailEmpty && !isValidEmail) {
            if (isPasswordEmpty && isNameEmpty) {
                resizePercentage = '12%';
            } else if (isPasswordEmpty && !isNameEmpty) {
                resizePercentage = '18%';
            } else if (!isPasswordEmpty && !isNameEmpty) {
                resizePercentage = '24%';
                setDisplay(true);
            } else if (!isPasswordEmpty && isNameEmpty) {
                resizePercentage = '24%';
            }
        } else if (isValidEmail) {
            if (!isPasswordEmpty && !isNameEmpty) {
                resizePercentage = '24%';
            } else if (isPasswordEmpty && !isNameEmpty) {
                resizePercentage = '18%';
            } else if (isPasswordEmpty && isNameEmpty) {
                resizePercentage = '18%';
            }
        }

        handleResize(resizePercentage);

        if (name.length !== 0 && email.length !== 0 && password.length !== 0 && isValidEmail) {
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
                state: '',
                country: '',
                schedule: [],
                premium: 3,
                rate: {
                    $numberDecimal: '0'
                },
                status: true
            });
        }
    };

    return (
        <View>
            <View style={styles.mediumMarginTop}>
                <View style={styles.tinyMarginBottom}>
                    <Text style={styles.footnote}>Nombre de la Empresa</Text>
                </View>
                <View style={[styles.inputFieldContainer, (fieldLength.name) && styles.warningBorder]}>
                    <View style={{ ...styles.flexOne, ...styles.alignItemsCenter }}>
                        {useIcons('Users', 20, 20)}
                    </View>
                    <TextInput
                        placeholder='Ingresa el nombre de la empresa'
                        placeholderTextColor='#9A9A9A'
                        keyboardType='default'
                        style={[styles.inputField, { flex: 9 }]}
                        selectionColor='#9A9A9A'
                        autoCapitalize='none'
                        autoCorrect={false}
                        onChangeText={(value) => onChange(value, 'name')}
                        value={name}
                    />
                </View>
                {(fieldLength.name) &&
                    <View style={styles.flexDirectionRowTinyMarginTop}>
                        <View style={styles.warningIconMargins}>
                            {useIcons('Warning', 15, 15)}
                        </View>
                        <Text style={styles.warningText}>Ingresa el nombre de tu empresa</Text>
                    </View>
                }
            </View>
            <View style={styles.mediumMarginTop}>
                <View style={styles.tinyMarginBottom}>
                    <Text style={styles.footnote}>Correo corporativo</Text>
                </View>
                <View style={[styles.inputFieldContainer, (fieldLength.email) && styles.warningBorder]}>
                    <View style={{ ...styles.flexOne, ...styles.alignItemsCenter }}>
                        {useIcons('Envelope', 20, 20)}
                    </View>
                    <TextInput
                        placeholder='Ingresa tu correo'
                        placeholderTextColor='#9A9A9A'
                        keyboardType='email-address'
                        style={[styles.inputField, { flex: 9 }]}
                        selectionColor='#9A9A9A'
                        autoCapitalize='none'
                        autoCorrect={false}
                        onChangeText={(value) => onChange(value, 'email')}
                        value={email}
                    />
                </View>
                {(fieldLength.email) &&
                    <View style={styles.flexDirectionRowTinyMarginTop}>
                        <View style={styles.warningIconMargins}>
                            {useIcons('Warning', 15, 15)}
                        </View>
                        <Text style={styles.warningText}>Ingresa tu correo</Text>
                    </View>
                }
                {(display) &&
                    <View style={styles.flexDirectionRowTinyMarginTop}>
                        <View style={styles.warningIconMargins}>
                            {useIcons('Warning', 15, 15)}
                        </View>
                        <Text style={styles.warningText}>Correo inválido</Text>
                    </View>
                }
            </View>
            <View style={styles.mediumMarginTop}>
                <View style={styles.tinyMarginBottom}>
                    <Text style={styles.footnote}>Contraseña</Text>
                </View>
                <View style={[styles.inputFieldContainer, (fieldLength.password) && styles.warningBorder]}>
                    <View style={{ flex: 0.35 }}>
                        {useIcons('Lock', 20, 20)}
                    </View>
                    <TextInput
                        placeholder='Ingresa tu contraseña'
                        placeholderTextColor='#9A9A9A'
                        secureTextEntry={passwordVisibility}
                        style={[styles.inputField, { flex: 3, marginEnd: 10 }]}
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
                {(fieldLength.password) &&
                    <View style={styles.flexDirectionRowTinyMarginTop}>
                        <View style={styles.warningIconMargins}>
                            {useIcons('Warning', 15, 15)}
                        </View>
                        <Text style={styles.warningText}>Ingresa tu contraseña</Text>
                    </View>
                }
            </View>
            <View style={{ marginTop: 29 }}>
                <TouchableOpacity
                    activeOpacity={1.0}
                    style={styles.button}
                    onPress={onLogin}
                >
                    <Text style={styles.buttonText}>Crear Cuenta</Text>
                </TouchableOpacity>
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
        </View>
    );
};

export default RegisterFormInputs;