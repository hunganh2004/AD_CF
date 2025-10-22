
import React from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Barista from './pages/Barista';
import Staff from './pages/Staff';
import Inventory from './pages/Inventory';
import Reports from './pages/Reports';
import Layout from './components/Layout';
import { useAuth } from './hooks/useAuth';
import { Page } from './types';
import { ROLES_PERMISSIONS } from './constants';

const App: React.FC = () => {
    const { user, page, setPage } = useAuth();

    if (!user) {
        return <Login />;
    }
    
    const userPermissions = ROLES_PERMISSIONS[user.role];
    const hasAccess = userPermissions.pages.includes(page);
    const defaultPage = userPermissions.pages[0];

    const renderPage = () => {
        if (!hasAccess) {
             // If user somehow tries to access a page they don't have permission for,
             // redirect to their default page.
            if (page !== defaultPage) {
                setPage(defaultPage);
            }
            return null; // Render nothing this cycle, will re-render with correct page
        }

        switch (page) {
            case 'dashboard':
                return <Dashboard />;
            case 'orders':
                return <Orders />;
            case 'barista':
                return <Barista />;
            case 'staff':
                return <Staff />;
            case 'inventory':
                return <Inventory />;
            case 'reports':
                return <Reports />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <Layout>
            {renderPage()}
        </Layout>
    );
};

export default App;
