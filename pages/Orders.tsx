
import React, { useState } from 'react';
import { MOCK_ORDERS } from '../constants';
import { Order, OrderStatus } from '../types';
import Button from '../components/ui/Button';

const getStatusColor = (status: OrderStatus) => {
    switch (status) {
        case OrderStatus.PENDING: return 'bg-yellow-100 text-yellow-800';
        case OrderStatus.PREPARING: return 'bg-blue-100 text-blue-800';
        case OrderStatus.READY: return 'bg-purple-100 text-purple-800';
        case OrderStatus.COMPLETED: return 'bg-green-100 text-green-800';
        case OrderStatus.CANCELLED: return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

const OrderCard: React.FC<{ order: Order, onUpdateStatus: (id: string, status: OrderStatus) => void }> = ({ order, onUpdateStatus }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className={`p-4 border-b-4 ${order.status === OrderStatus.PENDING ? 'border-yellow-400' : 'border-ocean-blue-500'}`}>
            <div className="flex justify-between items-center">
                <h4 className="font-bold text-lg">{order.id} - {order.type === 'Tại quán' ? `Bàn ${order.table}` : 'Mang đi'}</h4>
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                </span>
            </div>
            <p className="text-sm text-stone-500">
                {new Date(order.timestamp).toLocaleTimeString('vi-VN')}
            </p>
        </div>
        <div className="p-4">
            <ul className="space-y-2 mb-4">
                {order.items.map(item => (
                    <li key={item.id} className="flex justify-between text-stone-700">
                        <span>{item.name} <span className="text-stone-500">x{item.quantity}</span></span>
                        <span>{new Intl.NumberFormat('vi-VN').format(item.price * item.quantity)}</span>
                    </li>
                ))}
            </ul>
            <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>Tổng cộng</span>
                <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total)}</span>
            </div>
        </div>
        <div className="p-4 bg-stone-50 flex flex-wrap gap-2">
            {order.status === OrderStatus.PENDING && (
                <Button onClick={() => onUpdateStatus(order.id, OrderStatus.PREPARING)} className="flex-1 min-w-[120px]">Gửi pha chế</Button>
            )}
             {order.status === OrderStatus.READY && (
                <Button onClick={() => onUpdateStatus(order.id, OrderStatus.COMPLETED)} variant="secondary" className="flex-1 min-w-[120px]">Thanh toán</Button>
            )}
             <Button onClick={() => alert(`Đã in hóa đơn cho ${order.id}`)} variant="secondary" className="flex-1 bg-stone-200 text-stone-800 hover:bg-stone-300 min-w-[120px]">In hóa đơn</Button>
        </div>
    </div>
);


const Orders: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);

    const handleUpdateStatus = (id: string, status: OrderStatus) => {
        setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
    };

    const activeOrders = orders.filter(o => o.status !== OrderStatus.COMPLETED && o.status !== OrderStatus.CANCELLED);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-3xl font-bold text-stone-800">Quản lý Order</h2>
                <Button>+ Tạo Order mới</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {activeOrders.sort((a,b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()).map(order => (
                    <OrderCard key={order.id} order={order} onUpdateStatus={handleUpdateStatus} />
                ))}
            </div>
        </div>
    );
};

export default Orders;
