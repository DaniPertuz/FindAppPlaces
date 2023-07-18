import { createContext } from 'react';
import { ImagePickerResponse } from 'react-native-image-picker';

import { IUser } from '../../interfaces';

interface UsersContextProps {
    users:              IUser[];
    loadUsers:          () => Promise<void>;
    loadUserByEmail:    (email: string) => Promise<IUser>;
    loadUserByID:       (userID: string) => Promise<IUser>;
    addUser:            (user: IUser) => Promise<void>;
    updateUser:         (userID: string, name: string, photo?: string) => Promise<void>;
    updateUserPassword: (email: string, password: string) => Promise<void>;
    deleteUser:         (userID: string) => Promise<void>;
    updatePhoto:        (data: ImagePickerResponse, userID: string) => Promise<string>;
}

export const UsersContext = createContext({} as UsersContextProps);