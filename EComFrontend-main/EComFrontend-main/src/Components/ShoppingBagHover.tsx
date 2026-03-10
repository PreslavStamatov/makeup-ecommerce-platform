import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import '../styles/ShoppingBagHover.css'
import HoveredShoppingCartProduct from './HoveredShoppingCartProduct';
import { useShoppingCartContext } from '../Context/useShoppingCartContext';
import { getTotalQuantityFromShoppingCart } from '../Services/ShoppingCartService';
import { useEffect } from 'react';

interface ShoppingBagType {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShoppingBagHover: React.FC<ShoppingBagType> = ({ isActive, setIsActive}) => {

  let shoppingBagSize = 0;

  let height = 'auto';
  // const { user } = useAuth()
  // const userProducts = user?.shoppingBag.products;
  // console.log(userProducts)
  const { userProducts, productsQuantity } = useShoppingCartContext();

  return (
    <div className='shopping-bag-hover-container bg-white'
    style={{height:`${height}`, position:'absolute', display:'flex', flexDirection:'column'}}
    onMouseEnter={() => setIsActive(true)}
    onMouseLeave={() => setIsActive(false)}
    >
      <div className='shopping-bag-hover-header' style={{fontWeight:'600'}}>
        <p>BAG SUMMARY</p>
        <p>{productsQuantity + `${productsQuantity===1 ? ' Item' : ' Items'}`}</p>
      </div>

      <div className='shopping-bag-hover-products pink-scrollbar'>
        {userProducts?.map(product => <HoveredShoppingCartProduct product={product}></HoveredShoppingCartProduct>)}
      </div>

      <div className='separator'></div>

      <div className='shopping-bag-hover-payment'>
        <p>Total</p>
        <p>${20}</p>
      </div>

      <div className='shopping-bag-hover-options'>
        <button className='checkout-button'><LockOutlinedIcon
        sx={{
          color: 'white',
          '&:hover': {
            color: '#e31870',
          },
        }}
        className='checkout-icon'
        style={{marginRight:'5px', color:'white', fontWeight:'400'}}></LockOutlinedIcon>SECURE CHECKOUT</button>
        <button className='view-bag-button'>VIEW BAG</button>
      </div>

    </div>
  )
}

export default ShoppingBagHover
