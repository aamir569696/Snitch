import { createProduct, getSellerProduct } from "../services/product.api";
import { setSellerProduct } from "../state/product.slice";
import { useDispatch } from "react-redux";

export const useProduct = () => {
  const dispatch = useDispatch();

  async function handleCreateProduct(formdata) {
    const data = await createProduct(formdata);
    return data.product;
  }

  async function handleGetProduct(formdata) {
    const data = await getSellerProduct();
    dispatch(setSellerProduct(data.products));
    return data.products;
  }

  return{handleCreateProduct,handleGetProduct}

};
