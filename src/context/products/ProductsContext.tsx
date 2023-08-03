import { createContext } from 'react';
import { IProduct } from '../../interfaces';

type ProductsContextProps = {
    addProduct:         (product: IProduct) => Promise<void>
    getProduct:         (id: string) => Promise<IProduct[]>;
    getProductsByPlace: (placeId: string) => Promise<IProduct[]>;
    updateProduct:      (id: string) => Promise<IProduct>;
    deleteProduct:      (id: string) => Promise<IProduct>;
}

export const ProductsContext = createContext({} as ProductsContextProps);