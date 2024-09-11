import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { AuthService } from '../services/api/auth/AuthService';
import { Enviroment } from '../environment';

interface IAuthContextData {
  isAuthenticated: boolean;
  logout: () => void;
  login: (email: string, password: string) => Promise<string | void>;
}

const AuthContext = createContext({} as IAuthContextData);

interface IAuthProviderProps {
  children: React.ReactNode;
}


export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | undefined>();

  useEffect(() => {
    const accessToken = localStorage.getItem(Enviroment.LOCAL_STORAGE_KEY_ACCESS_TOKEN);

    if (accessToken) {
      setToken(JSON.parse(accessToken));
      return;
    }
    setToken(undefined);
  }, []);

  const handleLogin = useCallback(async (email: string, password: string) => {
    const result = await AuthService.authRequester(email, password);
    if (result instanceof Error) {
      return result.message;
    }
    localStorage.setItem(
      Enviroment.LOCAL_STORAGE_KEY_ACCESS_TOKEN,
      JSON.stringify(result.token)
    );
    setToken(result.token);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem(Enviroment.LOCAL_STORAGE_KEY_ACCESS_TOKEN);
    setToken(undefined);
  }, []);

  const isAuthenticated = useMemo(() => token !== undefined, [token]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login: handleLogin, logout: handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
