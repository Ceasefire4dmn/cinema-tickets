import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DatabaseProvider } from './contexts/DatabaseProvider';
import { Layout } from './components/Layout';
import Afisha from './pages/Afisha/Afisha.jsx';
import MovieDetails from './pages/MovieDetails/MovieDetails';
import HallDetails from './pages/HallDetails/HallDetails.jsx'
import HallView from './pages/HallView/HallView.jsx';
import HallSelection from './pages/HallSelection/HallSelection.jsx'; 
 
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
          </Route>
        </Routes>
      </DatabaseProvider>
    </BrowserRouter>
  );
}


export default App;
