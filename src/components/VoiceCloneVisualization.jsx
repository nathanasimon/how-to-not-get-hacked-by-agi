import React, { useState, useEffect } from 'react'
import './VoiceCloneVisualization.css'

function VoiceCloneVisualization() {
  const [audioSeconds, setAudioSeconds] = useState(0)
  const [isCloning, setIsCloning] = useState(false)
  const [cloneProgress, setCloneProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const handleStart = () => {
    setIsCloning(true)
    setCloneProgress(0)
    setIsComplete(false)
    
    const interval = setInterval(() => {
      setCloneProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsComplete(true)
          return 100
        }
        return prev + 2
      })
    }, 50)
  }

  const resetDemo = () => {
    setIsCloning(false)
    setCloneProgress(0)
    setIsComplete(false)
  }

  return (
    <div className="voice-clone-viz">
      <h2 className="viz-title">How voice cloning works</h2>
      <p className="viz-intro">
        Click the button below to see how quickly AI can copy someone's voice from audio samples.
      </p>

      <div className="clone-demo">
        <div className="audio-source">
          <div className="audio-label">Source Audio</div>
          <div className="audio-waveform">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i} 
                className="wave-bar"
                style={{
                  height: `${20 + Math.random() * 60}%`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
          <div className="audio-info">
            <span>{audioSeconds} seconds</span>
            <span className="audio-source-text">Instagram video, Facebook post, TikTok</span>
          </div>
        </div>

        <div className="clone-process">
          <div className="process-arrow">→</div>
          <div className="process-box">
            {isCloning ? (
              <>
                <div className="process-label">AI Processing...</div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${cloneProgress}%` }}
                  />
                </div>
                <div className="process-status">{cloneProgress}%</div>
              </>
            ) : (
              <div className="process-idle">Click to start</div>
            )}
          </div>
        </div>

        <div className="clone-result">
          <div className="result-label">Cloned Voice</div>
          <div className="result-waveform">
            {isComplete ? (
              <>
                {[...Array(20)].map((_, i) => (
                  <div 
                    key={i} 
                    className="wave-bar cloned"
                    style={{
                      height: `${20 + Math.random() * 60}%`,
                      animationDelay: `${i * 0.1}s`
                    }}
                  />
                ))}
                <div className="result-success">✓ Ready to use</div>
              </>
            ) : (
              <div className="result-placeholder">Waiting...</div>
            )}
          </div>
          <div className="result-info">
            {isComplete ? (
              <span className="result-ready">Can say anything in your voice</span>
            ) : (
              <span className="result-waiting">Processing...</span>
            )}
          </div>
        </div>
      </div>

      <div className="clone-controls">
        {!isCloning && !isComplete && (
          <button className="clone-btn" onClick={handleStart}>
            Start Cloning
          </button>
        )}
        {isComplete && (
          <button className="reset-btn" onClick={resetDemo}>
            Reset Demo
          </button>
        )}
      </div>

      <div className="clone-facts">
        <div className="fact-item">
          <strong>3 seconds</strong> of audio is enough
        </div>
        <div className="fact-item">
          <strong>$1/month</strong> for commercial tools
        </div>
        <div className="fact-item">
          <strong>85% accuracy</strong> from minimal samples
        </div>
      </div>
    </div>
  )
}

export default VoiceCloneVisualization

