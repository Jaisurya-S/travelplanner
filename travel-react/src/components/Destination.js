import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const POPULAR = [
  { name: 'Goa',         emoji: '🏖', state: 'Goa' },
  { name: 'Munnar',      emoji: '🌿', state: 'Kerala' },
  { name: 'Ooty',        emoji: '🌄', state: 'Tamil Nadu' },
  { name: 'Coorg',       emoji: '☕', state: 'Karnataka' },
  { name: 'Hampi',       emoji: '🗿', state: 'Karnataka' },
  { name: 'Kodaikanal',  emoji: '🏔', state: 'Tamil Nadu' },
  { name: 'Alleppey',    emoji: '🚤', state: 'Kerala' },
  { name: 'Pondicherry', emoji: '🌊', state: 'Tamil Nadu' },
  { name: 'Wayanad',     emoji: '🌳', state: 'Kerala' },
  { name: 'Mysore',      emoji: '🏰', state: 'Karnataka' },
  { name: 'Tirupati',    emoji: '🛕', state: 'Andhra Pradesh' },
  { name: 'Vizag',       emoji: '🌊', state: 'Andhra Pradesh' },
];

const TRIP_TYPES = [
  { icon: '🏖', label: 'Beach' },
  { icon: '🏔', label: 'Hills' },
  { icon: '🌴', label: 'Forest' },
  { icon: '🛕', label: 'Spiritual' },
  { icon: '🎒', label: 'Adventure' },
  { icon: '🍽', label: 'Food Tour' },
];

const HOW_IT_WORKS = [
  { step: '01', icon: '📍', title: 'Pick a Destination', desc: 'Choose from popular spots or type your own.' },
  { step: '02', icon: '📋', title: 'Fill Trip Details', desc: 'Set your budget, members, days and travel style.' },
  { step: '03', icon: '🗺', title: 'Get Your Itinerary', desc: 'We find top places and build a day-by-day plan.' },
  { step: '04', icon: '🎟', title: 'Book & Go', desc: 'Book trains, buses or cabs directly from the results.' },
];

