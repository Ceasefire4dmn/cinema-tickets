import { Outlet } from 'react-router-dom';
import Footer from './ui/Footer.jsx'
import Nav from './ui/Nav.jsx'
 

export function Layout() {
    return (
        <div className="flex h-screen bg-background">
            <Nav />
            <main className="flex-1 p-8 overflow-auto">
                <Outlet />
                <Footer />
            </main>
        </div>
    );
}
