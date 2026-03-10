import { Shade } from "./User"

export type HomePageProductContainer = {
    product: Product,
}

export type Product = {
    name: string,
    rating: number,
    price: number,
    image: string,
    shades: Shade[],
    productType: string,
    sellType: string,
    comments: Comment[],
}

export type Comment = {
    text: string,
    user: {username: string},
    rating: number,
}

export type CartMakeup = {
    name: string,
    rating: number,
    price: number,
    image: string,
    productType: string,
    sellType: string,
}

export type CartProduct = {
    makeup: CartMakeup,
    shade: Shade,
    quantity?: number;
}

export type ShadeButtonType = {
    stateChange: React.Dispatch<React.SetStateAction<Shade>>,
    selectedShade: Shade,
    shade: Shade,
}

export type ProductsCarouselType = {
    products: Product[],
}