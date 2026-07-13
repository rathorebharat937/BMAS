import axiosClient from '../api/axiosClient';

const projectService = {
<<<<<<< HEAD
  createProject: async (name, description) => {
    const response = await axiosClient.post('/api/projects', { name, description });
    return response.data;
  },

  updateProject: async (id, data) => {
    const response = await axiosClient.put(`/api/projects/${id}`, data);
    return response.data;
  },

  archiveProject: async (id) => {
    const response = await axiosClient.patch(`/api/projects/${id}/archive`);
    return response.data;
  },

  getProjectById: async (id) => {
    const response = await axiosClient.get(`/api/projects/${id}`);
    return response.data;
  },

  getAllProjects: async () => {
=======
  createProject: async (data) => {
    const response = await axiosClient.post('/api/projects', data);
    return response.data;
  },

  getProjects: async () => {
>>>>>>> v1_bharat
    const response = await axiosClient.get('/api/projects');
    return response.data;
  },

<<<<<<< HEAD
  toggleTransparency: async (id) => {
    const response = await axiosClient.patch(`/api/projects/${id}/transparency`);
    return response.data;
  },

  // Member management
=======
  getProject: async (id) => {
    const response = await axiosClient.get(`/api/projects/${id}`);
    return response.data;
  },

>>>>>>> v1_bharat
  getMembers: async (projectId) => {
    const response = await axiosClient.get(`/api/projects/${projectId}/members`);
    return response.data;
  },

<<<<<<< HEAD
  addMember: async (projectId, userId, roleInProject) => {
    const response = await axiosClient.post(`/api/projects/${projectId}/members`, { userId, roleInProject });
    return response.data;
  },

  removeMember: async (projectId, memberId) => {
    const response = await axiosClient.delete(`/api/projects/${projectId}/members/${memberId}`);
    return response.data;
  },

  changeMemberRole: async (projectId, memberId, roleInProject) => {
    const response = await axiosClient.patch(`/api/projects/${projectId}/members/${memberId}/role`, { roleInProject });
    return response.data;
  }
=======
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
>>>>>>> v1_bharat
};

export default projectService;
