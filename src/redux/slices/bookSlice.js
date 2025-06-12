import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_Base_url = "http://localhost:3000/books";

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await axios.get(API_Base_url);
  console.log(response.data);
  return response.data;
});

export const updateBook = createAsyncThunk(
  "books/updateBook",
  async (bookId, updatedData) => {
    const response = await axios.patch(
      `${API_Base_url}/${bookId}`,
      updatedData
    );
    console.log(response.data);
  }
);

const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    // for handling fetchBooks
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

    // for handling updateBook
    builder.addCase(updateBook.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";

      const updatedData = action.payload;
      const index = state.books.findIndex((book) => book.id === updatedData.id);
      // since findIndex returns -1 if no match found
      if (index !== -1) state.books[index] = updatedData;
    });
    builder.addCase(updateBook.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(updateBook.rejected, (state) => {
      state.loading = false;
      state.error = "Failed to Fetch the Products";
    });
  },
});

export default bookSlice.reducer;
