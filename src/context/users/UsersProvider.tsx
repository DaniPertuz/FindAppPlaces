import React, { useEffect, useState } from 'react';
import { ImagePickerResponse } from 'react-native-image-picker';

import { UsersContext } from './';
import { useCloudinaryOperation } from '../../hooks'
import { IUser } from '../../interfaces';
import findAPI from '../../api/findapi';

export const UsersProvider = ({ children }: any) => {

    const [users, setUsers] = useState<IUser[]>([]);
    const { handleUpdateCloudinaryPic } = useCloudinaryOperation();

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async (): Promise<void> => {
        try {
            const resp = await findAPI.get('/users');
            setUsers([...resp.data.users]);
        } catch (error) {
            console.error(error);
        }
    };

    const loadUserByID = async (userID: string): Promise<IUser> => {
        try {
            const resp = await findAPI.get<IUser>(`/users/${userID}`);
            return resp.data;
        } catch (error) {
            throw new Error(`${error}`);
        }
    };

    const loadUserByEmail = async (email: string): Promise<IUser> => {
        try {
            const resp = await findAPI.get<IUser>('/users/email', { params: { email } });
            return resp.data;
        } catch (error) {
            throw new Error(`${error}`);
        }
    };

    const addUser = async (user: IUser): Promise<void> => {
        try {
            const resp = await findAPI.post<IUser>(`/users`, {
                user
            });

            setUsers([...users, resp.data]);
        } catch (error) {
            console.error(error);
        }
    };

    const updateUser = async (userID: string, name: string, photo?: string): Promise<void> => {
        try {
            const resp = await findAPI.put<IUser>(`/users/${userID}`, {
                name,
                photo
            });

            setUsers(users.map(user => {
                return (user._id === userID) ? resp.data : user;
            }));
        } catch (error) {
            console.error(error);
        }
    };

    const updateUserPassword = async (email: string, password: string): Promise<void> => {
        try {
            await findAPI.put<IUser>('/users/password/', {
                email,
                password
            });
        } catch (error) {
            console.error(error);
        }
    };

    const deleteUser = async (userID: string): Promise<void> => {
        try {
            const resp = await findAPI.put<IUser>(`/users/${userID}`, {
                id: userID
            });

            setUsers(users.map(user => {
                return (user.status) ? resp.data : user;
            }));
        } catch (error) {
            console.error(error);
        }
    };

    const updatePhoto = async (data: ImagePickerResponse, userId: string) => {
        const { photo } = await loadUserByID(userId);
        const pic = await handleUpdateCloudinaryPic(data, true, photo);
        const secure_url = pic[0];

        await findAPI.put(`/users/${userId}`, { photo: secure_url });

        return secure_url;
    };

    return (
        <UsersContext.Provider value={{
            users,
            loadUsers,
            loadUserByEmail,
            loadUserByID,
            addUser,
            updateUser,
            updateUserPassword,
            deleteUser,
            updatePhoto
        }}
        >
            {children}
        </UsersContext.Provider>
    );
};