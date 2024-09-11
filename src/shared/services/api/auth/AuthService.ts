import { Api } from '../axios-config';

interface IAuth {
  token: string;
}

const authRequester = async (
  email: string,
  password: string
): Promise<IAuth | Error> => {
  try {
    const urlRelativa = '/auth';
    const { data } = await Api.get(urlRelativa);

    if (data) {
      return data;
    }

    return new Error('Erro ao obter token.');
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || 'Erro ao obter token.'
    );
  }
};

export const AuthService = {
  authRequester,
};
