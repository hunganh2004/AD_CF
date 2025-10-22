
import React, { useState } from 'react';
import { MOCK_INVENTORY } from '../constants';
import { InventoryItem } from '../types';
import Button from '../components/ui/Button';

const Inventory: React.FC = () => {
    const [inventory, setInventory] = useState<InventoryItem[]>(MOCK_INVENTORY);
    
    const handleStockChange = (id: number, amount: number) => {
        setInventory(inventory.map(item => 
            item.id === id ? { ...item, stock: Math.max(0, item.stock + amount) } : item
        ));
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-3xl font-bold text-stone-800">Quản lý Kho</h2>
                <Button>+ Thêm nguyên vật liệu</Button>
            </div>
            
             <div className="bg-white rounded-lg shadow-md">
                {/* Desktop Table View */}
                <div className="hidden lg:block overflow-x-auto">
                    <table className="w-full min-w-[700px]">
                        <thead className="bg-stone-50">
                            <tr>
                                <th className="p-4 text-left font-semibold text-stone-600">ID</th>
                                <th className="p-4 text-left font-semibold text-stone-600">Tên NVL</th>
                                <th className="p-4 text-left font-semibold text-stone-600">Tồn kho</th>
                                <th className="p-4 text-left font-semibold text-stone-600">Đơn vị</th>
                                <th className="p-4 text-left font-semibold text-stone-600">Trạng thái</th>
                                <th className="p-4 text-left font-semibold text-stone-600">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inventory.map(item => (
                                <tr key={item.id} className="border-b last:border-b-0 hover:bg-stone-50 transition-colors">
                                    <td className="p-4">{item.id}</td>
                                    <td className="p-4 font-medium">{item.name}</td>
                                    <td className="p-4 font-bold">{item.stock.toFixed(1)}</td>
                                    <td className="p-4">{item.unit}</td>
                                    <td className="p-4">
                                        {item.stock > item.threshold ? (
                                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Đủ dùng</span>
                                        ) : (
                                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Sắp hết</span>
                                        )}
                                    </td>
                                    <td className="p-4 flex items-center gap-2">
                                        <Button onClick={() => handleStockChange(item.id, 5)} className="px-3 py-1 text-sm bg-green-500 hover:bg-green-600">Nhập</Button>
                                        <Button onClick={() => handleStockChange(item.id, -1)} className="px-3 py-1 text-sm bg-yellow-500 hover:bg-yellow-600">Xuất</Button>
                                        <Button variant="danger" className="px-3 py-1 text-sm">Xóa</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card View */}
                <div className="block lg:hidden">
                    <div className="p-4 space-y-4">
                        {inventory.map(item => (
                            <div key={item.id} className="bg-stone-50 p-4 rounded-lg border border-stone-200 space-y-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-bold text-ocean-blue-800">{item.name}</p>
                                        <p className="text-sm text-stone-600">Tồn kho: <span className="font-bold">{item.stock.toFixed(1)}</span> {item.unit}</p>
                                    </div>
                                    {item.stock > item.threshold ? (
                                        <span className="flex-shrink-0 ml-4 px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Đủ dùng</span>
                                    ) : (
                                        <span className="flex-shrink-0 ml-4 px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Sắp hết</span>
                                    )}
                                </div>
                                <div className="flex justify-end gap-2 pt-3 border-t border-stone-200">
                                    <Button onClick={() => handleStockChange(item.id, 5)} className="px-3 py-1 text-sm bg-green-500 hover:bg-green-600">Nhập</Button>
                                    <Button onClick={() => handleStockChange(item.id, -1)} className="px-3 py-1 text-sm bg-yellow-500 hover:bg-yellow-600">Xuất</Button>
                                    <Button variant="danger" className="px-3 py-1 text-sm">Xóa</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Inventory;
