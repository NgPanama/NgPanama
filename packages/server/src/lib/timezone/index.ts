import * as moment from 'moment-timezone';

const getDate = () => {
  return moment(new Date().getTime())
    .tz('America/Panama')
    .format();
};

const setDate = (date: Date) => {
  return moment(date)
    .tz('America/Panama')
    .format();
};

const formatDate = (date: Date, format?: string) => {
  return moment(date)
    .tz('America/Panama')
    .format(format);
};

export {getDate, setDate, formatDate};
