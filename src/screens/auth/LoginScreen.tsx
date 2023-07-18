import React, { useContext, useEffect } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import SplashScreen from 'react-native-splash-screen';

import Background from '../../components/Background';
import FormInputs from '../../components/FormInputs';
import { AuthContext } from '../../context/auth';
import { useForm } from '../../hooks/useForm';

import styles from '../../themes/AppTheme';

interface Props extends StackScreenProps<any, any> { }

const LoginScreen = ({ navigation }: Props) => {

    const { signIn, errorMessage, removeError } = useContext(AuthContext);

    const { email, password, onChange } = useForm({
        email: '',
        password: ''
    });

    useEffect(() => {
        SplashScreen.hide();
    }, []);

    useEffect(() => {
        if (errorMessage.length === 0) return;

        Alert.alert('Error', errorMessage, [{ text: 'OK', onPress: removeError }]);
    }, [errorMessage]);

    return (
        <ScrollView keyboardShouldPersistTaps='handled' style={styles.scrollViewBackground}>
            <KeyboardAvoidingView behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}>
                <Background />
                <View style={styles.loginFormContainer}>
                    <View style={styles.alignItemsCenter}>
                        <Image source={require('../../assets/fa_complete_color.png')} style={styles.mainLogo} />
                        <View style={styles.companiesNameMargins}>
                            <Text style={styles.footnote}>Empresas</Text>
                        </View>
                        <View style={styles.largeMarginTop}>
                            <View style={styles.mediumMarginBottom}>
                                <View style={styles.tinyMarginBottom}>
                                    <Text style={styles.h4}>Bienvenido</Text>
                                </View>
                                <Text style={styles.bodySmall}>Ingresa tus credenciales para continuar</Text>
                            </View>
                            <FormInputs
                                email={email.trim()}
                                password={password}
                                onChange={onChange}
                            />
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

export default LoginScreen;