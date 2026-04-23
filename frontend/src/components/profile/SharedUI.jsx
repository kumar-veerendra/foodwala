import React, { useEffect } from "react";

// ── SaveBar ───────────────────────────────────────────────────────────────────
export function SaveBar({ onSave, onCancel, saving }) {
  return (
    <div className="pp-save-bar">
      <span className="pp-save-text">Unsaved changes</span>
      <button className="pp-save-cancel" onClick={onCancel} disabled={saving}>
        Discard
      </button>
      <button className="pp-save-btn" onClick={onSave} disabled={saving}>
        {saving ? <><div className="pp-spin pp-spin-dark" /> Saving…</> : "Save Changes"}
      </button>
    </div>
  );
}

// ── Toast ─────────────────────────────────────────────────────────────────────
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
    strokeLinecap="round" strokeLinejoin="round" style={{width:16,height:16}}>
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const AlertCircleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" style={{width:16,height:16}}>
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

export function Toast({ msg, type, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className={`pp-toast ${type}`}>
      {type === "success" ? <CheckIcon /> : <AlertCircleIcon />}
      {msg}
    </div>
  );
}

// ── ProfileSkeleton ───────────────────────────────────────────────────────────
function Bone({ w = "100%", h = 16, r = 8, style = {} }) {
  return (
    <div
      className="pp-bone"
      style={{ width: w, height: h, borderRadius: r, ...style }}
    />
  );
}

export function ProfileSkeleton() {
  return (
    <div className="pp-root">
      <div className="pp-center">
        {/* Hero skeleton */}
        <div className="pp-hero" style={{ gap: 20 }}>
          <Bone w={90} h={90} r={45} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
            <Bone w="55%" h={22} />
            <Bone w="70%" h={14} />
            <div style={{ display: "flex", gap: 8 }}>
              <Bone w={60} h={22} r={20} />
              <Bone w={120} h={22} r={20} />
            </div>
          </div>
        </div>
        {/* Card skeleton */}
        <div className="pp-card" style={{ gap: 14, display: "flex", flexDirection: "column" }}>
          <Bone w="30%" h={13} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {[1,2,3,4].map((i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <Bone w="40%" h={11} />
                <Bone h={40} r={10} />
              </div>
            ))}
          </div>
        </div>
        {/* Card skeleton 2 */}
        <div className="pp-card" style={{ gap: 12, display: "flex", flexDirection: "column" }}>
          <Bone w="35%" h={13} />
          {[1,2].map((i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", padding: "10px 0" }}>
              <Bone w={34} h={34} r={9} />
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                <Bone w="45%" h={13} />
                <Bone w="70%" h={11} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default { SaveBar, Toast, ProfileSkeleton };