export default function Destination() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ destination: '', budget: '', members: '', vehicle: 'yes', days: '', tripType: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { destination, budget, members, vehicle, days, tripType } = form;
    navigate(`/results?destination=${encodeURIComponent(destination)}&budget=${encodeURIComponent(budget)}&members=${encodeURIComponent(members)}&vehicle=${encodeURIComponent(vehicle)}&days=${encodeURIComponent(days)}&tripType=${encodeURIComponent(tripType)}`);
  };

  return (
    <div className="page-bg">
      <Navbar />

      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '80px 20px 50px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(231,111,81,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="section-tag">Trip Planner</div>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: 16 }}>Plan Your Perfect Trip</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
          Tell us where you want to go and we'll build a complete day-by-day itinerary with cost estimates.
        </p>
      </section>

      {/* How it works */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-header">
          <div className="section-tag">How It Works</div>
          <h2 className="section-title">Plan in 4 Simple Steps</h2>
          <p className="section-sub">From destination to itinerary in under a minute.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20, maxWidth: 1000, margin: '0 auto' }}>
          {HOW_IT_WORKS.map(h => (
            <div key={h.step} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 24, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 12, right: 16, fontSize: '2.5rem', fontWeight: 800, color: 'rgba(231,111,81,0.1)', lineHeight: 1 }}>{h.step}</div>
              <div style={{ fontSize: '2rem', marginBottom: 14 }}>{h.icon}</div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{h.title}</div>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{h.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Trip Type */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-header">
          <div className="section-tag">Trip Style</div>
          <h2 className="section-title">What Kind of Trip?</h2>
          <p className="section-sub">Select the vibe that matches your travel mood.</p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16, maxWidth: 900, margin: '0 auto' }}>
          {TRIP_TYPES.map(t => (
            <div
              key={t.label}
              onClick={() => setForm(f => ({ ...f, tripType: f.tripType === t.label ? '' : t.label }))}
              className="cat-card"
              style={{
                cursor: 'pointer', minWidth: 130,
                border: form.tripType === t.label ? '1px solid var(--primary)' : '1px solid rgba(255,255,255,0.08)',
                background: form.tripType === t.label ? 'rgba(231,111,81,0.15)' : 'var(--surface)',
              }}
            >
              <div className="cat-emoji">{t.icon}</div>
              <div className="cat-title" style={{ marginBottom: 0 }}>{t.label}</div>
              {form.tripType === t.label && <div style={{ fontSize: '0.75rem', color: 'var(--primary)', marginTop: 6, fontWeight: 600 }}>✓ Selected</div>}
            </div>
          ))}
        </div>
      </section>

      {/* Main Form */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-header">
          <div className="section-tag">Trip Details</div>
          <h2 className="section-title">Fill in Your Details</h2>
          <p className="section-sub">We'll find the best spots and build your itinerary.</p>
        </div>

        <div style={{ maxWidth: 700, margin: '0 auto', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '36px 40px', backdropFilter: 'blur(10px)' }}>

          {/* Destination chips */}
          <div style={{ marginBottom: 24 }}>
            <label className="form-label">Quick Pick a Destination</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
              {POPULAR.map(p => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => setForm(f => ({ ...f, destination: f.destination === p.name ? '' : p.name }))}
                  style={{
                    padding: '6px 14px', borderRadius: 50, border: '1px solid',
                    borderColor: form.destination === p.name ? 'var(--primary)' : 'rgba(255,255,255,0.12)',
                    background: form.destination === p.name ? 'rgba(231,111,81,0.2)' : 'transparent',
                    color: form.destination === p.name ? 'var(--primary-light)' : 'var(--text-muted)',
                    fontSize: '0.82rem', cursor: 'pointer', fontFamily: 'Poppins, sans-serif',
                    transition: 'all 0.2s',
                  }}
                >{p.emoji} {p.name}</button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Destination {form.destination && <span style={{ color: 'var(--primary)', marginLeft: 8 }}>— {form.destination}</span>}</label>
                <input
                  type="text" required placeholder="e.g. Kodaikanal, Goa, Munnar..."
                  className="form-input"
                  value={form.destination}
                  onChange={e => setForm(f => ({ ...f, destination: e.target.value }))}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Budget (₹)</label>
                <input type="number" required placeholder="e.g. 15000" className="form-input"
                  value={form.budget} onChange={e => setForm(f => ({ ...f, budget: e.target.value }))} />
              </div>

              <div className="form-group">
                <label className="form-label">Number of Members</label>
                <input type="number" required placeholder="e.g. 4" className="form-input"
                  value={form.members} onChange={e => setForm(f => ({ ...f, members: e.target.value }))} />
              </div>

              <div className="form-group">
                <label className="form-label">Number of Days</label>
                <input type="number" placeholder="e.g. 3" className="form-input"
                  value={form.days} onChange={e => setForm(f => ({ ...f, days: e.target.value }))} />
              </div>

              <div className="form-group">
                <label className="form-label">Own Vehicle?</label>
                <select className="form-input" value={form.vehicle} onChange={e => setForm(f => ({ ...f, vehicle: e.target.value }))}>
                  <option value="yes" style={{ background: '#1a1a2e' }}>Yes</option>
                  <option value="no"  style={{ background: '#1a1a2e' }}>No</option>
                </select>
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Trip Type {form.tripType && <span style={{ color: 'var(--primary)', marginLeft: 8 }}>— {form.tripType}</span>}</label>
                <input type="text" placeholder="e.g. Beach, Adventure, Spiritual..." className="form-input"
                  value={form.tripType} onChange={e => setForm(f => ({ ...f, tripType: e.target.value }))} />
              </div>
            </div>

            <button type="submit" className="btn-submit" style={{ marginTop: 8 }}>
              Find Destinations & Build Itinerary →
            </button>
          </form>
        </div>
      </section>

      <footer className="footer">© 2025 TravelPlanner · Built with ❤ for explorers</footer>
    </div>
  );
}
