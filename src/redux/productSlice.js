import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductList } from "../service/apiService";

const initialState = {
  dic: {},
  loading: false,
  error: null,
};

export const loadProductList = createAsyncThunk(
  "loadProductList",
  async (category, { rejectWithValue }) => {
    if (!category) return rejectWithValue("Category can't be empty.");

    try {
      const productArr = await fetchProductList(category);

      return { category, productArr };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
  {
    condition: (category, { getState }) => !getState().product.dic[category],
  }
);

const productSlice = createSlice({
  name: "product",
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
        const { category, productArr } = action.payload;
        state.dic[category] = productArr;
      })
      .addCase(loadProductList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.productData = {};
      });
  },
});

export const selectDic = (state) => state.product;
export const productReducer = productSlice.reducer;
