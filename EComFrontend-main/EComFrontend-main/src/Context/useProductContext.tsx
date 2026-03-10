import React, { createContext, useEffect, useState } from "react";
import { JwtPayload, UserProfile } from "../Models/User"
import { useNavigate } from "react-router-dom"
import axios from "axios";
import { homePageAPI, loginAPI, registerAPI } from "../Services/AuthService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Comment, Product } from "../Models/HomePage";
import { fetchSpecificProduct, productsAPI } from "../Services/ProductsService";
import { AppliedFilter, enumFilterMap, FilterType, ProductType, propertyMap } from "../Models/Product";

type ProductsContextType = {
    products: Product[];
    alteredProducts:Product[];
    fetchProducts: () => void;
    fetchSpecificProductAndUpdate: (productName: string) => Promise<Product>;
    applyFilters: () => void;
    appliedFilters: AppliedFilter[];
    sortBy: (sortType: string) => void;
    productTypeList: ProductType[];
    extractFilterValuesFromFilterType: (filterType: FilterType) => any[];
    addFilter: (appliedFilter: AppliedFilter) => void;
    removeFilter: (filter: string) => void;
    removeAllFilters: () => void;
    addCommentToProduct: (comment: Comment, productName: string) => void;
};

type Props = { children: React.ReactNode };

const ProductsContext = createContext<ProductsContextType>({} as ProductsContextType);

export const ProductsProvider = ({ children }: Props) => {
    const navigate = useNavigate();
    const productTypeList = Object.values(ProductType);
    const filterTypeList = Object.values(FilterType);
    const [products, setProducts] = useState<Product[]>([]);
    const [alteredProducts, setAlteredProducts] = useState<Product[]>([...products]);
    const [appliedFilters, setAppliedFilters] = useState<AppliedFilter[]>([]);

    useEffect(() => {
        console.log(appliedFilters);
        console.log(alteredProducts);
        applyFilters();
        console.log(alteredProducts);
      }, [appliedFilters]);

    const addCommentToProduct = (comment: Comment, productName: string) => {
        const product = products.find(p => p.name===productName);
        product?.comments.push(comment);
    }

    const fetchProducts = async () => {
        try {
            const products = await productsAPI();

            if (products) {
                setProducts(products);
                setAlteredProducts(products);
            }
        } catch (err) {
            toast.warning("Server error occurred!");
        }   
    }

    const fetchSpecificProductAndUpdate = async (productName: string): Promise<Product> => {
        let updatedProduct1;
        try {
            const updatedProduct: Product = await fetchSpecificProduct(productName);
            console.log("db product")
            console.log(updatedProduct);
            updatedProduct1 = updatedProduct;
            const updatedProducts = products.filter(p => p.name!==updatedProduct.name)
            setProducts([...updatedProducts, updatedProduct]);
            console.log(products);
            return updatedProduct;
        } catch (error) {
            console.error(error);
            throw error;
          }
        if(updatedProduct1) 
        return updatedProduct1;

    }

    const addFilter = (appliedFilter: AppliedFilter) => {
        let isFilterUnique = true;
        appliedFilters.forEach(filter => {
            if(filter.filter===appliedFilter.filter) {
                isFilterUnique = false;
            }
        })
        if(isFilterUnique) {
            setAppliedFilters([...appliedFilters, appliedFilter]);
        }
    }

    const removeFilter = (filter: string) => {
        setAppliedFilters(appliedFilters.filter((f) => f.filter !== filter));
    }

    const removeAllFilters = () => {
        setAlteredProducts(products);
        setAppliedFilters([]);
    }

    function getFilteredValue<T extends FilterType>(
        filterType: T,
        product: Product
      ): Product[typeof propertyMap[T]] {
        const key = propertyMap[filterType]; // Resolves the key dynamically
        return product[key]; // Returns the correct value
      }

      const applyFilters = () => {
        if(appliedFilters.length > 0) { 

            appliedFilters.sort((a, b) => {
                if (a.filterType < b.filterType) return -1;
                if (a.filterType > b.filterType) return 1;
                return 0;
              });
            
            let alteredProductsForPreviousFilterType = [...products];
            let alteredProductsForCurrentFilterType: Product[] = [];
            let previousFilterType: string = '';
        
            appliedFilters.forEach((appliedFilter) => {
                const currentFilterType = appliedFilter.filterType;

                if (previousFilterType!=='' && previousFilterType!==currentFilterType) {
                    alteredProductsForPreviousFilterType = [...alteredProductsForCurrentFilterType];
                    alteredProductsForCurrentFilterType = [];
                }

                const afterCurrentFilter = alteredProductsForPreviousFilterType.filter(product => {
                     return product[propertyMap[appliedFilter.filterType]] === appliedFilter.filter.toUpperCase().replace(/ /g, "_");
                });
        
                alteredProductsForCurrentFilterType = [...alteredProductsForCurrentFilterType, ...afterCurrentFilter];
                previousFilterType = currentFilterType;
            });
        
            setAlteredProducts(alteredProductsForCurrentFilterType);

        } else if (appliedFilters.length === 0){
            setAlteredProducts(products);
        }
      };
    

     

    const sortBy = (sortType: string) => {
        const productsAfterSorting = products.sort((a, b) => {
            if(a.sellType===sortType) {
                return -1;
            } else if (b.sellType===sortType) {
                return 1;
            } else {
                return 0;
            }
        });

        setProducts(productsAfterSorting);
    }

    const extractFilterValuesFromFilterType = (filterType: FilterType): any[] => {
        const filterValues = Object.values(enumFilterMap[filterType]);
        return filterValues;
    }

    return (
        <ProductsContext.Provider
            value={{ products, alteredProducts, fetchProducts, applyFilters, sortBy, productTypeList, extractFilterValuesFromFilterType,
                addFilter, removeFilter, removeAllFilters, appliedFilters, fetchSpecificProductAndUpdate, addCommentToProduct
            }}>
            {children}
        </ProductsContext.Provider>
    )
};

export const useProductsContext = () => React.useContext(ProductsContext);