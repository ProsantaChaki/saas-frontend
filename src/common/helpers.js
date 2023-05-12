import AxiosError from './apiCall/exceptions/AxiosError';
import {errorToast} from './toast';

function catchBlockHandler(error, message = '', silent = false) {
  if (error instanceof AxiosError) {
    console.log(error.errors);
    if (silent) {
      return;
    }
    if (message) {
      errorToast(message);
    } else if (Array.isArray(error.errors) && error.errors.length) {
      error.errors.forEach((val) => {
        errorToast(val);
      });
    } else if (typeof error.errors === 'object' && error.errors !== null) {
      Object.keys(error.errors).forEach((key) => {
        console.log('key', error.errors[key]);
        errorToast(error.errors[key]);
      });
    } else {
      errorToast(error.errors);
    }
  } else {
    console.log(error.message);
    if (silent) {
      return;
    }
    errorToast(error.message);
  }
}


function getCurrentDate(day) {
  let today = new Date(new Date().setDate(new Date().getDate() + day));
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;
  return today;
}



export {

  catchBlockHandler,
  getCurrentDate,
};
