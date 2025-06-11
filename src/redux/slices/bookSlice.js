import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_Base_url = "http://localhost:3000/books";

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await axios.get(API_Base_url);
  console.log(response.data);
  return response.data;
});

const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.books = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(fetchBooks.pending, (state, action) => {
      state.books = [];
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.books = [];
      state.loading = false;
      state.error = "Failed to Fetch the Products";
    });
  },
});

export default bookSlice.reducer;
