import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import './AttackVisualization.css'

const AttackVisualization = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    let scene, camera, renderer
    let animationFrameId
    let particles = []
    let attackWaves = []

    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    // Scene setup
    scene = new THREE.Scene()
    scene.background = new THREE.Color(0xffffff)

    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.set(0, 0, 8)

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(dpr)
    renderer.setSize(width, height)
    container.appendChild(renderer.domElement)

    // Create wave sources (representing attack points)
    const createWaveSource = (x, z, time) => {
      return {
        position: [x, 0, z],
        frequency: 2 + Math.random() * 1,
        amplitude: 0.3,
        phase: time * 2 + Math.random() * Math.PI * 2
      }
    }

    // Create interference field
    const createInterferenceField = (sources, size, resolution, time) => {
      const step = size / resolution
      const linesGroup = new THREE.Group()
      const material = new THREE.LineBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.15
      })

      // Calculate height map
      const heightMap = []
      for (let i = 0; i <= resolution; i++) {
        heightMap[i] = []
        const x = (i * step) - (size / 2)
        for (let j = 0; j <= resolution; j++) {
          const z = (j * step) - (size / 2)
          let height = 0

          sources.forEach(({ position: [sx, sy, sz], frequency, amplitude, phase }) => {
            const dx = x - sx
            const dz = z - sz
            const distance = Math.sqrt(dx * dx + dz * dz)
            height += Math.sin(distance * frequency - time * 3 + phase) *
                     amplitude * Math.exp(-distance * 0.4)
          })

          heightMap[i][j] = height
        }
      }

      // Create grid lines
      for (let i = 0; i <= resolution; i += 2) {
        const geometry = new THREE.BufferGeometry()
        const points = []
        const x = (i * step) - (size / 2)
        for (let j = 0; j <= resolution; j++) {
          const z = (j * step) - (size / 2)
          points.push(x, heightMap[i][j] * 0.5, z)
        }
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3))
        const line = new THREE.Line(geometry, material)
        linesGroup.add(line)
      }

      for (let j = 0; j <= resolution; j += 2) {
        const geometry = new THREE.BufferGeometry()
        const points = []
        const z = (j * step) - (size / 2)
        for (let i = 0; i <= resolution; i++) {
          const x = (i * step) - (size / 2)
          points.push(x, heightMap[i][j] * 0.5, z)
        }
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3))
        const line = new THREE.Line(geometry, material)
        linesGroup.add(line)
      }

      return linesGroup
    }

    // Create particles (representing data/attacks)
    const particleGeometry = new THREE.BufferGeometry()
    const particleCount = 100
    const positions = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 6
      positions[i + 1] = (Math.random() - 0.5) * 6
      positions[i + 2] = (Math.random() - 0.5) * 6
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x000000,
      size: 0.05,
      transparent: true,
      opacity: 0.6
    })
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particleSystem)

    // Create main interference field
    const mainGroup = new THREE.Group()
    scene.add(mainGroup)

    let time = 0

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      time += 0.002

      // Clear previous fields
      mainGroup.children.forEach((child) => {
        if (child instanceof THREE.Group) {
          child.children.forEach((line) => {
            if (line.geometry) line.geometry.dispose()
            if (line.material) line.material.dispose()
          })
          mainGroup.remove(child)
        }
      })

      // Create wave sources
      const sources = [
        createWaveSource(-1.5, -1, time),
        createWaveSource(1.5, -1, time),
        createWaveSource(0, 1.5, time),
        createWaveSource(-1, 1, time + 0.5),
        createWaveSource(1, 1, time + 0.3)
      ]

      // Create interference field
      const field = createInterferenceField(sources, 5, 40, time)
      mainGroup.add(field)

      // Rotate very slowly
      mainGroup.rotation.y = Math.sin(time * 0.02) * 0.05
      mainGroup.rotation.x = Math.cos(time * 0.015) * 0.03

      // Animate particles slowly
      const positions = particleSystem.geometry.attributes.position.array
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += Math.sin(time * 0.5 + i) * 0.0005
        if (positions[i * 3 + 1] > 3) positions[i * 3 + 1] = -3
      }
      particleSystem.geometry.attributes.position.needsUpdate = true

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return
      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
      if (renderer) {
        renderer.dispose()
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement)
        }
      }
      if (scene) {
        scene.traverse((object) => {
          if (object instanceof THREE.Mesh || object instanceof THREE.Line || object instanceof THREE.Points) {
            if (object.geometry) object.geometry.dispose()
            if (object.material) {
              if (Array.isArray(object.material)) {
                object.material.forEach(m => m.dispose())
              } else {
                object.material.dispose()
              }
            }
          }
        })
      }
    }
  }, [])

  return (
    <div className="attack-viz-section">
      <div className="attack-viz-content">
        <h2 className="attack-viz-title">How AI attacks spread</h2>
        <p className="attack-viz-description">
          AI doesn't attack one target at a time. It spreads like waves. Multiple attack sources create patterns. 
          The waves overlap. They get stronger. They reach everywhere.
        </p>
      </div>
      <div className="attack-viz-container">
        <div ref={containerRef} className="attack-viz-canvas" />
      </div>
    </div>
  )
}

export default AttackVisualization

