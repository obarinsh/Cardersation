import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import categReducer from '../features/categSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        categories: categReducer
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
