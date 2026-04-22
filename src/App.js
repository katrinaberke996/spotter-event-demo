import React, { useState, useRef, useCallback } from 'react';
import { SpotterEmbed, useEmbedRef } from '@thoughtspot/visual-embed-sdk/react';
import { HostEvent } from '@thoughtspot/visual-embed-sdk';
import './config/thoughtspot';
import './App.css';
import WordCloud from './WordCloud';

const INDUSTRIES = [
  {
    id: 'finance',
    label: 'Finance',
    icon: '📈',
    worksheetId: 'af07f762-1854-4a80-8bdb-9250ee49ad1e',
    enabled: true,
    questions: [
      { text: 'Who are the top advisors by AUM?', size: 'xl' },
      { text: 'Show me asset allocation by class', size: 'lg' },
      { text: 'Which clients have the highest liabilities?', size: 'md' },
      { text: 'Average risk score by income category', size: 'lg' },
      { text: 'How many clients per advisor?', size: 'md' },
      { text: 'Break down assets by age group', size: 'sm' },
      { text: 'What is the total market value by sector?', size: 'xl' },
    ],
  },
  {
    id: 'retail',
    label: 'Retail',
    icon: '🛒',
    worksheetId: '782b50d1-fe89-4fee-812f-b5f9eb0a552d',
    enabled: true,
    questions: [
      { text: 'What are total sales by store region?', size: 'xl' },
      { text: 'Show me gross profit by product category', size: 'lg' },
      { text: 'Which stores have the highest foot traffic?', size: 'xl' },
      { text: 'Average basket size by customer age group', size: 'md' },
      { text: 'Top 10 products by revenue', size: 'lg' },
      { text: 'How does sales compare across store types?', size: 'md' },
      { text: 'What is the average ticket size by region?', size: 'sm' },
    ],
  },
  {
    id: 'insurance',
    label: 'Insurance',
    icon: '🛡️',
    worksheetId: '23800c1f-b595-4652-8de9-8607347751d2',
    enabled: true,
    questions: [
      { text: 'What is the loss ratio by line of business?', size: 'xl' },
      { text: 'Show me total GWP by state', size: 'lg' },
      { text: 'Which agents have the highest written premium?', size: 'xl' },
      { text: 'Claim frequency by risk tier', size: 'md' },
      { text: 'What are the top causes of loss?', size: 'lg' },
      { text: 'Show renewal rate by underwriter', size: 'md' },
      { text: 'Outstanding balance by payment status', size: 'sm' },
    ],
  },
  {
    id: 'fun',
    label: 'Just For Fun',
    icon: '🏅',
    worksheetId: 'acdd8a7c-975a-4664-81a4-e715df113864',
    enabled: true,
    questions: [
      { text: 'Which country has the most medals?', size: 'xl' },
      { text: 'Show me top sports by athlete count', size: 'lg' },
      { text: 'Who are the most decorated athletes?', size: 'xl' },
      { text: 'Compare Summer vs Winter Games', size: 'md' },
      { text: 'Average age by sport', size: 'lg' },
      { text: 'Medal trends over time', size: 'md' },
      { text: 'Which events have the tallest athletes?', size: 'sm' },
    ],
  },
];

const SpotterPanel = React.memo(({ worksheetId, onReady }) => {
  const embedRef = useEmbedRef();

  const handleLoad = useCallback(() => {
    if (!onReady) return;
    onReady((query) => {
      try {
        if (embedRef.current) {
          embedRef.current.trigger(HostEvent.SpotterSearch, {
            query,
            executeSearch: true,
          });
        }
      } catch (e) {
        console.warn('Spotter trigger error:', e);
      }
    });
  }, [embedRef, onReady]);

  return (
    <SpotterEmbed
      key={worksheetId}
      ref={embedRef}
      worksheetId={worksheetId}
      frameParams={{ height: '1000px', width: '100%' }}
      hideSampleQuestions={false}
      disableSourceSelection={true}
      onLoad={handleLoad}
      onError={(e) => console.error('Spotter error:', e)}
    />
  );
});

