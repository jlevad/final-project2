import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    loading: false,
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
  },
});

export const { productStart, productSuccess, productFail } =
  productSlice.actions;
export default productSlice.reducer;
