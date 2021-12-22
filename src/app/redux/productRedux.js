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
      state.products.map((item) => {
        const newData = payload.products.find(data => data.id === item.id)
        if (newData) {
          item.stock -= newData.quantity;
          item.sold += newData.quantity;
        }
        return newData
      });
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
