import { AddTransaction, FetchTransactionData } from "../../db/transactionData";
import {
  MAKE_REQUEST,
  FAIL_REQUEST,
  GET_TRANSACTIONS,
  GET_TRANSACTION,
  CREATE_TRANSACTION,
} from "../ActionType";

export const makeRequest = () => {
  return {
    type: MAKE_REQUEST,
  };
};

export const failRequest = (err) => {
  return {
    type: FAIL_REQUEST,
    payload: err,
  };
};

export const getTransactions = (data) => {
  return {
    type: GET_TRANSACTIONS,
    payload: data,
  };
};

export const getTransaction = (data) => {
  return {
    type: GET_TRANSACTION,
    payload: data,
  };
};

export const createTransaction = () => {
  return {
    type: CREATE_TRANSACTION,
  };
};

export const FunctionGetTransactions = () => {
  return async (dispatch) => {
    dispatch(makeRequest());
    try {
      const carts = await FetchTransactionData();
      dispatch(getTransactions(carts));
    } catch (err) {
      dispatch(failRequest(err.message));
    }
  };
};

export const FuntionGetTransaction = (id) => {
  return async (dispatch) => {
    dispatch(makeRequest());
    try {
    } catch (err) {
      dispatch(failRequest(err.message));
    }
  };
};

export const FunctionCreateTransaction = (data) => {
  return async (dispatch) => {
    dispatch(makeRequest());
    try {
      const newTransaction = data;
      await AddTransaction(newTransaction);
      dispatch(createTransaction());
    } catch (err) {
      dispatch(failRequest(err.message));
    }
  };
};
