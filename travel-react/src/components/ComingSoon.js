import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

export default function ComingSoon({ title }) {
  const navigate = useNavigate();
  return (
    <div className="page-bg">
      <Navbar />
      <div style={{ textAlign: 'center', padding: '120px 20px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(231,111,81,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ fontSize: '4rem', marginBottom: 20 }}>🚧</div>
        <div className="section-tag">Coming Soon</div>
        <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 800, margin: '16px 0 12px' }}>{title}</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: 400, margin: '0 auto 32px', lineHeight: 1.7 }}>
          We're working on this page. In the meantime, plan your trip using our destination planner.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-primary" onClick={() => navigate('/destination')}>Plan a Trip →</button>
          <button className="btn-outline" onClick={() => navigate(-1)}>← Go Back</button>
        </div>
      </div>
      <footer className="footer">© 2025 TravelPlanner · Built with ❤ for explorers</footer>
    </div>
  );
}
