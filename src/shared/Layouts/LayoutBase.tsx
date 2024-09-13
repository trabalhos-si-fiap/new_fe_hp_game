/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  Icon,
  useMediaQuery,
} from '@mui/material';
import { useDrawerContext } from '../contexts';
import { ReactNode } from 'react';

interface ILayoutBaseProps {
  children: React.ReactNode;
  pageTitle: string;
  barraDeFerramentas?: ReactNode; // ? significa que pode ser undefined
}

export const LayoutBase: React.FC<ILayoutBaseProps> = ({
  children,
  pageTitle,
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      gap={1}
    >
      <Box
        padding={1}
        height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12) }
        display="flex"
        alignItems="center"
        gap={1}
      >
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        )}

        <Typography
          variant={smDown ? 'h5' : mdDown ? 'h4' : 'h3'}
          overflow="hidden" // corta o texto se passar do tamanho disponível
          textOverflow="ellipsis" // coloca os ...
          whiteSpace="nowrap" // Não quebra a linha
        >
          {pageTitle}
        </Typography>
      </Box>
    
      <Box
        flex={1} // para ocupar todo o espaço restante
        overflow="auto" // scroll somente nesse box
      >
        {children}
      </Box>
    </Box>
  );
};
