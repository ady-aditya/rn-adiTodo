import { configureStore } from "@reduxjs/toolkit";
import { todoSliceReducers } from "./todoSlice";
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
    reducer:{
        todo : todoSliceReducers
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispath = typeof store.dispatch

export const useAppDispath = useDispatch.withTypes<AppDispath>();
export const useAppSelector = useSelector.withTypes<RootState>()