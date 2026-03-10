import React, { useState } from 'react'

interface ReviewButtonType {
    text: string,
    state?: string,
    setState?: React.Dispatch<React.SetStateAction<string>>,
}

const ReviewButton:React.FC<ReviewButtonType> = ({text, state, setState}) => {
  return (
    <button onClick={() => {
        if(setState) {
            setState(text);
        }
    }}>
        <p className= {`${state===text ? 'bg-primary text-white' : 'bg-white text-black border-2 border-black hover:bg-primary hover:text-white hover:border-primary'} border-2 border-primary text-center text-xl font-semibold mb-10 p-3 mt-5`}
        style={{borderRadius: '30px'}}>
            {text}
        </p>
    </button>
  )
}

export default ReviewButton