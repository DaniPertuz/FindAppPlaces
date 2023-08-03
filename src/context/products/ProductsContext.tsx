import { createContext } from 'react';
import { ImagePickerResponse } from 'react-native-image-picker';
import { IProduct } from '../../interfaces';

type ProductsContextProps = {
    addProduct:         (product: IProduct) => Promise<IProduct>
    getProduct:         (id: string) => Promise<IProduct>;
    getProductsByPlace: (placeId: string) => Promise<IProduct[]>;
    updateProduct:      (id: string, data: IProduct) => Promise<IProduct>;
    updateProductImage: (id: string, url: string) => Promise<IProduct>;
    deleteProduct:      (id: string) => Promise<IProduct>;
    uploadImage:        (data: ImagePickerResponse, productId: string) => Promise<any>
}

export const ProductsContext = createContext({} as ProductsContextProps);