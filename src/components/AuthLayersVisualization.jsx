import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import './AuthLayersVisualization.css'

const AuthLayersVisualization = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    let scene, camera, renderer
    let animationFrameId
    const layers = []

    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    scene = new THREE.Scene()
    scene.background = new THREE.Color(0xffffff)

    camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
    camera.position.set(0, 0, 6)

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(dpr)
    renderer.setSize(width, height)
    container.appendChild(renderer.domElement)

    // Create three concentric layers representing authentication factors
    const createLayer = (radius, segments, color, opacity) => {
      const geometry = new THREE.RingGeometry(radius - 0.1, radius + 0.1, segments)
      const material = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: opacity,
        side: THREE.DoubleSide
      })
      const mesh = new THREE.Mesh(geometry, material)
      mesh.rotation.x = Math.PI / 2
      return mesh
    }

    // Layer 1: Password (something you know) - inner
    const layer1 = createLayer(1, 32, 0xff3b30, 0.3)
    scene.add(layer1)
    layers.push(layer1)

    // Layer 2: Smartphone (something you have) - middle
    const layer2 = createLayer(2, 32, 0xff9500, 0.3)
    scene.add(layer2)
    layers.push(layer2)

    // Layer 3: Biometric (something you are) - outer
    const layer3 = createLayer(3, 32, 0x000000, 0.4)
    scene.add(layer3)
    layers.push(layer3)

    // Add particles between layers
    const createParticles = (count, radius) => {
      const geometry = new THREE.BufferGeometry()
      const positions = new Float32Array(count * 3)
      const colors = new Float32Array(count * 3)

      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2
        positions[i * 3] = Math.cos(angle) * radius
        positions[i * 3 + 1] = (Math.random() - 0.5) * 0.5
        positions[i * 3 + 2] = Math.sin(angle) * radius

        colors[i * 3] = 0
        colors[i * 3 + 1] = 0
        colors[i * 3 + 2] = 0
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

      const material = new THREE.PointsMaterial({
        size: 0.08,
        vertexColors: true,
        transparent: true,
        opacity: 0.6
      })

      return new THREE.Points(geometry, material)
    }

    const particles1 = createParticles(20, 1.5)
    const particles2 = createParticles(30, 2.5)
    const particles3 = createParticles(40, 3.5)

    scene.add(particles1)
    scene.add(particles2)
    scene.add(particles3)

    // Add connecting lines
    const createConnections = () => {
      const group = new THREE.Group()
      const material = new THREE.LineBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.1
      })

      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2
        const geometry = new THREE.BufferGeometry()
        const points = [
          Math.cos(angle) * 1, 0, Math.sin(angle) * 1,
          Math.cos(angle) * 2, 0, Math.sin(angle) * 2,
          Math.cos(angle) * 3, 0, Math.sin(angle) * 3
        ]
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3))
        const line = new THREE.Line(geometry, material)
        group.add(line)
      }

      return group
    }

    const connections = createConnections()
    scene.add(connections)

    let time = 0

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      time += 0.003

      // Rotate layers at different speeds - much slower
      layer1.rotation.z = time * 0.05
      layer2.rotation.z = -time * 0.04
      layer3.rotation.z = time * 0.03

      // Animate particles slowly
      particles1.rotation.y = time * 0.08
      particles2.rotation.y = -time * 0.06
      particles3.rotation.y = time * 0.05

      // Rotate connections very slowly
      connections.rotation.y = time * 0.02

      // Camera slight rotation - very subtle
      camera.position.x = Math.sin(time * 0.02) * 0.3
      camera.position.y = Math.cos(time * 0.015) * 0.2
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      if (!containerRef.current) return
      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

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
    <div className="auth-layers-viz-section">
      <div className="auth-layers-viz-content">
        <h2 className="auth-layers-viz-title">Three layers of protection</h2>
        <p className="auth-layers-viz-description">
          Each layer rotates independently. Password. Smartphone. Biometric. 
          They work together. They overlap. They create a barrier AI cannot penetrate.
        </p>
      </div>
      <div className="auth-layers-viz-container">
        <div ref={containerRef} className="auth-layers-viz-canvas" />
      </div>
    </div>
  )
}

export default AuthLayersVisualization

