import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { ShieldCheck, Zap, CreditCard, Bell, Sparkles, ChevronRight } from 'lucide-react';

export const Smartphone3D: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);

  // App screens showcasing Aditya's real production apps
  const appScreens = [
    {
      id: 'peys',
      appName: 'Peys BBPS',
      tag: 'FINTECH BBPS',
      title: 'Electricity & Utility Bills',
      amount: '₹ 1,249.00',
      status: 'Ready for Payment',
      badge: 'Dynamic Form Schema',
      color: 'from-cyan-500 to-blue-600',
      action: 'Quick Pay'
    },
    {
      id: 'prfin',
      appName: 'PR Fin Hub',
      tag: 'DIGITAL LENDING',
      title: 'Pre-Approved Credit Line',
      amount: '₹ 2,50,000',
      status: 'Instant Disbursal (BLoC)',
      badge: 'Clean Architecture',
      color: 'from-indigo-500 to-purple-600',
      action: 'Claim Credit'
    },
    {
      id: 'aathifrupay',
      appName: 'AathifRupay',
      tag: 'AEPS & DMT',
      title: 'Merchant AEPS Terminal',
      amount: '₹ 48,250.80',
      status: '20K → <500 Crashes',
      badge: '99.8% Stability',
      color: 'from-emerald-500 to-teal-600',
      action: 'Biometric Cashout'
    },
    {
      id: 'wowpe',
      appName: 'WowPe Pay',
      tag: 'B2B & B2C',
      title: 'Live Payment Notifications',
      amount: '100% Delivery',
      status: 'Custom Audio Channels',
      badge: 'App Store & Play Store',
      color: 'from-pink-500 to-rose-600',
      action: 'View Alerts'
    }
  ];

  const currentScreen = appScreens[activeScreenIndex];

  // Mouse tilt parallax interpolation
  useFrame((state) => {
    if (!groupRef.current) return;
    const targetY = (state.pointer.x * Math.PI) / 9;
    const targetX = (-state.pointer.y * Math.PI) / 9;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.05);
  });

  return (
    <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef} position={[0, 0, 0]}>
        {/* Phone Chassis Outer Frame */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.5, 4.9, 0.22]} />
          <meshStandardMaterial
            color="#131822"
            metalness={0.9}
            roughness={0.15}
            envMapIntensity={1.2}
          />
        </mesh>

        {/* Metallic Chamfered Bezel Rim */}
        <mesh position={[0, 0, 0.1]}>
          <boxGeometry args={[2.42, 4.82, 0.04]} />
          <meshStandardMaterial
            color="#222B3D"
            metalness={0.95}
            roughness={0.1}
          />
        </mesh>

        {/* Screen Glass Front Surface */}
        <mesh position={[0, 0, 0.12]}>
          <boxGeometry args={[2.34, 4.72, 0.01]} />
          <meshStandardMaterial
            color="#05070B"
            metalness={0.2}
            roughness={0.05}
          />
        </mesh>

        {/* Top Dynamic Island / Camera Pill */}
        <mesh position={[0, 2.12, 0.13]}>
          <boxGeometry args={[0.65, 0.15, 0.02]} />
          <meshBasicMaterial color="#000000" />
        </mesh>

        {/* Interactive Screen Layer (HTML with 3D projection) */}
        <Html
          transform
          position={[0, -0.05, 0.135]}
          distanceFactor={2.7}
          className="pointer-events-auto select-none"
        >
          <div className="w-[300px] h-[580px] bg-[#07090E] rounded-[36px] p-4 text-white flex flex-col justify-between shadow-2xl border border-white/10 font-sans">
            {/* Status Bar */}
            <div className="flex justify-between items-center text-[10px] text-slate-400 px-2 pt-1 font-mono">
              <span>9:41</span>
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>5G</span>
                <span>100%</span>
              </div>
            </div>

            {/* App Header */}
            <div className="mt-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] tracking-wider uppercase font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  {currentScreen.tag}
                </span>
                <span className="text-[11px] font-mono text-slate-400">Aditya V.</span>
              </div>
              <h4 className="text-xl font-bold mt-1 text-white flex items-center justify-between">
                {currentScreen.appName}
                <Sparkles size={16} className="text-cyan-400" />
              </h4>
            </div>

            {/* Card Widget */}
            <div className={`mt-2 p-4 rounded-2xl bg-gradient-to-br ${currentScreen.color} text-white shadow-lg relative overflow-hidden transition-all duration-500`}>
              <div className="text-[11px] opacity-80 uppercase tracking-wider">{currentScreen.title}</div>
              <div className="text-2xl font-bold font-mono mt-1 tracking-tight">{currentScreen.amount}</div>
              <div className="mt-3 flex items-center justify-between text-[11px]">
                <span className="bg-black/30 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10">
                  {currentScreen.badge}
                </span>
                <span className="flex items-center text-xs font-semibold underline underline-offset-2 cursor-pointer">
                  {currentScreen.action} <ChevronRight size={12} className="ml-0.5" />
                </span>
              </div>
            </div>

            {/* Live Telemetry / Features Feed */}
            <div className="space-y-2 mt-2">
              <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                    <Zap size={14} />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-200">State Engine</div>
                    <div className="text-[10px] text-slate-400">BLoC & Clean Architecture</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-emerald-400">60 FPS</span>
              </div>

              <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <ShieldCheck size={14} />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-200">Crash Stability</div>
                    <div className="text-[10px] text-slate-400">Crashlytics Profiling</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-cyan-400">&lt;0.02%</span>
              </div>
            </div>

            {/* Bottom Interactive Screen Switcher */}
            <div className="mt-auto pt-2">
              <div className="text-[10px] text-slate-400 text-center mb-1 font-mono">
                Click dots to switch app preview:
              </div>
              <div className="flex justify-center items-center space-x-2 py-1">
                {appScreens.map((screen, idx) => (
                  <button
                    key={screen.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveScreenIndex(idx);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeScreenIndex === idx
                        ? 'w-6 bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]'
                        : 'w-2 bg-slate-700 hover:bg-slate-500'
                    }`}
                    aria-label={`Switch to ${screen.appName}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </Html>
      </group>
    </Float>
  );
};

export default Smartphone3D;
