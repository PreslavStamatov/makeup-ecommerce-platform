import { CartProduct } from "./HomePage";

export type UserProfileToken = {
    username: string;
    email: string;
    token: string;
}

export type Shade = {
    name: string,
    undertone: string,
    color: string,
}

export type Product = {
    makeup: Makeup,
    shade: Shade,
    quantity: number,
}

export type Makeup = {
    name: string,
    rating: number,
    price: number | string, // Allow string price
    image: string,
    shades?: null, // Add shades as optional
    productType: string,
    sellType: string,
}

export type ShoppingBag = {
    products: CartProduct[],
}

export type UserProfile = {
    username: string;
    email: string;
    shoppingBag: ShoppingBag; // Fix the property name here
}

export type JwtPayload = {
    exp: number; // Expiration time in seconds
    [key: string]: any; // Other custom properties
  }