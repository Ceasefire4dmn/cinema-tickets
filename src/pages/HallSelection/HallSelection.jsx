import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDatabase } from '../../contexts/DatabaseContext';
import { X, User, Heart, Star } from 'lucide-react';

export default function HallSelection() {
    const { showtimeId } = useParams();
    const navigate = useNavigate();
    const { movies, showtimes, seats, bookings, loading } = useDatabase();
    const [selectedSeats, setSelectedSeats] = useState([]);

    const { session, movie, rows, occupiedIds } = useMemo(() => {
        const currentSession = showtimes.find(s => s.id === parseInt(showtimeId));
        const currentMovie = movies.find(m => m.id === currentSession?.movie_id);

        const hallSeats = seats.filter(s => s.hall_id === currentSession?.hall_id);

        const currentOccupied = bookings
            .filter(b => b.showtime_id === parseInt(showtimeId))
            .map(b => b.seat_id);

        const grouped = hallSeats.reduce((acc, seat) => {
            if (!acc[seat.row]) acc[seat.row] = [];
            acc[seat.row].push(seat);
            return acc;
        }, {});

        Object.keys(grouped).forEach(row => {
            grouped[row].sort((a, b) => a.number - b.number);
        });

        return {
            session: currentSession,
            movie: currentMovie,
            rows: grouped,
            occupiedIds: currentOccupied
        };
    }, [showtimeId, showtimes, movies, seats, bookings]);

    if (loading || !session) return <div className="text-white p-20 text-center">Загрузка...</div>;

    const handleSeatClick = (seat) => {
        if (occupiedIds.includes(seat.id)) return;
        setSelectedSeats(prev =>
            prev.find(s => s.id === seat.id)
                ? prev.filter(s => s.id !== seat.id)
                : [...prev, seat]
        );
    };

    return (
        <div className="min-h-screen bg-[#0F0F0F] text-white p-6 pb-40">
            <div className="flex justify-between items-center max-w-6xl mx-auto mb-10">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center font-bold">
                        {movie?.title?.[0]}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">{movie?.title}</h2>
                        <p className="text-gray-500 text-sm">
                            Ряд сеанса: {session?.start_time.split('T')[1].substring(0, 5)}
                        </p>
                    </div>
                </div>
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-full">
                    <X className="w-6 h-6" />
                </button>
            </div>

            <div className="relative w-full max-w-2xl mx-auto mb-20 text-center">
                <div className="h-[2px] bg-gradient-to-r from-transparent via-red-600 to-transparent shadow-[0_0_15px_red]"></div>
                <p className="text-[10px] tracking-[1.5em] text-gray-700 uppercase mt-4">Screen</p>
            </div>

            <div className="flex flex-col items-center gap-4">
                {Object.keys(rows).sort((a, b) => a - b).map(rowNum => (
                    <div key={rowNum} className="flex items-center group">
                        <div className="w-10 text-gray-700 font-bold text-xs">
                            {String.fromCharCode(64 + parseInt(rowNum))}
                        </div>

                        <div className="flex gap-2">
                            {rows[rowNum].map(seat => {
                                const isOccupied = occupiedIds.includes(seat.id);
                                const isSelected = selectedSeats.find(s => s.id === seat.id);

                                return (
                                    <button
                                        key={seat.id}
                                        disabled={isOccupied}
                                        onClick={() => handleSeatClick(seat)}
                                        title={`Ряд ${seat.row}, Место ${seat.number}`}
                                        className={`
                                            relative w-8 h-8 rounded-md flex items-center justify-center transition-all
                                            ${isOccupied ? 'bg-[#1A1A1A] cursor-not-allowed' :
                                                isSelected ? 'bg-red-600 shadow-lg scale-110' :
                                                    'bg-[#222] hover:bg-[#333] border border-white/5'}
                                            
                                            /* Спец-стили для категорий из твоей БД */
                                            ${seat.category === 'VIP' ? 'border-amber-500/50' : ''}
                                            ${seat.category === 'Love Seat' ? 'w-16' : ''}
                                        `}
                                    >
                                        {isOccupied && <User className="w-3 h-3 text-gray-800" />}
                                        {seat.category === 'VIP' && !isSelected && !isOccupied && <Star className="w-3 h-3 text-amber-500/30" />}
                                        {seat.category === 'Love Seat' && !isSelected && !isOccupied && <Heart className="w-3 h-3 text-pink-500/20" />}
                                        {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center gap-6 mt-16 text-[10px] uppercase tracking-widest text-gray-600">
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#1ac05f] rounded-sm" /> Свободные</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-600 rounded-sm" /> Выбранные</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#1A1A1A] rounded-sm" /> Занятые</div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-[#0F0F0F] border-t border-white/5 p-6 backdrop-blur-md">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <div>
                        <p className="text-gray-500 text-[10px] uppercase">Выбранные места</p>
                        <p className="text-lg font-bold">
                            {selectedSeats.length > 0
                                ? selectedSeats.map(s => `${String.fromCharCode(64 + s.row)}${s.number}`).join(', ')
                                : 'Не выбрано ни одного'}
                        </p>
                    </div>
                    <div className="flex items-center gap-8">
                        <div className="text-right">
                            <p className="text-gray-500 text-xs uppercase">Цена</p>
                            <p className="text-3xl font-black text-red-600">{(selectedSeats.length * session.base_price).toFixed(2)}₽</p>
                        </div>
                        <button
                            disabled={selectedSeats.length === 0}
                            onClick={() => navigate(`/checkout/${showtimeId}`, {
                                state: { selectedSeats }
                            })}
                            className="bg-red-600 px-10 py-4 rounded-xl font-bold hover:bg-red-700 disabled:opacity-20 transition-all"
                        >
                            Оплата
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}