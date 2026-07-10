import axiosClient from '../api/axiosClient';

const projectService = {
  createProject: async (data) => {
    const response = await axiosClient.post('/api/projects', data);
    return response.data;
  },

  getProjects: async () => {
    const response = await axiosClient.get('/api/projects');
    return response.data;
  },

  getProject: async (id) => {
    const response = await axiosClient.get(`/api/projects/${id}`);
    return response.data;
  },

  getMembers: async (projectId) => {
    const response = await axiosClient.get(`/api/projects/${projectId}/members`);
    return response.data;
  },

  addMember: async (projectId, userId) => {
    const response = await axiosClient.post(`/api/projects/${projectId}/members`, { userId });
    return response.data;
  },

  removeMember: async (projectId, userId) => {
    const response = await axiosClient.delete(`/api/projects/${projectId}/members/${userId}`);
    return response.data;
  },

  searchUsers: async (query) => {
    const response = await axiosClient.get(`/api/users/search?query=${encodeURIComponent(query)}`);
    return response.data;
  },
};

export default projectService;
