import Api from '../constants/api';

export const createLink = (latitude,longitude, date) =>{
    return `${Api.Date.GET_DATA}lat=${latitude}&lng=${longitude}&date=${date}`;
}