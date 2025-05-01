import React from 'react'
import images from '../assets/images.jpg'

const Logo = ({width = '100px'}) => {
  return (
    <img style= {{width}} src ={images} alt = "This is a logo"/>
  )
}

export default Logo
