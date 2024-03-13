import {
  MAKE_REQUEST,
  FAIL_REQUEST,
  GET_CARTS,
  UPDATE_CART,
} from "../ActionType";

const initialstateCart = {
  cartsData: [],
  loadingCart: true,
  errorMessageCart: "",
};

export const CartReducer = (state = initialstateCart, action) => {
  switch (action.type) {
    case MAKE_REQUEST:
      return {
        ...state,
        loadingCart: true,
      };
    case FAIL_REQUEST:
      return {
        ...state,
        loadingCart: false,
        errorMessageCart: action.payload,
      };
    case GET_CARTS:
      return {
        loadingCart: false,
        errorMessageCart: "",
        cartsData: action.payload,
      };
    case UPDATE_CART:
      return {
        ...state,
        loadingCart: false,
      };
    default:
      return state;
  }
};
