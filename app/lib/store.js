    "use client"
    // lib/store.js
    import { configureStore } from '@reduxjs/toolkit';
    import cartReducer from '../lib/slices/cartSlice'; // We'll create this next

    const store = configureStore({
        reducer: {
            cart: cartReducer,
        },
    });

    export default store;