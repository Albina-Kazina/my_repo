import {
    GET_DATA,
  } from './constants';
  

export const getDateAction = (payload) => ({
    type: GET_DATA,
    payload: payload, 
});
