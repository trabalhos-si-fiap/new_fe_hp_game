/* eslint-disable react/react-in-jsx-scope */
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid2,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { LayoutBase } from '../../shared/Layouts';
import { ListToolBar } from '../../shared/components';
import { useEffect, useState } from 'react';
import { CidadesService } from '../../shared/services/api/cidades/CidadesService';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';

export const Dashboard = () => {
  // const theme = useTheme();
  // const mdUp  = useMediaQuery(theme.breakpoints.up('sm'));
  const [isLoadingCidades, setIsLoadingCidades] = useState(false);
  const [isLoadingPessoas, setIsLoadingPessoas] = useState(false);
  const [totalCidades, setTotalCidades] = useState(0);
  const [totalPessoas, setTotalPessoas] = useState(0);

  useEffect(() => {
    setIsLoadingCidades(true);
    CidadesService.getAll(1).then((result) => {
      setIsLoadingCidades(false);
      if (result instanceof Error) {
        alert(result.message);
      } else {
        setTotalCidades(result.totalCount);
      }
    });
    setIsLoadingPessoas(true);
    PessoasService.getAll(1).then((result) => {
      setIsLoadingPessoas(false);
      if (result instanceof Error) {
        alert(result.message);
      } else {
        setTotalPessoas(result.totalCount);
      }
    });
  }, []);

  return (
    <LayoutBase
      pageTitle='Página inicial'
    >
    </LayoutBase>
  );
};
