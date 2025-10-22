
export enum Role {
    OWNER = 'Chủ quán',
    MANAGER = 'Quản lý',
    CASHIER = 'Thu ngân',
    WAITER = 'Phục vụ',
    BARISTA = 'Pha chế'
}

export interface User {
    id: number;
    name: string;
    role: Role;
}

export enum OrderStatus {
    PENDING = 'Chờ xử lý',
    PREPARING = 'Đang chuẩn bị',
    READY = 'Sẵn sàng',
    COMPLETED = 'Hoàn thành',
    CANCELLED = 'Đã hủy'
}

export interface OrderItem {
    id: number;
    name: string;
    quantity: number;
    price: number;
}

export interface Order {
    id: string;
    table?: number;
    type: 'Tại quán' | 'Mang đi';
    items: OrderItem[];
    total: number;
    status: OrderStatus;
    timestamp: string;
}

export interface StaffMember {
    id: number;
    name: string;
    role: Role;
    phone: string;
    joinDate: string;
}

export interface InventoryItem {
    id: number;
    name: string;
    unit: 'kg' | 'lít' | 'cái' | 'gram';
    stock: number;
    threshold: number;
}

export type Page = 'dashboard' | 'orders' | 'barista' | 'staff' | 'inventory' | 'reports';

export interface DailyRevenue {
    date: string;
    revenue: number;
    costs: number;
    profit: number;
}
