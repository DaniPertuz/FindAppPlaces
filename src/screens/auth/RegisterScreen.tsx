import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';

import { useForm } from '../../hooks/useForm';
import Background from '../../components/Background';
import RegisterFormInputs from '../../components/RegisterFormInputs';
import StatusBarComponent from '../../components/StatusBarComponent';

import styles from '../../themes/AppTheme';

const RegisterScreen = () => {

    const [resize, setResize] = useState<string>('');

    const { name, email, password, onChange } = useForm({
        name: '',
        email: '',
        password: ''
    });

    const handleResize = (resize: string) => {
        setResize(resize);
    };

    return (
        <ScrollView keyboardShouldPersistTaps='handled' style={styles.scrollViewBackground}>
            <StatusBarComponent color='#081023' theme='light-content' />
            <Background />
            <KeyboardAvoidingView behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}>
                <View style={[styles.registerFormContainer, (resize !== '') && { paddingBottom: resize }]}>
                    <View style={styles.largeMarginTop}>
                        <View style={styles.mediumMarginBottom}>
                            <View style={styles.tinyMarginBottom}>
                                <Text style={styles.h4}>Crea tu cuenta</Text>
                            </View>
                            <Text style={styles.bodySmall}>Ingresa tus datos para crear una cuenta</Text>
                            <RegisterFormInputs name={name} email={email.trim()} password={password} onChange={onChange} handleResize={handleResize} />
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

export default RegisterScreen;