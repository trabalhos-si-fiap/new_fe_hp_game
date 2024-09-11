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
      barraDeFerramentas={<ListToolBar mostrarBotaoNovo={false} />}
    >
      <Box
        width='100%'
        display='flex'
      >
        <Grid2
          margin={1}
          width='100%'
          container
          spacing={2}
        >
          <Grid2 size={{ xs: 12, sm: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography
                  variant='h4'
                  align='center'
                >
                  Total de Pessoas
                </Typography>
                <Box
                  display='flex'
                  padding={6}
                  justifyContent='center'
                  alignItems='center'
                >
                  {isLoadingPessoas ? (
                    <>
                      <CircularProgress variant='indeterminate' />
                    </>
                  ) : (
                    <Typography variant='h2'>{totalPessoas}</Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography
                  variant='h4'
                  align='center'
                >
                  Total de Cidades
                </Typography>
                <Box
                  display='flex'
                  padding={6}
                  justifyContent='center'
                  alignItems='center'
                >
                  {isLoadingCidades ? (
                    <CircularProgress variant='indeterminate' />
                  ) : (
                    <Typography variant='h2'>{totalCidades}</Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid2>
        </Grid2>
      </Box>
    </LayoutBase>
  );
};
