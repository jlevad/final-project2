import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    loading: false,
    totalIncome: 0,
  },
  reducers: {
    productStart: (state) => {
      state.loading = true;
    },
    productSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    productFail: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    productCheckout: (state, { payload }) => {
      // const res = state.products.filter((item) => payload.products.map(data => data.id).includes(item.id));
      // state.checkoutProducts = res
      state.totalIncome += payload.totalPrice
    },
    updateStock: (state, action) => {
      const newStock = state.products.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
      state.products = newStock;
    }
  },
});

export const { productStart, productSuccess, productFail, productCheckout, updateStock } =
  productSlice.actions;
export default productSlice.reducer;
