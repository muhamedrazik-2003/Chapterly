import { configureStore } from "@reduxjs/toolkit";
import bookSlice from "./slices/bookSlice"

const store = configureStore({
    reducer: {
        bookSlice,
    },
})

export default store;