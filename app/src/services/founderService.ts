import axiosClient from '../api/axiosClient';

export const founderApi = {
  getExecutiveMetrics: async () => {
    try {
      const [financeRes, projectsRes, approvalsRes, marketingRes] = await Promise.all([
        axiosClient.get('/finance/cashflow-stats').catch(() => null),
        axiosClient.get('/pm/projects').catch(() => null),
        axiosClient.get('/approvals/pending').catch(() => null),
        axiosClient.get('/marketing/performance').catch(() => null),
      ]);

      const financeData = financeRes?.data?.data ?? null;
      const projects = projectsRes?.data?.data ?? [];
      const approvals = approvalsRes?.data?.data ?? [];
      const marketing = marketingRes?.data?.data ?? null;

      return {
        finance: financeData,
        projects,
        approvals,
        marketing,
      };
    } catch (err) {
      return { finance: null, projects: [], approvals: [], marketing: null };
    }
  }
};

export default founderApi;
