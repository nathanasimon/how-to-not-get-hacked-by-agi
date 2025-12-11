import React from 'react'
import './AuthLayers.css'

const AuthLayers = () => {
  return (
    <div className="auth-layers-section">
      <div className="auth-layers-content">
        <h2 className="auth-layers-title">Three factors stop AI attacks</h2>
        <p className="auth-layers-description">
          AI can guess passwords. AI can intercept SMS codes. AI can clone voices.
          AI cannot clone your fingerprint. AI cannot replicate your face.
        </p>
      </div>

      <div className="auth-comparison-table">
        <div className="table-header">
          <div className="table-cell header-cell">Attack Method</div>
          <div className="table-cell header-cell">1-Factor</div>
          <div className="table-cell header-cell">2-Factor</div>
          <div className="table-cell header-cell">3-Factor</div>
        </div>

        <div className="table-row">
          <div className="table-cell method-cell">Password guessing</div>
          <div className="table-cell status-cell vulnerable">Vulnerable</div>
          <div className="table-cell status-cell protected">Protected</div>
          <div className="table-cell status-cell protected">Protected</div>
        </div>

        <div className="table-row">
          <div className="table-cell method-cell">SMS interception</div>
          <div className="table-cell status-cell vulnerable">Vulnerable</div>
          <div className="table-cell status-cell vulnerable">Vulnerable</div>
          <div className="table-cell status-cell protected">Protected</div>
        </div>

        <div className="table-row">
          <div className="table-cell method-cell">Voice cloning</div>
          <div className="table-cell status-cell vulnerable">Vulnerable</div>
          <div className="table-cell status-cell vulnerable">Vulnerable</div>
          <div className="table-cell status-cell protected">Protected</div>
        </div>

        <div className="table-row">
          <div className="table-cell method-cell">Deepfake video calls</div>
          <div className="table-cell status-cell vulnerable">Vulnerable</div>
          <div className="table-cell status-cell vulnerable">Vulnerable</div>
          <div className="table-cell status-cell protected">Protected</div>
        </div>

        <div className="table-row">
          <div className="table-cell method-cell">Fingerprint/Face cloning</div>
          <div className="table-cell status-cell protected">Protected</div>
          <div className="table-cell status-cell protected">Protected</div>
          <div className="table-cell status-cell protected">Protected</div>
        </div>
      </div>

      <div className="auth-factors-breakdown">
        <div className="factor-box">
          <div className="factor-number">1</div>
          <div className="factor-details">
            <div className="factor-name">Something you know</div>
            <div className="factor-example">Password</div>
            <div className="factor-weakness">AI can guess it</div>
          </div>
        </div>

        <div className="factor-plus">+</div>

        <div className="factor-box">
          <div className="factor-number">2</div>
          <div className="factor-details">
            <div className="factor-name">Something you have</div>
            <div className="factor-example">Smartphone</div>
            <div className="factor-weakness">AI can intercept codes</div>
          </div>
        </div>

        <div className="factor-plus">+</div>

        <div className="factor-box highlight">
          <div className="factor-number">3</div>
          <div className="factor-details">
            <div className="factor-name">Something you are</div>
            <div className="factor-example">Fingerprint / Face ID</div>
            <div className="factor-strength">AI cannot clone this</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthLayers
