import { Link } from 'react-router-dom';
import { Ticket, Search, ArrowRight } from 'lucide-react';

const Tickets = () => {
    return (
        <div className="min-h-screen bg-[#0F0F0F] text-white flex flex-col items-center justify-center px-4 pt-20">

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="relative z-10 max-w-md w-full text-center">

                <div className="mb-8 relative inline-block">
                    <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md">
                        <Ticket size={48} strokeWidth={1} className="text-slate-500 rotate-12" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-red-600 flex items-center justify-center shadow-lg">
                        <Search size={18} className="text-white" />
                    </div>
                </div>

                <h1 className="text-3xl font-bold mb-4 tracking-tight">Ваши билеты</h1>
                <p className="text-slate-400 text-lg font-light leading-relaxed mb-10">
                    Здесь отобразятся ваши билеты после покупки. Кажется, вы еще не успели ничего забронировать.
                </p>

                <div className="p-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent">
                    <div className="bg-[#161616] rounded-[14px] p-8 border border-white/5">
                        <h3 className="text-xl font-bold mb-2">Готовы к просмотру?</h3>
                        <p className="text-sm text-slate-500 mb-8">
                            Откройте для себя последние новинки кино и выберите лучшие места прямо сейчас.
                        </p>

                        <Link
                            to="/"
                            className="group flex items-center justify-center gap-3 w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-[0_10px_20px_rgba(220,38,38,0.2)] active:scale-95"
                        >
                            <span>ПЕРЕЙТИ К АФИШЕ</span>
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

                <p className="mt-12 text-xs text-slate-600 uppercase tracking-[0.3em]">
                    Premium Cinema Experience
                </p>
            </div>
        </div>
    );
};

export default Tickets;