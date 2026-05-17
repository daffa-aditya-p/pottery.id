import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* ─────────────── constants ─────────────── */
const MODEL_PATH = '/gerabah.glb'
const LERP_SPEED = 0.05
const ROTATION_SPEED = 0.2
const MOUSE_FACTOR = { x: 0.6, y: 0.4 }
const MAX_PIXEL_RATIO = 1.5

/* ─────────────── mouse tracker ─────────────── */
function useMouseParallax() {
  const mouse = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const isMobile = window.matchMedia('(pointer: coarse)').matches
    if (isMobile) return

    const onMove = (e) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return { mouse, target }
}

/* ─────────────── scroll tracker ─────────────── */
function useScrollParallax() {
  const scrollY = useRef(0)
  const viewportHeight = useRef(1)

  useEffect(() => {
    const readHeight = () => {
      viewportHeight.current = window.visualViewport?.height || window.innerHeight || 1
    }
    const onScroll = () => { scrollY.current = window.scrollY }
    readHeight()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', readHeight, { passive: true })
    window.visualViewport?.addEventListener('resize', readHeight)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', readHeight)
      window.visualViewport?.removeEventListener('resize', readHeight)
    }
  }, [])
  return { scrollY, viewportHeight }
}

/* ─────────────── animated pottery object ─────────────── */
function AnimatedPotteryGroup({ mouse, target, object, isMobile }) {
  const groupRef = useRef()
  const time = useRef(0)
  const { scrollY, viewportHeight } = useScrollParallax()
  const smoothScroll = useRef(0)
  const smoothLift = useRef(0)
  const smoothTilt = useRef(0)
  const smoothDrift = useRef(0)
  const smoothZoom = useRef(0)

  useFrame((_, delta) => {
    if (!groupRef.current) return
    const d = Math.min(delta, 0.05)
    time.current += d

    // Smooth interpolation for mouse parallax
    mouse.current.x += (target.current.x - mouse.current.x) * LERP_SPEED
    mouse.current.y += (target.current.y - mouse.current.y) * LERP_SPEED

    const maxScroll = viewportHeight.current * 2
    const targetScroll = Math.min(scrollY.current, maxScroll) / Math.max(maxScroll, 1)
    smoothScroll.current += (targetScroll - smoothScroll.current) * (isMobile ? 0.07 : 0.06)
    const eased = 1 - Math.pow(1 - smoothScroll.current, 3)
    const baseY = isMobile ? -0.08 : -0.02

    const liftTarget = isMobile ? -0.24 * eased : -0.34 * eased
    const tiltTarget = isMobile ? 0.3 * eased : 0.42 * eased
    const driftTarget = (isMobile ? 0.06 : 0.11) * Math.sin(eased * Math.PI * 0.95)
    const zoomTarget = isMobile ? 0.08 * eased : 0.11 * eased

    smoothLift.current += (liftTarget - smoothLift.current) * 0.08
    smoothTilt.current += (tiltTarget - smoothTilt.current) * 0.08
    smoothDrift.current += (driftTarget - smoothDrift.current) * 0.08
    smoothZoom.current += (zoomTarget - smoothZoom.current) * 0.07

    if (isMobile) {
      groupRef.current.rotation.y += d * (0.2 + eased * 0.16)
      groupRef.current.rotation.x = Math.sin(time.current * 0.45) * 0.05 + smoothTilt.current * 0.45
      groupRef.current.rotation.z = Math.sin(time.current * 0.35) * 0.03 + smoothDrift.current * 0.2
      groupRef.current.position.x = mouse.current.x * 0.08 + smoothDrift.current
      groupRef.current.position.y = baseY + Math.sin(time.current * 0.8) * 0.06 + smoothLift.current
      const mobileScale = 1.05 + smoothZoom.current
      groupRef.current.scale.setScalar(mobileScale)
      return
    }

    // Desktop: rich interaction
    groupRef.current.rotation.y += d * (ROTATION_SPEED + eased * 0.22)
    groupRef.current.rotation.x = (mouse.current.y * MOUSE_FACTOR.y * -1) + smoothTilt.current
    groupRef.current.rotation.z = mouse.current.x * MOUSE_FACTOR.y * 0.3 + smoothDrift.current * 0.24

    groupRef.current.position.x = mouse.current.x * MOUSE_FACTOR.x + smoothDrift.current

    groupRef.current.position.y =
      baseY + Math.sin(time.current * 0.8) * 0.1 + mouse.current.y * -0.16 + smoothLift.current
    const desktopScale = 1.2 + smoothZoom.current
    groupRef.current.scale.setScalar(desktopScale)
  })

  return (
    <group ref={groupRef} scale={isMobile ? 1.05 : 1.2}>
      <primitive object={object} />
    </group>
  )
}

