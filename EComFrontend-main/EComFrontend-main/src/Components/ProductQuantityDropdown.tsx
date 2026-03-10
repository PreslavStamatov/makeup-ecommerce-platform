import React, { useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useShoppingCartContext } from '../Context/useShoppingCartContext';
import { CartProduct } from '../Models/HomePage';

interface ProductQuantityType {
    product: CartProduct,
    quantity: number | undefined,
}

const ProductQuantityDropdown:React.FC<ProductQuantityType> = ({ product, quantity}) => {
    const { alterProductQuantity } = useShoppingCartContext();
    const [alteredQuantity, setAlteredQuantity] = useState<number | undefined>(quantity);
    
    const handleQuantityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newQuantity = parseInt(event.target.value, 10);
        setAlteredQuantity(newQuantity);
        if(newQuantity) {
            alterProductQuantity(newQuantity, product);
        }
      };

  return (
    
        <div className='quantity-managment w-full' style={{marginBottom:'10px', cursor:'pointer'}}>
            {/* {quantity}  */}
            {/* <KeyboardArrowDownIcon onClick={() => alterProductQuantity(1, product)}></KeyboardArrowDownIcon> */}
            
                <select
                value={quantity}
                onChange={handleQuantityChange}
                className="quantity-dropdown w-full rounded-2xl cursor-pointer"
                >
                {Array.from({ length: 10 }, (_, index) => (
                    <option key={index + 1} value={index + 1}>
                    {index + 1}
                    </option>
                ))}
                </select>
            
        </div> 
  )
}

export default ProductQuantityDropdown