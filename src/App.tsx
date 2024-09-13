/* eslint-disable react/react-in-jsx-scope */
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import {
  DrawerProvider,
  AppThemeProvider,
  AuthProvider,
} from './shared/contexts';

import './shared/forms/TraducoesYup';
import { Login } from './shared/components';

export const App = () => {
  return (
    <AuthProvider>
      <AppThemeProvider>
        <Login>
          <DrawerProvider>
            <BrowserRouter>
                <AppRoutes />        
            </BrowserRouter>
          </DrawerProvider>
        </Login>
      </AppThemeProvider>
    </AuthProvider>
  );
};
