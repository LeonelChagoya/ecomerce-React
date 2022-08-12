import { configureStore } from "@reduxjs/toolkit";
import isLoadingSlice from "./slices/isLoading.slice";
import productsSlice from "./slices/products.slice";
import purchasesSlice from "./slices/purchases.slice";
import cartSlice from "./slices/cart.slice";
export default configureStore({
  reducer: {
    isLoading: isLoadingSlice,
    products: productsSlice,
    purchases: purchasesSlice,
    cart: cartSlice,
  },
});
