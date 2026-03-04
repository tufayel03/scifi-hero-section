import React, { useMemo, useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ScrollControls, useScroll, Environment, Stars, useTexture, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';
import { OverlayUI } from './OverlayUI';

export const curvePoints = [
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0, 0, -50),
  new THREE.Vector3(30, 10, -100),
  new THREE.Vector3(0, 0, -150),
  new THREE.Vector3(0, -20, -200),
  new THREE.Vector3(-50, 20, -250),
  new THREE.Vector3(-30, 0, -300),
  new THREE.Vector3(0, 0, -350),
  new THREE.Vector3(40, 10, -400),
  new THREE.Vector3(50, 20, -450),
  new THREE.Vector3(0, 0, -500),
  new THREE.Vector3(-40, -10, -550),
  new THREE.Vector3(-20, 0, -600),
  new THREE.Vector3(0, 10, -650),
  new THREE.Vector3(20, 20, -700),
  new THREE.Vector3(0, 0, -750),
  new THREE.Vector3(-30, -10, -800),
  new THREE.Vector3(0, 0, -850),
  new THREE.Vector3(30, 10, -900),
  new THREE.Vector3(0, 0, -950),
  new THREE.Vector3(0, 0, -1000),
];

export const curve = new THREE.CatmullRomCurve3(curvePoints, false, 'catmullrom', 0.5);

function Track() {
  const { trackGeo, stripeGeo } = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-2.5, 0);
    shape.lineTo(2.5, 0);
    shape.lineTo(2.5, 0.4);
    shape.lineTo(2.1, 0.4);
    shape.lineTo(2.1, 0.1);
    shape.lineTo(-2.1, 0.1);
    shape.lineTo(-2.1, 0.4);
    shape.lineTo(-2.5, 0.4);
    shape.lineTo(-2.5, 0);

    const trackGeo = new THREE.ExtrudeGeometry(shape, {
      steps: 800,
      extrudePath: curve,
      bevelEnabled: false,
    });

    const stripeShape = new THREE.Shape();
    stripeShape.moveTo(-0.2, 0.11);
    stripeShape.lineTo(0.2, 0.11);
    stripeShape.lineTo(0.2, 0.15);
    stripeShape.lineTo(-0.2, 0.15);
    stripeShape.lineTo(-0.2, 0.11);

    const stripeGeo = new THREE.ExtrudeGeometry(stripeShape, {
      steps: 800,
      extrudePath: curve,
      bevelEnabled: false,
    });

    return { trackGeo, stripeGeo };
  }, []);

  return (
    <group>
      <mesh geometry={trackGeo}>
        <meshStandardMaterial color="#FF6A00" roughness={1} metalness={0} />
      </mesh>
      <mesh geometry={stripeGeo}>
        <meshStandardMaterial color="#0D0D0F" roughness={1} metalness={0} />
      </mesh>
    </group>
  );
}

