import React, { useContext, useEffect } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import Background from '../../components/Background';
import FormInputs from '../../components/FormInputs';
import { useForm } from '../../hooks/useForm';

import styles from '../../themes/AppTheme';
import { AuthContext } from '../../context/auth';

interface Props extends StackScreenProps<any, any> { }

const LoginScreen = ({ navigation }: Props) => {

    const { signIn, errorMessage, removeError } = useContext(AuthContext);

    const { email, password, onChange } = useForm({
        email: '',
        password: ''
    });

    useEffect(() => {
        if (errorMessage.length === 0) return;

        Alert.alert('Error', errorMessage, [{ text: 'OK', onPress: removeError }]);
    }, [errorMessage]);

    const onLogin = () => {
        Keyboard.dismiss();
        signIn({ email, password });
    };
    return (
        <>
            <Background />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
            >
                <View
                    style={styles.loginFormContainer}
                >
                    <Text style={styles.bigTitle}>FindAPP</Text>
                    <FormInputs
                        email={email.trim()}
                        password={password}
                        onChange={onChange}
                        onLogin={onLogin}
                    />
                </View>
                <View style={styles.newUserButtonContainer}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.button}
                        onPress={() => navigation.replace('RegisterScreen')}
                    >
                        <Text style={styles.buttonText}>Nueva cuenta</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </>
    );
};

export default LoginScreen;