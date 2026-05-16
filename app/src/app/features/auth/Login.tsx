import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { authApi } from '../../../services/authService';
import { useAppStore, UserRole } from '../../../store/useAppStore';
import { cn } from '../../components/ui/utils';

type AuthMode = 'login' | 'register';

export function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const setUserRole = useAppStore((state) => state.setUserRole);
    const [mode, setMode] = useState<AuthMode>(location.pathname === '/register' ? 'register' : 'login');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const switchMode = (nextMode: AuthMode) => {
        setMode(nextMode);
        navigate(nextMode === 'login' ? '/login' : '/register', { replace: true });
    };

    const completeAuth = (token?: string, user?: any) => {
        if (!token || !user) {
            toast.error('The server did not return a valid session.');
            return;
        }

        const role = (user.role || 'Employee') as UserRole;
        setUserRole(role);
        toast.success(mode === 'login' ? 'Signed in successfully' : 'Account created successfully');

        const getDashboardRouteForRole = (r: string) => {
            switch (r) {
                case 'HR Admin':
                    return '/hr';
                case 'Finance & Accounting':
                    return '/finance';
                case 'Project Manager':
                    return '/pm';
                case 'Marketing Lead':
                    return '/marketing';
                case 'Super Admin':
                    return '/executive';
                case 'Founder':
                    return '/overview';
                case 'Employee':
                default:
                    return '/dashboard';
            }
        };

        const redirectPath = getDashboardRouteForRole(role as string);
        navigate(redirectPath, { replace: true });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        try {
            if (mode === 'login') {
                const { token, user } = await authApi.login(email.trim(), password);
                completeAuth(token, user);
            } else {
                const { token, user } = await authApi.register({
                    full_name: fullName.trim(),
                    email: email.trim(),
                    password,
                    confirmPassword,
                    role: 'Employee',
                });
                completeAuth(token, user);
            }
        } catch (err: any) {
            const message = err?.message || err?.response?.data?.message || 'Authentication failed';
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow">
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900">Human Resource Management</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        {mode === 'login' ? 'Sign in to continue.' : 'Create an account to get started.'}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-6 rounded-md bg-gray-100 p-1">
                    <button
                        type="button"
                        onClick={() => switchMode('login')}
                        className={cn(
                            'rounded px-3 py-2 text-sm font-medium transition-colors',
                            mode === 'login' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
                        )}
                    >
                        Sign in
                    </button>
                    <button
                        type="button"
                        onClick={() => switchMode('register')}
                        className={cn(
                            'rounded px-3 py-2 text-sm font-medium transition-colors',
                            mode === 'register' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
                        )}
                    >
                        Register
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {mode === 'register' && (
                        <Input
                            placeholder="Full name"
                            value={fullName}
                            onChange={(event) => setFullName(event.target.value)}
                            required
                        />
                    )}
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                        minLength={6}
                    />
                    {mode === 'register' && (
                        <Input
                            type="password"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                            required
                            minLength={6}
                        />
                    )}
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? (mode === 'login' ? 'Signing in...' : 'Creating account...') : (mode === 'login' ? 'Sign in' : 'Create account')}
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Login;
