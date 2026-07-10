import axiosClient from '../api/axiosClient';

const authService = {
  login: async (email, password) => {
    const response = await axiosClient.post('/api/auth/login', { email, password });
    return response.data;
  },

  register: async (name, email, password, roles, expertise) => {
    const response = await axiosClient.post('/api/auth/register', {
      name,
      email,
      password,
      roles,
      expertise,
    });
    return response.data;
  },

  switchRole: async (role) => {
    const response = await axiosClient.post('/api/users/switch-role', { role });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

export default authService;
