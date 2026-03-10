import React, { useState } from 'react'
import '../styles/SecondaryHeader.css'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import SearchIcon from '@mui/icons-material/Search';
import logo from '../images/logo.png';

const SecondaryHeader: React.FC = () => {

  const [showShoppingBag, changeShowShoppingBag] = useState(false);
  
  return (
    <div className='secondaryHeaderContainer bg-primary'>
      <div className='secondary-header-content w-full flex justify-center items-center '>
        <img className='secondaryHeaderLogo' src={logo} alt="" height={200} style={{height: '79px'}}/>

        <div className='flex justify-between items-center w-5/12 h-full mr-10'>
        <div className='flex flex-row justify-evenly items-center'>
        <p className='px-5 bg-white rounded-2xl border-none cursor-pointer h-1/3 font-semibold hover:text-primary' color='black'
          style={{fontSize: '16px'}}>New</p>
        </div>
        <div>
          <p className='px-5 bg-white rounded-2xl border-none cursor-pointer h-1/3 font-semibold hover:text-primary'
        
          style={{fontSize: '16px'}}>Best Sellers</p>
        </div>
        <div>
        <p className='px-5 bg-white rounded-2xl border-none cursor-pointer h-1/3 font-semibold hover:text-primary'
          style={{fontSize: '16px'}}>Huda Beauty</p>
        </div>
        <div>
        <p className='px-5 bg-white rounded-2xl border-none cursor-pointer h-1/3 font-semibold hover:text-primary '
          style={{fontSize: '16px'}}>Kayali</p>
        </div>
        <div>
        <p className='px-5 bg-white rounded-2xl border-none cursor-pointer h-1/3 font-semibold hover:text-primary'
          style={{fontSize: '16px'}}>Wishful</p>
        </div>
        <div>
        <p className='px-5 bg-white rounded-2xl border-none cursor-pointer h-1/3 font-semibold hover:text-primary'
          style={{fontSize: '16px'}}>Last Chance</p>
        </div>
        </div>

        <div className='secondaryHeaderOptions items-center' onMouseLeave={() => changeShowShoppingBag(false)}>
          <SearchIcon className='secondaryHeaderOption'
          style={{fontSize: '35px', color:'white'}}></SearchIcon>
          <PersonOutlineOutlinedIcon className='secondaryHeaderOption'
          style={{fontSize: '35px', color:'white'}}></PersonOutlineOutlinedIcon>
          <FavoriteBorderIcon className='secondaryHeaderOption'
          style={{fontSize: '35px', color:'white'}}></FavoriteBorderIcon>
          <ShoppingBagIcon className='secondaryHeaderOption shoppingBag' onMouseEnter={() => changeShowShoppingBag(true)}
          style={{fontSize: '35px', color:'white'}}></ShoppingBagIcon>
        </div>
      </div>
    </div>
  )
}

export default SecondaryHeader
