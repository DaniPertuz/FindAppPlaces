import React, { useContext } from 'react';
import { Keyboard, Text, TouchableOpacity } from 'react-native';

import { AuthContext, PlacesContext } from '../context';
import { roles } from '../interfaces';

import styles from '../themes/AppTheme';

interface Props {
    name:              string;
    email:             string;
    password:          string;
    handleFieldLength: (name: boolean, email: boolean, password: boolean) => void;
}

const RegisterLoginButton = ({ name = '', email = '', password = '', handleFieldLength }: Props) => {

    const { signUp } = useContext(AuthContext);
    const { registerPlace } = useContext(PlacesContext);

    const onLogin = () => {
        Keyboard.dismiss();

        if (name.length !== 0 && email.length === 0 && password.length !== 0) {
            handleFieldLength(false, true, false);
            return;
          }
      
          if (name.length !== 0 && email.length === 0 && password.length === 0) {
            handleFieldLength(false, true, true);
            return;
          }
      
          if (name.length === 0 && email.length !== 0 && password.length !== 0) {
            handleFieldLength(true, false, false);
            return;
          }
      
          if (name.length === 0 && email.length === 0 && password.length !== 0) {
            handleFieldLength(true, true, false);
            return;
          }
      
          if (name.length !== 0 && email.length !== 0 && password.length === 0) {
            handleFieldLength(false, false, true);
            return;
          }
      
          if (name.length === 0 && email.length === 0 && password.length === 0) {
            handleFieldLength(true, true, true);
            return;
          }
      
          if (name.length !== 0 && email.length !== 0 && password.length !== 0) {
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
              rate: {
                $numberDecimal: '0'
              },
              status: true
            })
          }
    };

    return (
        <TouchableOpacity
            activeOpacity={1.0}
            style={styles.button}
            onPress={onLogin}
        >
            <Text style={styles.buttonText}>Crear Cuenta</Text>
        </TouchableOpacity>
    );
};

export default RegisterLoginButton;