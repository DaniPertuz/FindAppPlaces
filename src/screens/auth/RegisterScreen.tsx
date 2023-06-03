import React, { useEffect, useContext } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { AuthContext } from '../../context/auth';
import { useForm } from '../../hooks/useForm';
import { roles } from '../../interfaces';

import styles from '../../themes/AppTheme';

interface Props extends StackScreenProps<any, any> { };

const RegisterScreen = ({ navigation }: Props) => {

    const { signUp, errorMessage, removeError } = useContext(AuthContext);

    const { name, email, password, onChange } = useForm({
        name: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        if (errorMessage.length === 0) return;

        Alert.alert('Error', errorMessage, [{ text: 'OK', onPress: removeError }]);
    }, [errorMessage]);

    const onRegister = () => {
        Keyboard.dismiss();

        signUp({
            name,
            email,
            password,
            role: roles.PLACE,
            status: true
        });
    };

    return (
        <>
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#5856D6'
                }}
            >
                <TouchableOpacity
                    onPress={() => navigation.replace('LoginScreen')}
                    activeOpacity={0.8}
                    style={styles.buttonReturn}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
            <KeyboardAvoidingView
                style={{
                    flex: 7,
                    backgroundColor: '#5856D6'
                }}
                behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
                keyboardVerticalOffset={40}
            >
                <ScrollView
                    keyboardShouldPersistTaps='handled'
                    style={styles.registerFormContainer}
                    contentContainerStyle={{
                        justifyContent: 'center'
                    }}>
                    <Text style={styles.mediumTitle}>
                        Crear cuenta
                    </Text>
                    <Text style={styles.label}>
                        Nombre:
                    </Text>
                    <TextInput
                        placeholder='Nombre del lugar'
                        placeholderTextColor='rgba(255,255,255,0.4)'
                        underlineColorAndroid='#FFFFFF'
                        style={[
                            styles.inputField,
                            (Platform.OS === 'ios') && styles.inputFieldIOS
                        ]}
                        selectionColor='#FFFFFF'
                        autoCapitalize='words'
                        autoCorrect={false}
                        onSubmitEditing={onRegister}
                        onChangeText={(value) => onChange(value, 'name')}
                        value={name}
                    />
                    <Text style={styles.label}>
                        Email:
                    </Text>
                    <TextInput
                        placeholder='Ingrese su email'
                        placeholderTextColor='rgba(255,255,255,0.4)'
                        keyboardType='email-address'
                        underlineColorAndroid='#FFFFFF'
                        style={[
                            styles.inputField,
                            (Platform.OS === 'ios') && styles.inputFieldIOS
                        ]}
                        selectionColor='#FFFFFF'
                        autoCapitalize='none'
                        autoCorrect={false}
                        onSubmitEditing={onRegister}
                        onChangeText={(value) => onChange(value, 'email')}
                        value={email}
                    />
                    <Text style={styles.label}>
                        Password:
                    </Text>
                    <TextInput
                        placeholder='******'
                        placeholderTextColor='rgba(255,255,255,0.4)'
                        underlineColorAndroid='#FFFFFF'
                        secureTextEntry
                        style={[
                            styles.inputField,
                            (Platform.OS === 'ios') && styles.inputFieldIOS
                        ]}
                        selectionColor='#FFFFFF'
                        autoCapitalize='none'
                        autoCorrect={false}
                        onSubmitEditing={onRegister}
                        onChangeText={(value) => onChange(value, 'password')}
                        value={password}
                    />
                    <View style={styles.loginButtonContainer}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.button}
                            onPress={() => { onRegister(); navigation.navigate("RegisterDetailsScreen", { name, email }); }}
                        >
                            <Text style={styles.buttonText}>Continuar</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    );
};

export default RegisterScreen;