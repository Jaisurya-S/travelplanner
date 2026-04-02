import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Features from './components/Features';
import Destination from './components/Destination';
import Chat from './components/Chat';
import Booking from './components/Booking';
import Results from './components/Results';
import ComingSoon from './components/ComingSoon';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main pages */}
        <Route path="/"            element={<Dashboard />} />
        <Route path="/features"    element={<Features />} />
        <Route path="/destination" element={<Destination />} />
        <Route path="/chat"        element={<Chat />} />
        <Route path="/booking"     element={<Booking />} />
        <Route path="/results"     element={<Results />} />

        {/* State pages */}
        <Route path="/andhra"    element={<ComingSoon title="Andhra Pradesh" />} />
        <Route path="/telangana" element={<ComingSoon title="Telangana" />} />
        <Route path="/karnataka" element={<ComingSoon title="Karnataka" />} />
        <Route path="/kerala"    element={<ComingSoon title="Kerala" />} />
        <Route path="/tamilnadu" element={<ComingSoon title="Tamil Nadu" />} />
        <Route path="/goa"       element={<ComingSoon title="Goa" />} />

        {/* Category pages */}
        <Route path="/beach"   element={<ComingSoon title="Beaches" />} />
        <Route path="/forest"  element={<ComingSoon title="Forests" />} />
        <Route path="/zoo"     element={<ComingSoon title="Zoos" />} />
        <Route path="/water"   element={<ComingSoon title="Waterfalls" />} />
        <Route path="/temple"  element={<ComingSoon title="Temples" />} />

        {/* 404 fallback */}
        <Route path="*" element={<ComingSoon title="Page Not Found" />} />
      </Routes>
    </BrowserRouter>
  );
}
