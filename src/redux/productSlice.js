import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductByID } from "../service/apiService";
// Define an initial state
const initialState = {
  productData: {},
  loading: false,
  error: null,
};
// Create an asynchronous thunk action
export const loadProductData = createAsyncThunk(
  "loadProduct",
  async (productId, thunkAPI) => {
    if (!productId)
      return thunkAPI.rejectWithValue("Product Id can't be empty.");
    const product = thunkAPI.getState().product?.productData[productId];
    if (product) return { id: productId, data: product };

    try {
      const ret = await fetchProductByID(productId);
      return { id: productId, data: ret };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadProductData.pending, (state) => {
        state.loading = true;
        // state.productData = {};
        state.error = null;
      })
      .addCase(loadProductData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const { id, data } = action.payload;
        if (!state.productData[id]) state.productData[id] = data;
      })
      .addCase(loadProductData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.productData = {};
      });
  },
});
export const selectProduct = (state) => state.product;
export default productSlice.reducer;
