import axiosClient from '../api/axiosClient';

export const bdApi = {
  getPartners: async () => {
    const res = await axiosClient.get('/bd/partners');
    return res.data.data || [];
  },

  getPipelineDeals: async () => {
    const res = await axiosClient.get('/bd/deals');
    return res.data.data || [];
  },

  createPartner: async (payload: any) => {
    const res = await axiosClient.post('/bd/partners', payload);
    return res.data;
  },

  createDeal: async (payload: any) => {
    const res = await axiosClient.post('/bd/deals', payload);
    return res.data;
  },

  updateDealStage: async (id: string | number, payload: any) => {
    const res = await axiosClient.patch(`/bd/deals/${id}/stage`, payload);
    return res.data;
  },

  sendQuotation: async (payload: any) => {
    const res = await axiosClient.post('/bd/quotations/send', payload);
    return res.data;
  }
};

export default bdApi;
