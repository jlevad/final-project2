import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    soldOutProducts: [],
    quantity: 0,
    totalQuantity: 0,
    totalPrice: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.totalQuantity += action.payload.quantity;
      state.products.push(action.payload);
      state.totalPrice += action.payload.price * action.payload.quantity;
    },
    removeProduct: (state, action) => {
      const newProducts = state.products.filter(
        (item) => item.id !== action.payload.id
      );
      state.products = newProducts;
      state.quantity -= 1;
      state.totalQuantity -= action.payload.quantity;
      state.totalPrice -= action.payload.price * action.payload.quantity;
    },
    updateProduct: (state, action) => {
      const newProducts = state.products.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
      state.products = newProducts;
      state.totalPrice = newProducts.reduce((prev, curr) => {
        return prev + curr.price * curr.quantity;
      }, 0);
      state.totalQuantity = newProducts.reduce((prev, curr) => {
        return prev + curr.quantity;
      }, 0);
    },
    removeCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.totalPrice = 0;
      state.totalQuantity = 0;
    },
    checkOut: (state, action) => {
      state.soldOutProducts.push({
        ...action.payload,
      });
    }
  }
});

export const { addProduct, removeProduct, updateProduct, removeCart, checkOut } = cartSlice.actions;
export default cartSlice.reducer;
