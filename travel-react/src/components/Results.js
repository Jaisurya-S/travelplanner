import { useEffect, useRef, useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const BUDGET_DATA = {
  goa:         { budget: [800,600,400,300],  mid: [2000,1200,600,800],  luxury: [6000,3000,1500,2000] },
  ooty:        { budget: [600,500,200,200],  mid: [1500,900,400,500],   luxury: [4500,2200,1000,1500] },
  coorg:       { budget: [700,550,250,250],  mid: [1800,1000,500,600],  luxury: [5000,2500,1200,1800] },
  hampi:       { budget: [400,400,150,150],  mid: [1200,800,300,400],   luxury: [3500,2000,800,1200] },
  munnar:      { budget: [650,500,200,200],  mid: [1700,950,450,550],   luxury: [5000,2400,1100,1700] },
  wayanad:     { budget: [600,500,200,200],  mid: [1600,900,400,500],   luxury: [4800,2300,1000,1600] },
  mysore:      { budget: [500,450,200,200],  mid: [1300,850,350,450],   luxury: [3800,2100,900,1300] },
  kerala:      { budget: [650,500,200,200],  mid: [1700,950,450,550],   luxury: [5000,2400,1100,1700] },
  kodaikanal:  { budget: [600,480,180,200],  mid: [1600,900,400,500],   luxury: [4500,2200,1000,1500] },
  alleppey:    { budget: [700,500,200,250],  mid: [1800,1000,450,600],  luxury: [5500,2500,1100,1800] },
  pondicherry: { budget: [500,500,200,250],  mid: [1400,900,350,500],   luxury: [4000,2200,900,1400] },
};

const fmt = (n) => '₹' + Math.round(n).toLocaleString('en-IN');

function BudgetEstimator({ initDest, initDays, initPeople }) {
  const destKey = Object.keys(BUDGET_DATA).find(k => initDest.toLowerCase().includes(k)) || 'goa';
  const [dest, setDest]     = useState(destKey);
  const [days, setDays]     = useState(Math.max(1, parseInt(initDays) || 3));
  const [style, setStyle]   = useState('mid');
  const [people, setPeople] = useState(Math.max(1, parseInt(initPeople) || 2));

  const b = useMemo(() => {
    const d = Math.max(1, days), p = Math.max(1, people);
    const [accom, food, transport, acts] = BUDGET_DATA[dest][style].map((v, i) => v * d * (i === 0 ? 1 : p));
    const total = accom + food + transport + acts;
    return { accom, food, transport, acts, total, perPerson: total / p };
  }, [dest, days, style, people]);

  const selectStyle = {
    width: '100%', padding: '11px 14px', borderRadius: 10,
    background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
    color: 'var(--text)', fontSize: '0.9rem', fontFamily: 'Poppins, sans-serif',
    outline: 'none', marginBottom: 14,
  };

  return (
    <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 28 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
        <div>
          <label className="form-label">Destination</label>
          <select value={dest} onChange={e => setDest(e.target.value)} style={selectStyle}>
            {Object.keys(BUDGET_DATA).map(k => (
              <option key={k} value={k} style={{ background: '#1a1a2e' }}>{k.charAt(0).toUpperCase() + k.slice(1)}</option>
            ))}
          </select>
          <label className="form-label">Travel Style</label>
          <select value={style} onChange={e => setStyle(e.target.value)} style={selectStyle}>
            <option value="budget" style={{ background: '#1a1a2e' }}>Budget (Hostel + street food)</option>
            <option value="mid"    style={{ background: '#1a1a2e' }}>Mid-range (Hotel + restaurant)</option>
            <option value="luxury" style={{ background: '#1a1a2e' }}>Luxury (Resort + fine dining)</option>
          </select>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label className="form-label">Days</label>
              <input type="number" min={1} max={30} value={days} onChange={e => setDays(+e.target.value || 1)} className="form-input" style={{ marginBottom: 0 }} />
            </div>
            <div>
              <label className="form-label">Travellers</label>
              <input type="number" min={1} max={20} value={people} onChange={e => setPeople(+e.target.value || 1)} className="form-input" style={{ marginBottom: 0 }} />
            </div>
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 22, border: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: 18, color: 'var(--text)' }}>
            Breakdown — {dest.charAt(0).toUpperCase() + dest.slice(1)}
          </div>
          {[['Accommodation', b.accom], ['Food & drinks', b.food], ['Transport', b.transport], ['Activities', b.acts]].map(([label, val]) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: 10 }}>
              <span>{label}</span>
              <span style={{ color: 'var(--text)', fontWeight: 500 }}>{fmt(val)}</span>
            </div>
          ))}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 14, marginTop: 6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', fontWeight: 700, marginBottom: 4 }}>
              <span>Total</span>
              <span style={{ color: 'var(--primary)' }}>{fmt(b.total)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <span>Per person</span>
              <span>{fmt(b.perPerson)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Results() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const destination = searchParams.get('destination') || '';
  const initDays     = searchParams.get('days') || '3';
  const initMembers  = searchParams.get('members') || '2';
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerGroup = useRef(null);
  const initialView = useRef(null);
  const [places, setPlaces] = useState([]);
  const [loadingPlaces, setLoadingPlaces] = useState(false);
  const [selected, setSelected] = useState([]);
  const [manualPlace, setManualPlace] = useState('');
  const [showItinerary, setShowItinerary] = useState(false);

  useEffect(() => {
    if (mapInstance.current) return;
    const L = window.L;
    mapInstance.current = L.map(mapRef.current).setView([10.99, 76.96], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(mapInstance.current);
    markerGroup.current = L.layerGroup().addTo(mapInstance.current);
    if (destination) fetchLocation(destination);
  }, []);

  function fetchLocation(dest) {
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${dest}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.length > 0) {
          const lat = parseFloat(data[0].lat), lon = parseFloat(data[0].lon);
          initialView.current = [lat, lon];
          mapInstance.current.setView([lat, lon], 14);
          markerGroup.current.clearLayers();
          window.L.marker([lat, lon]).addTo(markerGroup.current).bindPopup(`<b>${dest}</b>`).openPopup();
          fetchTouristPlaces(lat, lon);
          setLoadingPlaces(true);
        }
      });
  }

  function fetchTouristPlaces(lat, lon) {
    const r = 25000;
    const types = [
      '["tourism"="viewpoint"]',
      '["tourism"="attraction"]',
      '["tourism"="museum"]',
      '["tourism"="theme_park"]',
      '["tourism"="zoo"]',
      '["tourism"="artwork"]',
      '["tourism"="gallery"]',
      '["natural"="waterfall"]',
      '["natural"="peak"]',
      '["natural"="beach"]',
      '["natural"="cave_entrance"]',
      '["leisure"="park"]',
      '["leisure"="nature_reserve"]',
      '["leisure"="garden"]',
      '["historic"="monument"]',
      '["historic"="ruins"]',
      '["historic"="fort"]',
      '["historic"="temple"]',
      '["amenity"="place_of_worship"]',
      '["amenity"="theatre"]',
    ];
    const parts = types.flatMap(t => [
      `node(around:${r},${lat},${lon})${t};`,
      `way(around:${r},${lat},${lon})${t};`,
      `relation(around:${r},${lat},${lon})${t};`,
    ]).join('');
    const query = `[out:json][timeout:30];(${parts});out center;`;

    fetch('https://overpass-api.de/api/interpreter?data=' + encodeURIComponent(query))
      .then((r) => r.json())
      .then((data) => {
        const seen = new Set();
        const list = data.elements
          .map((el) => ({
            name: el.tags?.name || null,
            lat: el.lat ?? el.center?.lat,
            lon: el.lon ?? el.center?.lon,
            type: el.tags?.tourism || el.tags?.natural || el.tags?.leisure || el.tags?.historic || el.tags?.amenity,
          }))
          .filter((el) => {
            if (!el.name || !el.lat || seen.has(el.name)) return false;
            seen.add(el.name);
            return true;
          });

        if (list.length >= 15) {
          setPlaces(list.slice(0, 20));
          setLoadingPlaces(false);
        } else {
          fetchFallbackPlaces(lat, lon, list, seen);
        }
      })
      .catch(() => fetchFallbackPlaces(lat, lon, [], new Set()));
  }

  function fetchFallbackPlaces(lat, lon, existing, seen) {
    // Curated top places per destination as guaranteed fallback
    const CURATED = {
      goa:         ['Baga Beach','Calangute Beach','Anjuna Beach','Dudhsagar Falls','Fort Aguada','Basilica of Bom Jesus','Chapora Fort','Vagator Beach','Palolem Beach','Colva Beach','Mangeshi Temple','Shanta Durga Temple','Arvalem Caves','Butterfly Beach','Cabo de Rama Fort'],
      ooty:        ['Ooty Lake','Botanical Gardens','Doddabetta Peak','Rose Garden','Mudumalai National Park','Pykara Lake','Avalanche Lake','Emerald Lake','Lamb Rock','Needle Rock','Kalhatty Falls','Coonoor','Sim Park','Thread Garden','Wax World'],
      kodaikanal:  ['Kodai Lake','Coaker Walk','Bryant Park','Pillar Rocks','Bear Shola Falls','Silver Cascade Falls','Berijam Lake','Dolphin Nose','Green Valley View','Fairy Falls','Kukkal Caves','Mannavanur Lake','Vattakanal','Pine Forest','Pambar Falls'],
      munnar:      ['Eravikulam National Park','Tea Museum','Mattupetty Dam','Echo Point','Anamudi Peak','Kundala Lake','Attukal Waterfalls','Chinnar Wildlife Sanctuary','Rajamala','Pothamedu Viewpoint','Lakkam Waterfalls','Nyayamakad Waterfall','Meesapulimala','Devikulam','Pallivasal'],
      coorg:       ['Abbey Falls','Raja Seat','Nagarhole National Park','Iruppu Falls','Talacauvery','Brahmagiri Peak','Dubare Elephant Camp','Madikeri Fort','Omkareshwara Temple','Chelavara Falls','Pushpagiri Wildlife Sanctuary','Mandalpatti','Nishani Motte','Honnamana Kere Lake','Cauvery Nisargadhama'],
      hampi:       ['Virupaksha Temple','Vittala Temple','Lotus Mahal','Elephant Stables','Hemakuta Hill','Achyutaraya Temple','Hazara Rama Temple','Matanga Hill','Tungabhadra River','Zanana Enclosure','Underground Shiva Temple','Sasivekalu Ganesha','Kadalekalu Ganesha','Pattabhirama Temple','Anegundi'],
      alleppey:    ['Alleppey Beach','Vembanad Lake','Krishnapuram Palace','Marari Beach','Pathiramanal Island','Ambalapuzha Temple','Mullakkal Temple','Revi Karunakaran Museum','Punnamada Lake','Kuttanad Backwaters','St Andrews Church','Mannarasala Temple','Arthunkal Church','Champakulam','Edathua Church'],
      wayanad:     ['Edakkal Caves','Chembra Peak','Banasura Sagar Dam','Soochipara Falls','Meenmutty Falls','Thirunelli Temple','Muthanga Wildlife Sanctuary','Pookode Lake','Phantom Rock','Karapuzha Dam','Neelimala Viewpoint','Lakkidi Viewpoint','Kuruva Island','Pakshipathalam','Chethalayam Falls'],
      mysore:      ['Mysore Palace','Chamundi Hills','Brindavan Gardens','St Philomena Church','Mysore Zoo','Jaganmohan Palace','Karanji Lake','Lalitha Mahal','Srirangapatna','Ranganathittu Bird Sanctuary','Nanjangud Temple','Somnathpur Temple','Melkote Temple','Shivanasamudra Falls','Talakadu'],
      pondicherry: ['Promenade Beach','Auroville','Sri Aurobindo Ashram','Paradise Beach','Chunnambar Boat House','Basilica of Sacred Heart','Manakula Vinayagar Temple','French War Memorial','Botanical Garden','Ousteri Lake','Serenity Beach','Karaikal Beach','Ariyankuppam River','Goubert Market','Immaculate Conception Cathedral'],
      kerala:      ['Munnar','Alleppey Backwaters','Kovalam Beach','Periyar Wildlife Sanctuary','Varkala Beach','Thekkady','Wayanad','Fort Kochi','Athirapally Falls','Bekal Fort','Padmanabhaswamy Temple','Kumarakom','Marari Beach','Silent Valley','Eravikulam National Park'],
    };

    const key = Object.keys(CURATED).find(k => destination.toLowerCase().includes(k));
    const curatedList = key ? CURATED[key] : [];

    // Add curated places not already in existing
    const combined = [...existing];
    curatedList.forEach(name => {
      if (seen.has(name)) return;
      seen.add(name);
      combined.push({ name, lat: lat + (Math.random() - 0.5) * 0.1, lon: lon + (Math.random() - 0.5) * 0.1, type: 'attraction' });
    });

    // Also fire Nominatim searches for unknown destinations
    if (combined.length < 15) {
      const searches = [
        `${destination} tourist place India`,
        `${destination} temple India`,
        `${destination} waterfall India`,
        `${destination} viewpoint India`,
        `${destination} beach India`,
        `${destination} fort India`,
      ].map(q =>
        fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=5&q=${encodeURIComponent(q)}`)
          .then(r => r.json()).catch(() => [])
      );
      Promise.all(searches).then(results => {
        results.flat().forEach(el => {
          const name = el.display_name?.split(',')[0]?.trim();
          if (!name || name.length < 3 || seen.has(name) || name.toLowerCase() === destination.toLowerCase()) return;
          seen.add(name);
          combined.push({ name, lat: parseFloat(el.lat), lon: parseFloat(el.lon), type: el.type || 'attraction' });
        });
        setPlaces(combined.slice(0, 20));
        setLoadingPlaces(false);
      });
    } else {
      setPlaces(combined.slice(0, 20));
      setLoadingPlaces(false);
    }
  }

  const toggleSelect = (name) =>
    setSelected((prev) => prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name]);

  const clickPlace = (place) => {
    window.L.marker([place.lat, place.lon]).addTo(markerGroup.current).bindPopup(`<b>${place.name}</b>`).openPopup();
    mapInstance.current.setView([place.lat, place.lon], 16);
  };

  const generateItinerary = () => {
    if (selected.length === 0) { alert('Please select at least one place.'); return; }
    setShowItinerary(true);
  };

  // Smart itinerary planner logic
  const buildItinerary = (places, totalDays) => {
    const days = Math.max(1, parseInt(totalDays) || Math.ceil(places.length / 3));
    const placesPerDay = Math.ceil(places.length / days);
    const result = [];
    let placeIdx = 0;

    for (let d = 0; d < days; d++) {
      const dayPlaces = places.slice(placeIdx, placeIdx + placesPerDay);
      placeIdx += placesPerDay;

      const schedule = [];
      // Breakfast
      schedule.push({ time: '07:00 – 09:00', icon: '🌅', title: 'Breakfast & Freshen Up', type: 'meal', note: 'Start your day with a local breakfast' });

      // Place slots: 09:30, 13:30, 16:00
      const visitSlots = [
        { time: '09:30 – 11:30', icon: '🏛', type: 'place', note: 'Best time — cool & less crowded' },
        { time: '12:00 – 13:00', icon: '🍽', title: 'Lunch Break', type: 'meal', note: 'Try local cuisine nearby' },
        { time: '13:30 – 15:30', icon: '🏛', type: 'place', note: 'Afternoon visit — carry water' },
        { time: '16:00 – 17:30', icon: '🏛', type: 'place', note: 'Golden hour — great for photos' },
      ];

      let slotIdx = 0;
      for (const slot of visitSlots) {
        if (slot.type === 'meal') {
          schedule.push(slot);
        } else if (dayPlaces[slotIdx]) {
          schedule.push({ ...slot, title: dayPlaces[slotIdx], type: 'place' });
          slotIdx++;
        }
      }

      // Dinner
      schedule.push({ time: '19:00 – 20:30', icon: '🌙', title: 'Dinner & Leisure', type: 'meal', note: 'Explore local restaurants or night market' });

      result.push({ day: d + 1, places: dayPlaces, schedule });
    }
    return result;
  };

  const [phone, setPhone] = useState('');
  const [shareStatus, setShareStatus] = useState('');

  // Build plain-text itinerary for sharing
  const buildShareText = (itinerary) => {
    let text = `✈ TravelPlanner Itinerary\n📍 Destination: ${destination}\n\n`;
    itinerary.forEach(({ day, schedule }) => {
      text += `--- DAY ${day} ---\n`;
      schedule.forEach(item => {
        text += `${item.time}  ${item.title}\n`;
        if (item.note) text += `   ↳ ${item.note}\n`;
      });
      text += '\n';
    });
    text += `Plan your trip at TravelPlanner 🌍`;
    return text;
  };

  const shareViaWhatsApp = (itinerary) => {
    const num = phone.replace(/\D/g, '');
    if (num.length < 10) { setShareStatus('error'); return; }
    const text = encodeURIComponent(buildShareText(itinerary));
    window.open(`https://wa.me/91${num}?text=${text}`, '_blank');
    setShareStatus('sent');
  };

  const addManual = () => {
    if (!manualPlace.trim()) { alert('Please enter a place name.'); return; }
    setSelected((prev) => [...prev, manualPlace.trim()]);
    setManualPlace('');
  };

  return (
    <div className="results-page">
      <Navbar />

      <div style={{ textAlign: 'center', padding: '40px 20px 20px' }}>
        <div className="section-tag">Results</div>
        <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700 }}>
          Top Places in <span style={{ color: 'var(--primary)' }}>{destination}</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', marginTop: 8 }}>Click a place to pin it on the map. Select places to build your itinerary.</p>
      </div>

      {/* Map */}
      <div className="map-wrapper">
        <div ref={mapRef} style={{ width: '100%', height: '420px' }} />
      </div>

      {/* Place Cards */}
      {loadingPlaces && (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '2rem', marginBottom: 12 }}>🔍</div>
          <p>Finding top places near <strong style={{ color: 'var(--primary)' }}>{destination}</strong>…</p>
        </div>
      )}
      {!loadingPlaces && places.length === 0 && destination && (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '2rem', marginBottom: 12 }}>📍</div>
          <p>No places found. Try adding places manually below.</p>
        </div>
      )}
      {!loadingPlaces && places.length > 0 && (
        <section className="section" style={{ paddingTop: 10 }}>
          <div className="section-header" style={{ marginBottom: 24 }}>
            <div className="section-tag">Nearby Attractions</div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 600 }}>Recommended Places <span style={{ color: 'var(--primary)' }}>({places.length})</span></h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: 6 }}>Click a card to pin on map · Click Add to include in itinerary</p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16 }}>
            {places.map((p) => (
              <div key={p.name} className={`place-card ${selected.includes(p.name) ? 'selected' : ''}`} onClick={() => clickPlace(p)}>
                <div className="place-name">📍 {p.name}</div>
                {p.type && <div style={{ fontSize: '0.72rem', color: 'var(--primary)', marginBottom: 8, textTransform: 'capitalize' }}>{p.type.replace(/_/g, ' ')}</div>}
                <button
                  className="btn-primary"
                  style={{ padding: '7px 18px', fontSize: '0.82rem' }}
                  onClick={(e) => { e.stopPropagation(); toggleSelect(p.name); }}
                >
                  {selected.includes(p.name) ? '✓ Added' : '+ Add'}
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap', padding: '0 20px 20px' }}>
        <button className="btn-primary" onClick={generateItinerary}>📋 Generate Itinerary</button>
        <button className="btn-outline" onClick={() => initialView.current && mapInstance.current.setView(initialView.current, 14)}>🔄 Reset Map</button>
      </div>

      {/* Manual Add */}
      <div className="manual-input-row">
        <input value={manualPlace} onChange={(e) => setManualPlace(e.target.value)} placeholder="Add a custom place..." />
        <button className="btn-primary" onClick={addManual}>+ Add</button>
      </div>

      {/* Itinerary */}
      {showItinerary && (() => {
        const itinerary = buildItinerary(selected, initDays);
        return (
          <section className="section" style={{ paddingTop: 10 }}>
            <div style={{ maxWidth: 750, margin: '0 auto' }}>
              <div className="section-header" style={{ marginBottom: 30 }}>
                <div className="section-tag">Your Plan</div>
                <h2 className="section-title">🗺️ Your Itinerary</h2>
                <p className="section-sub">{selected.length} places across {itinerary.length} day{itinerary.length > 1 ? 's' : ''} — perfectly timed.</p>
              </div>

              {itinerary.map(({ day, places: dayPlaces, schedule }) => (
                <div key={day} style={{ marginBottom: 32, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, overflow: 'hidden' }}>
                  {/* Day header */}
                  <div style={{ background: 'linear-gradient(135deg, rgba(231,111,81,0.25), rgba(255,171,118,0.1))', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>Day {day}</div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)', marginTop: 2 }}>
                        {dayPlaces.join(' • ') || 'Free day'}
                      </div>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'right' }}>
                      {dayPlaces.length} place{dayPlaces.length !== 1 ? 's' : ''}
                    </div>
                  </div>

                  {/* Timeline */}
                  <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 0 }}>
                    {schedule.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: 16, position: 'relative' }}>
                        {/* Timeline line */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                          <div style={{
                            width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                            background: item.type === 'meal' ? 'rgba(255,255,255,0.06)' : 'rgba(231,111,81,0.2)',
                            border: item.type === 'meal' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(231,111,81,0.4)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '1rem',
                          }}>{item.icon}</div>
                          {idx < schedule.length - 1 && (
                            <div style={{ width: 1, flex: 1, minHeight: 16, background: 'rgba(255,255,255,0.07)', margin: '4px 0' }} />
                          )}
                        </div>

                        {/* Content */}
                        <div style={{ paddingBottom: idx < schedule.length - 1 ? 16 : 0, flex: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 4 }}>
                            <div style={{ fontSize: '0.95rem', fontWeight: item.type === 'place' ? 700 : 500, color: item.type === 'place' ? 'var(--text)' : 'var(--text-muted)' }}>
                              {item.title}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600, background: 'rgba(231,111,81,0.1)', padding: '2px 10px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                              {item.time}
                            </div>
                          </div>
                          {item.note && (
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 3 }}>{item.note}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <button className="btn-primary" style={{ width: '100%', padding: 14 }} onClick={() => navigate('/booking')}>
                Book This Trip →
              </button>

              {/* Share Itinerary */}
              <div style={{ marginTop: 24, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 24 }}>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>📲 Share Itinerary via WhatsApp</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 16 }}>Enter a phone number to share this itinerary instantly on WhatsApp.</div>
                <div style={{ position: 'relative', marginBottom: 12 }}>
                  <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '0.9rem' }}>+91</span>
                  <input
                    type="tel"
                    placeholder="Enter 10-digit phone number"
                    value={phone}
                    onChange={e => { setPhone(e.target.value); setShareStatus(''); }}
                    style={{
                      width: '100%', padding: '11px 14px 11px 44px',
                      background: 'rgba(255,255,255,0.07)',
                      border: `1px solid ${shareStatus === 'error' ? 'var(--primary)' : 'rgba(255,255,255,0.12)'}`,
                      borderRadius: 10, color: 'var(--text)', fontSize: '0.95rem',
                      fontFamily: 'Poppins, sans-serif', outline: 'none', boxSizing: 'border-box',
                    }}
                  />
                </div>
                {shareStatus === 'error' && (
                  <div style={{ fontSize: '0.82rem', color: 'var(--primary)', marginBottom: 10 }}>⚠️ Please enter a valid 10-digit phone number.</div>
                )}
                {shareStatus === 'sent' && (
                  <div style={{ fontSize: '0.82rem', color: '#4ade80', marginBottom: 10 }}>✓ WhatsApp opened with your itinerary!</div>
                )}
                <button
                  onClick={() => shareViaWhatsApp(itinerary)}
                  style={{
                    width: '100%', padding: '12px 16px', borderRadius: 10, border: 'none',
                    background: 'linear-gradient(135deg, #25D366, #128C7E)',
                    color: '#fff', fontWeight: 600, fontSize: '0.95rem',
                    cursor: 'pointer', fontFamily: 'Poppins, sans-serif',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>💬</span> Share on WhatsApp
                </button>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 10 }}>
                  Opens WhatsApp with the full itinerary pre-filled. No data is stored.
                </div>
              </div>
            </div>
          </section>
        );
      })()}

      {/* Budget Estimator */}
      {destination && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section-header">
            <div className="section-tag">Plan Smart</div>
            <h2 className="section-title">Trip Cost Estimator</h2>
            <p className="section-sub">Estimated budget based on your trip details.</p>
          </div>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <BudgetEstimator initDest={destination} initDays={initDays} initPeople={initMembers} />
          </div>
        </section>
      )}

      <footer className="footer">© 2025 TravelPlanner · Built with ❤ for explorers</footer>
    </div>
  );
}
