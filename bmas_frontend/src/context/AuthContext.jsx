import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const data = await authService.login(email, password);
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data.user;
  };

  const register = async (name, email, password, roles, expertise) => {
    return await authService.register(name, email, password, roles, expertise);
  };

  const switchRole = async (targetRole) => {
    const data = await authService.switchRole(targetRole);
    setToken(data.token);
    
    const updatedUser = {
      ...user,
      activeRole: data.activeRole,
      preferredRole: data.preferredRole
    };
    setUser(updatedUser);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    return data.activeRole;
  };

  const logout = () => {
    authService.logout();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, switchRole, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};
