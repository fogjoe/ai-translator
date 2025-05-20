import React, { useState } from 'react';

function App() {
  const [english, setEnglish] = useState('');
  const [chinese, setChinese] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    setLoading(true);
    const API_BASE_URL = process.env.REACT_APP_API_URL;
    const res = await fetch(`${API_BASE_URL}/api/translate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: english })
    });
    const data = await res.json();
    setChinese(data.translation);
    setLoading(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>English to Chinese Translator (DeepSeek)</h2>
      <textarea
        rows="6"
        cols="60"
        placeholder="Enter English text here..."
        value={english}
        onChange={(e) => setEnglish(e.target.value)}
      />
      <br />
      <button onClick={handleTranslate} disabled={loading}>
        {loading ? 'Translating...' : 'Translate'}
      </button>
      <h3>Chinese Translation:</h3>
      <div style={{ whiteSpace: 'pre-wrap', border: '1px solid #ccc', padding: 10 }}>
        {chinese}
      </div>
    </div>
  );
}

export default App;
