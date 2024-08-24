import axios from "axios";
import {
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  GET_ORDER_BY_ID_FAILURE,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
  GET_ORDER_HISTORY_FAILURE,
  GET_ORDER_HISTORY_REQUEST,
  GET_ORDER_HISTORY_SUCCESS,
  CANCELED_ORDER_FAILURE,
  CANCELED_ORDER_REQUEST,
  CANCELED_ORDER_SUCCESS,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILURE,
  GET_ORDER_BY_ORDERID_REQUEST,
    GET_ORDER_BY_ORDERID_SUCCESS,
    GET_ORDER_BY_ORDERID_FAILURE,
} from "./ActionType";
import api, { API_BASE_URL } from "../../../config/api";
import { DELETE_ORDER_REQUEST } from "../../Admin/Orders/ActionType";

export const createOrder = (reqData) => async (dispatch) => {
  console.log("req data ", reqData);
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${reqData.jwt}`,
      },
    };

    const { data } = await axios.post(
      `${API_BASE_URL}/api/orders/`,
      reqData.address,
      config
    );
    if (data.id) {
      reqData.navigate({ search: `step=3&order_id=${data.id}` });
    }
    console.log("created order - ", data);
    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("catch error : ", error);
    dispatch({
      type: CREATE_ORDER_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderById = (orderId) => async (dispatch) => {
  console.log("get order req ", orderId);
  try {
    dispatch({ type: GET_ORDER_BY_ID_REQUEST });

    const { data } = await api.get(
      `/api/orders/${orderId}`,
      
    );
    console.log("order by id after deleting cart Items ", data);
    dispatch({
      type: GET_ORDER_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("catch ",error)
    dispatch({
      type: GET_ORDER_BY_ID_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserOrder = (orderId) => async (dispatch) => {
  console.log("get order req ", orderId);
  try {
    dispatch({ type: GET_ORDER_BY_ORDERID_REQUEST });

    const { data } = await api.get(
      `/api/orders/userOrder/${orderId}`,
      
    );
    console.log("order by id ", data);
    dispatch({
      type: GET_ORDER_BY_ORDERID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("catch ",error)
    dispatch({
      type: GET_ORDER_BY_ORDERID_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrder = (orderId) => async (dispatch) => {
  console.log("get order req ", orderId);
  try {
    dispatch({ type: GET_ORDER_REQUEST });

    const { data } = await api.get(
      `/api/orders/order/${orderId}`,
      
    );
    
    dispatch({
      type: GET_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("catch ",error)
    dispatch({
      type: GET_ORDER_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// export const getOrderHistory = (reqData) => async (dispatch, getState) => {
//   try {
//     dispatch({ type: GET_ORDER_HISTORY_REQUEST });

//     const config = {
//       headers: {
//         Authorization: `Bearer ${reqData.jwt}`,
//       },
//     };

//     const { data } = await api.get(`/api/orders/user`);
//     console.log("order history -------- ", data);
//     dispatch({
//       type: GET_ORDER_HISTORY_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: GET_ORDER_HISTORY_FAILURE,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };

export const getOrderHistory = (reqData) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ORDER_HISTORY_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${reqData.jwt}`,
      },
    };

    const { data } = await api.get(`/api/orders/user`, config); // Include config here
    console.log("order history -------- ", data);
    dispatch({
      type: GET_ORDER_HISTORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ORDER_HISTORY_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const cancelOrderByBuyer = (orderId) => async (dispatch) => {
  dispatch({ type: CANCELED_ORDER_REQUEST });

  try {
    const response = await api.put(
      `/api/orders/${orderId}/cancel`
    );
    const data = response.data;
    // dispatch(canceledOrderSuccess(data));
    dispatch({
      type: CANCELED_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // dispatch(canceledOrderFailure(error.message));
    dispatch({
      type: CANCELED_ORDER_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};






