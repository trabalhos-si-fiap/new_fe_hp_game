import {
  Box,
  Button,
  Divider,
  Icon,
  Paper,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

interface IDetailToolBar {
  textoBotaoNovo?: string;

  mostrarBotaoNovo?: boolean;
  mostrarBotaoVoltar?: boolean;
  mostrarBotaoApagar?: boolean;
  mostrarBotaoSalvar?: boolean;
  mostrarBotaoSalvarEVoltar?: boolean;

  mostrarBotaoNovoCarregando?: boolean;
  mostrarBotaoVoltarCarregando?: boolean;
  mostrarBotaoApagarCarregando?: boolean;
  mostrarBotaoSalvarCarregando?: boolean;
  mostrarBotaoSalvarEVoltarCarregando?: boolean;

  aoClicarEmNovo?: () => void;
  aoClicarEmVoltar?: () => void;
  aoClicarEmApagar?: () => void;
  aoClicarEmSalvar?: () => void;
  aoClicarEmSalvarEFechar?: () => void;
}

export const DetailToolBar: React.FC<IDetailToolBar> = ({
  textoBotaoNovo = 'Novo',

  mostrarBotaoNovo = true,
  mostrarBotaoVoltar = true,
  mostrarBotaoApagar = true,
  mostrarBotaoSalvar = true,
  mostrarBotaoSalvarEVoltar = false,

  mostrarBotaoNovoCarregando = false,
  mostrarBotaoVoltarCarregando = false,
  mostrarBotaoApagarCarregando = false,
  mostrarBotaoSalvarCarregando = false,
  mostrarBotaoSalvarEVoltarCarregando = false,

  aoClicarEmNovo,
  aoClicarEmVoltar,
  aoClicarEmApagar,
  aoClicarEmSalvar,
  aoClicarEmSalvarEFechar,
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Box
      height={theme.spacing(5)}
      marginX={1}
      padding={1}
      paddingX={2}
      display='flex'
      gap={1}
      alignItems='center'
      component={Paper}
    >
      {mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando && (
        <Button
          color='primary'
          disableElevation
          startIcon={<Icon>save</Icon>}
          variant='contained'
          onClick={aoClicarEmSalvar}
        >
          <Typography
            variant='button'
            whiteSpace='nowrap'
            textOverflow='ellipsis'
            overflow='hidden'
          >
            Salvar
          </Typography>
        </Button>
      )}

      {mostrarBotaoSalvarCarregando && (
        <Skeleton
          width={108}
          height={58}
        />
      )}

      {mostrarBotaoSalvarEVoltar &&
        !mostrarBotaoSalvarEVoltarCarregando &&
        !smDown &&
        !mdDown && (
        <Button
          color='primary'
          disableElevation
          startIcon={<Icon>save</Icon>}
          variant='outlined'
          onClick={aoClicarEmSalvarEFechar}
        >
          <Typography
            variant='button'
            whiteSpace='nowrap'
            textOverflow='ellipsis'
            overflow='hidden'
          >
            Salvar e voltar
          </Typography>
        </Button>
      )}
      {mostrarBotaoSalvarEVoltarCarregando &&
        !smDown &&
        !mdDown && (
        <Skeleton
          width={180}
          height={58}
        />
      )}

      {mostrarBotaoApagar && !mostrarBotaoApagarCarregando && (
        <Button
          color='primary'
          disableElevation
          startIcon={<Icon>delete</Icon>}
          variant='outlined'
          onClick={aoClicarEmApagar}
        >
          <Typography
            variant='button'
            whiteSpace='nowrap'
            textOverflow='ellipsis'
            overflow='hidden'
          >
            Apagar
          </Typography>
        </Button>
      )}

      {mostrarBotaoApagarCarregando && (
        <Skeleton
          width={108}
          height={58}
        />
      )}

      {mostrarBotaoNovo && !mostrarBotaoNovoCarregando && !smDown && (
        <Button
          color='primary'
          disableElevation
          startIcon={<Icon>add</Icon>}
          variant='outlined'
          onClick={aoClicarEmNovo}
        >
          <Typography
            variant='button'
            whiteSpace='nowrap'
            textOverflow='ellipsis'
            overflow='hidden'
          >
            {textoBotaoNovo}
          </Typography>
        </Button>
      )}

      {mostrarBotaoNovoCarregando && !smDown  && (
        <Skeleton
          width={108}
          height={58}
        />
      )}

      {mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando && (
        <>
          <Divider
            variant='middle'
            orientation='vertical'
          />
          <Button
            color='primary'
            disableElevation
            startIcon={<Icon>arrow_back</Icon>}
            variant='outlined'
            onClick={aoClicarEmVoltar}
          >
            <Typography
              variant='button'
              whiteSpace='nowrap'
              textOverflow='ellipsis'
              overflow='hidden'
            >
              Voltar
            </Typography>
          </Button>
        </>
      )}

      {mostrarBotaoVoltarCarregando && (
        <Skeleton
          width={108}
          height={58}
        />
      )}
    </Box>
  );
};
