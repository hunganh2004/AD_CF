import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { NAV_ITEMS } from '../constants';

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
    const { user, page, setPage, logout } = useAuth();
    
    if (!user) return null;

    const handleNavigation = (newPage: (typeof NAV_ITEMS)[number]['page']) => {
        setPage(newPage);
        setSidebarOpen(false); // Close sidebar on mobile after navigation
    };
    
    const visibleNavItems = NAV_ITEMS.filter(item => item.roles.includes(user.role));

    return (
        <>
            {/* Overlay for mobile */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}
                onClick={() => setSidebarOpen(false)}
            ></div>

            <aside
                className={`fixed lg:relative inset-y-0 left-0 transform ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } lg:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-ocean-blue-900 text-white flex flex-col z-30`}
            >
                <div className="flex items-center justify-center h-20 border-b border-ocean-blue-800">
                    <h1 className="text-2xl font-bold">Rocket Global</h1>
                </div>
                <nav className="flex-1 px-4 py-6 space-y-2">
                    {visibleNavItems.map((item) => (
                        <a
                            key={item.page}
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavigation(item.page);
                            }}
                            className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                                page === item.page
                                    ? 'bg-ocean-blue-700 text-white'
                                    : 'hover:bg-ocean-blue-800 hover:text-white'
                            }`}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </a>
                    ))}
                </nav>
                <div className="px-4 py-4 border-t border-ocean-blue-800">
                     <button
                        onClick={logout}
                        className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-colors duration-200"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Đăng xuất</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;