import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDatabase } from '../../contexts/DatabaseContext';
import { Clock, MapPin, Ticket } from 'lucide-react';

const MovieDetails = () => {
    const { id } = useParams();
    const { movies, showtimes, halls, loading } = useDatabase();

    if (loading) return <div className="text-white p-20">Загрузка...</div>;

    const movie = movies.find(m => m.id === parseInt(id));
    const movieShowtimes = showtimes.filter(s => s.movie_id === parseInt(id));

    if (!movie) return <div className="text-white p-20">Фильм не найден</div>;

    return (
        <div className="min-h-screen bg-[#0F0F0F] text-white p-12">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12">
                <img
                    src={movie.poster_url} crossOrigin="anonymous"
                    className="w-full md:w-80 rounded-3xl shadow-2xl border border-gray-800"
                    alt={movie.title}
                />

                <div className="flex-1">
                    <h1 className="text-5xl font-black mb-4">{movie.title}</h1>
                    <p className="text-gray-400 text-xl mb-8">{movie.synopsis}</p>

                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Ticket className="text-red-600" /> Выберите сеанс
                    </h3>

                    <div className="grid grid-cols-1 gap-4">
                        {movieShowtimes.length > 0 ? (
                            movieShowtimes.map(session => {
                                const hall = halls.find(h => h.id === session.hall_id);
                                return (
                                    <Link
                                        key={session.id}
                                        to={`/booking/${session.id}`}
                                        className="bg-[#1A1A1A] p-6 rounded-2xl border border-gray-800 hover:border-red-600 transition-all flex justify-between items-center group"
                                    >
                                        <div className="flex gap-8 items-center">
                                            <div className="text-3xl font-bold text-red-600 group-hover:scale-110 transition-transform">
                                                {session.start_time.split('T')[1].substring(0, 5)}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 text-gray-300">
                                                    <MapPin className="w-4 h-4" /> {hall?.name} ({hall?.type})
                                                </div>
                                                <div className="text-sm text-gray-500">Цена: {session.base_price}₽</div>
                                            </div>
                                        </div>
                                        <div className="bg-red-600 px-6 py-2 rounded-full font-bold">Выбрать места</div>
                                    </Link>
                                );
                            })
                        ) : (
                            <p className="text-gray-500 italic">К сожалению, на этот фильм пока нет активных сеансов.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;