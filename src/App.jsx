import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DatabaseProvider } from './contexts/DatabaseProvider';
import { Layout } from './components/Layout';
import Afisha from './pages/Afisha/Afisha.jsx';
import MovieDetails from './pages/MovieDetails/MovieDetails';
import HallDetails from './pages/HallDetails/HallDetails.jsx'
import HallView from './pages/HallView/HallView.jsx';
import HallSelection from './pages/HallSelection/HallSelection.jsx';
import Checkout from './pages/Checkout/Checkout.jsx';
// import Payment from './pages/Payment';
// import Ticket from './pages/Ticket';
// import Admin from './pages/Admin';

function EmptyPage() {
  return <div className="glass p-8 rounded-xl">Страница в разработке. БД готова для демо (изменения в памяти).</div>;
}

function App() {
  return (
    <BrowserRouter>
      <DatabaseProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Afisha />} />
            <Route path='afisha' element={<Afisha />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path='hall' element={<HallDetails />} />
            <Route path="/hall-info/:hallId" element={<HallView />} />
            <Route path="/hall-selection/:showtimeId" element={<HallSelection />} />
            <Route path="/checkout/:showtimeId" element={<Checkout />} />
            {/* 
            <Route path="hall" element={<Hall />} />
            <Route path="payment" element={<Payment />} />
            <Route path="ticket" element={<Ticket />} />
            <Route path="admin" element={<Admin />} /> */}

            {/* 404 */}
            {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
          </Route>
        </Routes>
      </DatabaseProvider>
    </BrowserRouter>
  );
}


export default App;
