import React, { useEffect } from 'react'
import '../styles/ShadeButton.css'
import { ShadeButtonType } from '../Models/HomePage'

const ShadeButton: React.FC<ShadeButtonType> = ({stateChange, selectedShade, shade}) => {

  const changeSelectedShade = () => {
    stateChange(shade);
  }



  // useEffect(() => {
  //   if(selectedShade.name===shade.name) {

  //   }
  // }, [selectedShade])

  return (
    <div className={`shade-button-container p-1 ${selectedShade.name===shade.name ? 'rounded-3xl border-2 border-spacing-10 border-primary' : ''}`}>
      <button className={`shade-button`} onClick={changeSelectedShade} style={{backgroundColor: `${shade.color}`, cursor:'pointer'}}></button>
    </div>
  )
}

export default ShadeButton
