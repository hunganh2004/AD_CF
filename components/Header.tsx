
import React from 'react';
import { useAuth } from '../hooks/useAuth';

interface HeaderProps {
    setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setSidebarOpen }) => {
    const { user } = useAuth();
    
    return (
        <header className="flex items-center justify-between h-16 px-4 sm:px-6 bg-white border-b border-stone-200">
            {/* Mobile menu button */}
            <button
                className="lg:hidden text-stone-500 hover:text-stone-700"
                onClick={() => setSidebarOpen(true)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </button>
            
            {/* Placeholder for search or other actions on larger screens */}
            <div className="hidden lg:block"></div>

            <div className="flex items-center space-x-4">
                <div className="text-right">
                    <div className="font-semibold text-stone-800">{user?.name}</div>
                    <div className="text-sm text-stone-500">{user?.role}</div>
                </div>
                <div className="w-10 h-10 bg-ocean-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    {user?.name.charAt(0)}
                </div>
            </div>
        </header>
    );
};

export default Header;
