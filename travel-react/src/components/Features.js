import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const STATES = [
  { img: '/assests/ap.jpg',        label: 'Andhra Pradesh', path: '/andhra',    places: 18, cost: '₹700/day',   tags: ['Temples', 'Coasts'] },
  { img: '/assests/char.jpg',      label: 'Telangana',      path: '/telangana', places: 14, cost: '₹800/day',   tags: ['Heritage', 'Lakes'] },
  { img: '/assests/karnataka.jpg', label: 'Karnataka',      path: '/karnataka', places: 31, cost: '₹950/day',   tags: ['Ruins', 'Forests'] },
  { img: '/assests/kerala.jpg',    label: 'Kerala',         path: '/kerala',    places: 29, cost: '₹1,200/day', tags: ['Backwaters', 'Beaches'] },
  { img: '/assests/tamil.jpg',     label: 'Tamil Nadu',     path: '/tamilnadu', places: 38, cost: '₹900/day',   tags: ['Temples', 'Hills'] },
  { img: '/assests/goa.jpg',       label: 'Goa',            path: '/goa',       places: 22, cost: '₹1,500/day', tags: ['Beaches', 'Nightlife'] },
];

const CATEGORIES = [
  { emoji: '🏖', title: 'Beaches',    desc: 'Sun, sand & waves',    path: '/beach' },
  { emoji: '🌴', title: 'Forests',    desc: 'Into the wild',        path: '/forest' },
  { emoji: '🦏', title: 'Zoos',       desc: 'Wildlife wonders',     path: '/zoo' },
  { emoji: '🌊', title: 'Waterfalls', desc: "Nature's cascades",    path: '/water' },
  { emoji: '🛕', title: 'Temples',    desc: 'Spiritual journeys',   path: '/temple' },
];

const FEATURES = [
  { icon: '🔍', title: 'Know the Place',      desc: 'Get detailed insights, local tips and interesting facts about your destination before you travel.' },
  { icon: '💰', title: 'Trip Cost Estimator', desc: 'Calculate your total travel budget including transport, stay and activities — all upfront.' },
  { icon: '📜', title: 'Discover History',    desc: 'Uncover the rich historical background and cultural significance of every destination.' },
  { icon: '🌤', title: 'Best Time Guide',     desc: 'Month-by-month weather ratings with crowd levels and festival calendars.' },
  { icon: '🗺', title: 'Nearby Places',       desc: 'Hidden gems within 50 km — optimal day-trip routes from your base.' },
  { icon: '🚌', title: 'Getting There',       desc: 'Rail, road, air options with typical fares and travel times from major cities.' },
];

const FILTER_CATS = ['All', 'Beaches', 'Forests', 'Temples', 'Waterfalls', 'Zoos'];

const DESTINATIONS = [
  { name: 'Goa Beaches',       state: 'Goa',        cat: 'Beaches',    emoji: '🏖', cost: '₹4,500', rating: 4.6, tags: ['Swimming', 'Nightlife', 'Watersports'], best: 'Nov–Feb' },
  { name: 'Munnar',            state: 'Kerala',     cat: 'Forests',    emoji: '🌿', cost: '₹3,200', rating: 4.7, tags: ['Tea gardens', 'Trekking', 'Mist'],      best: 'Sep–May' },
  { name: 'Hampi',             state: 'Karnataka',  cat: 'Temples',    emoji: '🗿', cost: '₹1,800', rating: 4.8, tags: ['UNESCO', 'Ruins', 'Bouldering'],         best: 'Oct–Feb' },
  { name: 'Dudhsagar Falls',   state: 'Goa',        cat: 'Waterfalls', emoji: '💧', cost: '₹2,200', rating: 4.5, tags: ['Trekking', 'Train views', 'Swimming'],  best: 'Oct–Jan' },
  { name: 'Ooty',              state: 'Tamil Nadu', cat: 'Forests',    emoji: '🌄', cost: '₹2,800', rating: 4.4, tags: ['Toy train', 'Tea', 'Nilgiris'],          best: 'Mar–Jun' },
  { name: 'Mahabalipuram',     state: 'Tamil Nadu', cat: 'Temples',    emoji: '🛕', cost: '₹2,100', rating: 4.6, tags: ['UNESCO', 'Shore temple', 'Sculptures'], best: 'Oct–Feb' },
  { name: 'Periyar',           state: 'Kerala',     cat: 'Zoos',       emoji: '🐘', cost: '₹2,500', rating: 4.5, tags: ['Wildlife', 'Boat safari', 'Spices'],    best: 'Sep–Apr' },
  { name: 'Coorg',             state: 'Karnataka',  cat: 'Forests',    emoji: '☕', cost: '₹3,500', rating: 4.7, tags: ['Coffee', 'Trekking', 'Waterfalls'],     best: 'Oct–Mar' },
  { name: 'Kovalam Beach',     state: 'Kerala',     cat: 'Beaches',    emoji: '🌅', cost: '₹3,800', rating: 4.4, tags: ['Lighthouse', 'Ayurveda', 'Seafood'],    best: 'Nov–Feb' },
  { name: 'Bandipur Safari',   state: 'Karnataka',  cat: 'Zoos',       emoji: '🐯', cost: '₹2,900', rating: 4.5, tags: ['Tiger reserve', 'Jeep safari', 'Birds'], best: 'Oct–May' },
  { name: 'Madurai Meenakshi', state: 'Tamil Nadu', cat: 'Temples',    emoji: '🛕', cost: '₹1,500', rating: 4.8, tags: ['Architecture', 'Rituals', 'History'],   best: 'Oct–Mar' },
  { name: 'Wayanad',           state: 'Kerala',     cat: 'Forests',    emoji: '🌳', cost: '₹3,000', rating: 4.6, tags: ['Caves', 'Waterfalls', 'Tribal'],        best: 'Oct–May' },
];

