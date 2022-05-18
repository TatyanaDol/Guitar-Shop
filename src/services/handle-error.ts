import request from 'axios';
import {toast} from 'react-toastify';
import { HttpCode } from '../const';

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
        toast.error(error.message);
        break;
    }
  }
  else {
    toast.error('Something went wrong. Please try again');
  }
};
