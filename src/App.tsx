import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { Feed } from './pages/Feed';
import { MapView } from './pages/MapView';
import { SavedEvents } from './pages/SavedEvents';
import { EventDetail } from './pages/EventDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Wrap all routes in the Main Layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Feed />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/saved" element={<SavedEvents />} />
          <Route path="/profile" element={<div className="p-10 text-center font-bold">Profile (Coming Soon)</div>} />
          
          {/* Detail View remains standalone-ish, but inside layout for header consistency */}
          <Route path="/event/:slug" element={<EventDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;