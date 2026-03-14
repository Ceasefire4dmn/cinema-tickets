import React, { useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useDatabase } from '../../contexts/DatabaseContext';
import { CreditCard, Apple, Calendar, MapPin, Armchair, Ticket, CheckCircle2 } from 'lucide-react';

export default function Checkout() {
    const { showtimeId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { movies, showtimes, addBooking } = useDatabase();

    const [isPaid, setIsPaid] = useState(false);
    const selectedSeats = location.state?.selectedSeats || [];

    const session = showtimes.find(s => s.id === parseInt(showtimeId));
    const movie = movies.find(m => m.id === session?.movie_id);
    const totalPrice = selectedSeats.length * (session?.base_price || 0);

    const handlePayment = () => {
        selectedSeats.forEach(seat => {
            addBooking(session.id, seat.id);
        });
        setIsPaid(true);
    };

    if (isPaid) {
        return (
            <div className="min-h-screen bg-[#0F0F0F] text-white flex items-center justify-center p-6">
                <div className="max-w-md w-full bg-[#1A1A1A] rounded-3xl p-10 border border-green-500/30 text-center shadow-2xl">
                    <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
                    <h2 className="text-3xl font-black mb-2">Оплата прошла!</h2>
                    <p className="text-gray-400 mb-8">Ваш билет готов. Приятного просмотра!</p>

                    <div className="bg-white text-black p-6 rounded-xl mb-8 text-left relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10"><Ticket size={80} /></div>
                        <p className="text-[10px] uppercase font-bold text-gray-400 mb-4">Cinema Ticket</p>
                        <h3 className="text-xl font-black uppercase mb-4">{movie?.title}</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-gray-400 text-[10px] uppercase">Hall</p>
                                <p className="font-bold">{session?.hall_id}</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-[10px] uppercase">Seats</p>
                                <p className="font-bold">{selectedSeats.map(s => `${String.fromCharCode(64 + s.row)}${s.number}`).join(', ')}</p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate('/')}
                        className="w-full bg-white text-black py-4 rounded-xl font-bold hover:bg-gray-200 transition-all"
                    >
                        Вернуться на главную
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0F0F0F] text-white p-6 md:p-12">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-black mb-2">Оплата</h1>
                <p className="text-gray-500 mb-12 border-l-2 border-red-600 pl-4">
                    Успейте занять лучшие места
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-7 space-y-8">
                        <section>
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                <span className="w-1 h-5 bg-red-600 rounded-full"></span> Данные для оплаты
                            </h3>
                            <div className="bg-[#151515] border border-white/5 rounded-3xl p-8 space-y-6">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Email</label>
                                    <input type="email" placeholder="your@email.com" className="w-full bg-[#1A1A1A] border border-white/5 p-4 rounded-xl focus:outline-none focus:border-red-600/50 transition-all" />
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase mb-4 block">Метод Оплаты</label>
                                    <div className="grid grid-cols-3 gap-4">
                                        <button className="border-2 border-red-600 bg-red-600/5 p-4 rounded-xl flex flex-col items-center gap-2">
                                            <CreditCard className="text-red-600" />
                                            <span className="text-[10px] font-bold">Карта</span>
                                        </button>
                                        <button className="border border-white/5 bg-white/5 p-4 rounded-xl flex flex-col items-center gap-2 opacity-40">
                                            <Apple />
                                            <span className="text-[10px] font-bold">Apple Pay</span>
                                        </button>
                                        <button className="border border-white/5 bg-white/5 p-4 rounded-xl flex flex-col items-center gap-2 opacity-40">
                                            <div className="font-bold text-sm italic">Google</div>
                                            <span className="text-[10px] font-bold">G-Pay</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl flex items-center gap-3 text-amber-500 text-xs font-bold">
                                    Демонстрационный режим: без проведения платежей
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Номер карты</label>
                                        <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-[#1A1A1A] border border-white/5 p-4 rounded-xl" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <input type="text" placeholder="MM / YY" className="bg-[#1A1A1A] border border-white/5 p-4 rounded-xl" />
                                        <input type="text" placeholder="CVV" className="bg-[#1A1A1A] border border-white/5 p-4 rounded-xl" />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="lg:col-span-5">
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <span className="w-1 h-5 bg-red-600 rounded-full"></span> Данные заказа
                        </h3>
                        <div className="bg-[#151515] border border-white/5 rounded-3xl p-8 sticky top-12">
                            <div className="flex gap-6 mb-8 pb-8 border-b border-white/5">
                                <img src={movie?.poster_url} crossOrigin="ananimous" className="w-24 h-32 object-cover rounded-xl shadow-xl" />
                                <div>
                                    <span className="text-[10px] bg-red-600 px-2 py-0.5 rounded font-black uppercase mb-2 inline-block">Sci-Fi Epic</span>
                                    <h4 className="text-2xl font-black mb-1">{movie?.title}</h4>
                                    <p className="text-gray-500 text-sm">{movie?.duration} mins</p>
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-3 text-gray-400"><Calendar size={16} /> Дата и время</div>
                                    <div className="font-bold text-right">Сегодня | {session?.start_time.split('T')[1].substring(0, 5)}</div>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-3 text-gray-400"><MapPin size={16} /> Зал</div>
                                    <div className="font-bold">Зал {session?.hall_id}</div>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-3 text-gray-400"><Armchair size={16} /> Места</div>
                                    <div className="font-bold text-red-500">
                                        {selectedSeats.map(s => `${String.fromCharCode(64 + s.row)}${s.number}`).join(', ')}
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between items-end pt-6 border-t border-white/5">
                                <span className="text-gray-500 font-bold uppercase text-xs">ИТОГО</span>
                                <span className="text-4xl font-black text-red-600">{totalPrice.toFixed(2)}₽</span>
                            </div>

                            <button
                                onClick={handlePayment}
                                className="w-full bg-red-600 hover:bg-red-700 py-5 rounded-2xl font-black text-lg mt-8 flex items-center justify-center gap-3 transition-all shadow-2xl shadow-red-600/20"
                            >
                                <Ticket /> Купить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}