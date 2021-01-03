import { fetchProducts } from "../../api/firebase";
import {
  getProductFailed,
  getProductInit,
  getProductSuccess,
} from "./product-slice";

export const getProducts = () => async (dispatch) => {
  dispatch(getProductInit());
  const product = await fetchProducts();
  if (product.err) {
    dispatch(getProductFailed(product.err.message));
  } else {
    dispatch(getProductSuccess(product.products));
  }
};
// export const getProductById = async (productId) => {
// };
// export const getProductShop = (shopId) => async (dispatch) => {
// };
