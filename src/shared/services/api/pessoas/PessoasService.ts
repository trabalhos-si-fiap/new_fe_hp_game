import { Enviroment } from '../../../environment';
import { Api } from '../axios-config';

export interface IListagemPessoa {
  id: number;
  nomeCompleto: string;
  cidadeId: number;
  email: string;
}

export interface IDetalhePessoa {
  id: number;
  nomeCompleto: string;
  cidadeId: number;
  email: string;
}

type TPessoasComTotalCount = {
  data: IListagemPessoa[];
  totalCount: number;
};

const getAll = async (
  page = 1,
  filter = ''
): Promise<TPessoasComTotalCount | Error> => {
  try {
    const urlRelativa = `/pessoas?_page=${page}&_limit=${Enviroment.LIMITE_DE_LINHAS}&nomeCompleto_like=${filter}`;
    const { data, headers } = await Api.get(urlRelativa);

    if (data) {
      return {
        data,
        totalCount: headers['x-total-count']
          ? Number(headers['x-total-count'])
          : 0,
      };
    }
    return new Error('Erro ao consultar o getAll.');
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || 'Erro ao consultar o getAll: '
    );
  }
};

const getById = async (id: number): Promise<IDetalhePessoa | Error> => {
  try {
    const urlRelativa = `/pessoas/${id}`;
    const { data } = await Api.get(urlRelativa);

    if (data) {
      return data;
    }

    return new Error('Erro ao consultar via getById.');
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || 'Erro ao consultar via getById.'
    );
  }
};

const create = async (
  dados: Omit<IDetalhePessoa, 'id'>
): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetalhePessoa>('/pessoas', dados);

    if (data) {
      return data.id;
    }
    return new Error('Erro ao criar o registro.');
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || 'Erro ao criar o registro.'
    );
  }
};
const updateById = async (
  id: number,
  dados: IDetalhePessoa
): Promise<void | Error> => {
  try {
    const urlRelativa = `/pessoas/${id}`;
    await Api.put(urlRelativa, dados);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || 'Erro ao atualizar registro.'
    );
  }
};
const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const urlRelativa = `/pessoas/${id}`;
    await Api.delete(urlRelativa);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || 'Erro ao excluir registro.'
    );
  }
};
export const PessoasService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
