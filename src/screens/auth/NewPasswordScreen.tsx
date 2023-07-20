import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import Background from '../../components/Background';
import NewPasswordFormInputs from '../../components/NewPasswordFormInputs';
import { RootStackParams } from '../../navigation';
import { useIcons } from '../../hooks/useIcons';
import { useForm } from '../../hooks/useForm';

import styles from '../../themes/AppTheme';

const NewPasswordScreen = () => {

    const navigator = useNavigation<StackNavigationProp<RootStackParams>>();

    const { email, password, confirmPassword, onChange } = useForm({
        email: '',
        password: '',
        confirmPassword: ''
    });

    return (
        <ScrollView keyboardShouldPersistTaps='handled' style={styles.scrollViewBackground}>
            <Background />
            <KeyboardAvoidingView behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}>
                <View style={styles.loginFormContainer}>
                    <View style={styles.titleMarginTopContainer}>
                        <View style={styles.flexDirectionRow}>
                            <TouchableOpacity
                                activeOpacity={1.0}
                                style={styles.backButtonMargins}
                                onPress={() => navigator.goBack()}
                            >
                                {useIcons('Back', 20, 20)}
                            </TouchableOpacity>
                            <Text style={styles.backButtonText}>Volver</Text>
                        </View>
                        <Text style={styles.h4}>Crear nueva contraseña</Text>
                        <Text style={styles.bodySmall}>Ingresa tu nueva contraseña</Text>
                    </View>
                    <NewPasswordFormInputs email={email.trim()} password={password} confirmPassword={confirmPassword} onChange={onChange} />
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

export default NewPasswordScreen;