import axiosClient from '../api/axiosClient';

const pmService = {
  getDashboardData: async () => {
    const response = await axiosClient.get('/api/pm/dashboard');
    return response.data;
  },

  getEscalatedBugs: async () => {
    const response = await axiosClient.get('/api/pm/escalated-bugs');
    return response.data;
  },

  reassignBug: async (bugId, userId) => {
    const response = await axiosClient.patch(`/api/pm/bugs/${bugId}/assign`, { userId });
    return response.data;
  },

  getWorkload: async () => {
    const response = await axiosClient.get('/api/pm/workload');
    return response.data;
  }
};

export default pmService;
