import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    quantity: null,
    totalPrice: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.totalPrice += action.payload.price * action.payload.quantity;
    },
    removeProduct: (state, action) => {
      const newProducts = state.products.filter(
        (item) => item.id !== action.payload.id
      );
      state.products = newProducts;
      state.quantity -= 1;
      state.totalPrice -= action.payload.price * action.payload.quantity;
    },
    updateProduct: (state, action) => {
      const newProducts = state.products.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
      state.products = newProducts;
      state.totalPrice = newProducts.reduce((prev, curr) => {
        console.log(prev, curr.price, curr.quantity);
        return prev + curr.price * curr.quantity;
      }, 0);
    },
  },
});

export const { addProduct, removeProduct, updateProduct } = cartSlice.actions;
export default cartSlice.reducer;
