const moment = require("moment");
const { format, parseISO } = require('date-fns');
const dateUtil = {};

dateUtil.toIsoString = (date) => {
  return new Date(date).toISOString().split("T")[0];
};

dateUtil.getDbNow = () => {
 
  return moment(new Date().toString()).format('YYYY-MM-DD HH:mm:ss');
};

dateUtil.getDbDate = () => {
  return moment(new Date().toString()).format('YYYY-MM-DD');
};

dateUtil.getDate = () => {
  return new Date();
};


dateUtil.getDayDate = () =>{
  // Get the current date
const currentDate = new Date();
// Format the date as "Mon, 10-10-2023"
const formattedDate = format(currentDate, 'E, dd-MM-yyyy');
  return formattedDate
}

dateUtil.getDobDate=(inputDate)=>{
  const dateParts = inputDate.split('-');
if (dateParts.length !== 3) {
  throw new Error('Invalid date format. Please use dd-mm-yyyy.');
}
  const year = dateParts[2];
  const month = dateParts[1];
  const day = dateParts[0];
const newDateFormat = `${year}-${month}-${day}`;

return newDateFormat;

}

module.exports = {
  dateUtil,
};
