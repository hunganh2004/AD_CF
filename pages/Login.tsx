import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { MOCK_USERS } from '../constants';
import { User, Role } from '../types';
import Button from '../components/ui/Button';

const Login: React.FC = () => {
    const { login } = useAuth();
    const [selectedRole, setSelectedRole] = useState<Role>(Role.WAITER);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const userToLogin = MOCK_USERS.find(user => user.role === selectedRole);
        if (userToLogin) {
            login(userToLogin);
        } else {
            alert('Không tìm thấy người dùng với vai trò này.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-ocean-blue-950 p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-ocean-blue-800">Rocket Global</h1>
                    <p className="text-stone-500 mt-2">Hệ thống quản lý Cafe</p>
                </div>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="role-select" className="block text-sm font-medium text-stone-700 mb-2">
                            Chọn vai trò của bạn
                        </label>
                        <select
                            id="role-select"
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value as Role)}
                            className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-ocean-blue-500 focus:border-ocean-blue-500 transition"
                        >
                            {Object.values(Role).map((role) => (
                                <option key={role} value={role}>{role}</option>
                            ))}
                        </select>
                    </div>
                    
                    <Button type="submit" className="w-full text-lg">
                        Đăng nhập
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Login;