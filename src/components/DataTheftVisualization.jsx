import React, { useRef, useEffect } from 'react'
import './DataTheftVisualization.css'

const DataTheftVisualization = () => {
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

    // Your device (source)
    const yourDevice = {
      x: canvas.width * 0.2,
      y: canvas.height * 0.5,
      label: 'Your Device'
    }

    // AI attacker (destination)
    const attacker = {
      x: canvas.width * 0.8,
      y: canvas.height * 0.5,
      label: 'AI Attacker'
    }

    // Data packets being stolen
    const packets = []

    const createPacket = () => {
      packets.push({
        x: yourDevice.x,
        y: yourDevice.y,
        targetX: attacker.x,
        targetY: attacker.y,
        progress: 0,
        label: ['Password', 'Email', 'Credit Card', 'Photos', 'Messages'][Math.floor(Math.random() * 5)]
      })
    }

    // Create packets periodically (slower)
    setInterval(createPacket, 4000)

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      time += 0.003

      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw connection line
      ctx.strokeStyle = '#000000'
      ctx.lineWidth = 0.5
      ctx.globalAlpha = 0.1
      ctx.setLineDash([5, 5])
      ctx.beginPath()
      ctx.moveTo(yourDevice.x, yourDevice.y)
      ctx.lineTo(attacker.x, attacker.y)
      ctx.stroke()
      ctx.setLineDash([])
      ctx.globalAlpha = 1

      // Draw your device
      ctx.fillStyle = '#000000'
      ctx.beginPath()
      ctx.arc(yourDevice.x, yourDevice.y, 15, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 14px -apple-system'
      ctx.textAlign = 'center'
      ctx.fillText('📱', yourDevice.x, yourDevice.y + 5)
      ctx.fillStyle = '#000000'
      ctx.font = '12px -apple-system'
      ctx.fillText(yourDevice.label, yourDevice.x, yourDevice.y + 35)

      // Draw attacker
      ctx.fillStyle = '#ff3b30'
      ctx.beginPath()
      ctx.arc(attacker.x, attacker.y, 15, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 14px -apple-system'
      ctx.fillText('🤖', attacker.x, attacker.y + 5)
      ctx.fillStyle = '#ff3b30'
      ctx.font = '12px -apple-system'
      ctx.fillText(attacker.label, attacker.x, attacker.y + 35)

      // Update and draw packets
      packets.forEach((packet, index) => {
        packet.progress += 0.008
        if (packet.progress > 1) {
          packets.splice(index, 1)
          return
        }

        packet.x = yourDevice.x + (attacker.x - yourDevice.x) * packet.progress
        packet.y = yourDevice.y + (attacker.y - yourDevice.y) * packet.progress

        ctx.fillStyle = '#ff3b30'
        ctx.beginPath()
        ctx.arc(packet.x, packet.y, 5, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = '#000000'
        ctx.font = '10px -apple-system'
        ctx.textAlign = 'center'
        ctx.fillText(packet.label, packet.x, packet.y - 10)
      })
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="data-theft-viz-section">
      <div className="data-theft-viz-content">
        <h2 className="data-theft-viz-title">How AI steals your data</h2>
        <p className="data-theft-viz-description">
          Watch data packets move from your device to an AI attacker. 
          Passwords. Emails. Credit cards. Photos. Messages. 
          Once AI gets in, it takes everything.
        </p>
      </div>
      <div className="data-theft-viz-container">
        <canvas ref={canvasRef} className="data-theft-viz-canvas" />
      </div>
    </div>
  )
}

export default DataTheftVisualization

