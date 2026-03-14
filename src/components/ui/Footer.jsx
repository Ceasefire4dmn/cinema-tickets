const Footer = () => {
    return (
        < footer className="px-12 py-16 border-t border-gray-800 mt-20" >
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-center md:text-left">
                    <h4 className="text-3xl font-black tracking-tighter mb-2 italic">CINEMA</h4>
                    <p className="text-gray-600 text-sm">© 2026 Прототип системы бронирования. Все права защищены.</p>
                </div>
                <div className="flex gap-10 text-gray-400 font-medium">
                    <a href="/cinema-tickets/" className="hover:text-red-600 transition-colors">Афиша</a>
                    <a href="/cinema-tickets/#/hall" className="hover:text-red-600 transition-colors">Залы</a>
                    <a href="/cinema-tickets/#/tickets" className="hover:text-red-600 transition-colors">Билеты</a>
                </div>
            </div>
        </footer >
    );
};

export default Footer;