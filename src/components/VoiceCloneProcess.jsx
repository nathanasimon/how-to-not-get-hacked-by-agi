import React, { useRef, useEffect } from 'react'
import './VoiceCloneProcess.css'

const VoiceCloneProcess = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId
    let step = 0
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
      time += 0.005

      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const centerY = canvas.height / 2
      const stepWidth = canvas.width / 4

      // Step 1: Source Audio
      const step1X = stepWidth * 0.5
      ctx.strokeStyle = '#000000'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(step1X - 30, centerY)
      ctx.lineTo(step1X + 30, centerY)
      for (let i = 0; i < 20; i++) {
        const x = step1X - 30 + (i / 20) * 60
        const y = centerY + Math.sin(time * 2 + i * 0.5) * 15
        ctx.lineTo(x, y)
      }
      ctx.stroke()
      ctx.fillStyle = '#000000'
      ctx.font = '12px -apple-system'
      ctx.textAlign = 'center'
      ctx.fillText('3 seconds', step1X, centerY + 40)
      ctx.fillText('of audio', step1X, centerY + 55)

      // Arrow 1
      ctx.strokeStyle = '#000000'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(step1X + 50, centerY)
      ctx.lineTo(stepWidth * 1.5 - 50, centerY)
      ctx.lineTo(stepWidth * 1.5 - 60, centerY - 5)
      ctx.moveTo(stepWidth * 1.5 - 50, centerY)
      ctx.lineTo(stepWidth * 1.5 - 60, centerY + 5)
      ctx.stroke()

      // Step 2: AI Processing
      const step2X = stepWidth * 1.5
      ctx.fillStyle = '#000000'
      ctx.font = 'bold 14px -apple-system'
      ctx.fillText('AI', step2X, centerY - 10)
      ctx.font = '12px -apple-system'
      ctx.fillText('processes', step2X, centerY + 5)
      ctx.fillText('$1/month', step2X, centerY + 40)

      // Arrow 2
      ctx.strokeStyle = '#000000'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(step2X + 50, centerY)
      ctx.lineTo(stepWidth * 2.5 - 50, centerY)
      ctx.lineTo(stepWidth * 2.5 - 60, centerY - 5)
      ctx.moveTo(stepWidth * 2.5 - 50, centerY)
      ctx.lineTo(stepWidth * 2.5 - 60, centerY + 5)
      ctx.stroke()

      // Step 3: Cloned Voice
      const step3X = stepWidth * 2.5
      ctx.strokeStyle = '#ff3b30'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(step3X - 30, centerY)
      ctx.lineTo(step3X + 30, centerY)
      for (let i = 0; i < 20; i++) {
        const x = step3X - 30 + (i / 20) * 60
        const y = centerY + Math.sin(time * 2 + i * 0.5 + Math.PI) * 15
        ctx.lineTo(x, y)
      }
      ctx.stroke()
      ctx.fillStyle = '#ff3b30'
      ctx.font = '12px -apple-system'
      ctx.fillText('Can say', step3X, centerY + 40)
      ctx.fillText('anything', step3X, centerY + 55)

      // Arrow 3
      ctx.strokeStyle = '#000000'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(step3X + 50, centerY)
      ctx.lineTo(stepWidth * 3.5 - 50, centerY)
      ctx.lineTo(stepWidth * 3.5 - 60, centerY - 5)
      ctx.moveTo(stepWidth * 3.5 - 50, centerY)
      ctx.lineTo(stepWidth * 3.5 - 60, centerY + 5)
      ctx.stroke()

      // Step 4: Attack
      const step4X = stepWidth * 3.5
      ctx.fillStyle = '#ff3b30'
      ctx.font = 'bold 14px -apple-system'
      ctx.fillText('ATTACK', step4X, centerY - 10)
      ctx.font = '12px -apple-system'
      ctx.fillText('Calls', step4X, centerY + 5)
      ctx.fillText('your family', step4X, centerY + 20)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="voice-clone-process-section">
      <div className="voice-clone-process-content">
        <h2 className="voice-clone-process-title">How voice cloning works</h2>
        <p className="voice-clone-process-description">
          Watch the process. 3 seconds of audio becomes a cloned voice. 
          AI processes it for $1/month. The cloned voice can say anything. 
          Then it attacks. Calls your family. Calls your bank.
        </p>
      </div>
      <div className="voice-clone-process-container">
        <canvas ref={canvasRef} className="voice-clone-process-canvas" />
      </div>
    </div>
  )
}

export default VoiceCloneProcess

