import React from 'react'
import Rating from '@mui/material/Rating';
import { ProductReviewType } from '../Models/Product'
import { useProductsContext } from '../Context/useProductContext';

const ProductReview:React.FC<ProductReviewType> = ({ comment }) => {
  const { products } = useProductsContext();

  return (
    <div className='border-t-2 pb-5 pt-2 ml-12 w-11/12'>
        <p className='mb-2 font-bold text-lg'>{comment.user.username}</p>
        <Rating name="half-rating-read" defaultValue={0} precision={0.5} value={comment.rating} readOnly />
        <p>{comment.text}</p>
    </div>
  )
}

export default ProductReview