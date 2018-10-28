import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_SUCCESS: {
      const newOrder = {
        ...action.order,
        id: action.id
      };
      return {
        ...state,
        loading: false,
        orders: [...state.orders, newOrder]
      };
    }
    case actionTypes.PURCHASE_BURGER_FAILED:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}

export default reducer;