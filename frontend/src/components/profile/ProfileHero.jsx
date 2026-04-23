import React, { useRef } from "react";

// ── Icons ─────────────────────────────────────────────────────────────────────
const CameraIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" style={{ width: 13, height: 13 }}>
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
    <circle cx="12" cy="13" r="4"/>
  </svg>
);
const EditIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" style={{ width: 12, height: 12 }}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.39 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.81A16 16 0 0 0 16 16.92l.89-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
export default function ProfileHero({ user, form, editing, onEditToggle, onAvatarUpload, onLogout }) {
  const fileRef = useRef(null);

  const initials = (form.name || user?.name || "U")
    .split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

  const joinDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-IN", { month: "long", year: "numeric" })
    : null;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) onAvatarUpload?.(file);
  };

  return (
    <div className="pp-hero">
      {/* Hidden file input for avatar upload */}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* Avatar */}
      <div className="pp-avatar-wrap">
        {user?.avatar
          ? <img src={user.avatar} alt={form.name} className="pp-avatar" />
          : <div className="pp-avatar-fallback">{initials}</div>}
        <button
          className="pp-avatar-btn"
          title="Change photo"
          onClick={() => fileRef.current?.click()}
        >
          <CameraIcon />
        </button>
      </div>

      {/* Info */}
      <div className="pp-hero-info">
        <div className="pp-hero-name">{form.name || user?.name}</div>
        <div className="pp-hero-email">{user?.email}</div>
        {form.bio && <div className="pp-hero-bio">{form.bio}</div>}
        <div className="pp-hero-meta">
          {user?.role && <span className="pp-badge">{user.role}</span>}
          {(form.phone || user?.phone) && (
            <span className="pp-phone-chip">
              <PhoneIcon />{form.phone || user?.phone}
            </span>
          )}
          {joinDate && <span className="pp-joined-chip">Member since {joinDate}</span>}
        </div>
      </div>

      {/* Edit button */}
      <button className="pp-edit-hero-btn" onClick={onEditToggle}>
        <EditIcon />{editing ? "Cancel" : "Edit Profile"}
      </button>
    </div>
  );
}