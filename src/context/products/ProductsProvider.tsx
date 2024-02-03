import React from 'react';
import { ImagePickerResponse } from 'react-native-image-picker';

import { ProductsContext } from './';
import { IProduct } from '../../interfaces';
import { useCloudinaryOperation } from '../../hooks';
import findAPI from '../../api/findapi';

export const ProductsProvider = ({ children }: any) => {
    const { handleUpdateCloudinaryPic } = useCloudinaryOperation();

    const getProductsByPlace = async (placeId: string): Promise<IProduct[]> => {
        try {
            const { data } = await findAPI.get<IProduct[]>(`/products/place/${placeId}`);
            return data;
        } catch (error: any) {
            throw new Error(`${error}`);
        }
    };

    const getProduct = async (id: string): Promise<IProduct> => {
        try {
            const { data } = await findAPI.get<IProduct>(`/products/${id}`);
            return data;
        } catch (error: any) {
            throw new Error(`${error}`);
        }
    };

    const addProduct = async (product: IProduct): Promise<IProduct> => {
        try {
            const { data } = await findAPI.post<IProduct>('/products', product);
            return data;
        } catch (error: any) {
            throw new Error(`${error}`);
        }
    };

    const updateProduct = async (id: string, data: IProduct): Promise<IProduct> => {
        try {
            const resp = await findAPI.put<IProduct>(`/products/${id}`, data);
            return resp.data;
        } catch (error: any) {
            throw new Error(`${error}`);
        }
    };

    const updateProductImage = async (id: string, img: string): Promise<IProduct> => {
        try {
            const resp = await findAPI.put<IProduct>(`/products/image/${id}`, { img });
            return resp.data;
        } catch (error: any) {
            throw new Error(`${error}`);
        }
    };

    const deleteProduct = async (id: string): Promise<IProduct> => {
        try {
            const { data } = await findAPI.delete<IProduct>(`/products/${id}`);
            return data;
        } catch (error: any) {
            throw new Error(`${error}`);
        }
    };

    const uploadImage = async (data: ImagePickerResponse, productId: string) => {
        const { img } = await getProduct(productId);
        const pics = await handleUpdateCloudinaryPic(data, true, img);
        return pics[0];
    };

    return (
        <ProductsContext.Provider value={{
            getProductsByPlace,
            getProduct,
            addProduct,
            updateProduct,
            updateProductImage,
            deleteProduct,
            uploadImage
        }}
        >
            {children}
        </ProductsContext.Provider>
    );
};