import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { gsap } from 'gsap'

const CyberHero = () => {
  const mountRef = useRef(null)
  const textRef = useRef(null)
  const torusRef = useRef(null)

  useEffect(() => {
    // Three.js Setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.set(0, 0, 30)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mountRef.current.appendChild(renderer.domElement)

    // Post-processing
    const composer = new EffectComposer(renderer)
    const renderPass = new RenderPass(scene, camera)
    composer.addPass(renderPass)

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85
    )
    composer.addPass(bloomPass)

    // Create DNA-like helix structure
    const helixGroup = new THREE.Group()
    const count = 30
    const radius = 5
    const particleColor = new THREE.Color(0x00ffff)

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 10
      const x = Math.sin(angle) * radius
      const y = Math.cos(angle) * radius
      const z = i * 0.5

      const particleGeometry = new THREE.SphereGeometry(0.2, 16, 16)
      const particleMaterial = new THREE.MeshBasicMaterial({ color: particleColor })
      const particle = new THREE.Mesh(particleGeometry, particleMaterial)
      particle.position.set(x, y, z)

      helixGroup.add(particle)

      if (i > 0) {
        const lineGeometry = new THREE.BufferGeometry()
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.3 })
        const line = new THREE.Line(
          lineGeometry,
          lineMaterial
        )
        line.geometry.setFromPoints([
          new THREE.Vector3(x, y, z),
          new THREE.Vector3(
            Math.sin(angle - (Math.PI * 10 / count)) * radius,
            Math.cos(angle - (Math.PI * 10 / count)) * radius,
            (i - 1) * 0.5
          )
        ])
        helixGroup.add(line)
      }
    }

    scene.add(helixGroup)
    torusRef.current = helixGroup

    // Floating hologram effect
    const hologramGeometry = new THREE.TorusKnotGeometry(8, 3, 100, 16)
    const hologramMaterial = new THREE.MeshStandardMaterial({
      color: 0x00ffff,
      emissive: 0x00ffff,
      emissiveIntensity: 0.5,
      wireframe: true,
      transparent: true,
      opacity: 0.5
    })
    const hologram = new THREE.Mesh(hologramGeometry, hologramMaterial)
    hologram.position.y = -5
    scene.add(hologram)

    // Particle system
    const particleCount = 1000
    const particlesGeometry = new THREE.BufferGeometry()
    const posArray = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 50
    }

    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(posArray, 3)
    )

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x00ffff,
      size: 0.1,
      transparent: true,
      opacity: 0.8
    })

    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)

    // Mouse movement animation
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = (e.clientY / window.innerHeight) * 2 - 1

      gsap.to(helixGroup.rotation, {
        x: y * -0.3,
        y: x * 0.5,
        duration: 1.5
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Animation loop
    const clock = new THREE.Clock()

    const animate = () => {
      requestAnimationFrame(animate)

      const elapsedTime = clock.getElapsedTime()

      helixGroup.rotation.z += 0.002
      hologram.rotation.x = elapsedTime * 0.1
      hologram.rotation.y = elapsedTime * 0.1

      particles.rotation.x = elapsedTime * 0.01
      particles.rotation.y = elapsedTime * 0.02

      composer.render()
    }
    animate()

    // Text animation
    gsap.from(textRef.current.children, {
      opacity: 0,
      y: 50,
      stagger: 0.15,
      duration: 1.2,
      delay: 0.5,
      ease: "back.out(1.2)"
    })

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      composer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      mountRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900">
      {/* Three.js Canvas */}
      <div ref={mountRef} className="absolute inset-0" />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/40" />

      {/* Content */}
      <div
        ref={textRef}
        className="relative mt-6 z-10 h-full flex flex-col justify-center px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 max-w-7xl mx-auto"
      >
        <span className="inline-block mb-4 sm:mb-6 p-5 py-1 bg-blue-900/30 backdrop-blur border border-blue-400/30 rounded-full text-blue-300 text-xs sm:text-sm w-fit">
          Enterprise Blockchain Solutions
        </span>


        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-snug sm:leading-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Revolutionize
          </span>
          <br />
          And Reach Casino & iGaming Players Instantly with A2P SMS
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-10 max-w-2xl">
          Convert, retain, and grow your iGaming audience with powerful SMS marketing.
          Fast delivery. High open rates. Casino-friendly routes.
        </p>

        <div className="flex flex-wrap gap-4">
          <button className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 flex items-center gap-2 text-sm sm:text-base">
            Get Started
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-5 sm:w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all duration-300 flex items-center gap-2 text-sm sm:text-base">
            Request Demo
          </button>
        </div>
      </div>

    </div>
  )
}

export default CyberHero
