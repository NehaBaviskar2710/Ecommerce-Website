import { API_BASE_URL } from '../../../config/api';
import {
    CREATE_PAYMENT_REQUEST,
    CREATE_PAYMENT_SUCCESS,
    CREATE_PAYMENT_FAILURE,
    UPDATE_PAYMENT_REQUEST,
    UPDATE_PAYMENT_SUCCESS,
    UPDATE_PAYMENT_FAILURE,
    DELETE_CART_ITEMS_AFTER_PAYMENT_SUCCESS,
    DELETE_CART_ITEMS_AFTER_PAYMENT_FAILURE,
    DELETE_CART_ITEMS_AFTER_PAYMENT_REQUEST,
  } from './ActionType';
  
  import axios from 'axios';
  
  export const createPayment = (reqData) => async (dispatch) => {
    console.log("create payment reqData ",reqData)
    try {
      dispatch({
        type: CREATE_PAYMENT_REQUEST,
      });
  
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${reqData.jwt}`,
        },
      };
  
      const { data } = await axios.post(`${API_BASE_URL}/api/payments/${reqData.orderId}`,reqData, config);
  console.log("datta",data)
  if(data.payment_link_url){
    window.location.href=data.payment_link_url;
  }
      dispatch({
        type: CREATE_PAYMENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_PAYMENT_FAILURE,
        payload: error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      });
    }
  };

  export const deleteCartItemAfterPayment = (jwt) => async (dispatch) => {
    return async (dispatch) => {
      dispatch({ type: DELETE_CART_ITEMS_AFTER_PAYMENT_REQUEST });
      try {
        console.log("Deleting cart Items after Payement +++++++++++");
        const response = await axios.get(`${API_BASE_URL}/api/cart_items/afterPayment`,{
          headers:{
            "Authorization":`Bearer ${jwt}`
          }
        });
        const status = response.data;
        dispatch({ type: DELETE_CART_ITEMS_AFTER_PAYMENT_SUCCESS, payload: status });
        console.log("deleted status after payment 999999999",status)
      } catch (error) {
        const errorMessage = error.message;
        dispatch({ type: DELETE_CART_ITEMS_AFTER_PAYMENT_FAILURE, payload: errorMessage });
      }
    };
  };
  



  export const updatePayment = (reqData) => {
    return async (dispatch) => {
      console.log("update payment reqData ",reqData)
      dispatch(updatePaymentRequest());
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${reqData.jwt}`,
          },
        };
        const response = await axios.get(`${API_BASE_URL}/api/payments?payment_id=${reqData.paymentId}&order_id=${reqData.orderId}`,config);
        console.log("updated data after payment --- ",response.data)
        dispatch(updatePaymentSuccess(response.data));
      } catch (error) {
        dispatch(updatePaymentFailure(error.message));
      }
    };
  };

export const updatePaymentRequest = () => {
  return {
    type: UPDATE_PAYMENT_REQUEST,
  };
};

export const updatePaymentSuccess = (payment) => {
  return {
    type: UPDATE_PAYMENT_SUCCESS,
    payload: payment,
  };
};

export const updatePaymentFailure = (error) => {
  return {
    type: UPDATE_PAYMENT_FAILURE,
    payload: error,
  };

  
};

 
  