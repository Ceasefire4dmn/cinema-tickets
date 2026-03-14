
import { motion } from 'framer-motion';
import { Film, Users, CreditCard, Ticket } from 'lucide-react';
import { Link } from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
const MotionComponent = motion.aside;

const navItems = [
    { path: '/', icon: Film, label: 'Афиша' },
    { path: '/hall', icon: Users, label: 'Зал' },
    { path: '/transactions', icon: CreditCard, label: 'Оплата' },
    { path: '/tickets', icon: Ticket, label: 'Билеты' },
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
                    <Link key={path} to={path} className="flex items-center gap-3 p-3 rounded-lg hover:bg-card/50 transition-all">
                        <Icon size={20} />
                        {label}
                    </Link>
                ))}
            </nav>
        </MotionComponent>
    );
}
