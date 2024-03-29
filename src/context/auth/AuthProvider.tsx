import React, { useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthContext, AuthReducer } from './';
import { IUser, LoginData, LoginInterface, roles } from '../../interfaces';
import findAPI from '../../api/findapi';

export interface AuthState {
    status: 'checking' | 'authenticated' | 'not-authenticated';
    token: string | null;
    user: IUser | null;
    errorMessage: string;
}

const AUTH_INITIAL_STATE: AuthState = {
    status: 'checking',
    token: null,
    user: null,
    errorMessage: ''
};

export const AuthProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(AuthReducer, AUTH_INITIAL_STATE);

    useEffect(() => {
        validateLogin();
    }, []);

    const validateLogin = async () => {
        const token = await AsyncStorage.getItem('token');

        if (!token) return dispatch({ type: 'notAuthenticated' });

        const { data } = await findAPI.get('/auth/renew');

        await AsyncStorage.setItem('token', data.token);

        dispatch({
            type: 'signUp',
            payload: {
                user: data.user,
                token: data.token
            }
        });
    };

    const signUp = async ({ name, email, password, role }: IUser): Promise<void> => {
        try {
            const { data: userLogin } = await findAPI.post<LoginInterface>('/users', {
                name,
                email,
                password,
                role
            });
            const { data: tokenLogin } = await findAPI.post<LoginInterface>('/auth/login', { email, password });

            dispatch({
                type: 'signUp',
                payload: {
                    user: userLogin.user,
                    token: tokenLogin.token
                }
            });

            await AsyncStorage.setItem('token', tokenLogin.token);
            await AsyncStorage.setItem('user', JSON.stringify(tokenLogin.user));
        } catch (error: any) {
            dispatch({
                type: 'addError',
                payload: 'Credenciales incorrectas.\nIntenta de nuevo.'
            });
        }
    };

    const signIn = async ({ email, password }: LoginData): Promise<void> => {
        try {
            const response = await findAPI.get<IUser>('/users/email', { params: { email } });

            if (!response.data) {
                dispatch({
                    type: 'addError',
                    payload: 'Este usuario no es válido'
                });
                return;
            }

            const { data } = await findAPI.post<LoginInterface>('/auth/login', { email, password });

            const { user, token } = data;

            if (user.role !== roles.PLACE) {
                dispatch({
                    type: 'addError',
                    payload: 'Este usuario no es una empresa'
                });
                return;
            }

            dispatch({
                type: 'signUp',
                payload: {
                    user,
                    token
                }
            });

            await AsyncStorage.setItem('token', data.token);
            await AsyncStorage.setItem('user', JSON.stringify(data.user));
        } catch (error: any) {
            dispatch({
                type: 'addError',
                payload: 'Credenciales incorrectas.\nIntenta de nuevo.'
            });
        }
    };

    const logOut = async (): Promise<void> => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user');
        dispatch({ type: 'logout' });
    };

    const removeError = (): void => {
        dispatch({ type: 'removeError' });
    };

    return (
        <AuthContext.Provider value={{
            ...state,
            signUp,
            signIn,
            logOut,
            removeError
        }}
        >
            {children}
        </AuthContext.Provider>
    );
};