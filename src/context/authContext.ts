import { createContext } from 'react';

export interface IAuthContext {
  isLoggedIn: boolean;
  user: { id: string; email: string } | null;
  token: string | null;
  login?: (
    user: { id: string; email: string },
    token: string,
    expirationDate?: Date | undefined
  ) => void;
  logout?: () => void;
}
const defaultValues: IAuthContext = {
  isLoggedIn: false,
  user: null,
  token: null,
};
export const AuthContext = createContext<IAuthContext>({
  ...defaultValues,
});
