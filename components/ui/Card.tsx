
import React from 'react';

interface CardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    colorClass?: string;
}

const Card: React.FC<CardProps> = ({ title, value, icon, colorClass = 'bg-ocean-blue-500' }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
            <div className={`p-3 rounded-full text-white ${colorClass}`}>
                {icon}
            </div>
            <div>
                <p className="text-sm text-stone-500">{title}</p>
                <p className="text-2xl font-bold text-stone-800">{value}</p>
            </div>
        </div>
    );
};

export default Card;
