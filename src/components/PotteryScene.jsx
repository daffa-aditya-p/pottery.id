import { useRef, useState, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* ─────────────── constants ─────────────── */
const MODEL_PATH = '/gerabah.glb'
const LERP_SPEED = 0.05
const ROTATION_SPEED = 0.25
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

/* ─────────────── mobile gyroscope parallax ─────────────── */
function useMobileParallax(target) {
  useEffect(() => {
    const isMobile = window.matchMedia('(pointer: coarse)').matches
    if (!isMobile) return

    const onOrientation = (e) => {
      const x = (e.gamma || 0) / 45
      const y = (e.beta || 0) / 45 - 0.5
      target.current.x = Math.max(-1, Math.min(1, x))
      target.current.y = Math.max(-1, Math.min(1, y))
    }

    window.addEventListener('deviceorientation', onOrientation, { passive: true })
    return () => window.removeEventListener('deviceorientation', onOrientation)
  }, [target])
}

/* ─────────────── scroll tracker ─────────────── */
function useScrollParallax() {
  const scrollY = useRef(0)
  useEffect(() => {
    const onScroll = () => { scrollY.current = window.scrollY }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return scrollY
}

/* ─────────────── animated pottery object ─────────────── */
function AnimatedPotteryGroup({ mouse, target, object }) {
  const groupRef = useRef()
  const time = useRef(0)
  const scrollY = useScrollParallax()

  useFrame((_, delta) => {
    if (!groupRef.current) return
    const d = Math.min(delta, 0.05)
    time.current += d

    // Smooth interpolation for mouse parallax
    mouse.current.x += (target.current.x - mouse.current.x) * LERP_SPEED
    mouse.current.y += (target.current.y - mouse.current.y) * LERP_SPEED

    const scrollOffset = scrollY.current

    // Slow rotation + scroll rotation (intensified)
    groupRef.current.rotation.y += d * ROTATION_SPEED
    groupRef.current.rotation.y += scrollOffset * 0.001

    // Mouse parallax tilt + scroll tilt (intensified)
    groupRef.current.rotation.x = (mouse.current.y * MOUSE_FACTOR.y * -1) + (scrollOffset * 0.002)
    groupRef.current.rotation.z = mouse.current.x * MOUSE_FACTOR.y * 0.3

    // Horizontal parallax shift
    groupRef.current.position.x = mouse.current.x * MOUSE_FACTOR.x

    // Gentle floating bob + Scroll parallax (moves up dramatically as you scroll down)
    groupRef.current.position.y =
      Math.sin(time.current * 0.8) * 0.12 + mouse.current.y * -0.2 + (scrollOffset * -0.005)
  })

  return (
    <group ref={groupRef} scale={1.2}>
      <primitive object={object} />
    </group>
  )
}

/* ─────────────── GLB loader ─────────────── */
function GLBModel({ mouse, target, onError }) {
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
              const s = 2.2 / maxDim
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
  }, [onError])

  if (!loadedObject) return null

  return <AnimatedPotteryGroup mouse={mouse} target={target} object={loadedObject} />
}

/* ─────────────── main exported component ─────────────── */
export default function PotteryScene() {
  const containerRef = useRef(null)
  const [webglOk, setWebglOk] = useState(true)
  const [tabActive, setTabActive] = useState(true)
  const [loadError, setLoadError] = useState(null)
  const { mouse, target } = useMouseParallax()
  useMobileParallax(target)

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
            <p className="mb-6 text-sm text-white/80">
              Saat ini file tersebut hanya berukuran <b>192 byte</b> (file 3D asli seharusnya berukuran Megabyte). Hal ini sering terjadi jika Anda mengunduh dari GitHub tanpa Git LFS.
            </p>
            <div className="rounded border border-white/10 bg-black/40 p-3 text-xs text-clay-100">
              <b>Solusi:</b> Silakan replace/timpa file public/gerabah.glb dengan file 3D yang valid. Layar ini akan otomatis hilang setelah file diperbaiki.
            </div>
          </div>
        </div>
      )}

      <Canvas
        frameloop={tabActive ? 'always' : 'never'}
        dpr={[1, MAX_PIXEL_RATIO]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        camera={{ position: [0, 0, 5], fov: 45, near: 0.1, far: 20 }}
        style={{ background: 'transparent' }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0)
          gl.toneMapping = THREE.ACESFilmicToneMapping
          gl.toneMappingExposure = 1.2
        }}
      >
        <ambientLight intensity={1.5} color="#ffffff" />
        <directionalLight position={[5, 5, 5]} intensity={2.5} color="#fffcf5" />
        <directionalLight position={[-5, 5, -5]} intensity={1.0} color="#e0e5ff" />
        <pointLight position={[0, -5, 5]} intensity={2.0} color="#ffffff" distance={15} decay={2} />

        <GLBModel mouse={mouse} target={target} onError={setLoadError} />
      </Canvas>
    </div>
  )
}
