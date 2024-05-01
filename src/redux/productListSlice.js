import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductList } from "../service/apiService";

const initialState = {
  productList: [],
  loading: false,
  error: null,
};

export const loadProductList = createAsyncThunk(
  "loadProductList",
  async (category, { rejectWithValue, getState }) => {
    if (!category) return rejectWithValue("Category can't be empty.");
    // const productList = getState().product?.productList[category];
    // if (productList) return { category, productList };

    try {
      const data = await fetchProductList(category);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productListSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadProductList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadProductList.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // const { category, productList } = action.payload;
        // if (!state.productList[category])
        //   state.productList[category] = productList;
        const data = action.payload;
        state.productList = data;
      })
      .addCase(loadProductList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.productData = {};
      });
  },
});

export const selectProductList = (state) => state.productList;
export const productListReducer = productListSlice.reducer;
