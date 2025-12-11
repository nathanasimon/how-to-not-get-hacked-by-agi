import React, { useRef, useEffect } from 'react'
import './ProtectionLayersVisualization.css'

const ProtectionLayersVisualization = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId
    let time = 0

    const resize = () => {
      const container = canvas.parentElement
      canvas.width = container.clientWidth
      canvas.height = container.clientHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      time += 0.001

      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw three concentric circles (layers)
      const layers = [
        { radius: 60, label: 'Password', color: '#ff3b30', factor: 'Something you know' },
        { radius: 100, label: 'Smartphone', color: '#ff9500', factor: 'Something you have' },
        { radius: 140, label: 'Fingerprint/Face ID', color: '#000000', factor: 'Something you are' }
      ]

      // Draw layers
      layers.forEach((layer, index) => {
        ctx.strokeStyle = layer.color
        ctx.lineWidth = 2
        ctx.globalAlpha = 0.5
        ctx.beginPath()
        ctx.arc(centerX, centerY, layer.radius, 0, Math.PI * 2)
        ctx.stroke()
        ctx.globalAlpha = 1

        // Draw label
        ctx.fillStyle = layer.color
        ctx.font = 'bold 14px -apple-system'
        ctx.textAlign = 'center'
        const angle = (time * 0.05 + index * 0.5) * Math.PI * 2
        const labelX = centerX + Math.cos(angle) * layer.radius
        const labelY = centerY + Math.sin(angle) * layer.radius
        ctx.fillText(layer.label, labelX, labelY - 5)
        ctx.font = '11px -apple-system'
        ctx.fillText(layer.factor, labelX, labelY + 12)
      })

      // Draw center (protected account)
      ctx.fillStyle = '#000000'
      ctx.beginPath()
      ctx.arc(centerX, centerY, 20, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 16px -apple-system'
      ctx.textAlign = 'center'
      ctx.fillText('🔒', centerX, centerY + 5)
      ctx.fillStyle = '#000000'
      ctx.font = '12px -apple-system'
      ctx.fillText('Your Account', centerX, centerY + 40)

      // Draw blocked attack attempts (slower)
      for (let i = 0; i < 5; i++) {
        const angle = time * 0.2 + i
        const x = centerX + Math.cos(angle) * 180
        const y = centerY + Math.sin(angle) * 180
        
        ctx.fillStyle = '#ff3b30'
        ctx.beginPath()
        ctx.arc(x, y, 8, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = '#ffffff'
        ctx.font = '12px -apple-system'
        ctx.fillText('✗', x, y + 4)
      }
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="protection-layers-viz-section">
      <div className="protection-layers-viz-content">
        <h2 className="protection-layers-viz-title">How three layers protect you</h2>
        <p className="protection-layers-viz-description">
          Your account is in the center. Three layers protect it. Password. Smartphone. Biometric. 
          Red X marks show AI attacks being blocked. Each layer stops different types of attacks.
        </p>
      </div>
      <div className="protection-layers-viz-container">
        <canvas ref={canvasRef} className="protection-layers-viz-canvas" />
      </div>
    </div>
  )
}

export default ProtectionLayersVisualization

