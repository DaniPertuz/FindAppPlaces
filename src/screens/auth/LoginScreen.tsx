import React, { useContext, useEffect } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-root-toast';

import Background from '../../components/Background';
import FormInputs from '../../components/FormInputs';
import StatusBarComponent from '../../components/StatusBarComponent';
import { AuthContext } from '../../context/auth';
import { useForm } from '../../hooks/useForm';

import styles from '../../themes/AppTheme';

const LoginScreen = () => {

    const { errorMessage, removeError } = useContext(AuthContext);

    const { email, password, onChange } = useForm({
        email: '',
        password: ''
    });

    useEffect(() => {
        SplashScreen.hide();
    }, []);

    useEffect(() => {
        if (errorMessage.length === 0) return;

        Toast.show(errorMessage, { duration: Toast.durations.SHORT, position: Toast.positions.BOTTOM, hideOnPress: true, delay: 0, onHidden: removeError });
    }, [errorMessage]);

    return (
        <ScrollView keyboardShouldPersistTaps='handled' style={styles.scrollViewBackground}>
            <StatusBarComponent color='#081023' theme='light-content' />
            <KeyboardAvoidingView behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}>
                <Background />
                <View style={styles.loginFormContainer}>
                    <View style={styles.alignItemsCenter}>
                        <Image source={require('../../assets/fa_complete_color.png')} style={styles.mainLogo} />
                        <View style={styles.companiesNameMargins}>
                            <Text style={styles.footnote}>Empresas</Text>
                        </View>
                    </View>
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
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

export default LoginScreen;