import React, { useMemo } from "react";

const CHECKS = [
  { key: "name",    label: "Full name added",      get: (u, f) => !!(f?.name || u?.name) },
  { key: "phone",   label: "Phone number added",   get: (u, f) => !!(f?.phone || u?.phone) },
  { key: "bio",     label: "Bio written",           get: (u, f) => !!(f?.bio || u?.bio) },
  { key: "avatar",  label: "Profile photo added",  get: (u)    => !!u?.avatar },
  { key: "address", label: "Address saved",         get: (u)    => !!(u?.addresses?.length) },
];

const LEVELS = [
  { min: 0,   label: "Starter",     color: "#bbb",    emoji: "🌱" },
  { min: 40,  label: "Active",      color: "#FB8C00", emoji: "⚡" },
  { min: 80,  label: "Power User",  color: "#43A047", emoji: "🔥" },
  { min: 100, label: "Complete",    color: "#FF5722", emoji: "⭐" },
];

export default function ProfileCompleteness({ user, form }) {
  const { score, done, total, missing } = useMemo(() => {
    const results = CHECKS.map((c) => ({
      ...c,
      passed: c.get(user, form),
    }));
    const done = results.filter((r) => r.passed).length;
    const total = results.length;
    const score = Math.round((done / total) * 100);
    const missing = results.filter((r) => !r.passed).map((r) => r.label);
    return { score, done, total, missing };
  }, [user, form]);

  const level = [...LEVELS].reverse().find((l) => score >= l.min) || LEVELS[0];

  // Don't show if already complete
  if (score === 100) return null;

  return (
    <div className="pp-completeness">
      <div className="pp-complete-header">
        <div>
          <span className="pp-complete-emoji">{level.emoji}</span>
          <span className="pp-complete-label">{level.label}</span>
          <span className="pp-complete-count">{done}/{total} complete</span>
        </div>
        <span className="pp-complete-score" style={{ color: level.color }}>{score}%</span>
      </div>

      {/* Progress bar */}
      <div className="pp-complete-track">
        <div
          className="pp-complete-fill"
          style={{ width: `${score}%`, background: level.color }}
        />
      </div>

      {/* Missing items */}
      {missing.length > 0 && (
        <div className="pp-complete-missing">
          <span className="pp-missing-label">Complete your profile:</span>
          {missing.map((m) => (
            <span key={m} className="pp-missing-item">• {m}</span>
          ))}
        </div>
      )}
    </div>
  );
}