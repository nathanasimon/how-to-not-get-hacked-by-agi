import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import './AttackMultiplication.css'

const AttackMultiplication = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    let scene, camera, renderer
    let animationFrameId
    const devices = []
    const infectionPaths = []
    let time = 0

    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    scene = new THREE.Scene()
    scene.background = new THREE.Color(0xffffff)

    camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000)
    camera.position.set(0, 0, 20)
    camera.lookAt(0, 0, 0)

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(dpr)
    renderer.setSize(width, height)
    container.appendChild(renderer.domElement)

    // Create devices in a tree-like structure
    const createDevice = (x, y, z, infected = false) => {
      const geometry = new THREE.SphereGeometry(0.2, 16, 16)
      const material = infected 
        ? new THREE.MeshBasicMaterial({ color: 0xff3b30 })
        : new THREE.MeshBasicMaterial({ color: 0x000000 })
      
      const device = new THREE.Mesh(geometry, material)
      device.position.set(x, y, z)
      device.userData = {
        infected: infected,
        infectionTime: infected ? 0 : Infinity,
        children: []
      }
      return device
    }

    // Start with one infected device at the center
    const rootDevice = createDevice(0, 0, 0, true)
    devices.push(rootDevice)
    scene.add(rootDevice)

    // Create initial tree structure
    const createTree = (parent, depth, maxDepth, angle, radius) => {
      if (depth >= maxDepth) return

      const branches = depth === 0 ? 3 : 2 // Root has 3 branches, others have 2
      
      for (let i = 0; i < branches; i++) {
        const branchAngle = angle + (i - branches / 2) * (Math.PI / 3)
        const x = parent.position.x + Math.cos(branchAngle) * radius
        const y = parent.position.y + Math.sin(branchAngle) * radius
        const z = parent.position.z + (Math.random() - 0.5) * 2
        
        const device = createDevice(x, y, z, false)
        devices.push(device)
        scene.add(device)
        parent.userData.children.push(device)

        // Create connection line
        const geometry = new THREE.BufferGeometry()
        const points = [
          parent.position.x, parent.position.y, parent.position.z,
          x, y, z
        ]
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3))
        const material = new THREE.LineBasicMaterial({
          color: 0x000000,
          transparent: true,
          opacity: 0.2,
          linewidth: 0.5
        })
        const line = new THREE.Line(geometry, material)
        infectionPaths.push({ line, from: parent, to: device, active: false, progress: 0 })
        scene.add(line)

        // Recursively create more branches
        createTree(device, depth + 1, maxDepth, branchAngle, radius * 0.7)
      }
    }

    createTree(rootDevice, 0, 4, 0, 3)

    // Animate infection spreading
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      time += 0.003

      // Very slow rotation
      scene.rotation.y = time * 0.01

      // Spread infection through tree structure
      devices.forEach(device => {
        if (device.userData.infected && time > device.userData.infectionTime + 2) {
          device.userData.children.forEach(child => {
            if (!child.userData.infected) {
              // Find the infection path
              const path = infectionPaths.find(p => p.to === child && p.from === device)
              if (path) {
                path.active = true
                path.progress = Math.min(path.progress + 0.01, 1)
                
                // Update line color as infection spreads
                if (path.progress > 0.5) {
                  path.line.material.color.setHex(0xff3b30)
                  path.line.material.opacity = 0.4
                }

                // Infect the device when path completes
                if (path.progress >= 1) {
                  child.userData.infected = true
                  child.userData.infectionTime = time
                  child.material.color.setHex(0xff3b30)
                }
              }
            }
          })
        }
      })

      // Update path visualization
      infectionPaths.forEach(path => {
        if (path.active && path.progress < 1) {
          const geometry = path.line.geometry
          const positions = geometry.attributes.position.array
          const startX = path.from.position.x
          const startY = path.from.position.y
          const startZ = path.from.position.z
          const endX = path.to.position.x
          const endY = path.to.position.y
          const endZ = path.to.position.z
          
          // Animate the line growing
          const currentX = startX + (endX - startX) * path.progress
          const currentY = startY + (endY - startY) * path.progress
          const currentZ = startZ + (endZ - startZ) * path.progress
          
          positions[3] = currentX
          positions[4] = currentY
          positions[5] = currentZ
          geometry.attributes.position.needsUpdate = true
        }
      })

      // Subtle camera movement
      camera.position.x = Math.sin(time * 0.005) * 2
      camera.position.y = Math.cos(time * 0.004) * 1
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
    <div className="attack-multiplication-section">
      <div className="attack-multiplication-content">
        <h2 className="attack-multiplication-title">How AI hacking multiplies</h2>
        <p className="attack-multiplication-description">
          Watch how one infected device spreads to many. The red infection starts at one device. 
          It spreads through connections. Each infected device infects more devices. 
          The infection multiplies. This is how AI hacking software spreads through networks.
        </p>
      </div>
      <div className="attack-multiplication-container">
        <div ref={containerRef} className="attack-multiplication-canvas" />
        <div className="attack-multiplication-legend">
          <div className="legend-item">
            <div className="legend-dot safe"></div>
            <span>Safe Device</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot infected"></div>
            <span>Infected Device</span>
          </div>
          <div className="legend-item">
            <div className="legend-line"></div>
            <span>Infection Spreading</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AttackMultiplication

