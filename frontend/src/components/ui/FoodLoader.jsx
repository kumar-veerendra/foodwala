// src/components/ui/Loader.jsx
import React from "react";

export const ForkLoader = () => (
  <div style={{ width: 72, height: 72 }}>
    <style>{`
      .fork-spin { animation: forkspin 2s ease-in-out infinite; transform-origin: 50% 50%; }
      .ring-dash { stroke-dasharray: 160 40; animation: ringdash 1.2s linear infinite; transform-origin: 50% 50%; }
      .steam-puff { transform-origin: 50% 100%; animation: puff 1.4s ease-in-out infinite; opacity: 0; }
      .steam-puff:nth-child(2) { animation-delay: 0.46s; }
      .steam-puff:nth-child(3) { animation-delay: 0.92s; }
      @keyframes forkspin { 0%,100%{transform:rotate(-12deg)} 50%{transform:rotate(12deg)} }
      @keyframes ringdash { to{stroke-dashoffset:-200} }
      @keyframes puff { 0%{opacity:0;transform:translateY(0)} 30%{opacity:0.85} 100%{opacity:0;transform:translateY(-22px)} }
    `}</style>
    <svg viewBox="0 0 72 72" fill="none">
      <circle cx="36" cy="36" r="30" stroke="rgba(154,6,6,0.1)" strokeWidth="2"/>
      <circle cx="36" cy="36" r="30" className="ring-dash" stroke="#9a0606" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <g className="fork-spin">
        <rect x="34" y="20" width="4" height="22" rx="2" fill="#9a0606"/>
        <rect x="28" y="20" width="3" height="10" rx="1.5" fill="#9a0606"/>
        <rect x="41" y="20" width="3" height="10" rx="1.5" fill="#9a0606"/>
        <rect x="28" y="29" width="16" height="3" rx="1.5" fill="#9a0606" opacity="0.5"/>
      </g>
      <ellipse className="steam-puff" cx="30" cy="18" rx="3" ry="5" fill="#c0392b"/>
      <ellipse className="steam-puff" cx="36" cy="15" rx="3" ry="6" fill="#9a0606"/>
      <ellipse className="steam-puff" cx="42" cy="18" rx="3" ry="5" fill="#c0392b"/>
    </svg>
  </div>
);

export const BoilLoader = () => (
  <div style={{ display:"flex", alignItems:"flex-end", gap:7, height:44 }}>
    <style>{`
      .boil-dot { width:12px;height:12px;borderRadius:"50%";background:#9a0606;animation:boilbounce 0.9s ease-in-out infinite; }
      .boil-dot:nth-child(2){animation-delay:0.15s;background:#c0392b}
      .boil-dot:nth-child(3){animation-delay:0.3s}
      .boil-dot:nth-child(4){animation-delay:0.45s;background:#e8a020}
      .boil-dot:nth-child(5){animation-delay:0.6s}
      @keyframes boilbounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-28px)}}
    `}</style>
    {[...Array(5)].map((_,i) => <div key={i} className="boil-dot"/>)}
  </div>
);

export const PageLoader = ({ message = "Finding the best food for you…" }) => (
  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:20, padding:"40px 32px", borderRadius:12, border:"0.5px solid rgba(0,0,0,0.08)", background:"#fff", minWidth:220 }}>
    <style>{`
      @keyframes brandpulse { 0%,100%{box-shadow:0 0 0 0 rgba(154,6,6,0.35)} 60%{box-shadow:0 0 0 14px rgba(154,6,6,0)} }
      @keyframes progressfill { 0%{width:0%;margin-left:0} 50%{width:100%;margin-left:0} 51%{width:100%;margin-left:0} 100%{width:0%;margin-left:100%} }
    `}</style>
    <div style={{ width:52, height:52, background:"#9a0606", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", animation:"brandpulse 1.6s ease-in-out infinite" }}>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="10" r="3" fill="white" opacity="0.95"/>
        <path d="M5 20c0-3.87 3.13-7 7-7s7 3.13 7 7" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.85"/>
        <path d="M12 4v2M8 5.5l1 1.73M16 5.5l-1 1.73" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      </svg>
    </div>
    <div style={{ width:160, height:3, borderRadius:99, background:"rgba(154,6,6,0.12)", overflow:"hidden" }}>
      <div style={{ height:"100%", borderRadius:99, background:"linear-gradient(90deg,#6b0404,#9a0606,#c0392b)", animation:"progressfill 1.8s ease-in-out infinite" }}/>
    </div>
    <p style={{ fontSize:13, color:"#888", letterSpacing:"0.04em", margin:0 }}>{message}</p>
  </div>
);

export default ForkLoader;