/* ─────────────── GLB loader ─────────────── */
function GLBModel({ mouse, target, onError, isMobile }) {
  const [loadedObject, setLoadedObject] = useState(null)

  useEffect(() => {
    let cancelled = false
    import('three/addons/loaders/GLTFLoader.js')
      .then(({ GLTFLoader }) => {
        const loader = new GLTFLoader()
        loader.load(
          MODEL_PATH,
          (gltf) => {
            if (cancelled) return
            const scene = gltf.scene
            
            const box = new THREE.Box3().setFromObject(scene)
            const size = new THREE.Vector3()
            const center = new THREE.Vector3()
            box.getSize(size)
            box.getCenter(center)
              const maxDim = Math.max(size.x, size.y, size.z)

            if (maxDim > 0) {
              scene.position.sub(center)
              const s = (isMobile ? 2.35 : 2.2) / maxDim
              scene.scale.setScalar(s)
              
              scene.traverse((child) => {
                if (child.isMesh) {
                  child.material = new THREE.MeshPhysicalMaterial({
                    color: new THREE.Color('#948375'),
                    metalness: 0.1,
                    roughness: 0.6,
                    clearcoat: 0.2,
                    clearcoatRoughness: 0.8,
                  })
                }
              })
              setLoadedObject(scene)
            } else {
              if (!cancelled && onError) onError("Model 3D kosong atau tidak valid.")
            }
          },
          undefined,
          (error) => {
            console.error("Load error:", error)
            if (!cancelled && onError) onError("File gerabah.glb gagal dimuat (corrupt/rusak).")
          }
        )
      })
      .catch((e) => {
        if (!cancelled && onError) onError(e.message)
      })

    return () => { cancelled = true }
  }, [isMobile, onError])

  if (!loadedObject) return null

  return <AnimatedPotteryGroup mouse={mouse} target={target} object={loadedObject} isMobile={isMobile} />
}

/* ─────────────── main exported component ─────────────── */
export default function PotteryScene() {
  const containerRef = useRef(null)
  const [webglOk, setWebglOk] = useState(true)
  const [tabActive, setTabActive] = useState(true)
  const [loadError, setLoadError] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const { mouse, target } = useMouseParallax()

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px), (pointer: coarse)')
    const update = () => setIsMobile(mediaQuery.matches)
    update()
    mediaQuery.addEventListener('change', update)
    return () => mediaQuery.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    try {
      const c = document.createElement('canvas')
      if (!(c.getContext('webgl2') || c.getContext('webgl'))) setWebglOk(false)
    } catch {
      setWebglOk(false)
    }
  }, [])

  useEffect(() => {
    const fn = () => setTabActive(!document.hidden)
    document.addEventListener('visibilitychange', fn)
    return () => document.removeEventListener('visibilitychange', fn)
  }, [])

  if (!webglOk) return null

  return (
    <div
      ref={containerRef}
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}
      aria-hidden="true"
    >
      {loadError && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-earth-900/90 pointer-events-auto backdrop-blur-md">
          <div className="max-w-md rounded-xl border border-red-500/30 bg-red-500/10 p-8 text-center shadow-2xl">
            <h2 className="mb-4 font-display text-2xl font-bold text-red-400">File 3D Rusak / Korup</h2>
            <p className="mb-3 text-sm text-white/80">
              Sistem telah mencoba memuat <b>public/gerabah.glb</b> seperti yang Anda minta, namun gagal karena file tersebut rusak.
            </p>
            <div className="rounded border border-white/10 bg-black/40 p-3 text-xs text-clay-100">
              <b>Solusi:</b> Silakan replace/timpa file public/gerabah.glb dengan file 3D yang valid. Layar ini akan otomatis hilang setelah file diperbaiki.
            </div>
          </div>
        </div>
      )}

      <Canvas
        frameloop={tabActive ? 'always' : 'never'}
        dpr={isMobile ? [0.9, 1.2] : [1, MAX_PIXEL_RATIO]}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        camera={{ position: isMobile ? [0, 0.02, 5.7] : [0, 0, 5], fov: isMobile ? 50 : 45, near: 0.1, far: 20 }}
        style={{ background: 'transparent' }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0)
          gl.toneMapping = THREE.ACESFilmicToneMapping
          gl.toneMappingExposure = isMobile ? 1.05 : 1.2
        }}
      >
        <ambientLight intensity={isMobile ? 1.15 : 1.35} color="#ffffff" />
        <directionalLight position={[5, 5, 5]} intensity={isMobile ? 1.85 : 2.3} color="#fffcf5" />
        <directionalLight position={[-5, 5, -5]} intensity={isMobile ? 0.75 : 0.95} color="#e0e5ff" />
        <pointLight position={[0, -4, 5]} intensity={isMobile ? 1.3 : 1.8} color="#ffffff" distance={15} decay={2} />

        <GLBModel mouse={mouse} target={target} onError={setLoadError} isMobile={isMobile} />
      </Canvas>
    </div>
  )
}
