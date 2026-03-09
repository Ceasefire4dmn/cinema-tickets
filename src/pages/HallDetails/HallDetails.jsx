import { Link } from 'react-router-dom';
import { useDatabase } from '../../contexts/DatabaseContext';
import { Monitor, Volume2, Users, ChevronRight } from 'lucide-react';

export default function HallsList() {
    const { halls, loading } = useDatabase();

    if (loading) return <div className="text-white p-20 text-center">Загрузка списка залов...</div>;

    return (
        <div className="min-h-screen bg-[#0F0F0F] text-white p-12">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-5xl font-black mb-12 text-center bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                    НАШИ ЗАЛЫ
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {halls.map((hall) => (
                        <div
                            key={hall.id}
                            className="bg-[#1A1A1A] border border-gray-800 rounded-3xl p-8 shadow-2xl hover:border-red-600/50 transition-all group"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <h2 className="text-3xl font-bold group-hover:text-red-600 transition-colors">
                                    {hall.name}
                                </h2>
                                <span className="bg-red-600/10 text-red-500 px-4 py-1 rounded-full text-sm font-bold border border-red-600/20">
                                    {hall.type}
                                </span>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mb-8">
                                <div className="flex flex-col items-center p-3 bg-white/5 rounded-xl border border-white/5">
                                    <Monitor className="w-5 h-5 mb-2 text-red-500" />
                                    <span className="text-[10px] uppercase text-gray-500 tracking-widest">Экран</span>
                                    <span className="text-sm font-bold">{hall.type}</span>
                                </div>
                                <div className="flex flex-col items-center p-3 bg-white/5 rounded-xl border border-white/5">
                                    <Volume2 className="w-5 h-5 mb-2 text-red-500" />
                                    <span className="text-[10px] uppercase text-gray-500 tracking-widest">Звук</span>
                                    <span className="text-sm font-bold">Atmos</span>
                                </div>
                                <div className="flex flex-col items-center p-3 bg-white/5 rounded-xl border border-white/5">
                                    <Users className="w-5 h-5 mb-2 text-red-500" />
                                    <span className="text-[10px] uppercase text-gray-500 tracking-widest">Места</span>
                                    <span className="text-sm font-bold">{hall.capacity}</span>
                                </div>
                            </div>

                            <Link
                                to={`/hall-info/${hall.id}`}
                                className="w-full bg-white/5 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-600 hover:text-white transition-all border border-white/10"
                            >
                                Посмотреть детали <ChevronRight className="w-5 h-5" />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}