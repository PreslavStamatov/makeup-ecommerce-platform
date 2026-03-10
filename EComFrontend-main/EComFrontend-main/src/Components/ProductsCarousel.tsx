import React, { useState } from 'react'
import HomePageProduct from './HomePageProduct';
import { ProductsCarouselType } from '../Models/HomePage';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const ProductsCarousel: React.FC<ProductsCarouselType> = ({ products }) => {

    const [currentIndex, setCurrentIndex] = useState(0); // Tracks the visible items

  // Calculate the maximum index (to prevent scrolling beyond the last set of items)
  const maxIndex = Math.max(0, products.length - 7);

  // Handle next button
  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Handle previous button
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="relative m-auto overflow-hidden"
      style={{width: '73%', height: '620px'}}>
        {/* Carousel Container */}
        <div
          className="flex justify-evenly transition-transform duration-300 h-full"
          style={{
            transform: `translateX(-${currentIndex * 25}%)`, // Moves the items
          }}
        >
          {products.map((m, index) => (
            <div className={`w-1/4 flex-shrink-0 flex justify-center px-3`} key={index}>
              <HomePageProduct product={m} />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          className="absolute -left-1 top-1/2 transform -translate-y-1/2 text-black"
          onClick={handlePrev}
        >
          <ArrowBackIosNewIcon/>
        </button>

        <button
          className="absolute -right-1 top-1/2 transform -translate-y-1/2 text-black"
          onClick={handleNext}
        >
          <ArrowForwardIosIcon/>
        </button>
      </div>
  )
}

export default ProductsCarousel