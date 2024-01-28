import React from 'react';
import { ImagePickerResponse } from 'react-native-image-picker';
import sha1 from 'sha1';
import findAPI from '../../api/findapi';
import { ProductsContext } from './';
import { IProduct } from '../../interfaces';
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from '@env';

export const ProductsProvider = ({ children }: any) => {

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
        try {
            const { img } = await getProduct(productId);

            const headers = {
                'Content-Type': 'multipart/form-data'
            };

            if (img) {
                const nameArr = img.split('/');
                const name = nameArr[nameArr.length - 1];
                const [public_id] = name.split('.');

                const timestamp = new Date().getTime();
                const image = `public_id=${public_id}&timestamp=${timestamp}${CLOUDINARY_API_SECRET}`;
                const signature = sha1(image);

                const destroyData = new FormData();

                destroyData.append('public_id', public_id);
                destroyData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
                destroyData.append('api_key', CLOUDINARY_API_KEY);
                destroyData.append('cloud_name', CLOUDINARY_CLOUD_NAME);
                destroyData.append('signature', signature);
                destroyData.append('timestamp', timestamp);


                await fetch('https://api.cloudinary.com/v1_1/dpertuzo/image/destroy', {
                    method: 'POST',
                    headers,
                    body: destroyData
                });
            }

            const { uri, type, fileName } = data.assets![0];

            const fileToUpload = {
                uri,
                type,
                name: fileName
            };

            const uploadData = new FormData();
            uploadData.append('file', fileToUpload);
            uploadData.append('upload_preset', 'findapp');

            const upload = await fetch('https://api.cloudinary.com/v1_1/dpertuzo/upload', {
                method: 'POST',
                headers,
                body: uploadData
            });

            const { secure_url } = await upload.json();

            return secure_url;
        } catch (error: any) {
            throw new Error(`${error}`);
        }
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