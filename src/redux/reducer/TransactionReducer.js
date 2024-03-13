import {
  MAKE_REQUEST,
  FAIL_REQUEST,
  GET_TRANSACTIONS,
  GET_TRANSACTION,
  CREATE_TRANSACTION,
} from "../ActionType";

const initialstateTransaction = {
  transactionsData: [],
  transactionData: {},
  loadingTransaction: true,
  errorMessageTransaction: "",
};

export const TransactionReducer = (state = initialstateTransaction, action) => {
  switch (action.type) {
    case MAKE_REQUEST:
      return {
        ...state,
        loadingTransaction: true,
      };
    case FAIL_REQUEST:
      return {
        ...state,
        loadingTransaction: false,
        errorMessageTransaction: action.payload,
      };
    case GET_TRANSACTIONS:
      return {
        loadingTransaction: false,
        errorMessageTransaction: "",
        transactionsData: action.payload,
      };
    case GET_TRANSACTION:
      return {
        ...state,
        loadingTransaction: false,
        transactionData: action.payload,
      };
    case CREATE_TRANSACTION:
      return {
        ...state,
        loadingTransaction: false,
      };
    default:
      return state;
  }
};
