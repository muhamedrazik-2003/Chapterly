import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_Base_url = "http://localhost:3000/books";

export const addNewBook = createAsyncThunk("books/addNewBook", async() => {
  const response = await axios.post(API_Base_url, newBookData);
  console.log(response.data)
  return response.data
})

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await axios.get(API_Base_url);
  console.log(response.data);
  return response.data;
});

export const updateBook = createAsyncThunk(
  "books/updateBook",
  async ({bookId, updatedBookData}) => {
    const response = await axios.put(
      `${API_Base_url}/${bookId}`,
      updatedBookData
    );
    return response.data;
  }
);

export const deleteBook = createAsyncThunk("books/deleteBook", async (bookId)=> {
  const response = await axios.delete(`${API_Base_url}/${bookId}`);
  console.log(response.data);
  return response.data;
})


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
    //for handling addNewBook
    builder.addCase(addNewBook.fulfilled, (state, action) => {
      state.books = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(addNewBook.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(addNewBook.rejected, (state, action) => {
      state.loading = false;
      state.error = "Failed to Add the Book";
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
      state.error = "Failed to Update the Book";
    });

    // for handling deleteBook
    builder.addCase(deleteBook.fulfilled, (state, action) => {
      state.books = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(deleteBook.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(deleteBook.rejected, (state, action) => {
      state.loading = false;
      state.error = "Failed to Delete the Book";
    });
  },
});

export default bookSlice.reducer;
