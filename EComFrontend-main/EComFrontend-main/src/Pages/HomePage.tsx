import React, { useEffect, useState } from 'react'
import { homePageAPI } from '../Services/AuthService';
import { UserProfile } from '../Models/User';
import { useAuth } from '../Context/useAuth';
import { useNavigate } from 'react-router-dom';
import HomePageProduct from '../Components/HomePageProduct';
import { useProductsContext } from '../Context/useProductContext';
import ProductsCarousel from '../Components/ProductsCarousel';

const HomePage = () => {

  
  const navigate = useNavigate();
  const { user, loadUserData, isTokenExpired } = useAuth();
  const { products, fetchProducts, sortBy } = useProductsContext();

  useEffect(() => {
    const isJWTExpired = isTokenExpired();
    if(!user && !isJWTExpired) {
      loadUserData();
      fetchProducts();
    } else if (isJWTExpired) {
      navigate("/login");
    }
  }, [])

  return (
    <div className="home-page-content h-full w-full z-10 m-auto flex flex-col">
      <div className='home-page-carousel flex flex-col mt-10 items-center'>
        <h1 className='text-center mb-5 text-3xl font-bold text-primary'>NEW PRODUCTS</h1>
        <div className='flex justify-center items-center text-center mb-5 cursor-pointer w-fit'>
          <p className='text-lg underline'>Shop all</p>
          <p className='text-xl ml-2'>&#8250;</p>
        </div>
        <ProductsCarousel products={products.filter(p => p.sellType==="NEW_PRODUCTS")}></ProductsCarousel>
      </div>

      <div className='home-page-carousel flex flex-col mt-20 mb-10 items-center'>
        <h1 className='text-center mb-5 text-3xl font-bold text-primary'>BEST SELLERS</h1>
        <div className='flex justify-center items-center text-center mb-5 cursor-pointer w-fit'>
          <p className='text-lg underline'>Shop all</p>
          <p className='text-xl ml-2'>&#8250;</p>
        </div>
        <ProductsCarousel products={products.filter(p => p.sellType==="BEST_SELLING")}></ProductsCarousel>
      </div>
    </div>
  )
}

export default HomePage