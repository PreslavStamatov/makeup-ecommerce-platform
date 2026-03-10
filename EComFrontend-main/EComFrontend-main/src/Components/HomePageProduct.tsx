import React, { useEffect, useState } from 'react'
import '../styles/HomePageProduct.css'
// import ShadeButton from './ShadeButton'
import Rating from '@mui/material/Rating';
import { CartMakeup, CartProduct, HomePageProductContainer } from '../Models/HomePage';
import ShadeButton from './ShadeButton';
import { useShoppingCartContext } from '../Context/useShoppingCartContext';
import { addCartProductToDB } from '../Services/ShoppingCartService';
import { Link } from 'react-router-dom';

const HomePageProduct: React.FC<HomePageProductContainer> = ({ product }) => {

  const shades = product.shades.sort();
  const[selectedShade, changeSelectedShade] = useState(shades[0]);
  const { addToCart } = useShoppingCartContext();

  const handleAddToBag = () => {
    const makeupToBeAdded: CartMakeup = {
      name: product.name,
      rating: product.rating,
      price: product.price,
      image: product.image,
      productType: product.productType,
      sellType: product.sellType,
    };

    let productToBeAdded: CartProduct = {
      makeup: makeupToBeAdded,
      shade: selectedShade
    }

    if(product.shades.length===0) {
      productToBeAdded = {
        makeup: makeupToBeAdded,
        shade: {
          name: '',
          color: '',
          undertone: '',
        },
      }
    }
    
    addToCart(productToBeAdded);
    addCartProductToDB(productToBeAdded);
  }

  return (
    
      <div className='home-page-product border-borderPrimary border'
        onClick={() => console.log(product)}>
        <img className='home-product-img' src={product.image} alt=""/>

        <div className='product-description flex flex-col justify-evenly'>
        <Link to={`/product`}
       state={product}>
        <div className='home-page-product-name'>
          <p style={{marginBottom:'10px'}}>{product.name}</p>
        </div>
        </Link>

        <p className=''>${product.price}</p>

        <div className='mb-2' style={{display:'flex', alignItems:'center', justifyContent:'flex-start'}}>
        <Rating name="half-rating-read" value={product.rating} defaultValue={2.5} precision={0.5} readOnly/>
        <p style={{marginLeft:'10px'}}>{product.rating}{product.productType}</p>
        </div>

        <div className='shades-container mb-5 ml-5 h-1/6'>
    {[...shades].sort().slice(0, 5).map((s) => (
      <ShadeButton
        stateChange={changeSelectedShade}
        selectedShade={selectedShade}
        shade={s}
      />
    ))}
  </div>

        </div>

        <div className='add-to-bag-home-page-product-button-container' >
            <button className='add-to-bag-home-page-product-button'
            onClick={() => handleAddToBag()}>ADD TO BAG</button>
          </div>

      </div>
  )
}

export default HomePageProduct
