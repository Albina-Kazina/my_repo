import { GET_DATA } from './constants';

export const weatherInfoMap = {
  [GET_DATA]: (state, payload) => ({ ...payload })
}