export default function App() {
  const [selected, setSelected] = useState(INDUSTRIES[3]);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [isWide, setIsWide] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const triggerQueryRef = useRef(null);

  const handleSpotterReady = useCallback((triggerFn) => {
    triggerQueryRef.current = triggerFn;
    setTimeout(() => setIsLoading(false), 5000);
  }, []);

  const handleQuestionSelect = useCallback((query) => {
    setActiveQuestion(query);
    setIsActive(true);
    setIsWide(true);
    try {
      if (triggerQueryRef.current) {
        triggerQueryRef.current(query);
      }
    } catch (e) {
      console.warn('Query trigger error:', e);
    }
  }, []);

  const handleDatasetSwitch = useCallback((ind) => {
    if (!ind.enabled) return;
    triggerQueryRef.current = null;
    setIsLoading(true);
    setIsWide(false);
    setSelected(ind);
    setActiveQuestion(null);
    setIsActive(false);
  }, []);

  return (
    <div className="app">
      <div className="bg" />
      <div className="grid-lines" />

      <header className="header">
        <div className="header-left">
          <img src="/thoughtspot_logo.jpeg" alt="ThoughtSpot" className="ts-logo-img" />
          <span className="ts-wordmark">Thought<span>Spot</span></span>
        </div>
        <div className="header-right">
          <div className="header-event-info">
            <span className="header-event-name">Data Decoded LDN 2026</span>
            <span className="header-event-sub">22–23 April · Olympia London</span>
          </div>
        </div>
      </header>

      <section className="hero">
        <h1 className="hero-title">
          Meet <span className="highlight">Spotter</span> -<br />your AI Analyst
        </h1>
        <p className="hero-subtitle">
          Ask questions, explore insights, and discover what's shaping the future of data. Powered by ThoughtSpot.
        </p>
        <div className="industry-selector">
          <span className="industry-selector-label">Step 1: Choose your industry</span>
          <div className="industry-buttons">
            {INDUSTRIES.map((ind) => (
              <button
                key={ind.id}
                className={`industry-btn ${selected.id === ind.id ? 'industry-btn--active' : ''} ${!ind.enabled ? 'industry-btn--disabled' : ''}`}
                onClick={() => handleDatasetSwitch(ind)}
                disabled={!ind.enabled}
                title={!ind.enabled ? 'Coming soon' : ind.label}
              >
                <span className="industry-btn-icon">{ind.icon}</span>
                <span className="industry-btn-label">{ind.label}</span>
                {!ind.enabled && <span className="industry-btn-soon">Soon</span>}
              </button>
            ))}
          </div>
        </div>
      </section>

      <WordCloud
        onSelect={handleQuestionSelect}
        questions={selected.questions}
        activeQuestion={activeQuestion}
      />

      <div className={`spotter-wrapper ${isWide ? 'spotter-wrapper--wide' : ''}`}>
        <div className="spotter-glow" />
        <div className="spotter-card">

          {!isActive && (
            <div className="spotter-greeting">
              <img src="/thoughtspot_logo.jpeg" alt="Spotter" className="spotter-greeting-icon" />
              <p className="spotter-greeting-text">Hi, I'm Spotter! How can I help?</p>
            </div>
          )}

          {isLoading && (
            <div className="spotter-loading">
              <span className="spotter-loading-text">Spotter is warming up…</span>
              <div className="spotter-dots">
                <div className="spotter-dot" />
                <div className="spotter-dot" />
                <div className="spotter-dot" />
              </div>
            </div>
          )}

          <div
            className={`spotter-embed-area ${isActive ? 'spotter-embed-active' : 'spotter-embed-default'} ${isLoading ? 'spotter-embed-hidden' : ''}`}
            onClick={() => setIsActive(true)}
          >
            <SpotterPanel
              worksheetId={selected.worksheetId}
              onReady={handleSpotterReady}
            />
          </div>

        </div>
      </div>



      <footer className="footer">
  Powered by <a href="https://www.thoughtspot.com/product/agents" target="_blank" rel="noopener noreferrer">ThoughtSpot Spotter</a>
</footer>
    </div>
  );
}