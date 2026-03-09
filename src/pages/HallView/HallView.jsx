import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDatabase } from '../../contexts/DatabaseContext';
import { Info, Maximize, ShieldCheck } from 'lucide-react';

const HallView = () => {
    const { hallId } = useParams();
    const { halls, seats } = useDatabase();
    const navigate = useNavigate();

    const hall = halls.find(h => h.id === parseInt(hallId));
    const hallSeats = seats.filter(s => s.hall_id === parseInt(hallId));

    if (!hall) return <div className="text-white p-20">Зал не найден</div>;

    return (
        <div className="min-h-screen bg-[#0F0F0F] text-white p-12">
            <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white mb-8">
                ← Назад
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12"> 
                <div className="space-y-6">
                    <div className="aspect-video bg-[#1A1A1A] rounded-3xl overflow-hidden border border-gray-800 flex items-center justify-center relative">
                        <img
                            src={`https://lh3.googleusercontent.com/aida-public/AB6AXuCsIEqvoUOGTDGqYyzcBnt3CZUUpgdPuDRk8FYdf-sfqopbRprzt24nfbAIvcEMX9RGTAeZFJ5a7o-mYs7rqKfiezmmDZETH7MDQpAMw4oVRC1CGaiEw94mVzYO_h6T1clMpe-fPpz7gSLoRGM9UW3ykW7Lzf7fBE_jACbr4B-95mUs0iqGOYTnP_4usFOH9MP2_t8o0aRNOTnXM2mLTo1JaPOxqtfFEz5refvV8wf6KpJgrtMR_EzxnQiNCUx73CEFH14eGP4_Qym3`}
                            crossOrigin="anonymous"
                            alt={hall.name}
                            className="w-full h-full object-cover opacity-60"
                        />
                        <div className="absolute bottom-6 left-6">
                            <h1 className="text-4xl font-black uppercase italic">{hall.name}</h1>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-gray-800">
                            <Maximize className="text-red-600 mb-2" />
                            <p className="text-gray-500 text-sm">Экран</p>
                            <p className="font-bold">{hall.type} Silver Screen</p>
                        </div>
                        <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-gray-800">
                            <ShieldCheck className="text-red-600 mb-2" />
                            <p className="text-gray-500 text-sm">Комфорт</p>
                            <p className="font-bold">Анатомические кресла</p>
                        </div>
                    </div>
                </div>
 
                <div className="bg-[#1A1A1A] p-10 rounded-3xl border border-gray-800 h-fit">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Info className="text-red-600" /> Технические данные
                    </h3>
                    <ul className="space-y-4">
                        <li className="flex justify-between border-b border-gray-800 pb-2">
                            <span className="text-gray-500">Общая вместимость</span>
                            <span>{hall.capacity} человек</span>
                        </li>
                        <li className="flex justify-between border-b border-gray-800 pb-2">
                            <span className="text-gray-500">Количество рядов</span>
                            <span>{Math.max(...hallSeats.map(s => s.row), 0)}</span>
                        </li>
                        <li className="flex justify-between border-b border-gray-800 pb-2">
                            <span className="text-gray-500">Звуковая система</span>
                            <span>Acoustic Perspective 7.1</span>
                        </li>
                    </ul>
                    <p className="mt-8 text-gray-400 leading-relaxed">
                        Зал "{hall.name}" спроектирован так, чтобы обеспечить идеальную видимость с любого места.
                        Специальное покрытие стен поглощает лишние звуковые вибрации.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HallView;