import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import { useAuthContext } from '../../contexts';
import { useState } from 'react';
import * as yup from 'yup';
import '../../../shared/forms/TraducoesYup';

interface ILoginProps {
  children: React.ReactNode;
}

const loginSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
});

export const Login: React.FC<ILoginProps> = ({ children }) => {
  const { isAuthenticated, login } = useAuthContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    loginSchema
      .validate({ email, password }, { abortEarly: false })
      .then((dadosValidados) => {
        login(dadosValidados.email, dadosValidados.password).then(() => {
          setIsLoading(false);
        });
      })
      .catch((errors: yup.ValidationError) => {
        setIsLoading(false);
        errors.inner.forEach((error) => {
          if (error.path === 'email') {
            setEmailError(error.message);
          } //erros de senha
          setPasswordError(error.message);
        });
      });
  };

  if (isAuthenticated) return <>{children}</>;

  return (
    <Box
      width='100vw'
      height='100vh'
      display='flex'
      alignItems='center'
      justifyContent='center'
    >
      <Card>
        <CardContent>
          <Box
            display='flex'
            flexDirection='column'
            gap={2}
            width={250}
          >
            <Typography
              variant='h4'
              textAlign='center'
            >
              Entrar
            </Typography>
            <TextField
              fullWidth
              label='Email'
              type='email'
              value={email}
              disabled={isLoading}
              error={!!emailError}
              helperText={emailError}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => setEmailError('')}
            />
            <TextField
              fullWidth
              label='Senha'
              type='password'
              value={password}
              disabled={isLoading}
              error={!!passwordError}
              helperText={passwordError}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => setPasswordError('')}
            />
          </Box>
        </CardContent>
        <CardActions>
          <Box
            width='100%'
            display='flex'
            justifyContent='center'
          >
            <Button
              disabled={isLoading}
              variant='contained'
              onClick={handleSubmit}
              endIcon={
                isLoading && (
                  <CircularProgress
                    variant='indeterminate'
                    size={20}
                  />
                )
              }
            >
              Entrar
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};
