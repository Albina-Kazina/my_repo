import {
    GET_DATA
  } from './constants';

  export function weatherInfo(state = [], action) {
    const { type, payload } = action;
    switch (type) {
        case  GET_DATA: 
                return{
                    ...payload,
                    }
           
      default:
        return state;
    }
  }
