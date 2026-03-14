import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Clock, Star, ChevronRight } from 'lucide-react';
import { useDatabase } from '../../contexts/DatabaseContext';

const Afisha = () => {
    const { movies, loading } = useDatabase();

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
                <div className="bg-[#1A1A1A] p-12 rounded-2xl text-center border border-gray-800">
                    <div className="w-16 h-16 border-4 border-red-600/30 border-t-red-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-xl text-white font-light">Загрузка афиши...</p>
                </div>
            </div>
        );
    }

    const featuredMovie = movies[2] || {
        title: "Тихий путь",
        synopsis: "Путешествие исследователя через неизведанные пространства в поисках истины.",
        poster_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsIEqvoUOGTDGqYyzcBnt3CZUUpgdPuDRk8FYdf-sfqopbRprzt24nfbAIvcEMX9RGTAeZFJ5a7o-mYs7rqKfiezmmDZETH7MDQpAMw4oVRC1CGaiEw94mVzYO_h6T1clMpe-fPpz7gSLoRGM9UW3ykW7Lzf7fBE_jACbr4B-95mUs0iqGOYTnP_4usFOH9MP2_t8o0aRNOTnXM2mLTo1JaPOxqtfFEz5refvV8wf6KpJgrtMR_EzxnQiNCUx73CEFH14eGP4_Qym3"
    };

    return (
        <div className="min-h-screen bg-[#0F0F0F] text-white overflow-x-hidden">
            <div className="bg-[#0F0F0F] m-3">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-7xl md:text-8xl font-black tracking-tighter mb-2 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent"
                >
                    CINEMA
                </motion.h1>

                <div className="flex items-center space-x-3 mb-8">
                    <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                    <span className="text-xl text-gray-400 font-medium">{movies.length} фильмов в прокате</span>
                </div>
            </div>
            <section className="relative h-[600px] flex items-center px-12 overflow-hidden border-b border-gray-800">
                <img
                    src={featuredMovie.poster_url}
                    alt={featuredMovie.title}
                    crossOrigin="anonymous"
                    className="absolute inset-0 h-full w-full object-cover object-center opacity-30 transition-opacity duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F0F] via-[#0F0F0F]/60 to-transparent"></div>

                <div className="relative z-10 max-w-4xl mx-auto w-full">


                    <div className="max-w-2xl">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">{featuredMovie.title}</h2>
                        <p className="text-xl text-gray-400 mb-8 leading-relaxed line-clamp-3">
                            {featuredMovie.synopsis}
                        </p>

                        <div className="flex flex-wrap gap-4 items-center">
                            <Link
                                to={`/movie/3`}
                                className="bg-red-600 px-8 py-4 rounded-full font-bold hover:bg-red-700 hover:scale-105 transition-all flex items-center gap-3 shadow-lg shadow-red-600/20"
                            >
                                <Play className="w-5 h-5 fill-current" />
                                Купить билет
                            </Link>
                            <Link to="/movie/3" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group text-lg">
                                Сеансы <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-12 py-20 max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-12">
                    <h3 className="text-3xl font-bold flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#1A1A1A] rounded-2xl flex items-center justify-center border border-gray-800">
                            <Clock className="w-6 h-6 text-red-600" />
                        </div>
                        Сейчас в кино
                    </h3>
                    <div className="h-px flex-1 bg-gray-800 mx-8 hidden md:block"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {movies.map((movie, idx) => (
                        <motion.div
                            key={movie.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -12 }}
                            className="group relative"
                        >
                            <div className="bg-[#1A1A1A] rounded-3xl overflow-hidden border border-gray-800 hover:border-red-600/50 transition-all duration-500 shadow-2xl">
                                <div className="relative h-[400px] overflow-hidden">
                                    <img
                                        src={movie.poster_url}
                                        alt={movie.title} crossOrigin="anonymous"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent opacity-60"></div>

                                    <div className="absolute top-6 right-6 bg-black/70 backdrop-blur-xl px-4 py-2 rounded-2xl flex items-center gap-2 border border-white/10">
                                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                        <span className="font-bold text-yellow-500">{movie.rating}</span>
                                    </div>
                                </div>

                                <div className="p-8">
                                    <span className="text-xs font-bold tracking-widest text-red-600 uppercase mb-3 block">
                                        {movie.genre}
                                    </span>
                                    <h4 className="text-2xl font-bold mb-4 group-hover:text-red-500 transition-colors line-clamp-1">
                                        {movie.title}
                                    </h4>
                                    <p className="text-gray-500 text-sm line-clamp-2 mb-6 leading-relaxed">
                                        {movie.synopsis}
                                    </p>

                                    <Link
                                        to={`/movie/${movie.id}`}
                                        className="flex items-center gap-2 text-white font-semibold hover:gap-4 transition-all"
                                    >
                                        Купить билет <ChevronRight className="w-5 h-5 text-red-600" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

        </div>
    );
};

export default Afisha;