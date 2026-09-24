import { useParams } from "react-router";
import { useProduct } from "../Hooks/useProduct";
import { useEffect } from "react";
import { useState } from "react";
const ProductsDetail = () => {

  const { productId } = useParams();
  console.log("productsId :", productId);

  const { handleProductDetail } = useProduct();
  const [product, setProduct] = useState(null);

  async function fatchProductDetail() {
    const data = handleProductDetail(productId);
    setProduct(data);
  }

  useEffect(() => {
    fatchProductDetail()
  }, [productId]);

  console.log(product)
  

  return <div>ProductsDetail</div>;
};

export default ProductsDetail;
