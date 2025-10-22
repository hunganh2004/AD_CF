
import React, { createContext, useState, ReactNode, useMemo, useCallback } from 'react';
import { User, Page } from '../types';
import { ROLES_PERMISSIONS } from '../constants';

interface AuthContextType {
    user: User | null;
    page: Page;
    login: (user: User) => void;
    logout: () => void;
    setPage: (page: Page) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [page, setPage] = useState<Page>('dashboard');

    const login = useCallback((loggedInUser: User) => {
        setUser(loggedInUser);
        const defaultPage = ROLES_PERMISSIONS[loggedInUser.role].pages[0];
        setPage(defaultPage);
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        setPage('dashboard');
    }, []);

    const contextValue = useMemo(() => ({
        user,
        page,
        login,
        logout,
        setPage
    }), [user, page, login, logout]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
