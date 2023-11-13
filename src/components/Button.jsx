import React from 'react'

export default function Button({ onClick, textMobile, textTabletDesktop, className }) {
  return (
    <button onClick={onClick} className= {`${className} bg-btnColor opacity-100 hover:opacity-75 transition-colors duration-200 text-mainTextColor py-2 rounded-full shadow-md`}>
        <span className='sm:hidden'>{textMobile}</span>
        <span className='hidden sm:block'>{textTabletDesktop}</span>
    </button>
  )
}

//indigo-400