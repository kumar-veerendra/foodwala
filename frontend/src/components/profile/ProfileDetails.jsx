import React from "react";

export default function ProfileDetails({ user, form, setForm, editing }) {
  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <div className="pp-card">
      <div className="pp-card-head">
        <span className="pp-card-title">Personal Details</span>
        {editing && <span className="pp-editing-pill">Editing</span>}
      </div>
      <div className="pp-fields">

        <div className="pp-field">
          <label>Full Name</label>
          {editing
            ? <input className="pp-input" value={form.name} onChange={update("name")} placeholder="Your full name" />
            : <div className="pp-field-value">{form.name || "—"}</div>}
        </div>

        <div className="pp-field">
          <label>Email Address</label>
          {/* Email is always read-only — must go through verification flow */}
          <div className="pp-field-value pp-field-locked">
            {user?.email || "—"}
            <span className="pp-lock-badge">Verified</span>
          </div>
        </div>

        <div className="pp-field">
          <label>Phone Number</label>
          {editing
            ? (
              <input
                className="pp-input"
                value={form.phone}
                onChange={update("phone")}
                placeholder="+91 XXXXX XXXXX"
                inputMode="tel"
              />
            )
            : <div className="pp-field-value">{form.phone || "Not added"}</div>}
        </div>

        <div className="pp-field">
          <label>Role</label>
          <div className="pp-field-value">{user?.role || "—"}</div>
        </div>

        <div className="pp-field pp-field-full">
          <label>Bio</label>
          {editing
            ? (
              <textarea
                className="pp-input pp-textarea"
                value={form.bio}
                onChange={update("bio")}
                placeholder="A short bio about yourself…"
                rows={2}
                maxLength={120}
              />
            )
            : <div className="pp-field-value">{form.bio || "No bio added"}</div>}
          {editing && (
            <div className="pp-char-count">{(form.bio || "").length}/120</div>
          )}
        </div>

      </div>
    </div>
  );
}