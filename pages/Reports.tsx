
import React from 'react';
import { MOCK_REVENUE } from '../constants';
import { DailyRevenue } from '../types';

// NOTE: Recharts is an external library. For this self-contained demo,
// we'll create a simple SVG-based bar chart instead.
const SimpleBarChart: React.FC<{ data: DailyRevenue[] }> = ({ data }) => {
    const maxValue = Math.max(...data.map(d => d.revenue));
    const chartHeight = 300;
    const barWidth = 40;
    const gap = 20;
    const formatCurrencyShort = (val: number) => `${(val / 1000000).toFixed(1)}Tr`;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Doanh thu 7 ngày gần nhất</h3>
            <div className="flex justify-center items-end overflow-x-auto pb-2" style={{ height: chartHeight + 40 }}>
                <div className="flex">
                    {data.slice(-7).map((item, index) => (
                        <div key={item.date} className="flex flex-col items-center flex-shrink-0" style={{ marginLeft: index > 0 ? gap : 0, width: barWidth }}>
                            <div className="text-sm font-bold text-ocean-blue-800">{formatCurrencyShort(item.revenue)}</div>
                            <div
                                className="bg-ocean-blue-500 hover:bg-ocean-blue-600 transition-all"
                                style={{
                                    width: barWidth,
                                    height: (item.revenue / maxValue) * chartHeight,
                                    borderTopLeftRadius: '4px',
                                    borderTopRightRadius: '4px',
                                }}
                                title={`Doanh thu: ${item.revenue.toLocaleString('vi-VN')} VND`}
                            ></div>
                            <div className="text-xs text-stone-500 mt-2 text-center">{new Date(item.date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


const Reports: React.FC = () => {
    const formatCurrency = (amount: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-stone-800">Báo cáo Doanh thu & Chi phí</h2>
            
            <SimpleBarChart data={MOCK_REVENUE} />

            <div className="bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-semibold p-4 lg:p-6 border-b lg:border-none">Báo cáo chi tiết</h3>

                {/* Desktop Table View */}
                <div className="hidden lg:block overflow-x-auto">
                    <table className="w-full min-w-[700px]">
                        <thead className="bg-stone-50">
                            <tr>
                                <th className="p-4 text-left font-semibold text-stone-600">Ngày</th>
                                <th className="p-4 text-right font-semibold text-stone-600">Doanh thu</th>
                                <th className="p-4 text-right font-semibold text-stone-600">Chi phí</th>
                                <th className="p-4 text-right font-semibold text-stone-600">Lợi nhuận</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MOCK_REVENUE.slice().reverse().map(report => (
                                <tr key={report.date} className="border-b last:border-b-0 hover:bg-stone-50 transition-colors">
                                    <td className="p-4 font-medium">{new Date(report.date).toLocaleDateString('vi-VN')}</td>
                                    <td className="p-4 text-right text-green-600 font-semibold">{formatCurrency(report.revenue)}</td>
                                    <td className="p-4 text-right text-red-600 font-semibold">{formatCurrency(report.costs)}</td>
                                    <td className="p-4 text-right text-ocean-blue-800 font-bold">{formatCurrency(report.profit)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {/* Mobile Card View */}
                <div className="block lg:hidden">
                    <div className="p-4 space-y-4">
                        {MOCK_REVENUE.slice().reverse().map(report => (
                            <div key={report.date} className="bg-stone-50 p-4 rounded-lg border border-stone-200 space-y-2">
                                <p className="font-bold text-ocean-blue-800">{new Date(report.date).toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                                    <span className="text-stone-500">Doanh thu:</span>
                                    <span className="text-right font-semibold text-green-600">{formatCurrency(report.revenue)}</span>
                                    <span className="text-stone-500">Chi phí:</span>
                                    <span className="text-right font-semibold text-red-600">{formatCurrency(report.costs)}</span>
                                </div>
                                <div className="flex justify-between items-center pt-2 border-t mt-2 font-bold">
                                    <span>Lợi nhuận:</span>
                                    <span className="text-ocean-blue-800 text-lg">{formatCurrency(report.profit)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
