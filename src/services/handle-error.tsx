import request from 'axios';
import {toast} from 'react-toastify';
import { HttpCode } from '../const';
import { store } from '../store';
import { loadIsError404 } from '../store/site-process/site-process';


export const handleError = (error: unknown): void => {

  if (!request.isAxiosError(error)) {
    throw error;
  }

  const {response} = error;

  if (response && error.message) {

    switch (response.status) {
      case HttpCode.Bad_request:
        toast.error(error.message);
        break;
      case HttpCode.Not_found:
        store.dispatch(loadIsError404(response.status));
        break;
    }
  }
  else {
    toast.error('Something went wrong. Please try again');
  }
};
