import moment from 'moment';

export const convertToMinutes = time => {
  return moment.duration(moment(time, ["h:mm A"]).format("HH:mm")).asMinutes()
}