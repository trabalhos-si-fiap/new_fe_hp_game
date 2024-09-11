import { AxiosResponse } from 'axios';

export const responseInterceptor = (response: AxiosResponse) => {
  // Poderia fazer algum tratamendo de dados aqui
  return response;
};
