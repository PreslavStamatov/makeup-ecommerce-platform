import React, { useEffect } from 'react'
import { useAuth } from '../Context/useAuth'
import { useNavigate } from 'react-router-dom';
import { useProductsContext } from '../Context/useProductContext';
import HomePageProduct from '../Components/HomePageProduct';
import ProductsFilter from '../Components/ProductsFilter';
import { FilterType } from '../Models/Product';

const ProductsCatalogue = () => {
  const { appliedFilters, alteredProducts, extractFilterValuesFromFilterType, removeAllFilters } = useProductsContext();

  const navigate = useNavigate();
    const { user, loadUserData, isTokenExpired } = useAuth();
    const { products, fetchProducts, sortBy } = useProductsContext();
  
    useEffect(() => {
      removeAllFilters();
      const isJWTExpired = isTokenExpired();
      if(!user && !isJWTExpired) {
        loadUserData();
        fetchProducts();
      } else if (isJWTExpired) {
        navigate("/login");
      }
    }, []);

  return (
    <>
    <div className='catalogue-information-conteiner flex w-full justify-center'>
      <div className='catalogue-inforamtion flex justify-between items-end w-10/12 h-5/6'>
        <div className='catalogue-header flex flex-col my-5 w-fit justify-around'>
          <div className='navigation-container mb-4 w-fit flex justify-between text-sm font-semibold'>
            <p>Shop</p>
            <p>/</p>
            <p>Best Sellers</p>
          </div>
          <div className='heading text-3xl font-bold flex items-baseline'>
            <p className='mr-5'>BEST SELLERS</p>
            <p className='text-sm font-medium'>{alteredProducts.length} Item{alteredProducts.length!==1 && 's'}</p>
          </div>
        </div>
        <div className='catalogue-sorting h-fit flex mb-4 font-semibold'>
          <p>Sort by: Popular</p>
        </div>
      </div>
    </div>

    <div className='main-content-container bg-primaryBg w-full h-fit flex justify-center'>
      <div className='main-content flex w-10/12 h-fit justify-between mt-5'>
        <div className='filter-options-container w-3/12 h-fit flex flex-col justify-start'>
          {appliedFilters.length > 0 && 
           <div className='product-filter w-11/12 h-max rounded-lg grid grid-cols-3 border cursor-pointer
           bg-white text-productFilterText'>
            {appliedFilters.map(appliedFilter => <div className='bg-primaryBg m-2 p-2 rounded-3xl text-center font-semibold'>{appliedFilter.filter}</div>)}
          </div>}
          <ProductsFilter name='Product Type' filterType={FilterType.PRODUCT_TYPE} filterValues={extractFilterValuesFromFilterType(FilterType.PRODUCT_TYPE)}/>
          <ProductsFilter name='Color' filterType={FilterType.COLOR} filterValues={extractFilterValuesFromFilterType(FilterType.COLOR)}/>
        </div>

        <div className='products-container w-9/12 h-fit flex justify-end'>
          <div className='products w-11/12 h-fit grid grid-cols-3 gap-4'>
            {alteredProducts.map((product) => <div><HomePageProduct product={product}></HomePageProduct></div>)}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default ProductsCatalogue