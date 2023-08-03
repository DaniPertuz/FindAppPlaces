import React from 'react';
import findAPI from '../../api/findapi';
import { ProductsContext } from './';
import { IProduct } from '../../interfaces';
import { ImagePickerResponse } from 'react-native-image-picker';

export const ProductsProvider = ({ children }: any) => {

    const getProductsByPlace = async (placeId: string): Promise<IProduct[]> => {
        try {
            const { data } = await findAPI.get<IProduct[]>(`/products/place/${placeId}`);
            return data;
        } catch (error: any) {
            console.log(error.response.data.message);
            throw new Error(`${error}`);
        }
    };

    const getProduct = async (id: string): Promise<IProduct> => {
        try {
            const { data } = await findAPI.get<IProduct>(`/products/${id}`);
            return data;
        } catch (error: any) {
            console.log(error.response.data.message);
            throw new Error(`${error}`);
        }
    };

    const addProduct = async (product: IProduct): Promise<void> => {
        try {
            await findAPI.post<IProduct>('/products', { product });
        } catch (error: any) {
            console.log(error.response.data.message);
            throw new Error(`${error}`);
        }
    };

    const updateProduct = async (id: string): Promise<IProduct> => {
        try {
            const { data } = await findAPI.put<IProduct>(`/products/${id}`);
            return data;
        } catch (error: any) {
            console.log(error.response.data.message);
            throw new Error(`${error}`);
        }
    }

    const deleteProduct = async (id: string): Promise<IProduct> => {
        try {
            const { data } = await findAPI.delete<IProduct>(`/products/${id}`);
            return data;
        } catch (error: any) {
            console.log(error.response.data.message);
            throw new Error(`${error}`);
        }
    }

    return (
        <ProductsContext.Provider value={{
            getProductsByPlace,
            getProduct,
            addProduct,
            updateProduct,
            deleteProduct
        }}
        >
            {children}
        </ProductsContext.Provider>
    );
};