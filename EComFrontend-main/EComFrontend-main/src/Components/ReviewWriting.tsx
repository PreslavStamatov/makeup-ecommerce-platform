import React, { useState } from 'react'
import BasicRating from './BasicRating';
import Rating from '@mui/material/Rating';
import { postReviewAPI } from '../Services/ProductsService';
import { useProductsContext } from '../Context/useProductContext';
import { Comment, Product } from '../Models/HomePage';
import { ReviewWritingType } from '../Models/Product';
import { toast } from 'react-toastify';

const ReviewWriting:React.FC<ReviewWritingType> = ({ product, setActiveButton }) => {
    const [inputState, setInputState] = useState<string>('');
    const [rating, setRating] = React.useState<number | null>(0);
    const { fetchSpecificProductAndUpdate } = useProductsContext();
    
        // const s = async () => {
        //     const newProduct: Product = await fetchSpecificProductAndUpdate(product.name);
        //     setProduct(newProduct);
        //     setProductComments(newProduct.comments);
        //     addCommentToProduct(
        //       {
        //         text: "test",
        //         user: {username: "preso15"},
        //       },product.name
        //     )
        // }
  return (
    <div className='review-writing flex flex-col gap-5 ml-10 w-11/12'>
        <p>Score:</p>
        <Rating name="half-rating"
        defaultValue={2.5}
        precision={0.5}
        onChange={(event, newValue) => {
            setRating(newValue);
        }}/>
        <p>Review:</p>
        <input className='w-full border-2 border-black mb-10 pl-2' placeholder='Write a review...' type="text" value={inputState} onChange={e => (setInputState(e.target.value))}/>
        <button className='post self-end w-1/12 h-10 border-2'
        onClick={() => {
          toast.success("Success");
          setTimeout(() => setActiveButton("REVIEWS"), 1000);
          postReviewAPI(rating, inputState, product.name);
          setTimeout(() => fetchSpecificProductAndUpdate(product.name), 2000);
        }}>
          POST REVIEW
        </button>
    </div>
  )
}

export default ReviewWriting