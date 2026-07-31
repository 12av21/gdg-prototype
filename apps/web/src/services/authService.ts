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
    try {
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
    } catch (err: any) {
      if (!err.response || err.code === 'ERR_NETWORK' || err.message?.includes('Network Error')) {
        console.warn('Backend API offline. Using local prototype authentication session.');
        const role: Role = payload.email.includes('admin') ? 'Admin' : payload.email.includes('employee') ? 'Employee' : 'Analyst';
        const demoUser: User = {
          id: `USR-${Date.now()}`,
          name: role === 'Admin' ? 'Security Admin' : role === 'Analyst' ? 'Security Analyst' : 'Employee User',
          email: payload.email,
          role,
          createdAt: new Date().toISOString(),
        };
        localStorage.setItem('scip_token', 'demo_jwt_token_local_prototype');
        localStorage.setItem('scip_user', JSON.stringify(demoUser));
        return demoUser;
      }
      throw err;
    }
  },

  /**
   * Register a new user and auto-login.
   */
  async register(payload: RegisterPayload): Promise<User> {
    try {
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
    } catch (err: any) {
      if (!err.response || err.code === 'ERR_NETWORK' || err.message?.includes('Network Error')) {
        const demoUser: User = {
          id: `USR-${Date.now()}`,
          name: payload.name,
          email: payload.email,
          role: payload.role,
          createdAt: new Date().toISOString(),
        };
        localStorage.setItem('scip_token', 'demo_jwt_token_local_prototype');
        localStorage.setItem('scip_user', JSON.stringify(demoUser));
        return demoUser;
      }
      throw err;
    }
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
