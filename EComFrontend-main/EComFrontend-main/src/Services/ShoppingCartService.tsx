import { CartProduct } from "../Models/HomePage";
import { Shade } from "../Models/User";

export const aggregateCart = (userProducts: CartProduct[]): CartProduct[] => {
    const productMap = new Map<string, CartProduct>();

    userProducts.forEach(product => {
        if (isShade(product.shade)) {
            const key = product.makeup.name+product.shade?.name;
            if (productMap.has(key)) {
                const aggregatedProduct = productMap.get(key)!;
                aggregatedProduct.quantity = (aggregatedProduct.quantity ?? 1) + (product.quantity ?? 1);
            } else {
                productMap.set(key, { ...product, quantity: product.quantity ?? 1 });
            }
        }
    });

    return Array.from(productMap.values());
};

export const getTotalQuantityFromShoppingCart = (products: CartProduct[]) => {
    return products.reduce((acc, product) => {
        return acc + (product.quantity ?? 1);
    }, 0);
};

export const addCartProductToDB = async (body: {}) => {
    try {
        const response = await fetch(`http://localhost:8080/shoppingBag/addToBag`, {
        method: "POST",
         headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
        body: JSON.stringify(body),
       });
    
       if (!response.ok) {
           throw new Error(`Error: ${response.statusText}`);
       }
      const result = await response.json();
         console.log(result);
         return result;
        } catch (error) {
          console.error(error);
          throw error;
        }
};

export const removeCartProductFromDB = async (body: {}) => {
    try {
        const response = await fetch(`http://localhost:8080/shoppingBag/removeFromBag`, {
        method: "POST",
         headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
        body: JSON.stringify(body),
       });
    
       if (!response.ok) {
           throw new Error(`Error: ${response.statusText}`);
       }
      const result = await response.json();
         console.log(result);
         return result;
        } catch (error) {
          console.error(error);
          throw error;
        }
};

export function isShade(obj: any): obj is Shade {
    return (
      obj !== null &&
      typeof obj === "object" &&
      "name" in obj &&
      typeof obj.name === "string" &&
      "undertone" in obj &&
      typeof obj.undertone === "string" &&
      "color" in obj &&
      typeof obj.color === "string"
    );
  }