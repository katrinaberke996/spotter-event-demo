import React, { useState, useEffect } from 'react';
import './WordCloud.css';

export default function WordCloud({ onSelect, questions, activeQuestion }) {
  const [active, setActive] = useState(null);

  // Clear active state when questions change (dataset switched)
  useEffect(() => { setActive(null); }, [questions]);

  // Sync with parent's activeQuestion
  useEffect(() => { setActive(activeQuestion); }, [activeQuestion]);

  const handleClick = (q) => {
    setActive(q.text);
    onSelect(q.text);
  };

  return (
    <div className="word-cloud-section">
      <p className="word-cloud-label">Step 2: Ask Spotter…</p>
      <div className="word-cloud">
        {questions.map((q) => (
          <button
            key={q.text}
            className={`wc-chip wc-${q.size} ${active === q.text ? 'wc-active' : ''}`}
            onClick={() => handleClick(q)}
          >
            {q.text}
          </button>
        ))}
      </div>
    </div>
  );
}