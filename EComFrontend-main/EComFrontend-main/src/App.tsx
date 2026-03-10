import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { ToastContainer } from 'react-toastify';
import { UserProvider } from './Context/useAuth';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import HomePage from './Pages/HomePage';
import SecondaryHeader from './Components/SecondaryHeader';
import './index.css';
import { ProductsProvider } from './Context/useProductContext';
import Header from './Components/Header';
import ProductsCatalogue from './Pages/ProductsCatalogue';
import { ShoppingCartProvider } from './Context/useShoppingCartContext';
import ProductPage from './Pages/ProductPage';


function App() {

  const [scrollY, setScrollY] = useState(0);
  const [makeup, setMakeup] = useState([]);
  const threshold = 1; // The scroll value to switch components
  

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <BrowserRouter>
      <UserProvider>
        <ProductsProvider>
          <ShoppingCartProvider>
            {scrollY > threshold ? <SecondaryHeader/> : <Header/>}
          
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/productsCatalogue" element={<ProductsCatalogue />} />
              <Route path="/product" element={<ProductPage/>} />
            </Routes>
            <ToastContainer />
          </ShoppingCartProvider>
        </ProductsProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
