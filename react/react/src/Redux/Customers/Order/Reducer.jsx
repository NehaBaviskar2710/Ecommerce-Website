import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE,
    GET_ORDER_BY_ID_REQUEST,
    GET_ORDER_BY_ID_SUCCESS,
    GET_ORDER_BY_ID_FAILURE,
    GET_ORDER_HISTORY_REQUEST,
    GET_ORDER_HISTORY_SUCCESS,
    GET_ORDER_HISTORY_FAILURE,
    CANCELED_ORDER_FAILURE,
  CANCELED_ORDER_REQUEST,
  CANCELED_ORDER_SUCCESS,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILURE,
  GET_ORDER_BY_ORDERID_REQUEST,
    GET_ORDER_BY_ORDERID_SUCCESS,
    GET_ORDER_BY_ORDERID_FAILURE,
  } from './ActionType';

  const initialState={
    orders:[],
    userOrder:null,
    order:null,
    error:null,
    loading:false,
    orderData:null
  }
  
  export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_ORDER_REQUEST:
        return {
          loading: true,
        };
      case CREATE_ORDER_SUCCESS:
        return {
          loading: false,
          success: true,
          order: action.payload,
        };
      case CREATE_ORDER_FAILURE:
        return {
          loading: false,
          error: action.payload,
        };
        case GET_ORDER_BY_ID_REQUEST:
        return {
          loading: true,
        };
      case GET_ORDER_BY_ID_SUCCESS:
        return {
          loading: false,
          order: action.payload,
        };
      case GET_ORDER_BY_ID_FAILURE:
        return {
          loading: false,
          error: action.payload,
        };
        case GET_ORDER_BY_ORDERID_REQUEST:
        return {
          loading: true,
        };
      case GET_ORDER_BY_ORDERID_SUCCESS:
        return {
          loading: false,
          userOrder: action.payload,
        };
      case GET_ORDER_BY_ORDERID_FAILURE:
        return {
          loading: false,
          error: action.payload,
        };
        case GET_ORDER_REQUEST:
        return {
          loading: true,
        };
      case GET_ORDER_SUCCESS:
        return {
          loading: false,
          orderData: action.payload,
        };
      case GET_ORDER_FAILURE:
        return {
          loading: false,
          error: action.payload,
        };
        case GET_ORDER_HISTORY_REQUEST:
            return {
              loading: true,
              orders: [],
            };
          case GET_ORDER_HISTORY_SUCCESS:
            return {
              loading: false,
              orders: action.payload,
            };
          case GET_ORDER_HISTORY_FAILURE:
            return {
              loading: false,
              error: action.payload,
              orders: [],
            };
            case CANCELED_ORDER_REQUEST:
              return {
                ...state,
                isLoading: true,
              };
              case CANCELED_ORDER_SUCCESS:
      return {
        ...state,
        canceled: action.payload,
        isLoading: false,
      };
      case CANCELED_ORDER_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
      default:
        return state;
    }
  };
  
 
  