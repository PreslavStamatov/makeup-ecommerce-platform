import React from 'react'
import '../styles/BestSellersHover.css'

function BestSellersHover({state, effectToggle, effectUntoggle}) {
  const showHoverContent = state.showHoverContent;
  const changeShowHoverContent = state.changeShowHoverContent;
  return (
    <div className='best-sellers-container' onMouseOver={() => {changeShowHoverContent(showHoverContent)
    effectToggle()}} onMouseLeave={() => effectUntoggle()}>
      <button className='best-sellers-button' type='button'>SHOP ALL BEST SELLERS</button>
    </div>
  )
}

export default BestSellersHover
