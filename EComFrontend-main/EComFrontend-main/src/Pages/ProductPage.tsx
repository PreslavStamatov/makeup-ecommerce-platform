import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { CartMakeup, CartProduct, Comment, Product } from '../Models/HomePage';
import ProductReview from '../Components/ProductReview';
import ReviewButton from '../Components/ReviewButton';
import ReviewWriting from '../Components/ReviewWriting';
import { useAuth } from '../Context/useAuth';
import { useProductsContext } from '../Context/useProductContext';
import Rating from '@mui/material/Rating';
import ShadeButton from '../Components/ShadeButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useShoppingCartContext } from '../Context/useShoppingCartContext';
import { addCartProductToDB, removeCartProductFromDB } from '../Services/ShoppingCartService';
import "../styles/HomePageProduct.css"

const ProductPage:React.FC = ({}) => {

    const { state } = useLocation();
    const [product, setProduct] = useState<Product>(state as Product);
    const [productComments, setProductComments] = useState<Comment[]>([]);
    const [activeButton, setActiveButton] = useState<string>('REVIEWS');
    const { products, fetchProducts, sortBy, fetchSpecificProductAndUpdate } = useProductsContext();
    const { user, loadUserData, isTokenExpired } = useAuth();
    const navigate = useNavigate();
    const [selectedShade, setSelectedShade] = useState(product.shades[0]);
    const [isShadeListActive, setIsShadeListActive] = useState<boolean>(false);
    const lastCommentReff = useRef<HTMLDivElement | null>(null);
    const lastPageElementReff = useRef<HTMLDivElement | null>(null);
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
    

    // useEffect(() => {
    //     setProductComments(product?.comments);
    // }, [products]);


    useEffect(() => {
        const isJWTExpired = isTokenExpired();
        if(!user && !isJWTExpired) {
        } else if (isJWTExpired) {
        navigate("/login");
        }   
        
        setProductComments(product?.comments);
        console.log("products changed")
        setProduct(product);
    }, []);

    useEffect(() => {
        const updatedProduct: Product | undefined = products.find(p => p.name===product.name);
        if(updatedProduct) {
            setProduct(updatedProduct);
            setProductComments(updatedProduct.comments);
        }
    }, [products]);

    useEffect(() => {
        if (lastCommentReff.current) {
            lastCommentReff.current.scrollIntoView({ behavior: "smooth" });
          }
    }, [productComments]);

    useEffect(() => {
        if(lastPageElementReff.current) {
            lastPageElementReff.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [activeButton]);

  return (
    <div className='product-page flex flex-col h-full w-full items-center'>
        <div className='product-main-section flex w-10/12 justify-evenly border-2 border-y-teal-700'>
            <div className='product-image-container w-7/12 border-2'>
                <img src={product.image} alt="" />
            </div>
            <div className='product-info-container flex flex-col justify-between border-2 w-5/12 border-red-700 p-10'>
                <div className='product-name-container w-full border-2 pr-24'>
                    <p className='text-3xl font-bold '>{product.name}</p>
                </div>
                <div className='genereal-information'>
                    <p className='size'>Size: 20G</p>
                    <div className='overall-rating flex'>
                    <Rating name="half-rating-read" value={product.rating} precision={0.5} readOnly />
                    <p>{product.rating} ({product.comments.length} REVIEWS)</p>
                    </div>
                    <p>${product.price} icluding VAT</p>
                </div>
                <div className='shades-information gap-5 flex flex-col'>
                    <p>Select a shade({product.shades.length})</p>
                    <div className='selected-shade-container w-10/12 border-2 rounded-xl flex justify-between py-2 px-2'>
                        <div className='selected-shade flex items-center'>
                            <ShadeButton shade={selectedShade} stateChange={setSelectedShade} selectedShade={selectedShade}/>
                            <p>{selectedShade.name}</p>
                        </div>
                        <button className='w-1/12' onClick={() => setIsShadeListActive(!isShadeListActive)}>
                            <KeyboardArrowDownIcon/>
                        </button>
                        {isShadeListActive ? 
                        <div className='shadeList absolute w-2/12 mt-12 z-50 border-2 rounded-xl bg-white flex flex-col gap-1 max-h-32 overflow-x-auto px-2 py-2'>
                            {product.shades.map(shade => 
                            <div className='flex items-center'>
                                <ShadeButton shade={shade} stateChange={setSelectedShade} selectedShade={selectedShade}/>
                                <p>{shade.name}</p>
                            </div>
                            )}
                        </div> : <></>}
                    </div>
                    <div className='all-product-shades flex'>
                        {product.shades.map(shade => <ShadeButton shade={shade} stateChange={setSelectedShade} selectedShade={selectedShade}/>)}
                    </div>
                </div>
                <div className='add-to-bag-section border-2'>
                    <div className='add-to-bag-home-page-product-button-container'>
                        <button className='add-to-bag-home-page-product-button'
                        onClick={() => handleAddToBag()}>ADD TO BAG</button>
                    </div>
                </div>
            </div>
        </div>

        <div className='product-review-section border-2 w-9/12 mt-5'>
            <div className='flex gap-10 justify-center'>
                <ReviewButton text='REVIEWS' state={activeButton} setState={setActiveButton}/>
                <ReviewButton text='WRITE A REVIEW' state={activeButton} setState={setActiveButton}/>
            </div>
                    
            {activeButton==='REVIEWS' ? 
                <div className='reviews'>
                    {productComments.map((c, index) => 
                        <div 
                        key={index}
                        ref={productComments.length - 1 === index ? lastCommentReff : null}>
                            <ProductReview comment={c}></ProductReview>
                        </div>)}
                </div> : 
                <div ref={lastPageElementReff}>
                    <ReviewWriting  product={product} setActiveButton={setActiveButton}/>
                </div>
            }
        </div> 
    </div>
  )
}

export default ProductPage