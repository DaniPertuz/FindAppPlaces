import React, { useContext, useState } from 'react';
import { Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { UsersContext } from '../context/users';
import { useIcons } from '../hooks';
import { roles } from '../interfaces';
import { RootStackParams } from '../navigation/MainNavigator';

import styles from '../themes/AppTheme';
import useFieldValidation from '../hooks/useFieldValidation';

interface Props {
    email: string;
    password: string;
    confirmPassword: string;
    onChange: (value: string, field: 'email' | 'password' | 'confirmPassword') => void;
    handleResize: (value: string) => void;
}

const NewPasswordFormInputs = ({ email, password, confirmPassword, onChange, handleResize }: Props) => {

    const navigator = useNavigation<StackNavigationProp<RootStackParams>>();

    const { loadUserByEmail, updateUserPassword } = useContext(UsersContext);

    const [display, setDisplay] = useState(false);
    const [authorized, setAuthorized] = useState(false);
    const [nullPlace, setNullPlace] = useState(false);
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [passwordConfirmVisibility, setPasswordConfirmVisibility] = useState(true);
    const [eyeIcon, setEyeIcon] = useState('EyeClosed');
    const [eyeIconConfirm, setEyeIconConfirm] = useState('EyeClosed');
    const { fieldLength, validateFields } = useFieldValidation();

    const handlePasswordVisibility = () => {
        setPasswordVisibility(!passwordVisibility);
        setEyeIcon((prevIcon) =>
            prevIcon === 'EyeClosed' ? 'Eye' : 'EyeClosed'
        );
    };

    const handleConfirmPasswordVisibility = () => {
        setPasswordConfirmVisibility(!passwordConfirmVisibility);
        setEyeIconConfirm((prevIcon) =>
            prevIcon === 'EyeClosed' ? 'Eye' : 'EyeClosed'
        );
    };

    const onUpdate = async () => {
        Keyboard.dismiss();
    
        const validation = await loadUserByEmail(email);
    
        validateFields({
            email: email.length === 0,
            password: password.length === 0,
            confirmPassword: confirmPassword.length === 0
        });
    
        if (email.length === 0 && password.length !== 0 && confirmPassword.length !== 0) {
            handleResize('40%');
        } else if (email.length !== 0 && password.length === 0 && confirmPassword.length !== 0) {
            handleResize('45%');
        } else if (email.length !== 0 && password.length === 0 && confirmPassword.length === 0) {
            setNullPlace(false);
            handleResize('38%');
        } else if (email.length !== 0 && password.length !== 0 && confirmPassword.length === 0) {
            handleResize('35%');
        } else if (email.length !== 0 && password.length === 0 && confirmPassword.length === 0) {
            handleResize('40%');
        } else if (email.length === 0 && password.length === 0 && confirmPassword.length === 0) {
            handleResize('32%');
        }
    
        if (validation && (password.length === 0 && confirmPassword.length === 0)) {
            setDisplay(false);
            setNullPlace(false);
            handleResize('38%');
        }
    
        if (email.length !== 0 && password.length !== 0 && confirmPassword.length !== 0) {
            if (!validation || password !== confirmPassword) {
                setDisplay(true);
                setNullPlace(!validation);
                handleResize('38%');
                return;
            }
    
            if (validation.role !== roles.PLACE) {
                setAuthorized(true);
                return;
            }
    
            setDisplay(false);
            setNullPlace(false);
            handleResize('44%');
            updateUserPassword(email, password);
            navigator.replace('LoginScreen');
        }
    };
    

    return (
        <View>
            <View style={styles.mediumMarginTop}>
                <Text style={styles.footnote}>Email</Text>
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
            </View>
            <View style={styles.mediumMarginTop}>
                <Text style={styles.footnote}>Contraseña</Text>
                <View style={[styles.inputFieldContainer, (fieldLength.password) && styles.warningBorder]}>
                    <View style={styles.tinyButtonSize}>
                        {useIcons('Lock', 20, 20)}
                    </View>
                    <TextInput
                        placeholder='Ingresa tu contraseña'
                        placeholderTextColor='#9A9A9A'
                        secureTextEntry={passwordVisibility}
                        style={[styles.inputField, styles.newPasswordInputTextSize]}
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
                            {useIcons(eyeIcon, 20, 20)}
                        </View>
                    </TouchableOpacity>
                </View>
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
                <View style={[styles.inputFieldContainer, (fieldLength.confirmPassword) && styles.warningBorder]}>
                    <View style={styles.tinyButtonSize}>
                        {useIcons('Lock', 20, 20)}
                    </View>
                    <TextInput
                        placeholder='Ingresa tu contraseña'
                        placeholderTextColor='#9A9A9A'
                        secureTextEntry={passwordConfirmVisibility}
                        style={[styles.inputField, styles.newPasswordInputTextSize]}
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
                            {useIcons(eyeIconConfirm, 20, 20)}
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
            {(authorized) &&
                <View style={styles.flexDirectionRowTinyMarginTop}>
                    <View style={styles.warningIconMargins}>
                        {useIcons('Warning', 15, 15)}
                    </View>
                    <Text style={styles.warningText}>
                        Este usuario no puede realizar esta acción
                    </Text>
                </View>
            }
            {(nullPlace) &&
                <View style={styles.flexDirectionRowTinyMarginTop}>
                    <View style={styles.warningIconMargins}>
                        {useIcons('Warning', 15, 15)}
                    </View>
                    <Text style={styles.warningText}>
                        No existe este correo
                    </Text>
                </View>
            }
            <View style={styles.buttonContainerMarginTop}>
                <TouchableOpacity
                    activeOpacity={1.0}
                    style={styles.button}
                    onPress={onUpdate}
                >
                    <Text style={styles.buttonText}>Guardar e iniciar sesión</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default NewPasswordFormInputs;