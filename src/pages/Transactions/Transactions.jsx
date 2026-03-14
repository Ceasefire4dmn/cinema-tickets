import { Link } from 'react-router-dom';
import {
    Film,
    Armchair,
    CreditCard,
    TicketCheck,
    LifeBuoy,
    AlertCircle
} from 'lucide-react';

const Transactions = () => {
    const steps = [
        {
            id: 1,
            title: "Выбор фильма",
            description: "Перейдите в каталог и выберите интересующую вас кинокартину.",
            icon: Film,
            button: { text: "Афиша", link: "/" }
        },
        {
            id: 2,
            title: "Выбор сеанса",
            description: "Определитесь с удобным временем, залом и выберите лучшие места на схеме.",
            icon: Armchair
        },
        {
            id: 3,
            title: "Оплата",
            description: "Произведите быструю оплату. В режиме симуляции списание средств не происходит.",
            icon: CreditCard
        },
        {
            id: 4,
            title: "Получение билета",
            description: "Ваш электронный билет с QR-кодом появится в личном кабинете и придет на почту.",
            icon: TicketCheck
        }
    ];

    return (
        <div className="min-h-screen bg-[#0F0F0F] text-white pt-24 pb-16 px-4 lg:px-20">
            <div className="max-w-4xl mx-auto text-center mb-16">
                <h1 className="text-4xl font-bold tracking-tight mb-4 uppercase">Как купить билет?</h1>
                <p className="text-slate-400 text-lg font-light">Простая инструкция из четырех шагов для получения вашего пропуска в мир кино.</p>

                <div className="mt-8 inline-flex items-center gap-3 px-5 py-2.5 rounded-xl bg-red-600/5 border border-red-600/20 text-red-500 text-sm">
                    <AlertCircle size={18} className="animate-pulse" />
                    <span className="font-medium tracking-wide">
                        Тестовый режим: реальная оплата не производится
                    </span>
                </div>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {steps.map((step) => {
                    const Icon = step.icon;
                    return (
                        <div key={step.id} className="group">
                            <div className="bg-[#161616] border border-white/5 rounded-2xl p-8 h-full flex flex-col items-center text-center transition-all duration-500 hover:border-red-600/40 hover:bg-[#1C1C1C] relative overflow-hidden">

                                <span className="absolute -top-4 -right-2 text-9xl font-black text-white/[0.02] pointer-events-none">
                                    {step.id}
                                </span>

                                <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-red-600 transition-all duration-500">
                                    <Icon
                                        size={28}
                                        strokeWidth={1.5}
                                        className="text-white group-hover:text-white"
                                    />
                                </div>

                                <h3 className="text-lg font-bold mb-3 tracking-wide">{step.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">
                                    {step.description}
                                </p>

                                {step.button && (
                                    <Link
                                        to={step.button.link}
                                        className="mt-auto w-full py-3 px-6 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-[0.2em] transition-all shadow-lg active:scale-95"
                                    >
                                        {step.button.text}
                                    </Link>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="max-w-3xl mx-auto mt-24 text-center">
                <div className="flex justify-center mb-6">
                    <div className="p-3 rounded-full bg-white/5">
                        <LifeBuoy size={24} className="text-slate-400" />
                    </div>
                </div>
                <h4 className="text-xl font-bold mb-2">Нужна помощь?</h4>
                <p className="text-slate-500 mb-8">Если у вас возникли вопросы по процессу бронирования, наша поддержка всегда на связи.</p>
                <a
                    href="mailto:alext.2005@mail.ru"
                    className="inline-block px-8 py-3 rounded-full border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all text-sm font-bold uppercase tracking-widest text-center"
                >
                    Связаться с нами
                </a>
            </div>
        </div>
    );
};

export default Transactions;