import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const destinations = [
  { img: '/assests/Kodaikanal.jpg', title: 'Kodaikanal', state: 'Tamil Nadu', desc: 'A pristine hill station nestled in the Palani Hills, known for its misty valleys and serene lake.' },
  { img: '/assests/all.jpg', title: 'Alleppey', state: 'Kerala', desc: 'The Venice of the East — famous for its tranquil backwaters, houseboats and lush greenery.' },
  { img: '/assests/karnataka.jpg', title: 'Coorg', state: 'Karnataka', desc: 'A captivating hill station blanketed in coffee plantations and misty mountain ranges.' },
  { img: '/assests/goa.jpg', title: 'Goa', state: 'Goa', desc: 'Sun-kissed beaches, vibrant nightlife and Portuguese heritage make Goa truly unforgettable.' },
  { img: '/assests/munnar.jpg', title: 'Munnar', state: 'Kerala', desc: 'Rolling tea gardens and cool mountain air make Munnar a paradise for nature lovers.' },
  { img: '/assests/gold.jpg', title: 'Hampi', state: 'Karnataka', desc: 'A UNESCO World Heritage Site with breathtaking ruins of the Vijayanagara Empire.' },
];

const stats = [
  { number: '500+', label: 'Destinations' },
  { number: '6', label: 'States Covered' },
  { number: '50K+', label: 'Happy Travelers' },
  { number: '4.9★', label: 'User Rating' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="page-bg">
      <Navbar />

      {/* Hero */}
      <section className="hero">
        <div className="hero-bg" style={{ backgroundImage: "url('/assests/first.jpg')" }} />
        <div className="hero-content fade-up">
          <div className="hero-badge">🌍 Explore India</div>
          <h1>Discover Your<br />Next Adventure</h1>
          <p>Plan, explore, and experience the most breathtaking destinations across India — all in one place.</p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => navigate('/destination')}>Plan My Trip →</button>
            <button className="btn-outline" onClick={() => navigate('/features')}>Explore Destinations</button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="stats-bar">
        {stats.map((s) => (
          <div className="stat" key={s.label}>
            <div className="stat-number">{s.number}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Destinations */}
      <section className="section">
        <div className="section-header">
          <div className="section-tag">Top Picks</div>
          <h2 className="section-title">Popular Destinations</h2>
          <p className="section-sub">Handpicked places loved by thousands of travelers across South India.</p>
        </div>
        <div className="cards-grid">
          {destinations.map((d) => (
            <div className="card" key={d.title}>
              <img src={d.img} alt={d.title} />
              <div className="card-body">
                <div style={{ fontSize: '0.78rem', color: 'var(--primary)', fontWeight: 600, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>{d.state}</div>
                <div className="card-title">{d.title}</div>
                <div className="card-text">{d.desc}</div>
                <button className="btn-primary" style={{ padding: '10px 24px', fontSize: '0.9rem' }} onClick={() => navigate('/booking')}>Book Now</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ textAlign: 'center', padding: '60px 20px', background: 'rgba(231,111,81,0.06)', borderTop: '1px solid rgba(231,111,81,0.15)', borderBottom: '1px solid rgba(231,111,81,0.15)' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>Ready to explore?</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: 28 }}>Tell us your destination and we'll build your perfect itinerary.</p>
        <button className="btn-primary" onClick={() => navigate('/destination')}>Start Planning Free →</button>
      </section>

      <footer className="footer">© 2025 TravelPlanner · Built with ❤ for explorers</footer>
    </div>
  );
}
