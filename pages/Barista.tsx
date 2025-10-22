
import React, { useState } from 'react';
import { MOCK_ORDERS } from '../constants';
import { Order, OrderStatus, OrderItem } from '../types';
import Button from '../components/ui/Button';

interface DrinkQueueItem extends OrderItem {
    orderId: string;
    orderType: string;
    orderTimestamp: string;
}

const Barista: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);

    const drinkQueue: DrinkQueueItem[] = orders
        .filter(o => o.status === OrderStatus.PREPARING)
        .flatMap(o => o.items.map(item => ({
            ...item,
            orderId: o.id,
            orderType: o.type === 'Tại quán' ? `Bàn ${o.table}` : 'Mang đi',
            orderTimestamp: o.timestamp
        })))
        .sort((a,b) => new Date(a.orderTimestamp).getTime() - new Date(b.orderTimestamp).getTime());

    const handleCompleteItem = (orderId: string, itemId: number) => {
        // This is a simplified logic. In a real app, you'd handle partial completion.
        // Here, completing the last item of an order marks the whole order as READY.
        const order = orders.find(o => o.id === orderId);
        if (order && order.items.length === 1) {
            setOrders(orders.map(o => o.id === orderId ? { ...o, status: OrderStatus.READY } : o));
        } else {
             alert(`Đã hoàn thành món #${itemId} cho order ${orderId}. Trong demo này, chỉ order 1 món mới chuyển trạng thái.`);
        }
    };
    
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-stone-800">Màn hình Pha chế</h2>

            {drinkQueue.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-lg shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="mt-4 text-xl font-semibold text-stone-700">Không có món nào đang chờ!</p>
                    <p className="text-stone-500">Tất cả các món đã được chuẩn bị xong.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {drinkQueue.map((item, index) => (
                        <div key={`${item.orderId}-${item.id}-${index}`} className="bg-white rounded-lg shadow-lg border-l-8 border-warm-brown-500 flex flex-col justify-between">
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-2">
                                     <span className="font-bold text-stone-600 bg-warm-brown-100 px-3 py-1 rounded-full text-sm">{item.orderType}</span>
                                     <span className="text-sm text-stone-500">{new Date(item.orderTimestamp).toLocaleTimeString('vi-VN')}</span>
                                </div>
                                <p className="text-2xl font-bold text-ocean-blue-900">{item.name}</p>
                                <p className="text-lg text-stone-700">Số lượng: <span className="font-bold">{item.quantity}</span></p>
                            </div>
                            <div className="p-3 bg-stone-50">
                                <Button onClick={() => handleCompleteItem(item.orderId, item.id)} className="w-full">
                                    Hoàn thành
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Barista;
