import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDatabase } from '../../contexts/DatabaseContext';
import { Info, Maximize, ShieldCheck, Star, Heart } from 'lucide-react';

const HallView = () => {
    const { hallId } = useParams();
    const { halls, seats, loading } = useDatabase();
    const navigate = useNavigate();

    const { hall, organizedRows } = useMemo(() => {
        const currentHall = halls.find(h => h.id === parseInt(hallId));
        const hallSeats = seats.filter(s => s.hall_id === parseInt(hallId));

        const grouped = hallSeats.reduce((acc, seat) => {
            if (!acc[seat.row]) acc[seat.row] = [];
            acc[seat.row].push(seat);
            return acc;
        }, {});

        Object.keys(grouped).forEach(row => {
            grouped[row].sort((a, b) => a.number - b.number);
        });

        return { hall: currentHall, organizedRows: grouped };
    }, [hallId, halls, seats]);

    if (loading) return <div className="text-white p-20 text-center">Загрузка данных зала...</div>;
    if (!hall) return <div className="text-white p-20">Зал не найден</div>;

    return (
        <div className="min-h-screen bg-[#0F0F0F] text-white p-12">
            <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white mb-8 transition-colors">
                ← Назад к списку
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                <div className="space-y-6">
                    <div className="aspect-video bg-[#1A1A1A] rounded-3xl overflow-hidden border border-gray-800 flex items-center justify-center relative shadow-2xl">
                        <img
                            src={`https://lh3.googleusercontent.com/aida-public/AB6AXuCsIEqvoUOGTDGqYyzcBnt3CZUUpgdPuDRk8FYdf-sfqopbRprzt24nfbAIvcEMX9RGTAeZFJ5a7o-mYs7rqKfiezmmDZETH7MDQpAMw4oVRC1CGaiEw94mVzYO_h6T1clMpe-fPpz7gSLoRGM9UW3ykW7Lzf7fBE_jACbr4B-95mUs0iqGOYTnP_4usFOH9MP2_t8o0aRNOTnXM2mLTo1JaPOxqtfFEz5refvV8wf6KpJgrtMR_EzxnQiNCUx73CEFH14eGP4_Qym3`}
                            crossOrigin="anonymous"
                            alt={hall.name}
                            className="w-full h-full object-cover opacity-40"
                        />
                        <div className="absolute bottom-6 left-6">
                            <h1 className="text-5xl font-black uppercase italic tracking-tighter">{hall.name}</h1>
                            <span className="bg-red-600 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest">
                                {hall.type} Experience
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-gray-800">
                            <Maximize className="text-red-600 mb-2" />
                            <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Экран</p>
                            <p className="font-bold text-lg">{hall.type} Silver Screen</p>
                        </div>
                        <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-gray-800">
                            <ShieldCheck className="text-red-600 mb-2" />
                            <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Комфорт</p>
                            <p className="font-bold text-lg">Анатомические кресла</p>
                        </div>
                    </div>
                </div>

                <div className="bg-[#1A1A1A] p-10 rounded-3xl border border-gray-800 h-fit shadow-xl">
                    <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                        <Info className="text-red-600" /> Технические характеристики
                    </h3>
                    <ul className="space-y-6">
                        <li className="flex justify-between border-b border-white/5 pb-3">
                            <span className="text-gray-400 font-medium">Общая вместимость</span>
                            <span className="font-bold text-red-500">{hall.capacity} мест</span>
                        </li>
                        <li className="flex justify-between border-b border-white/5 pb-3">
                            <span className="text-gray-400 font-medium">Конфигурация</span>
                            <span className="font-bold">{Object.keys(organizedRows).length} рядов</span>
                        </li>
                        <li className="flex justify-between border-b border-white/5 pb-3">
                            <span className="text-gray-400 font-medium">Акустика</span>
                            <span className="font-bold text-gray-200">Acoustic Perspective 7.1</span>
                        </li>
                        <li className="flex justify-between border-b border-white/5 pb-3">
                            <span className="text-gray-400 font-medium">Проектор</span>
                            <span className="font-bold text-gray-200">Laser 4K HDR</span>
                        </li>
                    </ul>
                    <p className="mt-10 text-gray-500 leading-relaxed italic text-sm border-l-2 border-red-600 pl-4">
                        Зал "{hall.name}" спроектирован так, чтобы обеспечить идеальную видимость с любого места.
                        Специальное покрытие стен поглощает лишние звуковые вибрации, создавая эффект полного погружения.
                    </p>
                </div>
            </div>

            <div className="bg-[#151515] rounded-[40px] p-12 border border-white/5 shadow-inner">
                <div className="text-center mb-16">
                    <div className="w-full max-w-2xl mx-auto h-[4px] bg-gradient-to-r from-transparent via-red-600 to-transparent rounded-full shadow-[0_0_20px_rgba(220,38,38,0.4)]"></div>
                    <p className="mt-4 text-[10px] tracking-[2em] text-gray-600 uppercase font-black">Экран</p>
                </div>

                <div className="flex flex-col items-center gap-4 overflow-x-auto pb-6">
                    {Object.keys(organizedRows).sort((a, b) => a - b).map(rowNum => (
                        <div key={rowNum} className="flex items-center gap-6">
                            <span className="w-6 text-gray-800 text-[10px] font-black uppercase">
                                {String.fromCharCode(64 + parseInt(rowNum))}
                            </span>

                            <div className="flex gap-2">
                                {organizedRows[rowNum].map(seat => (
                                    <div
                                        key={seat.id}
                                        className={`
                                            w-7 h-7 rounded-lg border flex items-center justify-center
                                            ${seat.category === 'VIP' ? 'border-amber-500/40 bg-amber-500/5' : 'border-white/10 bg-white/5'}
                                            ${seat.category === 'Love Seat' ? 'w-14' : ''}
                                        `}
                                    >
                                        {seat.category === 'VIP' && <Star className="w-2 h-2 text-amber-500/40" />}
                                        {seat.category === 'Love Seat' && <Heart className="w-3 h-3 text-pink-500/70" />}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center gap-10 mt-12 text-[9px] uppercase tracking-widest text-gray-500 font-bold">
                    <div className="flex items-center gap-3"><div className="w-3 h-3 bg-white/10 border border-white/10 rounded-sm" /> Стандарт</div>
                    <div className="flex items-center gap-3"><div className="w-3 h-3 border border-amber-500/40 bg-amber-500/5 rounded-sm" /> VIP-зона</div>
                    <div className="flex items-center"><div /> <Heart className="w-3 h-3 bg-white/10 border border-white/10 rounded-sm mr-3 text-pink-500/70" /> Love Seat</div>
                </div>
            </div>
        </div>
    );
};

export default HallView;