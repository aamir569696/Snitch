import { useEffect } from "react"
import { useProduct } from "../Hooks/useProduct"
import { useSelector } from "react-redux"

const Dashbord = () => {

  const {handleGetSellerProduct}= useProduct()

  useSelector(state=> state.product.SellerProduct)

  useEffect(() => {
    
  handleGetSellerProduct()
    
  }, [])
  

  return (
    <div>Dashbord</div>
  )
}

export default Dashbord