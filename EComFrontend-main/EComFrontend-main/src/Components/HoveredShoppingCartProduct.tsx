import React from 'react'
import '../styles/HoveredShoppingCartProduct.css'
import { HoveredShoppingCartProductType } from '../Models/Product';
import { isShade, removeCartProductFromDB } from '../Services/ShoppingCartService';
import ProductQuantityDropdown from './ProductQuantityDropdown';

const HoveredShoppingCartProduct: React.FC<HoveredShoppingCartProductType> = ({product}) => {
  return (
    <div className='hovered-shoping-cart-product-container'>
        <img className='hovered-shoping-cart-product-container-image' src={product.makeup.image} alt=""/>
      
        <div className='name-shade-and-quantity'>
        <p  style={{fontSize:'14px', margin:'0px', marginTop:'15px', marginBottom:'8px', marginRight:'5px', fontWeight:'600'}}>{product.makeup.name}</p>
        <p style={{fontWeight:'600', margin:'0px', marginBottom:'8px'}}>
          ${product.quantity ? product.makeup.price * product.quantity : product.makeup.price}
        </p>
        {isShade(product.shade) && product.shade && <p style={{fontSize:'12px', margin:'0px', marginBottom:'8px', fontWeight:'500'}}>Shade: {product.shade.undertone} {product.shade.name}</p>}
        <ProductQuantityDropdown product={product} quantity={product.quantity}/>
      <p
      style={{backgroundColor:'white', border:'none', marginLeft:'130px', marginBottom:'10px', fontWeight:'500', textDecoration:'underline'}}>Remove</p>
      </div>

      <div className='w-52 h-52 border-2'
        onClick={() => removeCartProductFromDB(product)}></div>
    </div>
  )
}

export default HoveredShoppingCartProduct
