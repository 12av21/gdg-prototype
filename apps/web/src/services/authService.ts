import apiClient from './apiClient';
import { User, Role } from '../types';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: Role;
  department: string;
}

export interface AuthResponse {
  token: string;
  name: string;
  email: string;
  role: string;
  userId: string;
}

export const authService = {
  /**
   * Authenticate user and persist JWT token to localStorage.
   */
  async login(payload: LoginPayload): Promise<User> {
    const { data } = await apiClient.post<AuthResponse>('/auth/login', payload);
    localStorage.setItem('scip_token', data.token);
    const user: User = {
      id: data.userId,
      name: data.name,
      email: data.email,
      role: data.role as Role,
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem('scip_user', JSON.stringify(user));
    return user;
  },

  /**
   * Register a new user and auto-login.
   */
  async register(payload: RegisterPayload): Promise<User> {
    const { data } = await apiClient.post<AuthResponse>('/auth/register', payload);
    localStorage.setItem('scip_token', data.token);
    const user: User = {
      id: data.userId,
      name: data.name,
      email: data.email,
      role: data.role as Role,
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem('scip_user', JSON.stringify(user));
    return user;
  },

  /**
   * Restore logged-in user from localStorage on page reload.
   */
  getStoredUser(): User | null {
    const stored = localStorage.getItem('scip_user');
    return stored ? JSON.parse(stored) : null;
  },

  /**
   * Clear session and sign out.
   */
  logout(): void {
    localStorage.removeItem('scip_token');
    localStorage.removeItem('scip_user');
  },
};
