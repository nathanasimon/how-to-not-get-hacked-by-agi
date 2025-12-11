import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import './AttackSpreadVisualization.css'

const AttackSpreadVisualization = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    let scene, camera, renderer
    let animationFrameId
    const devices = []
    const connections = []
    let infectedCount = 0

    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    scene = new THREE.Scene()
    scene.background = new THREE.Color(0xffffff)

    camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
    camera.position.set(0, 0, 15)
    camera.lookAt(0, 0, 0)

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(dpr)
    renderer.setSize(width, height)
    container.appendChild(renderer.domElement)

    // Create devices (computers/phones)
    const deviceCount = 25
    const deviceGeometry = new THREE.SphereGeometry(0.15, 16, 16)
    const safeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 })
    const infectedMaterial = new THREE.MeshBasicMaterial({ color: 0xff3b30 })

    for (let i = 0; i < deviceCount; i++) {
      const angle = (i / deviceCount) * Math.PI * 2
      const radius = 3 + Math.random() * 2
      const device = new THREE.Mesh(deviceGeometry, safeMaterial.clone())
      device.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 4,
        Math.sin(angle) * radius
      )
      device.userData = {
        infected: false,
        infectionTime: Infinity,
        baseAngle: angle,
        baseRadius: radius
      }
      devices.push(device)
      scene.add(device)
    }

    // Start with 2 infected devices
    devices[0].userData.infected = true
    devices[0].userData.infectionTime = 0
    devices[0].material = infectedMaterial.clone()
    devices[5].userData.infected = true
    devices[5].userData.infectionTime = 0
    devices[5].material = infectedMaterial.clone()
    infectedCount = 2

    // Create connection lines - thin and clear
    const connectionMaterial = new THREE.LineBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.1,
      linewidth: 0.5
    })

    // Create connections between nearby devices
    for (let i = 0; i < deviceCount; i++) {
      for (let j = i + 1; j < deviceCount; j++) {
        const dx = devices[i].position.x - devices[j].position.x
        const dy = devices[i].position.y - devices[j].position.y
        const dz = devices[i].position.z - devices[j].position.z
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
        if (dist < 2.5) {
          const geometry = new THREE.BufferGeometry()
          const points = [
            devices[i].position.x, devices[i].position.y, devices[i].position.z,
            devices[j].position.x, devices[j].position.y, devices[j].position.z
          ]
          geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3))
          const line = new THREE.Line(geometry, connectionMaterial.clone())
          connections.push({ line, device1: i, device2: j })
          scene.add(line)
        }
      }
    }

    // Create AI attacker markers
    const attackerGeometry = new THREE.SphereGeometry(0.2, 16, 16)
    const attackerMaterial = new THREE.MeshBasicMaterial({ color: 0xff3b30 })
    const attackers = []
    for (let i = 0; i < 3; i++) {
      const attacker = new THREE.Mesh(attackerGeometry, attackerMaterial.clone())
      const angle = (i / 3) * Math.PI * 2
      attacker.position.set(
        Math.cos(angle) * 5,
        0,
        Math.sin(angle) * 5
      )
      attackers.push(attacker)
      scene.add(attacker)
    }

    let time = 0

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      time += 0.001

      // Very slowly rotate the whole scene
      scene.rotation.y = time * 0.02

      // Spread infection very slowly
      if (time > 5 && infectedCount < deviceCount) {
        devices.forEach((device, i) => {
          if (device.userData.infected && time > device.userData.infectionTime + 8) {
            devices.forEach((other, j) => {
              if (!other.userData.infected) {
                const dx = other.position.x - device.position.x
                const dy = other.position.y - device.position.y
                const dz = other.position.z - device.position.z
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
                if (dist < 2 && Math.random() > 0.998) {
                  other.userData.infected = true
                  other.userData.infectionTime = time
                  other.material = infectedMaterial.clone()
                  infectedCount++
                }
              }
            })
          }
        })
      }

      // Update connection colors based on infection
      connections.forEach(({ line, device1, device2 }) => {
        const d1Infected = devices[device1].userData.infected
        const d2Infected = devices[device2].userData.infected
        if (d1Infected || d2Infected) {
          line.material.color.setHex(0xff3b30)
          line.material.opacity = 0.3
        } else {
          line.material.color.setHex(0x000000)
          line.material.opacity = 0.15
        }
      })

      // Very slight camera movement
      camera.position.x = Math.sin(time * 0.01) * 0.5
      camera.position.y = Math.cos(time * 0.008) * 0.3
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
    <div className="attack-spread-viz-section">
      <div className="attack-spread-viz-content">
        <h2 className="attack-spread-viz-title">How AI attacks spread</h2>
        <p className="attack-spread-viz-description">
          Watch how attacks spread through a 3D network. Red spheres are infected devices. Black spheres are safe devices. 
          When a device gets infected, nearby devices turn red too. Connections turn red as infection spreads. 
          This is how AI attacks move through networks.
        </p>
      </div>
      <div className="attack-spread-viz-container">
        <div ref={containerRef} className="attack-spread-viz-canvas" />
        <div className="attack-spread-viz-legend">
          <div className="legend-item">
            <div className="legend-dot safe"></div>
            <span>Safe Device</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot infected"></div>
            <span>Infected Device</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot attacker"></div>
            <span>AI Attacker</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AttackSpreadVisualization


