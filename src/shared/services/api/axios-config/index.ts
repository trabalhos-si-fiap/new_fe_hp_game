import axios from 'axios';
import { errorInterceptor, responseInterceptor } from './interceptors';
import { Enviroment } from '../../../environment';


const token = localStorage.getItem(Enviroment.LOCAL_STORAGE_KEY_ACCESS_TOKEN);

const Api = axios.create({
  baseURL: Enviroment.URL_BASE,
  headers : {
    Authorization: `Bearer ${token ? JSON.parse(token) : ''}`,
  }
});

Api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error)
);

export { Api };
