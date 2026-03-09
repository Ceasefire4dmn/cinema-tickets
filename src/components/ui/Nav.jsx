
import { motion } from 'framer-motion';
import { Film, Users, CreditCard, Ticket, Settings } from 'lucide-react';

// eslint-disable-next-line no-unused-vars
const MotionComponent = motion.aside;  

const navItems = [
    { path: '/', icon: Film, label: 'Афиша' },
    { path: '/hall', icon: Users, label: 'Зал' },
    { path: '/payment', icon: CreditCard, label: 'Оплата' },
    { path: '/ticket', icon: Ticket, label: 'Билет' },
    { path: '/admin', icon: Settings, label: 'Админка' },
];

export default function Nav() {
    return (
        <MotionComponent 
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-64 glass p-4 flex flex-col gap-4"
        >
            <h1 className="text-2xl font-bold text-accent">Кинотеатр</h1>
            <nav className="flex flex-col gap-2">
                {navItems.map(({ path, icon: Icon, label }) => (
                    <a key={path} href={path} className="flex items-center gap-3 p-3 rounded-lg hover:bg-card/50 transition-all">
                        <Icon size={20} />
                        {label}
                    </a>
                ))}
            </nav>
        </MotionComponent>
    );
}
