import { Box, Button, Icon, InputAdornment, Paper, TextField, useTheme } from '@mui/material';
import { Enviroment } from '../../environment';


interface IListToolBarProps {
  textoDaBusca?: string;
  mostrarInputBusca?: boolean;
  aoMudarTextoDeBusca?: (novoTexto: string) => void;
  textoBotaoNovo?: string;
  mostrarBotaoNovo?: boolean;
  aoClicarBotaoNovo?: () => void;
}

export const ListToolBar: React.FC<IListToolBarProps> = ({
  textoDaBusca = '',
  mostrarInputBusca = false,
  aoMudarTextoDeBusca,
  textoBotaoNovo = 'Novo',
  mostrarBotaoNovo = true,
  aoClicarBotaoNovo,
}) => {
  const theme = useTheme();
  return (
    <Box
      height={theme.spacing(5)}
      marginX={1}
      padding={1}
      paddingX={2}
      display="flex"
      gap={1}
      alignItems="center"
      component={Paper}
    >
      {mostrarInputBusca && (
        <TextField
          size="small"
          value={textoDaBusca}
          placeholder={Enviroment.INPUT_DE_BUSCA}
          onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Icon>search</Icon>
                </InputAdornment>
              ),
            },
          }}
          // ?. para executar apenas se não for undefined
        />
      )}
      <Box
        flex={1}
        display="flex"
        justifyContent="end"
      >
        {mostrarBotaoNovo && (
          <Button
            color="primary"
            disableElevation
            endIcon={<Icon>add</Icon>}
            variant="contained"
            onClick={aoClicarBotaoNovo}

          >
            {textoBotaoNovo}
          </Button>
        )}
      </Box>
    </Box>
  );
};
