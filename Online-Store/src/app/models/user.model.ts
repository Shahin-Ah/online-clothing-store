export interface User {
    id: string;
    email: string;
}

export interface UserAuthData {
  userData: any;
  isAuthenticated: boolean;
  accessToken: string;
  idToken: string;
  configId: string;
}