function CameraRig() {
  const scroll = useScroll();
  const frames = useMemo(() => curve.computeFrenetFrames(800, false), []);

  useFrame((state) => {
    // scroll.offset is between 0 and 1, but can be negative on macOS bounce
    const t = Math.max(0, Math.min(scroll.offset, 1));

    const position = curve.getPointAt(t);

    // Get the Frenet frames to perfectly align with the track surface
    const frameIndex = Math.min(Math.floor(t * 800), 800);
    // In Three.js ExtrudeGeometry, the shape's Y axis (up) is mapped to the binormal
    const binormal = frames.binormals[frameIndex];

    // Track surface is at y=0.15. Place camera at y=1.5
    // This gives a higher vantage point, pushing the track lower on the screen
    const cameraOffset = binormal.clone().multiplyScalar(1.5);
    const camPos = position.clone().add(cameraOffset);

    // Look ahead along the track
    const lookAtT = Math.min(t + 0.02, 1);
    const lookAtPosition = curve.getPointAt(lookAtT);
    const lookAtFrameIndex = Math.min(Math.floor(lookAtT * 800), 800);
    const lookAtBinormal = frames.binormals[lookAtFrameIndex];

    const lookAtOffset = lookAtBinormal.clone().multiplyScalar(1.5);
    let targetLookAt = lookAtPosition.clone().add(lookAtOffset);
    let targetFov = 75;

    if (t > 0.95) {
      const endPos = curve.getPointAt(1.0);
      const endFrameIndex = Math.min(Math.floor(1.0 * 800), 800);
      const endBinormal = frames.binormals[endFrameIndex];
      const endCenter = endPos.clone().add(endBinormal.clone().multiplyScalar(2));

      let influence = (t - 0.95) / 0.05; // 0 to 1
      influence = Math.max(0, Math.min(1, influence));
      influence = influence * influence * (3 - 2 * influence);

      targetLookAt.lerp(endCenter, influence);
      targetFov = 75 - (influence * 15); // Slight zoom
    } else {
      const signBoardTs = Array.from({ length: 19 }).map((_, i) => 0.068 + (i * 0.048));
      for (const st of signBoardTs) {
        const dist = st - t;
        if (dist > -0.002 && dist < 0.04) {
          let influence = 0;
          if (dist > 0.005) {
            influence = 1 - (dist - 0.005) / 0.035;
          } else {
            influence = (dist + 0.002) / 0.007;
          }

          // Smoothstep for natural camera movement
          influence = Math.max(0, Math.min(1, influence));
          influence = influence * influence * (3 - 2 * influence);

          const sbPos = curve.getPointAt(st);
          const sbFrameIndex = Math.min(Math.floor(st * 800), 800);
          const sbBinormal = frames.binormals[sbFrameIndex];

          // Look at the center of the signboard (y=3)
          const sbCenter = sbPos.clone().add(sbBinormal.clone().multiplyScalar(3));

          targetLookAt.lerp(sbCenter, influence * 0.95);
          targetFov = 75 - (influence * 35); // Zoom in slightly less to see both boards
          break;
        }
      }
    }

    state.camera.position.copy(camPos);
    // Lock the camera's up vector to the track's up (binormal)
    state.camera.up.copy(binormal);
    state.camera.lookAt(targetLookAt);

    const cam = state.camera as THREE.PerspectiveCamera;
    cam.fov = targetFov;
    cam.updateProjectionMatrix();
  });

  return null;
}

function SpeedLines() {
  const linesRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  const lines = useMemo(() => {
    return Array.from({ length: 200 }).map(() => ({
      x: (Math.random() - 0.5) * 60,
      y: (Math.random() - 0.5) * 60,
      z: -Math.random() * 200,
      speed: Math.random() * 2 + 1,
      length: Math.random() * 10 + 5
    }));
  }, []);

  useFrame((state) => {
    if (linesRef.current) {
      // Keep the group centered on the camera
      linesRef.current.position.copy(camera.position);

      // Match camera rotation so lines always come from "forward"
      linesRef.current.quaternion.copy(camera.quaternion);

      // Animate individual lines
      linesRef.current.children.forEach((child, i) => {
        if (lines[i]) {
          child.position.z += lines[i].speed;
          if (child.position.z > 10) {
            child.position.z = -200;
          }
        }
      });
    }
  });

  return (
    <group ref={linesRef}>
      {lines.map((line, i) => (
        <mesh key={i} position={[line.x, line.y, line.z]}>
          <boxGeometry args={[0.05, 0.05, line.length]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.15} />
        </mesh>
      ))}
    </group>
  );
}

function MovingStars() {
  const starsRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.position.copy(camera.position);
    }
  });

  return (
    <group ref={starsRef}>
      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
    </group>
  );
}

function SignBoardImage({ url }: { url: string }) {
  const texture = useTexture(url);
  return <meshBasicMaterial map={texture} />;
}

