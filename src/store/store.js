import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { calendarSlice, uiSlice, authSlice } from "./";

export const store = configureStore({
    // ----esta parte porque arcaba error al usar fechas 
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    // -------------------------end
    reducer: {
        ui: uiSlice.reducer,
        calendar: calendarSlice.reducer,
        auth: authSlice.reducer,
    }
})