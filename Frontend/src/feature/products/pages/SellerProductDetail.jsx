import React, { useEffect,useState } from 'react'
import {useProduct} from "../../products/Hooks/useProduct"
import { useParams } from 'react-router';
const SellerProductDetail = () => {

    const [product, setProduct] = useState(null)

   const { handleProductDetail } = useProduct();
const {productId}= useParams()

   async function fetchProductDetail() {
      setLoading(true);
      setError(null);
      try {
        const data = await handleProductDetail(productId);
        if (!cancelled) {
          setProduct(data);
          setActiveImage(0);
        }
      } catch (err) {

        console.log("faild to fatch product detail", err)

        if (!cancelled) {
          setError(
            err?.response?.data?.message ||
              err?.message ||
              "Failed to load product."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    useEffect(() => {
     fetchProductDetail()
    
    }, [productId])
    
console.log("hello",product);



  return (
    <div>sellerproductDetail</div>
  )
}

export default SellerProductDetail