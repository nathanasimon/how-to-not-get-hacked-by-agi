import React from 'react'
import './Cover.css'

function Cover({ onStart }) {
  return (
    <div className="cover">
      <div className="cover-content">
        <div className="cover-title">
          <h1 className="title-main">HOW TO NOT GET</h1>
          <h1 className="title-accent">HACKED BY AGI</h1>
        </div>
        <p className="cover-subtitle">
          A guide to protecting yourself in the age of AI-powered cyberattacks
        </p>
        <div className="cover-warning">
          <span className="warning-icon">⚠️</span>
          <p>The threat is real. The time is now.</p>
        </div>
        <button className="cover-button" onClick={onStart}>
          START READING
        </button>
        <div className="cover-scroll-hint">
          <span>Scroll to explore</span>
          <div className="scroll-arrow">↓</div>
        </div>
      </div>
      <div className="cover-background">
        <div className="grid-overlay"></div>
        <div className="glitch-effect"></div>
      </div>
    </div>
  )
}

export default Cover