export default function Features() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let list = activeFilter === 'All' ? DESTINATIONS : DESTINATIONS.filter(d => d.cat === activeFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(d => d.name.toLowerCase().includes(q) || d.state.toLowerCase().includes(q) || d.tags.some(t => t.toLowerCase().includes(q)));
    }
    return list;
  }, [activeFilter, search]);

  return (
    <div className="page-bg">
      <Navbar />

      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '80px 20px 50px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(231,111,81,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="section-tag">South India Travel Planner</div>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: 16 }}>Explore Smartly</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: 500, margin: '0 auto 36px', lineHeight: 1.7 }}>
          Research destinations, plan budgets & discover the best time to visit — all in one place.
        </p>
        <div style={{ display: 'flex', gap: 10, maxWidth: 520, margin: '0 auto' }}>
          <input
            type="text"
            placeholder="Search destination, state or vibe..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="chat-input"
            style={{ flex: 1, height: 48, borderRadius: 50 }}
          />
          <button className="btn-primary" style={{ height: 48, padding: '0 28px', borderRadius: 50, whiteSpace: 'nowrap' }}>Search</button>
        </div>
      </section>

      {/* Stats */}
      <div className="stats-bar">
        {[['6', 'States Covered'], ['120+', 'Destinations'], ['5', 'Categories'], ['4.8★', 'Avg Rating']].map(([num, label]) => (
          <div className="stat" key={label}>
            <div className="stat-number">{num}</div>
            <div className="stat-label">{label}</div>
          </div>
        ))}
      </div>

      {/* What We Offer */}
      <section className="section">
        <div className="section-header">
          <div className="section-tag">What We Offer</div>
          <h2 className="section-title">Plan Every Detail</h2>
          <p className="section-sub">Tools and insights to make your trip completely stress-free.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20, maxWidth: 1100, margin: '0 auto' }}>
          {FEATURES.map(f => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon">{f.icon}</div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{f.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Choose State */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-header">
          <div className="section-tag">By State</div>
          <h2 className="section-title">Choose Your State</h2>
          <p className="section-sub">Select a state to explore its destinations, culture and tips.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20, maxWidth: 1100, margin: '0 auto' }}>
          {STATES.map(s => (
            <div className="state-card" key={s.label} onClick={() => navigate(s.path)}>
              <img src={s.img} alt={s.label} />
              <div className="state-overlay">
                <div>
                  <div className="state-label">{s.label}</div>
                  <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)', marginTop: 3 }}>
                    {s.places} places · {s.cost} · {s.tags.join(' · ')}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-header">
          <div className="section-tag">Top Picks</div>
          <h2 className="section-title">Featured Destinations</h2>
          <p className="section-sub">Rated by travellers. Filter by category.</p>
        </div>
        {/* Filter pills */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 30 }}>
          {FILTER_CATS.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              style={{
                padding: '7px 20px', borderRadius: 50, border: '1px solid',
                borderColor: activeFilter === cat ? 'var(--primary)' : 'rgba(255,255,255,0.12)',
                background: activeFilter === cat ? 'var(--primary)' : 'transparent',
                color: activeFilter === cat ? '#fff' : 'var(--text-muted)',
                fontSize: '0.88rem', cursor: 'pointer', fontFamily: 'Poppins, sans-serif',
                transition: 'all 0.2s',
              }}
            >{cat}</button>
          ))}
        </div>
        <div className="cards-grid" style={{ maxWidth: 1100 }}>
          {filtered.length === 0 && (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>
              No destinations found. Try a different filter or search term.
            </div>
          )}
          {filtered.map(d => (
            <div className="card" key={d.name} onClick={() => navigate('/destination')}>
              <div style={{ height: 160, background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 52, position: 'relative' }}>
                {d.emoji}
                <span style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(231,111,81,0.25)', border: '1px solid rgba(231,111,81,0.4)', color: 'var(--primary-light)', fontSize: '0.75rem', padding: '3px 10px', borderRadius: 20 }}>{d.cat}</span>
              </div>
              <div className="card-body">
                <div className="card-title">{d.name}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 10 }}>📍 {d.state}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--primary)' }}>From {d.cost}</span>
                  <span style={{ fontSize: '0.88rem', color: '#f59e0b' }}>★ {d.rating}</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                  {d.tags.map(t => (
                    <span key={t} style={{ fontSize: '0.75rem', padding: '3px 10px', borderRadius: 20, background: 'rgba(255,255,255,0.07)', color: 'var(--text-muted)' }}>{t}</span>
                  ))}
                  <span style={{ fontSize: '0.75rem', padding: '3px 10px', borderRadius: 20, background: 'rgba(74,222,128,0.1)', color: '#4ade80' }}>Best: {d.best}</span>
                </div>
                <button className="btn-primary" style={{ width: '100%', padding: '9px', fontSize: '0.88rem' }} onClick={e => { e.stopPropagation(); navigate('/destination'); }}>Plan This Trip →</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-header">
          <div className="section-tag">By Category</div>
          <h2 className="section-title">What Are You Looking For?</h2>
          <p className="section-sub">Filter destinations by the type of experience you want.</p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 20, maxWidth: 1100, margin: '0 auto' }}>
          {CATEGORIES.map(c => (
            <div className="cat-card" key={c.title}>
              <div className="cat-emoji">{c.emoji}</div>
              <div className="cat-title">{c.title}</div>
              <div className="cat-desc">{c.desc}</div>
              <button className="btn-primary" style={{ padding: '9px 22px', fontSize: '0.85rem' }} onClick={() => navigate(c.path)}>Explore →</button>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">© 2025 TravelPlanner · Built with ❤ for explorers</footer>
    </div>
  );
}
