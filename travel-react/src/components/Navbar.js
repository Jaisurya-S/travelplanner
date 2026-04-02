import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const links = [
  ['Home', '/'], ['Features', '/features'], ['Destinations', '/destination'],
  ['AI Chat', '/chat'], ['Booking', '/booking'],
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar" style={{ position: 'relative', flexWrap: 'wrap' }}>
      <span className="navbar-brand">✈ TravelPlanner</span>

      {/* Hamburger */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{ display: 'none', background: 'none', border: 'none', color: 'var(--text)', fontSize: '1.5rem', cursor: 'pointer' }}
        className="nav-hamburger"
      >☰</button>

      <ul className={`nav-links ${open ? 'nav-open' : ''}`}>
        {links.map(([label, path]) => (
          <li key={path}>
            <Link to={path} className={pathname === path ? 'active' : ''} onClick={() => setOpen(false)}>{label}</Link>
          </li>
        ))}
      </ul>

      <style>{`
        @media (max-width: 768px) {
          .nav-hamburger { display: block !important; }
          .nav-links { display: none !important; width: 100%; flex-direction: column; padding: 10px 0; }
          .nav-links.nav-open { display: flex !important; }
          .nav-links li { margin: 0; }
          .nav-links a { display: block; padding: 10px 20px; border-radius: 0; }
        }
      `}</style>
    </nav>
  );
}
