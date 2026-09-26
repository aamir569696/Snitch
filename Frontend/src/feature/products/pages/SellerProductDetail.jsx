import React, { useEffect, useState } from "react";
import { useProduct } from "../../products/Hooks/useProduct";
import { useParams } from "react-router";
const SellerProductDetail = () => {
  const [product, setProduct] = useState(null);

  const { handleProductDetail } = useProduct();
  const { productId } = useParams();

  async function fetchProductDetail() {
    try {
      const data =await handleProductDetail(productId);
      setProduct(data?.product || data);
    } catch (err) {
      console.log("failed to fetch product detail", err);
    }
  }
  console.log("hello", product);

  useEffect(() => {
    fetchProductDetail();
  }, [productId]);


  return <div>sellerproductDetail</div>;
};

export default SellerProductDetail;
