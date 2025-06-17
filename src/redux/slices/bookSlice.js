import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_Base_url = "https://chapterly-server.onrender.com/books";

export const addNewBook = createAsyncThunk(
  "books/addNewBook",
  async (newBookData) => {
    const response = await axios.post(API_Base_url, newBookData);
    return response.data;
  }
);

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await axios.get(API_Base_url);
  return response.data;
});

export const updateBook = createAsyncThunk(
  "books/updateBook",
  async ({ bookId, updatedBookData }) => {
    const response = await axios.put(
      `${API_Base_url}/${bookId}`,
      updatedBookData
    );
    return response.data;
  }
);
export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async (bookId) => {
    const response = await axios.delete(`${API_Base_url}/${bookId}`);
    console.log(response.data);
    return { bookId: bookId };
  }
);

const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    searchData: [],
    loading: false,
    isUpdating: false,
    isAdding: false,
    error: "",
  },
  reducers: {
    search(state, action) {
      const keyword = action.payload.toLowerCase();

      if (keyword.length > 0) {
        state.books = state.searchData.filter((item) =>
          `${item.title} ${item.author} ${item.genre}`
            .toLowerCase()
            .includes(keyword)
        );
      } else {
        state.books = state.searchData;
      }
    },
  },
  extraReducers: (builder) => {
    // for handling fetchBooks
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.books = action.payload;
      state.searchData = action.payload;
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
      state.error = "Failed to Fetch the Books";
    });

    //for handling addNewBook
    builder.addCase(addNewBook.fulfilled, (state, action) => {
      state.books.push(action.payload);
      state.searchData.push(action.payload);
      state.isAdding = false;
      state.error = "";
    });
    builder.addCase(addNewBook.pending, (state, action) => {
      state.isAdding = true;
      state.error = "";
    });
    builder.addCase(addNewBook.rejected, (state, action) => {
      state.isAdding = false;
      state.error = "Failed to Add the Book";
    });

    // for handling updateBook
    builder.addCase(updateBook.fulfilled, (state, action) => {
      state.isUpdating = false;
      state.error = "";
      const updatedData = action.payload;
      const index = state.books.findIndex((book) => book.id === updatedData.id);
      // since findIndex returns -1 if no match found
      if (index !== -1) state.books[index] = updatedData;
      if (index !== -1) state.searchData[index] = updatedData;
    });
    builder.addCase(updateBook.pending, (state) => {
      state.isUpdating = true;
      state.error = "";
    });
    builder.addCase(updateBook.rejected, (state) => {
      state.isUpdating = false;
      state.error = "Failed to Update the Book";
    });

    // for handling deleteBook
    builder.addCase(deleteBook.fulfilled, (state, action) => {
      state.books = state.books.filter(
        (book) => book.id !== action.payload.bookId
      );
      state.searchData = state.searchData.filter(
        (book) => book.id !== action.payload.bookId
      );
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

export const { search } = bookSlice.actions;
export default bookSlice.reducer;
