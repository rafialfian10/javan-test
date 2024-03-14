import {
  MAKE_REQUEST,
  FAIL_REQUEST,
  GET_CARTS,
  UPDATE_CART,
  DELETE_CART,
} from "../ActionType";
import { FetchCartData, UpdateCartData, DeleteCartData } from "../../db/cartData";

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

export const getCarts = (data) => {
  return {
    type: GET_CARTS,
    payload: data,
  };
};

export const updateCart = () => {
  return {
    type: UPDATE_CART,
  };
};

export const deleteCart = () => {
  return {
    type: DELETE_CART,
  };
};

export const FunctionGetCarts = () => {
  return async (dispatch) => {
    dispatch(makeRequest());
    try {
      const carts = await FetchCartData();
      dispatch(getCarts(carts));
    } catch (err) {
      dispatch(failRequest(err.message));
    }
  };
};

export const FunctionUpdateCart = (itemId) => {
  return async (dispatch) => {
    dispatch(makeRequest());
    try {
      const updatedCartItems = await UpdateCartData(itemId);
      dispatch(updateCart(updatedCartItems));

      return updatedCartItems;
    } catch (err) {
      dispatch(failRequest(err.message));
    }
  };
};

export const FunctionDeleteCart = (itemId) => {
  return async (dispatch) => {
    dispatch(makeRequest());
    try {
      const deleteCartItems = await DeleteCartData(itemId);
      dispatch(deleteCart(deleteCartItems));

      return deleteCartItems;
    } catch (err) {
      dispatch(failRequest(err.message));
    }
  };
};
