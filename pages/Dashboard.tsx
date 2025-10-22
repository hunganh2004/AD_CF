
import React from 'react';
import Card from '../components/ui/Card';
import { MOCK_ORDERS, MOCK_INVENTORY, MOCK_REVENUE } from '../constants';
import { OrderStatus } from '../types';

// Simple SVG Icons for cards
const CurrencyDollarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8v1m0 8v1m-2-5h4M5 12a7 7 0 1114 0 7 7 0 01-14 0z" />
  </svg>
);
const ClipboardListIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
);
const ExclamationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
);

const Dashboard: React.FC = () => {
    const todayRevenue = MOCK_REVENUE[MOCK_REVENUE.length - 1]?.revenue || 0;
    const pendingOrders = MOCK_ORDERS.filter(o => o.status === OrderStatus.PENDING || o.status === OrderStatus.PREPARING).length;
    const lowStockItems = MOCK_INVENTORY.filter(i => i.stock <= i.threshold).length;

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-stone-800">Dashboard Tổng quan</h2>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card 
                    title="Doanh thu hôm nay" 
                    value={formatCurrency(todayRevenue)} 
                    icon={<CurrencyDollarIcon />}
                    colorClass="bg-green-500"
                />
                <Card 
                    title="Đơn hàng đang chờ" 
                    value={pendingOrders.toString()}
                    icon={<ClipboardListIcon />}
                    colorClass="bg-yellow-500"
                />
                <Card 
                    title="NVL sắp hết"
                    value={lowStockItems.toString()} 
                    icon={<ExclamationIcon />}
                    colorClass="bg-red-500"
                />
            </div>

            {/* Recent Orders and Low Stock */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Đơn hàng gần đây</h3>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                        {MOCK_ORDERS.slice(0, 5).map(order => (
                             <div key={order.id} className="flex justify-between items-center p-3 rounded-lg bg-stone-50">
                                <div>
                                    <p className="font-semibold">{order.id} - {order.type === 'Tại quán' ? `Bàn ${order.table}` : 'Mang đi'}</p>
                                    <p className="text-sm text-stone-500">{order.items.length} món</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold">{formatCurrency(order.total)}</p>
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                        order.status === OrderStatus.COMPLETED ? 'bg-green-100 text-green-800' :
                                        order.status === OrderStatus.PENDING ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-blue-100 text-blue-800'
                                    }`}>{order.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Nguyên vật liệu sắp hết</h3>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                        {MOCK_INVENTORY.filter(i => i.stock <= i.threshold).map(item => (
                            <div key={item.id} className="flex justify-between items-center p-3 rounded-lg bg-red-50">
                               <div>
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-sm text-stone-500">Ngưỡng: {item.threshold} {item.unit}</p>
                               </div>
                               <p className="font-bold text-red-600">Còn lại: {item.stock} {item.unit}</p>
                            </div>
                        ))}
                         {lowStockItems === 0 && <p className="text-stone-500">Không có nguyên vật liệu nào sắp hết.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
