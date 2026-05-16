import axiosClient from '../api/axiosClient';

export const authApi = {
    login: async (email: string, password: string) => {
        const response = await axiosClient.post('/auth/login', { email, password });
        const token = response.data?.token;
        const user = response.data?.data?.user ?? response.data?.user ?? null;

        if (token) localStorage.setItem('token', token);
        if (user) localStorage.setItem('user', JSON.stringify(user));

        return { token, user };
    },

    register: async (payload: { full_name: string; email: string; password: string; confirmPassword: string; role?: string }) => {
        const response = await axiosClient.post('/auth/register', payload);
        const token = response.data?.token;
        const user = response.data?.data?.user ?? response.data?.user ?? null;

        if (token) localStorage.setItem('token', token);
        if (user) localStorage.setItem('user', JSON.stringify(user));

        return { token, user };
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
};

export default authApi;