function SignBoard({ t = 0.1, imageUrl = 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=400&q=80' }) {
  const { position, quaternion } = useMemo(() => {
    const pos = curve.getPointAt(t);
    const tangent = curve.getTangentAt(t);
    const frames = curve.computeFrenetFrames(800, false);
    const frameIndex = Math.min(Math.floor(t * 800), 800);
    const binormal = frames.binormals[frameIndex];

    const matrix = new THREE.Matrix4();
    matrix.lookAt(pos, pos.clone().add(tangent), binormal);
    const quat = new THREE.Quaternion().setFromRotationMatrix(matrix);
    return { position: pos, quaternion: quat };
  }, [t]);

  const metalMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#888888', metalness: 0.8, roughness: 0.2 }), []);
  const boardMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#1A5D2E', roughness: 0.6 }), []); // Highway green
  const whiteMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#FFFFFF', roughness: 0.8 }), []);

  return (
    <group position={position} quaternion={quaternion}>
      {/* Pillars */}
      <mesh position={[-3.8, 2, 0]} material={metalMaterial}>
        <cylinderGeometry args={[0.15, 0.15, 4, 16]} />
      </mesh>
      <mesh position={[3.8, 2, 0]} material={metalMaterial}>
        <cylinderGeometry args={[0.15, 0.15, 4, 16]} />
      </mesh>

      {/* Pillar Bases */}
      <mesh position={[-3.8, 0.1, 0]} material={metalMaterial}>
        <boxGeometry args={[0.5, 0.2, 0.5]} />
      </mesh>
      <mesh position={[3.8, 0.1, 0]} material={metalMaterial}>
        <boxGeometry args={[0.5, 0.2, 0.5]} />
      </mesh>

      {/* Horizontal Truss Bars */}
      <mesh position={[0, 3.5, 0]} material={metalMaterial} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 7.6, 8]} />
      </mesh>
      <mesh position={[0, 2.5, 0]} material={metalMaterial} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 7.6, 8]} />
      </mesh>

      {/* Truss Cross Braces */}
      {Array.from({ length: 7 }).map((_, i) => {
        const x = -3 + i * 1;
        return (
          <group key={i}>
            <mesh position={[x, 3, 0]} material={metalMaterial} rotation={[0, 0, Math.PI / 4]}>
              <cylinderGeometry args={[0.03, 0.03, 1.414, 8]} />
            </mesh>
            <mesh position={[x, 3, 0]} material={metalMaterial} rotation={[0, 0, -Math.PI / 4]}>
              <cylinderGeometry args={[0.03, 0.03, 1.414, 8]} />
            </mesh>
          </group>
        );
      })}

      {/* Left Green Board */}
      <group position={[-1.8, 3, 0.1]}>
        {/* Main Board */}
        <mesh material={boardMaterial}>
          <boxGeometry args={[3.2, 1.8, 0.1]} />
        </mesh>
        {/* White Border */}
        <mesh position={[0, 0, -0.01]} material={whiteMaterial}>
          <boxGeometry args={[3.25, 1.85, 0.08]} />
        </mesh>
        {/* Image Area */}
        <mesh position={[0, 0, 0.051]}>
          <planeGeometry args={[3.0, 1.6]} />
          <Suspense fallback={<meshBasicMaterial color="#222" />}>
            <SignBoardImage url={imageUrl} />
          </Suspense>
        </mesh>
      </group>

      {/* Right Green Board */}
      <group position={[1.8, 3, 0.1]}>
        {/* Main Board */}
        <mesh material={boardMaterial}>
          <boxGeometry args={[3.2, 1.8, 0.1]} />
        </mesh>
        {/* White Border */}
        <mesh position={[0, 0, -0.01]} material={whiteMaterial}>
          <boxGeometry args={[3.25, 1.85, 0.08]} />
        </mesh>
        {/* Image Area */}
        <mesh position={[0, 0, 0.051]}>
          <planeGeometry args={[3.0, 1.6]} />
          <Suspense fallback={<meshBasicMaterial color="#222" />}>
            <SignBoardImage url={imageUrl} />
          </Suspense>
        </mesh>
      </group>
    </group>
  );
}

