import { createContext } from 'react';
import { IProduct } from '../../interfaces';

type ProductsContextProps = {
    addProduct:         (product: IProduct) => Promise<void>
    getProduct:         (id: string) => Promise<IProduct[]>;
    getProductsByPlace: (placeId: string) => Promise<IProduct[]>;
}

export const ProductsContext = createContext({} as ProductsContextProps);