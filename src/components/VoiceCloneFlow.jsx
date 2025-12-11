import React from 'react'
import './VoiceCloneFlow.css'

const VoiceCloneFlow = () => {
  return (
    <div className="voice-clone-flow-section">
      <div className="voice-clone-flow-content">
        <h2 className="voice-clone-flow-title">How voice cloning works</h2>
        <p className="voice-clone-flow-description">
          Three seconds of audio. $1 per month. Your voice cloned. Then it attacks.
        </p>
      </div>
      
      <div className="voice-clone-flow-diagram">
        <div className="flow-step">
          <div className="flow-icon">
            <div className="audio-wave">
              <div className="wave-bar" style={{ height: '20%' }}></div>
              <div className="wave-bar" style={{ height: '60%' }}></div>
              <div className="wave-bar" style={{ height: '40%' }}></div>
              <div className="wave-bar" style={{ height: '80%' }}></div>
              <div className="wave-bar" style={{ height: '30%' }}></div>
            </div>
          </div>
          <div className="flow-label">3 seconds</div>
          <div className="flow-sublabel">of audio</div>
        </div>

        <div className="flow-arrow">→</div>

        <div className="flow-step">
          <div className="flow-icon">
            <div className="ai-icon">AI</div>
          </div>
          <div className="flow-label">$1/month</div>
          <div className="flow-sublabel">processes</div>
        </div>

        <div className="flow-arrow">→</div>

        <div className="flow-step">
          <div className="flow-icon">
            <div className="cloned-wave">
              <div className="wave-bar" style={{ height: '20%' }}></div>
              <div className="wave-bar" style={{ height: '60%' }}></div>
              <div className="wave-bar" style={{ height: '40%' }}></div>
              <div className="wave-bar" style={{ height: '80%' }}></div>
              <div className="wave-bar" style={{ height: '30%' }}></div>
            </div>
          </div>
          <div className="flow-label">Cloned voice</div>
          <div className="flow-sublabel">can say anything</div>
        </div>

        <div className="flow-arrow">→</div>

        <div className="flow-step">
          <div className="flow-icon attack">
            <div className="attack-icon">✗</div>
          </div>
          <div className="flow-label">Attack</div>
          <div className="flow-sublabel">calls your family</div>
        </div>
      </div>
    </div>
  )
}

export default VoiceCloneFlow

