import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import Background from '../../components/Background';
import NewPasswordFormInputs from '../../components/NewPasswordFormInputs';
import StatusBarComponent from '../../components/StatusBarComponent';
import { RootStackParams } from '../../navigation/MainNavigator';
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
            <StatusBarComponent color='#081023' theme='light-content' />
            <Background />
            <View style={styles.newPasswordFormContainer}>
                <View style={styles.titleMarginTopContainer}>
                    <TouchableOpacity
                        activeOpacity={1.0}
                        style={styles.backButtonMargins}
                        onPress={() => navigator.replace('LoginScreen')}
                    >
                        <View style={styles.flexDirectionRow}>
                            <View style={{ paddingTop: 2 }}>
                                {useIcons('Back', 20, 20)}
                            </View>
                            <Text style={styles.backButtonText}>Volver</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.h4}>Crear nueva contraseña</Text>
                    <Text style={styles.bodySmall}>Ingresa tu nueva contraseña</Text>
                </View>
                <NewPasswordFormInputs email={email.trim()} password={password} confirmPassword={confirmPassword} onChange={onChange} />
            </View>
        </ScrollView>
    );
};

export default NewPasswordScreen;