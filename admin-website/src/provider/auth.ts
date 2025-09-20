interface User {
  nickname: string;
  email: string;
  id: number;
}

interface AuthProvider {
  isAuthenticated: boolean;
  user: User | null;
  setUser(user: User): Promise<void>;
  clearUser(): Promise<void>;
}

export const AuthProvider: AuthProvider = {
  isAuthenticated: false,
  user: null,
  async setUser(user) {
    AuthProvider.isAuthenticated = true;
    AuthProvider.user = user;
  },
  async clearUser() {
    AuthProvider.isAuthenticated = false;
    AuthProvider.user = null;
  },
};
