import { LayoutBase } from '../../shared/Layouts';
import { ListToolBar } from '../../shared/components';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  IListagemCidade,
  CidadesService,
} from '../../shared/services/api/cidades/CidadesService';
import { useDebounce } from '../../shared/hooks';
import {
  Box,
  Icon,
  IconButton,
  LinearProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  useTheme,
} from '@mui/material';
import { Enviroment } from '../../shared/environment';

export const ListagemDeCidades: React.FC = () => {
  const isFirstRender = useRef(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const theme = useTheme();

  const [rows, setRows] = useState<IListagemCidade[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  const pagina = useMemo(() => {
    return Number(searchParams.get('pagina') || '1');
  }, [searchParams]);

  const { debounce } = useDebounce();
  const realizarBusca = useCallback(() => {
    console.log(busca);
    CidadesService.getAll(pagina, busca).then((result) => {
      setIsLoading(false);
      if (result instanceof Error) {
        alert(result.message);
      } else {
        console.log(result);
        setRows(result.data);
        setTotalCount(result.totalCount);
      }
    });
  }, [busca, pagina]);

  useEffect(() => {
    setIsLoading(true);
    if (isFirstRender.current) {
      isFirstRender.current = false;
      realizarBusca();
    } else {
      debounce(realizarBusca);
    }
  }, [busca, debounce, realizarBusca]);

  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja apagar?')) {
      CidadesService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          setRows((oldRows) => {
            return [...oldRows.filter((oldRow) => oldRow.id !== id)];
          });
          alert('Registro apagado com sucesso!');
        }
      });
    }
  };

  return (
    <LayoutBase
      pageTitle='Listagem de cidades'
      barraDeFerramentas={
        <ListToolBar
          textoBotaoNovo='Nova'
          mostrarInputBusca
          textoDaBusca={busca}
          aoMudarTextoDeBusca={(texto) =>
            setSearchParams({ busca: texto, pagina: '1' }, { replace: true })
          }
          aoClicarBotaoNovo={() => navigate('/cidades/detalhe/nova')}
        />
      }
    >
      <TableContainer
        component={Paper}
        variant='outlined'
        sx={{ m: 1, width: 'auto' }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={theme.spacing(10)}>Ações</TableCell>
              <TableCell width={theme.spacing(5)}>Id</TableCell>
              <TableCell>Nome</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <IconButton
                    sx={{ pr: 2 }}
                    size='small'
                    onClick={() => {
                      handleDelete(row.id);
                    }}
                  >
                    <Icon>delete</Icon>
                  </IconButton>
                  <IconButton
                    size='small'
                    onClick={() => navigate(`/cidades/detalhe/${row.id}`)}
                  >
                    <Icon>edit</Icon>
                  </IconButton>
                </TableCell>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.nome}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          {rows.length == 0 && <caption>{Enviroment.LISTAGEM_VAZIA}</caption>}

          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={4}>
                  <LinearProgress variant='indeterminate' />
                </TableCell>
              </TableRow>
            )}
            {totalCount > 0 && totalCount > Enviroment.LIMITE_DE_LINHAS && (
              <TableRow>
                <TableCell colSpan={4}>
                  <Pagination
                    page={pagina}
                    count={Math.ceil(totalCount / Enviroment.LIMITE_DE_LINHAS)}
                    onChange={(_, newPage) => {
                      setSearchParams(
                        { busca, pagina: newPage.toString() },
                        { replace: true }
                      );
                    }}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </LayoutBase>
  );
};
