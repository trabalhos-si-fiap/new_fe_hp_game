import { Enviroment } from '../../../environment';
import { Api } from '../axios-config';

export interface IListagemCidade {
  id: number;
  nome: string;
}

export interface IDetalheCidade {
  id: number;
  nome: string;
}

type TCidadesComTotalCount = {
  data: IListagemCidade[];
  totalCount: number;
};

const getAll = async (
  page = 1,
  filter = ''
): Promise<TCidadesComTotalCount | Error> => {
  try {
    const urlRelativa = `/cidades?_page=${page}&_limit=${Enviroment.LIMITE_DE_LINHAS}&nome_like=${filter}`;
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

const getById = async (id: number): Promise<IDetalheCidade | Error> => {
  try {
    const urlRelativa = `/cidades/${id}`;
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
  dados: Omit<IDetalheCidade, 'id'>
): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetalheCidade>('/cidades', dados);

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
  dados: IDetalheCidade
): Promise<void | Error> => {
  try {
    const urlRelativa = `/cidades/${id}`;
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
    const urlRelativa = `/cidades/${id}`;
    await Api.delete(urlRelativa);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || 'Erro ao excluir registro.'
    );
  }
};
export const CidadesService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