function FinishLine({ t = 0.98 }) {
  const { position, quaternion } = useMemo(() => {
    const pos = curve.getPointAt(t);
    const tangent = curve.getTangentAt(t);
    const frames = curve.computeFrenetFrames(800, false);
    const frameIndex = Math.min(Math.floor(t * 800), 800);
    const binormal = frames.binormals[frameIndex];

    const matrix = new THREE.Matrix4();
    matrix.lookAt(pos, pos.clone().add(tangent), binormal);
    const quat = new THREE.Quaternion().setFromRotationMatrix(matrix);
    return { position: pos, quaternion: quat };
  }, [t]);

  const metalMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#888888', metalness: 0.8, roughness: 0.2 }), []);

  const checkerTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 256;
    const context = canvas.getContext('2d');
    if (context) {
      context.fillStyle = '#FFFFFF';
      context.fillRect(0, 0, 1024, 256);
      context.fillStyle = '#000000';
      const rows = 4;
      const cols = 16;
      const w = 1024 / cols;
      const h = 256 / rows;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          if ((i + j) % 2 === 0) {
            context.fillRect(i * w, j * h, w, h);
          }
        }
      }
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }, []);

  const bannerMaterial = useMemo(() => new THREE.MeshStandardMaterial({ map: checkerTexture, roughness: 0.8 }), [checkerTexture]);

  return (
    <group position={position} quaternion={quaternion}>
      {/* Pillars */}
      <mesh position={[-4.5, 3, 0]} material={metalMaterial}>
        <cylinderGeometry args={[0.2, 0.2, 6, 16]} />
      </mesh>
      <mesh position={[4.5, 3, 0]} material={metalMaterial}>
        <cylinderGeometry args={[0.2, 0.2, 6, 16]} />
      </mesh>

      {/* Banner */}
      <mesh position={[0, 4.5, 0]} material={bannerMaterial}>
        <boxGeometry args={[9, 1.5, 0.1]} />
      </mesh>

      {/* Track Checkered Line */}
      <mesh position={[0, 0.16, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[5, 1]} />
        <meshStandardMaterial map={checkerTexture} transparent opacity={0.9} />
      </mesh>
    </group>
  );
}

function HotWheelsEnvironment() {
  return (
    <>
      <Track />
      {Array.from({ length: 19 }).map((_, i) => (
        <SignBoard
          key={i}
          t={0.068 + (i * 0.048)}
          imageUrl={`https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=400&q=80&sig=${i + 1}`}
        />
      ))}
      <FinishLine t={0.98} />
    </>
  );
}

