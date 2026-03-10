import React, { createContext, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { CartProduct } from "../Models/HomePage";
import { useAuth } from "./useAuth";
import { aggregateCart, getTotalQuantityFromShoppingCart } from "../Services/ShoppingCartService";

type ShoppingCartContextType = {
    userProducts: CartProduct[];
    productsQuantity: number;
    addToCart: (product: CartProduct) => void;
    alterProductQuantity: (quantity: number, product: CartProduct) => void;
};

type Props = { children: React.ReactNode };

const ShoppingCartContext = createContext<ShoppingCartContextType>({} as ShoppingCartContextType);

export const ShoppingCartProvider = ({ children }: Props) => {

    const { user } = useAuth();
    const [userProducts, setUserProducts] = useState<CartProduct[]>([]);
    const [productsQuantity, setProductsQuantity] = useState<number>(0);

    useEffect(() => {
        if (user) {
            console.log(user.shoppingBag.products)
            setUserProducts(user.shoppingBag.products);
        }
    }, [user]);

    const addToCart = (product: CartProduct) => {
        setUserProducts(aggregateCart([...userProducts, product]));
    }

    const alterProductQuantity = (quantity: number, product: CartProduct) => {
        const productToBeAltered = userProducts.find(p => p.makeup.name===product.makeup.name && p.shade.name===product.shade.name);
        if(productToBeAltered) {
            console.log(quantity)
            productToBeAltered.quantity = quantity;
            setUserProducts([...userProducts])
        }
        console.log(userProducts);
    }

    useEffect(() => {
        setProductsQuantity(getTotalQuantityFromShoppingCart(userProducts));
    }, [userProducts])

    return (
        <ShoppingCartContext.Provider
            value={{userProducts, addToCart, productsQuantity, alterProductQuantity}}>
            {children}
        </ShoppingCartContext.Provider>
    )
};

export const useShoppingCartContext = () => React.useContext(ShoppingCartContext);