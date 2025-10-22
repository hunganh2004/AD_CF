
import React, { useState } from 'react';
import { MOCK_STAFF } from '../constants';
import { StaffMember, Role } from '../types';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';

const Staff: React.FC = () => {
    const [staff, setStaff] = useState<StaffMember[]>(MOCK_STAFF);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);

    const openModal = (staffMember: StaffMember | null = null) => {
        setEditingStaff(staffMember);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingStaff(null);
    };

    const handleSave = (formData: Omit<StaffMember, 'id' | 'joinDate'>) => {
        if (editingStaff) {
            setStaff(staff.map(s => s.id === editingStaff.id ? { ...s, ...formData } : s));
        } else {
            const newStaff: StaffMember = {
                id: Math.max(...staff.map(s => s.id)) + 1,
                ...formData,
                joinDate: new Date().toISOString().split('T')[0]
            };
            setStaff([...staff, newStaff]);
        }
        closeModal();
    };

    const handleDelete = (id: number) => {
        if(window.confirm('Bạn có chắc chắn muốn xóa nhân viên này?')) {
            setStaff(staff.filter(s => s.id !== id));
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-3xl font-bold text-stone-800">Quản lý Nhân sự</h2>
                <Button onClick={() => openModal()}>+ Thêm nhân viên</Button>
            </div>
            
            <div className="bg-white rounded-lg shadow-md">
                {/* Desktop Table View */}
                <div className="hidden lg:block overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                        <thead className="bg-stone-50">
                            <tr>
                                <th className="p-4 text-left font-semibold text-stone-600">ID</th>
                                <th className="p-4 text-left font-semibold text-stone-600">Tên nhân viên</th>
                                <th className="p-4 text-left font-semibold text-stone-600">Vai trò</th>
                                <th className="p-4 text-left font-semibold text-stone-600">Số điện thoại</th>
                                <th className="p-4 text-left font-semibold text-stone-600">Ngày vào làm</th>
                                <th className="p-4 text-left font-semibold text-stone-600">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {staff.map(member => (
                                <tr key={member.id} className="border-b last:border-b-0 hover:bg-stone-50 transition-colors">
                                    <td className="p-4">{member.id}</td>
                                    <td className="p-4 font-medium">{member.name}</td>
                                    <td className="p-4">{member.role}</td>
                                    <td className="p-4">{member.phone}</td>
                                    <td className="p-4">{new Date(member.joinDate).toLocaleDateString('vi-VN')}</td>
                                    <td className="p-4 space-x-2">
                                        <Button onClick={() => openModal(member)} variant="secondary" className="px-3 py-1 text-sm">Sửa</Button>
                                        <Button onClick={() => handleDelete(member.id)} variant="danger" className="px-3 py-1 text-sm">Xóa</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card View */}
                <div className="block lg:hidden">
                    <div className="space-y-4 p-4">
                        {staff.map(member => (
                             <div key={member.id} className="bg-stone-50 p-4 rounded-lg border border-stone-200 space-y-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-bold text-ocean-blue-800">{member.name}</p>
                                        <p className="text-sm text-stone-600">{member.role}</p>
                                    </div>
                                    <p className="text-sm text-stone-500">ID: {member.id}</p>
                                </div>
                                <div className="text-sm space-y-1">
                                    <p><span className="font-medium text-stone-500">Điện thoại:</span> {member.phone}</p>
                                    <p><span className="font-medium text-stone-500">Vào làm:</span> {new Date(member.joinDate).toLocaleDateString('vi-VN')}</p>
                                </div>
                                <div className="flex justify-end gap-2 pt-3 border-t border-stone-200">
                                    <Button onClick={() => openModal(member)} variant="secondary" className="px-3 py-1 text-sm">Sửa</Button>
                                    <Button onClick={() => handleDelete(member.id)} variant="danger" className="px-3 py-1 text-sm">Xóa</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <StaffFormModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave} staff={editingStaff} />
        </div>
    );
};

interface StaffFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: Omit<StaffMember, 'id' | 'joinDate'>) => void;
    staff: StaffMember | null;
}

const StaffFormModal: React.FC<StaffFormModalProps> = ({ isOpen, onClose, onSave, staff }) => {
    const [name, setName] = useState(staff?.name || '');
    const [role, setRole] = useState(staff?.role || Role.WAITER);
    const [phone, setPhone] = useState(staff?.phone || '');

    React.useEffect(() => {
        setName(staff?.name || '');
        setRole(staff?.role || Role.WAITER);
        setPhone(staff?.phone || '');
    }, [staff]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ name, role, phone });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={staff ? 'Chỉnh sửa nhân viên' : 'Thêm nhân viên mới'}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Tên nhân viên</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full border rounded-md p-2" required />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Vai trò</label>
                    <select value={role} onChange={e => setRole(e.target.value as Role)} className="w-full border rounded-md p-2" required>
                        {Object.values(Role).map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block mb-1 font-medium">Số điện thoại</label>
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full border rounded-md p-2" required />
                </div>
                <div className="flex justify-end gap-4 pt-4">
                    <Button type="button" onClick={onClose} variant="secondary" className="bg-stone-200 text-stone-800 hover:bg-stone-300">Hủy</Button>
                    <Button type="submit">Lưu</Button>
                </div>
            </form>
        </Modal>
    );
}


export default Staff;
