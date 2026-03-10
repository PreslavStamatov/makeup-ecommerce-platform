import React, { useEffect } from 'react'
import '../styles/Header.css'
import LanguageIcon from '@mui/icons-material/Language';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import BestSellersHover from './BestSellersHover';
import { useState } from 'react';
import logo from '../images/logo.png';
import { useAuth } from '../Context/useAuth';
import { useNavigate } from 'react-router-dom';
import { useProductsContext } from '../Context/useProductContext';
import ShoppingBagHover from './ShoppingBagHover';

const Header: React.FC = () => {
  const [hoverContent, changeHoverContent] = useState('');
  const [showHoverContent, changeShowHoverContent] = useState(false);
  const navigate = useNavigate();

  const customizeHover = (e: React.MouseEvent<HTMLDivElement>) => {
    handleHover();
    changeHoverContent((e.target as HTMLElement).innerText);
  };
  
  const handleHover = () => {
    changeShowHoverContent(true);
  }
  const handleMouseLeave = () => {
    changeShowHoverContent(!showHoverContent)
  }

  const { logout } = useAuth();

  const [isShoppingBagActive, setIsShoppingBagActive] = useState<boolean>(false);

  return (
    <>
    <div className='header'>
      <div className='upperHeader bg-primary'>
        <div className='regionSettings'>
          <LanguageIcon style={{fontSize:'20px'}} className='black-on-hover'></LanguageIcon>
          <p className='black-on-hover'>BULGARIA | EN</p>
          <KeyboardArrowDownIcon style={{color: 'white'}} className='black-on-hover'></KeyboardArrowDownIcon>
        </div>

        <div className='logoContainer h-full'>
          <img className='headerLogo h-full' src={logo} alt="" height={200}/>
        </div>

        <div className='headerOptions'>
          <p style={{color: 'white', fontSize:'13px'}} className='black-on-hover'>JOIN LOYALTY</p>
          <PersonOutlineOutlinedIcon className='headerOption' onClick={logout}></PersonOutlineOutlinedIcon>
          <FavoriteBorderIcon className='headerOption'></FavoriteBorderIcon>
          <div onMouseEnter={() => setIsShoppingBagActive(true)}
          onMouseLeave={() => setIsShoppingBagActive(false)}>
            <ShoppingBagIcon className='headerOption'></ShoppingBagIcon>
          </div>
          {isShoppingBagActive && <ShoppingBagHover isActive={isShoppingBagActive} setIsActive={setIsShoppingBagActive}></ShoppingBagHover>}
        </div>

      </div>

      <div className='lowerHeader'>

        <div className='headerFilters'>
          <p className='headerFilter' onMouseOver={customizeHover} onMouseLeave={() => handleMouseLeave()}>NEW</p>
          <p className='headerFilter' onMouseOver={customizeHover} onMouseLeave={() => handleMouseLeave()}
          onClick={() => navigate('/productsCatalogue')}>BEST SELLERS</p>
          <p className='headerFilter' onMouseOver={customizeHover} onMouseLeave={() => handleMouseLeave()}>HUDA BEAUTY</p>
          <p className='headerFilter' onMouseOver={customizeHover} onMouseLeave={() => handleMouseLeave()}>KAYALI</p>
          <p className='headerFilter' onMouseOver={customizeHover} onMouseLeave={() => handleMouseLeave()}>WISHFUL</p>
          <p className='headerFilter' onMouseOver={customizeHover} onMouseLeave={() => handleMouseLeave()}>LAST CHANCE</p>
        </div>

        {/* <div className='searchbarContainer'>
          <p id='search-placeholder' style={{color: 'white', fontSize:'14px'}}>Search</p>
          <SearchIcon className='black-on-hover' style={{color: 'white'}}></SearchIcon>
        </div> */}

      </div>

      
      
      
    </div>

    {(showHoverContent && hoverContent==='NEW') && <BestSellersHover state={{showHoverContent, changeShowHoverContent}} effectToggle={handleHover} effectUntoggle={handleMouseLeave}></BestSellersHover>}
    {(showHoverContent && hoverContent==='BEST SELLERS') && <BestSellersHover state={{showHoverContent, changeShowHoverContent}} effectToggle={handleHover} effectUntoggle={handleMouseLeave}></BestSellersHover>}
    {(showHoverContent && hoverContent==='HUDA BEAUTY') && <BestSellersHover state={{showHoverContent, changeShowHoverContent}} effectToggle={handleHover} effectUntoggle={handleMouseLeave}></BestSellersHover>}
    {(showHoverContent && hoverContent==='KAYALI') && <BestSellersHover state={{showHoverContent, changeShowHoverContent}} effectToggle={handleHover} effectUntoggle={handleMouseLeave}></BestSellersHover>}
    {(showHoverContent && hoverContent==='WISHFUL') && <BestSellersHover state={{showHoverContent, changeShowHoverContent}} effectToggle={handleHover} effectUntoggle={handleMouseLeave}></BestSellersHover>}
    {(showHoverContent && hoverContent==='LAST CHANCE') && <BestSellersHover state={{showHoverContent, changeShowHoverContent}} effectToggle={handleHover} effectUntoggle={handleMouseLeave}></BestSellersHover>}

    </>
  )
}

export default Header
