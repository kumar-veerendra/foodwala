import React, { useState } from "react";

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" style={{width:16,height:16}}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const EyeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" style={{width:15,height:15}}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);
const EyeOffIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" style={{width:15,height:15}}>
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);
const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" style={{width:14,height:14}}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

// Password strength calculator
function getStrength(pw) {
  if (!pw) return { score: 0, label: "", color: "" };
  let score = 0;
  if (pw.length >= 8)  score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return { score, label: "Weak",   color: "#e53935" };
  if (score <= 3) return { score, label: "Fair",   color: "#FB8C00" };
  if (score === 4) return { score, label: "Good",  color: "#43A047" };
  return              { score, label: "Strong", color: "#00897B" };
}

function PasswordInput({ value, onChange, placeholder, id }) {
  const [show, setShow] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <input
        id={id}
        type={show ? "text" : "password"}
        className="pp-input"
        style={{ paddingRight: 42 }}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="new-password"
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        style={{
          position: "absolute", right: 13, top: "50%", transform: "translateY(-50%)",
          background: "none", border: "none", cursor: "pointer", color: "#aaa", padding: 2,
        }}
        tabIndex={-1}
      >
        {show ? <EyeOffIcon /> : <EyeIcon />}
      </button>
    </div>
  );
}

export default function SecuritySection({ onToast }) {
  const [open,    setOpen]    = useState(false);
  const [current, setCurrent] = useState("");
  const [next,    setNext]    = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors,  setErrors]  = useState({});
  const [saving,  setSaving]  = useState(false);

  const strength = getStrength(next);

  const validate = () => {
    const e = {};
    if (!current.trim())      e.current = "Current password is required";
    if (next.length < 8)      e.next    = "Password must be at least 8 characters";
    if (next !== confirm)     e.confirm  = "Passwords don't match";
    return e;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setSaving(true);
    try {
      // await userService.changePassword({ current, newPassword: next });
      await new Promise((r) => setTimeout(r, 800));
      setCurrent(""); setNext(""); setConfirm(""); setErrors({});
      setOpen(false);
      onToast?.("Password updated successfully!");
    } catch {
      setErrors({ current: "Current password is incorrect" });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setCurrent(""); setNext(""); setConfirm(""); setErrors({});
    setOpen(false);
  };

  return (
    <div className="pp-card">
      <div className="pp-card-head">
        <span className="pp-card-title">Security</span>
      </div>

      <div className="pp-security-row" onClick={() => setOpen((o) => !o)}>
        <div className="pp-security-left">
          <div className="pp-security-icon"><ShieldIcon /></div>
          <div>
            <div className="pp-security-label">Password</div>
            <div className="pp-security-sub">Last changed never</div>
          </div>
        </div>
        <button className="pp-security-toggle">
          {open ? "Cancel" : "Change"}
        </button>
      </div>

      {open && (
        <div className="pp-pw-form">
          <div className="pp-mfield">
            <label>Current Password</label>
            <PasswordInput
              id="current-pw"
              value={current}
              onChange={(e) => { setCurrent(e.target.value); setErrors((p) => ({ ...p, current: "" })); }}
              placeholder="Your current password"
            />
            {errors.current && <div className="pp-ferr">{errors.current}</div>}
          </div>

          <div className="pp-mfield">
            <label>New Password</label>
            <PasswordInput
              id="new-pw"
              value={next}
              onChange={(e) => { setNext(e.target.value); setErrors((p) => ({ ...p, next: "" })); }}
              placeholder="At least 8 characters"
            />
            {next && (
              <div className="pp-strength-bar">
                <div className="pp-strength-track">
                  {[1,2,3,4,5].map((i) => (
                    <div
                      key={i}
                      className="pp-strength-seg"
                      style={{ background: i <= strength.score ? strength.color : "#eee" }}
                    />
                  ))}
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: strength.color }}>
                  {strength.label}
                </span>
              </div>
            )}
            {errors.next && <div className="pp-ferr">{errors.next}</div>}
          </div>

          <div className="pp-mfield">
            <label>Confirm New Password</label>
            <PasswordInput
              id="confirm-pw"
              value={confirm}
              onChange={(e) => { setConfirm(e.target.value); setErrors((p) => ({ ...p, confirm: "" })); }}
              placeholder="Repeat new password"
            />
            {errors.confirm && <div className="pp-ferr">{errors.confirm}</div>}
          </div>

          <div className="pp-mactions" style={{ marginTop: 16 }}>
            <button className="pp-mcancel" onClick={handleCancel} disabled={saving}>Cancel</button>
            <button className="pp-msubmit" onClick={handleSubmit} disabled={saving}>
              {saving
                ? <><div className="pp-spin" /> Updating…</>
                : <><LockIcon /> Update Password</>}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}