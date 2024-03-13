import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { CartReducer } from "./reducer/CartReducer";
import { TransactionReducer } from "./reducer/TransactionReducer";

const rootreducer = combineReducers({
  cart: CartReducer,
  transaction: TransactionReducer,
});

const Store = configureStore({
  reducer: rootreducer,
});

export default Store;
