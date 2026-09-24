import { useDispatch } from "react-redux";
import {
  createProduct,
  getSellerProduct,
  getAllProducts,
  productDetail
} from "../services/product.api";
import { setSellerProduct, setProducts } from "../state/product.slice";

export function useProduct() {
  const dispatch = useDispatch();

  async function handleCreateProduct(formData) {
    const data = await createProduct(formData);
    return data.product;
  }

  async function handleGetSellerProduct() {
    const data = await getSellerProduct();
    dispatch(setSellerProduct(data.products));
    return data.products;
  }

  async function handleGetallProducts() {
    const data = await getAllProducts();
    dispatch(setProducts(data.products));
  }

  async function handleProductDetail(productId) {
    const data=await productDetail(productId);
      console.log("Product Detail Response:", data);

    return data.product
  }

  return { handleCreateProduct, handleGetSellerProduct, handleGetallProducts,handleProductDetail };
}
