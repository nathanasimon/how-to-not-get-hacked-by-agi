import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import './NetworkVisualization.css'

const NetworkVisualization = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    let scene, camera, renderer
    let animationFrameId
    const nodes = []
    const connections = []

    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    scene = new THREE.Scene()
    scene.background = new THREE.Color(0xffffff)

    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.set(0, 0, 12)

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(dpr)
    renderer.setSize(width, height)
    container.appendChild(renderer.domElement)

    // Create network nodes
    const nodeCount = 30
    const nodeGeometry = new THREE.SphereGeometry(0.08, 16, 16)
    const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 })

    for (let i = 0; i < nodeCount; i++) {
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial)
      const angle = (i / nodeCount) * Math.PI * 2
      const radius = 3 + Math.random() * 2
      node.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 4,
        Math.sin(angle) * radius
      )
      node.userData = {
        baseAngle: angle,
        baseRadius: radius,
        speed: 0.5 + Math.random() * 0.5
      }
      nodes.push(node)
      scene.add(node)
    }

    // Create connections
    const connectionMaterial = new THREE.LineBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.1
    })

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (Math.random() > 0.7) {
          const geometry = new THREE.BufferGeometry()
          const points = [
            nodes[i].position.x, nodes[i].position.y, nodes[i].position.z,
            nodes[j].position.x, nodes[j].position.y, nodes[j].position.z
          ]
          geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3))
          const line = new THREE.Line(geometry, connectionMaterial)
          connections.push({ line, node1: i, node2: j })
          scene.add(line)
        }
      }
    }

    let time = 0

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      time += 0.003

      // Animate nodes slowly
      nodes.forEach((node, i) => {
        const { baseAngle, baseRadius, speed } = node.userData
        node.position.x = Math.cos(baseAngle + time * speed * 0.3) * baseRadius
        node.position.z = Math.sin(baseAngle + time * speed * 0.3) * baseRadius
        node.position.y = (Math.random() - 0.5) * 4 + Math.sin(time * speed * 0.3 + i) * 0.3
      })

      // Update connections
      connections.forEach(({ line, node1, node2 }) => {
        const geometry = line.geometry
        const positions = geometry.attributes.position.array
        positions[0] = nodes[node1].position.x
        positions[1] = nodes[node1].position.y
        positions[2] = nodes[node1].position.z
        positions[3] = nodes[node2].position.x
        positions[4] = nodes[node2].position.y
        positions[5] = nodes[node2].position.z
        geometry.attributes.position.needsUpdate = true
      })

      // Rotate camera very slowly
      camera.position.x = Math.sin(time * 0.02) * 1.5
      camera.position.y = Math.cos(time * 0.015) * 1
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
          if (object instanceof THREE.Mesh || object instanceof THREE.Line) {
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
    <div className="network-viz-section">
      <div className="network-viz-content">
        <h2 className="network-viz-title">How attacks spread through networks</h2>
        <p className="network-viz-description">
          AI attacks don't happen alone. They spread through computer networks. 
          Each computer connects to others. Each connection can be a weakness. 
          The network grows. The danger multiplies.
        </p>
      </div>
      <div className="network-viz-container">
        <div ref={containerRef} className="network-viz-canvas" />
      </div>
    </div>
  )
}

export default NetworkVisualization

