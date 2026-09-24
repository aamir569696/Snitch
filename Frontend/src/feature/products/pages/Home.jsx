import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useProduct } from '../Hooks/useProduct'

const Home = () => {

   const products= useSelector(state=>state.product.products)
   const {handleGetallProducts}= useProduct()

   console.log(products)

   useEffect(() => {
    handleGetallProducts()
   }, [])
   

  return (
    <div>Welcome to Home</div>
  )
}

export default Home