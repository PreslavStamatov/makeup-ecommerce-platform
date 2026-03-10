import { CartProduct, Comment, Product } from "./HomePage";

export enum ProductType {
    BRONZER = "Bronzer",
    CONCEALER = "Concealer",
    CONTOUR = "Contour",
    LIP_GLOSS = "Lip Gloss",
    MASCARA = "Mascara",
    POWDER = "Powder",
    SKIN_CARE = "Skin Care",
};

export enum Color {
    MARSHMELLOW = "Marshmellow",
    FUNKY = "Funky",
    YELLOW = "Yellow",
}

export enum FilterType {
    PRODUCT_TYPE = "productType",
    COLOR = "color",
};

export const propertyMap: Record<FilterType, keyof Product> = {
    [FilterType.PRODUCT_TYPE]: "productType",
    [FilterType.COLOR]: "shades",
  };

export const enumFilterMap: Record<FilterType, any> = {
    [FilterType.PRODUCT_TYPE]: ProductType,
    [FilterType.COLOR]: Color,
};

export type ProductsFilterType = {
    name: string;
    filterType: FilterType;
    filterValues: any[];
}

export type AppliedFilter = {
    filterType: FilterType;
    filter: string;
}

export type FilterValueType = {
    filterType: FilterType;
    filterValue: string;
}

export type HoveredShoppingCartProductType = {
    product: CartProduct;
}

export type ProductReviewType = {
    comment: Comment;
}

export type ReviewWritingType = {
    product: Product,
    setActiveButton: React.Dispatch<React.SetStateAction<string>>;
}