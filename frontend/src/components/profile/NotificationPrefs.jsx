import React from "react";

const PREFS = [
  {
    key: "orderUpdates",
    label: "Order Updates",
    sub: "Get notified when your order status changes",
    emoji: "🛵",
  },
  {
    key: "promotions",
    label: "Promotions & Offers",
    sub: "Deals, discounts, and special offers",
    emoji: "🎁",
  },
  {
    key: "smsAlerts",
    label: "SMS Alerts",
    sub: "Text messages for critical updates",
    emoji: "📱",
  },
  {
    key: "emailDigest",
    label: "Weekly Email Digest",
    sub: "Summary of your orders and activity",
    emoji: "📧",
  },
];

function Toggle({ checked, onChange }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      style={{
        width: 44,
        height: 24,
        borderRadius: 99,
        border: "none",
        background: checked ? "#FF5722" : "#e0e0e0",
        position: "relative",
        cursor: "pointer",
        transition: "background 0.2s",
        flexShrink: 0,
        padding: 0,
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 3,
          left: checked ? 23 : 3,
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: "#fff",
          transition: "left 0.2s",
          boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
        }}
      />
    </button>
  );
}

export default function NotificationPrefs({ prefs, onChange }) {
  return (
    <div className="pp-card">
      <div className="pp-card-head">
        <span className="pp-card-title">Notifications</span>
      </div>
      <div className="pp-notif-list">
        {PREFS.map(({ key, label, sub, emoji }) => (
          <div key={key} className="pp-notif-row">
            <div className="pp-notif-left">
              <span className="pp-notif-emoji">{emoji}</span>
              <div>
                <div className="pp-notif-label">{label}</div>
                <div className="pp-notif-sub">{sub}</div>
              </div>
            </div>
            <Toggle
              checked={!!prefs[key]}
              onChange={(val) => onChange(key, val)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}