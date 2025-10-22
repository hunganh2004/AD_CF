import React from 'react';
import { Role, Order, OrderStatus, StaffMember, InventoryItem, Page, DailyRevenue, User } from './types';

// Mock Users for Login
export const MOCK_USERS: User[] = [
    { id: 1, name: 'Anh Chủ', role: Role.OWNER },
    { id: 2, name: 'Chị Quản Lý', role: Role.MANAGER },
    { id: 3, name: 'Tú Thu Ngân', role: Role.CASHIER },
    { id: 4, name: 'Lan Phục Vụ', role: Role.WAITER },
    { id: 5, name: 'Hùng Pha Chế', role: Role.BARISTA },
];

// Mock Data
export const MOCK_ORDERS: Order[] = [
    { id: 'OD-001', table: 5, type: 'Tại quán', items: [{id: 1, name: 'Cà Phê Sữa', quantity: 2, price: 30000}, {id: 2, name: 'Bạc Xỉu', quantity: 1, price: 35000}], total: 95000, status: OrderStatus.PREPARING, timestamp: new Date(Date.now() - 5 * 60000).toISOString() },
    { id: 'OD-002', type: 'Mang đi', items: [{id: 3, name: 'Trà Đào Cam Sả', quantity: 1, price: 45000}], total: 45000, status: OrderStatus.PENDING, timestamp: new Date(Date.now() - 2 * 60000).toISOString() },
    { id: 'OD-003', table: 2, type: 'Tại quán', items: [{id: 4, name: 'Latte', quantity: 1, price: 50000}], total: 50000, status: OrderStatus.READY, timestamp: new Date(Date.now() - 10 * 60000).toISOString() },
    { id: 'OD-004', table: 8, type: 'Tại quán', items: [{id: 1, name: 'Cà Phê Sữa', quantity: 1, price: 30000}, {id: 5, name: 'Bánh Tiramisu', quantity: 1, price: 40000}], total: 70000, status: OrderStatus.COMPLETED, timestamp: new Date(Date.now() - 30 * 60000).toISOString() },
    { id: 'OD-005', type: 'Mang đi', items: [{id: 2, name: 'Bạc Xỉu', quantity: 2, price: 35000}], total: 70000, status: OrderStatus.PENDING, timestamp: new Date().toISOString() },
];

export const MOCK_STAFF: StaffMember[] = [
    { id: 1, name: 'Nguyễn Văn A', role: Role.MANAGER, phone: '0901234567', joinDate: '2022-01-15' },
    { id: 2, name: 'Trần Thị B', role: Role.CASHIER, phone: '0901234568', joinDate: '2022-03-20' },
    { id: 3, name: 'Lê Văn C', role: Role.BARISTA, phone: '0901234569', joinDate: '2023-05-10' },
    { id: 4, name: 'Phạm Thị D', role: Role.WAITER, phone: '0901234570', joinDate: '2023-06-01' },
    { id: 5, name: 'Hoàng Văn E', role: Role.WAITER, phone: '0901234571', joinDate: '2023-09-11' },
];

export const MOCK_INVENTORY: InventoryItem[] = [
    { id: 1, name: 'Hạt Cà Phê Robusta', unit: 'kg', stock: 15.5, threshold: 5 },
    { id: 2, name: 'Sữa Tươi Thanh Trùng', unit: 'lít', stock: 8, threshold: 10 },
    { id: 3, name: 'Đường Tinh Luyện', unit: 'kg', stock: 25, threshold: 10 },
    { id: 4, name: 'Syrup Vani', unit: 'lít', stock: 3.2, threshold: 2 },
    { id: 5, name: 'Lá Trà Đen', unit: 'gram', stock: 500, threshold: 200 },
];

export const MOCK_REVENUE: DailyRevenue[] = [
    { date: '2023-10-20', revenue: 5200000, costs: 1800000, profit: 3400000 },
    { date: '2023-10-21', revenue: 6100000, costs: 2100000, profit: 4000000 },
    { date: '2023-10-22', revenue: 7500000, costs: 2500000, profit: 5000000 },
    { date: '2023-10-23', revenue: 5800000, costs: 1900000, profit: 3900000 },
    { date: '2023-10-24', revenue: 6300000, costs: 2200000, profit: 4100000 },
    { date: '2023-10-25', revenue: 8100000, costs: 2800000, profit: 5300000 },
    { date: '2023-10-26', revenue: 7200000, costs: 2400000, profit: 4800000 },
];


// Role-based permissions
interface RolePermissions {
    pages: Page[];
}

export const ROLES_PERMISSIONS: Record<Role, RolePermissions> = {
    [Role.OWNER]: {
        pages: ['dashboard', 'reports', 'staff', 'inventory', 'orders']
    },
    [Role.MANAGER]: {
        pages: ['dashboard', 'orders', 'staff', 'inventory', 'reports']
    },
    [Role.CASHIER]: {
        pages: ['orders']
    },
    [Role.WAITER]: {
        pages: ['orders']
    },
    [Role.BARISTA]: {
        pages: ['barista']
    }
};

// Navigation items
interface NavItem {
    page: Page;
    label: string;
    // FIX: Changed JSX.Element to React.ReactNode to resolve the "Cannot find namespace 'JSX'" error.
    icon: React.ReactNode;
    roles: Role[];
}

export const NAV_ITEMS: NavItem[] = [
    { 
        page: 'dashboard', 
        label: 'Tổng quan', 
        icon: <ChartPieIcon />, 
        roles: [Role.OWNER, Role.MANAGER] 
    },
    { 
        page: 'orders', 
        label: 'Quản lý Order', 
        icon: <ClipboardListIcon />, 
        roles: [Role.OWNER, Role.MANAGER, Role.CASHIER, Role.WAITER] 
    },
    { 
        page: 'barista', 
        label: 'Pha chế', 
        icon: <CoffeeIcon />, 
        roles: [Role.BARISTA] 
    },
    { 
        page: 'staff', 
        label: 'Nhân sự', 
        icon: <UsersIcon />, 
        roles: [Role.OWNER, Role.MANAGER] 
    },
    { 
        page: 'inventory', 
        label: 'Kho', 
        icon: <ArchiveIcon />, 
        roles: [Role.OWNER, Role.MANAGER] 
    },
    { 
        page: 'reports', 
        label: 'Báo cáo', 
        icon: <DocumentReportIcon />, 
        roles: [Role.OWNER, Role.MANAGER] 
    },
];


// Icons
function ChartPieIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9 9 0 0119.945 13H11V3.055z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 21.945V13H3.055A9 9 0 0013 21.945z" />
    </svg>
  );
}

function ClipboardListIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  );
}

function CoffeeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v8m-4-6v6m8-6v6M3 6h18M5 6l1 14h12l1-14M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm6-1a6 6 0 00-9-5.197M21 21v-1a6 6 0 00-3-5.197" />
    </svg>
  );
}

function ArchiveIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
    </svg>
  );
}

function DocumentReportIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}