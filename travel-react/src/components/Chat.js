import { useState, useRef, useEffect } from 'react';
import Navbar from './Navbar';

export default function Chat() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hello! I'm your AI tour guide 🗺 Ask me anything about places in India — history, best time to visit, hidden gems and more!" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    if (chatBoxRef.current) chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [messages, loading]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { from: 'user', text }]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:5000/chat?message=${encodeURIComponent(text)}`);
      const data = await res.json();
      setMessages((prev) => [...prev, { from: 'bot', text: data.reply }]);
    } catch {
      setMessages((prev) => [...prev, { from: 'bot', text: 'Oops! The server is not responding. Please make sure the backend is running.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-page">
      <Navbar />
      <div className="chat-wrapper">
        <div className="chat-container">
          <div className="chat-header">
            <div className="chat-avatar">🤖</div>
            <div className="chat-header-info">
              <h3>AI Tour Guide</h3>
              <p>● Online</p>
            </div>
          </div>

          <div className="chat-box" ref={chatBoxRef}>
            {messages.map((m, i) => (
              <div key={i} className={`msg ${m.from}`}>{m.text}</div>
            ))}
            {loading && (
              <div className="msg bot" style={{ opacity: 0.6 }}>
                <span>Thinking</span>
                <span style={{ letterSpacing: 2 }}> ···</span>
              </div>
            )}
          </div>

          <div className="chat-input-area">
            <input
              className="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask about any place in India..."
            />
            <button className="chat-send-btn" onClick={sendMessage}>➤</button>
          </div>
        </div>
      </div>
    </div>
  );
}
