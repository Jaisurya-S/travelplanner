import Navbar from './Navbar';

const bookings = [
  { img: '/assests/IRCTC.png', title: 'IRCTC', desc: 'Book train tickets across India', url: 'https://www.irctc.co.in/nget/train-search' },
  { img: '/assests/red.png', title: 'RedBus', desc: 'Find and book bus tickets', url: 'https://www.redbus.in/' },
  { img: '/assests/ola.jpg', title: 'OLA Cabs', desc: 'Book cabs for local travel', url: 'https://www.olacabs.com/' },
  { img: '/assests/go.png', title: 'Goibibo', desc: 'Flights, hotels & holiday packages', url: 'https://www.goibibo.com/' },
];

export default function Booking() {
  return (
    <div className="page-bg">
      <Navbar />

      <section style={{ textAlign: 'center', padding: '80px 20px 40px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(231,111,81,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="section-tag">Travel Partners</div>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: 12 }}>Book Your Journey</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: 450, margin: '0 auto' }}>Choose from our trusted booking partners for trains, buses, cabs and flights.</p>
      </section>

      <section className="section" style={{ paddingTop: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24, maxWidth: 1100, margin: '0 auto' }}>
          {bookings.map((b) => (
            <div className="booking-card" key={b.title}>
              <img src={b.img} alt={b.title} />
              <div className="booking-card-body">
                <div className="booking-card-title">{b.title}</div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: 16 }}>{b.desc}</p>
                <button className="btn-primary" style={{ width: '100%' }} onClick={() => window.open(b.url, '_blank')}>
                  Book Now →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">© 2025 TravelPlanner · Built with ❤ for explorers</footer>
    </div>
  );
}
