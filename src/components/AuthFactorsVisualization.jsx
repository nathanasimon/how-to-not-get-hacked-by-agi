import React, { useRef, useEffect } from 'react'
import './AuthFactorsVisualization.css'

const AuthFactorsVisualization = () => {
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

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      time += 0.002

      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      // Draw three layers from inside out
      const layers = [
        { radius: 50, label: 'Password', factor: 'Something you know', color: '#ff3b30', y: centerY - 80 },
        { radius: 50, label: 'Smartphone', factor: 'Something you have', color: '#ff9500', y: centerY },
        { radius: 50, label: 'Fingerprint', factor: 'Something you are', color: '#000000', y: centerY + 80 }
      ]

      layers.forEach((layer, index) => {
        // Draw circle
        ctx.strokeStyle = layer.color
        ctx.lineWidth = 2
        ctx.globalAlpha = 0.6
        ctx.beginPath()
        ctx.arc(centerX, layer.y, layer.radius, 0, Math.PI * 2)
        ctx.stroke()
        ctx.globalAlpha = 1

        // Draw label inside
        ctx.fillStyle = layer.color
        ctx.font = 'bold 16px -apple-system'
        ctx.textAlign = 'center'
        ctx.fillText(layer.label, centerX, layer.y - 5)
        ctx.font = '11px -apple-system'
        ctx.fillText(layer.factor, centerX, layer.y + 12)

        // Draw connecting line to next layer
        if (index < layers.length - 1) {
          ctx.strokeStyle = '#000000'
          ctx.lineWidth = 1
          ctx.globalAlpha = 0.2
          ctx.beginPath()
          ctx.moveTo(centerX, layer.y + layer.radius)
          ctx.lineTo(centerX, layers[index + 1].y - layers[index + 1].radius)
          ctx.stroke()
          ctx.globalAlpha = 1
        }
      })

      // Draw blocked attacks
      for (let i = 0; i < 3; i++) {
        const angle = time * 0.1 + i * 2
        const x = centerX + Math.cos(angle) * 200
        const y = centerY + Math.sin(angle) * 100
        
        ctx.fillStyle = '#ff3b30'
        ctx.beginPath()
        ctx.arc(x, y, 6, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = '#ffffff'
        ctx.font = '10px -apple-system'
        ctx.fillText('✗', x, y + 3)
      }
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="auth-factors-viz-section">
      <div className="auth-factors-viz-content">
        <h2 className="auth-factors-viz-title">Three layers stop AI</h2>
        <p className="auth-factors-viz-description">
          Your account needs three layers. Password. Smartphone. Fingerprint. 
          Each layer blocks different attacks. Together they stop AI completely.
        </p>
      </div>
      <div className="auth-factors-viz-container">
        <canvas ref={canvasRef} className="auth-factors-viz-canvas" />
      </div>
    </div>
  )
}

export default AuthFactorsVisualization