export function TrackScene() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen bg-[#0D0D0F] relative">
      {/* Advanced Speedometer UI */}
      <div className="absolute bottom-8 right-8 z-50 pointer-events-none transform scale-100 origin-bottom-right">
        <div className="relative w-56 h-56">
          {/* Outer Glow */}
          <div id="speed-glow" className="absolute inset-0 rounded-full bg-[#FF2A00] opacity-0 blur-2xl transition-opacity duration-75"></div>

          {/* Main Bezel */}
          <div className="absolute inset-0 rounded-full border-4 border-[#111] bg-gradient-to-br from-[#222] to-[#050505] shadow-[inset_0_0_30px_rgba(0,0,0,1),0_10px_20px_rgba(0,0,0,0.8)]"></div>

          {/* Inner Ring */}
          <div className="absolute inset-3 rounded-full border border-[#333] bg-[#0a0a0c] shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]"></div>

          {/* Carbon Fiber Pattern (CSS) */}
          <div className="absolute inset-3 rounded-full opacity-20" style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '4px 4px' }}></div>

          {/* Ticks and Numbers (SVG) */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 224 224">
            <defs>
              <linearGradient id="tickGrad" x1="0%" y1="100%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#FFD500" />
                <stop offset="100%" stopColor="#FF2A00" />
              </linearGradient>
            </defs>

            {/* Colored Arc */}
            <path
              d="M 42.7 181.3 A 98 98 0 1 1 181.3 181.3"
              fill="none"
              stroke="url(#tickGrad)"
              strokeWidth="3"
              strokeDasharray="4 6"
              opacity="0.3"
            />

            {/* Generate ticks */}
            {Array.from({ length: 41 }).map((_, i) => {
              const angle = 135 + (i * 270) / 40;
              const angleRad = (angle * Math.PI) / 180;
              const isMajor = i % 4 === 0;
              const length = isMajor ? 14 : 6;
              const width = isMajor ? 3 : 1.5;
              const radius = 98;
              const cx = 112;
              const cy = 112;
              const x1 = cx + (radius - length) * Math.cos(angleRad);
              const y1 = cy + (radius - length) * Math.sin(angleRad);
              const x2 = cx + radius * Math.cos(angleRad);
              const y2 = cy + radius * Math.sin(angleRad);
              const color = i > 32 ? '#FF2A00' : (i > 24 ? '#FFD500' : '#FFFFFF');

              return (
                <g key={i}>
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={width} strokeLinecap="round" />
                  {isMajor && (
                    <text
                      x={cx + (radius - 28) * Math.cos(angleRad)}
                      y={cy + (radius - 28) * Math.sin(angleRad)}
                      fill={color}
                      fontSize="14"
                      fontFamily="Montserrat, sans-serif"
                      fontWeight="800"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}
                    >
                      {i * 5}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* RPM / Gear Display */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <span className="font-display text-[#FF2A00] text-sm tracking-widest opacity-80">RACE MODE</span>
          </div>

          {/* Digital Display */}
          <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-2 flex flex-col items-center">
            <div className="bg-[#050505] border border-[#222] rounded px-4 py-1 flex flex-col items-center shadow-[inset_0_0_15px_rgba(0,0,0,1)]">
              <span id="speed-value" className="font-display text-4xl text-white tracking-tighter leading-none" style={{ textShadow: '0 0 10px rgba(255,255,255,0.5)' }}>0</span>
              <span className="font-mono text-[9px] text-[#FFD500] uppercase tracking-widest mt-1">MPH</span>
            </div>
          </div>

          {/* Needle */}
          <div id="speed-needle" className="absolute top-1/2 left-1/2 w-1.5 h-24 -ml-[3px] -mt-24 origin-bottom transition-transform duration-75" style={{ transform: 'rotate(-135deg)' }}>
            <div className="w-full h-full bg-gradient-to-t from-transparent via-[#FF2A00] to-[#FFD500] rounded-t-full shadow-[0_0_15px_rgba(255,42,0,1)]"></div>
          </div>

          {/* Center Cap */}
          <div className="absolute top-1/2 left-1/2 w-10 h-10 -ml-5 -mt-5 rounded-full bg-gradient-to-br from-[#333] to-[#0a0a0c] border-2 border-[#111] shadow-[0_4px_10px_rgba(0,0,0,0.8)] flex items-center justify-center z-10">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#111] to-[#000] border border-[#222] flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#FF2A00] shadow-[0_0_5px_rgba(255,42,0,0.8)]"></div>
            </div>
          </div>
        </div>
      </div>

      <Canvas camera={{ position: [0, 2, 5], fov: 75 }}>
        <color attach="background" args={['#0D0D0F']} />
        <fog attach="fog" args={['#0D0D0F', 10, 150]} />

        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 20, 10]} intensity={1.5} color="#FFD500" />
        <pointLight position={[0, 5, -50]} intensity={2} color="#FF2A00" distance={50} />
        <pointLight position={[30, 15, -100]} intensity={2} color="#FF6A00" distance={50} />
        <pointLight position={[-50, 25, -250]} intensity={2} color="#FFD500" distance={50} />

        <MovingStars />

        <ScrollControls pages={16} damping={0.25}>
          <HotWheelsEnvironment />
          <CameraRig />
          <SpeedLines />
          <OverlayUI onShopClick={() => navigate('/shop')} />
        </ScrollControls>

        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
