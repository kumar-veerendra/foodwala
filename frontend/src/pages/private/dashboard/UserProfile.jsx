import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// ── Inline styles ────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&display=swap');

  .up-wrapper {
    position: relative;
    font-family: 'Sora', sans-serif;
  }

  .up-trigger {
    display: flex;
    align-items: center;
    gap: 9px;
    background: none;
    border: none;
    padding: 4px 8px 4px 4px;
    border-radius: 50px;
    cursor: pointer;
    transition: background 0.2s;
  }
  .up-trigger:hover { background: rgba(0,0,0,0.055); }

  .up-avatar {
    width: 38px; height: 38px;
    border-radius: 50%; object-fit: cover;
    border: 2px solid #FF5722; flex-shrink: 0;
  }
  .up-avatar-fallback {
    width: 38px; height: 38px; border-radius: 50%;
    background: linear-gradient(135deg, #FF5722, #FF8A65);
    display: flex; align-items: center; justify-content: center;
    font-size: 14px; font-weight: 700; color: #fff;
    border: 2px solid #FF5722; flex-shrink: 0;
  }
  .up-name {
    font-size: 13.5px; font-weight: 600; color: #1a1a1a;
    max-width: 90px; white-space: nowrap;
    overflow: hidden; text-overflow: ellipsis;
  }
  .up-chevron {
    width: 15px; height: 15px; color: #888;
    transition: transform 0.25s; flex-shrink: 0;
  }
  .up-chevron.open { transform: rotate(180deg); }

  /* Dropdown */
  .up-dropdown {
    position: absolute; top: calc(100% + 10px); right: 0;
    width: 244px; background: #fff; border-radius: 16px;
    box-shadow: 0 10px 36px rgba(0,0,0,0.13), 0 2px 8px rgba(0,0,0,0.07);
    padding: 8px; z-index: 9999;
    animation: upFadeIn 0.18s ease; transform-origin: top right;
  }
  @keyframes upFadeIn {
    from { opacity: 0; transform: scale(0.93) translateY(-6px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }

  /* Header card */
  .up-header-card {
    background: linear-gradient(135deg, #FFF3F0, #FFE8E2);
    border-radius: 10px; padding: 13px 13px 11px;
    margin-bottom: 5px; display: flex; align-items: center; gap: 11px;
  }
  .up-header-avatar {
    width: 46px; height: 46px; border-radius: 50%;
    object-fit: cover; border: 2.5px solid #FF5722; flex-shrink: 0;
  }
  .up-header-fallback {
    width: 46px; height: 46px; border-radius: 50%;
    background: linear-gradient(135deg, #FF5722, #FF8A65);
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; font-weight: 700; color: #fff; flex-shrink: 0;
  }
  .up-header-name { font-size: 14px; font-weight: 700; color: #1a1a1a; line-height: 1.2; }
  .up-header-email {
    font-size: 11px; color: #999; margin-top: 2px;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 138px;
  }
  .up-badge {
    display: inline-block; background: #FF5722; color: #fff;
    font-size: 9px; font-weight: 700; padding: 2px 7px;
    border-radius: 20px; margin-top: 4px; letter-spacing: 0.5px; text-transform: uppercase;
  }

  .up-divider { height: 1px; background: #f2f2f2; margin: 4px 2px; }

  .up-item {
    display: flex; align-items: center; gap: 10px; width: 100%;
    padding: 10px 12px; border-radius: 9px; border: none; background: none;
    text-decoration: none; color: #2c2c2c; font-size: 13px; font-weight: 500;
    font-family: 'Sora', sans-serif; cursor: pointer;
    transition: background 0.15s, color 0.15s; text-align: left;
  }
  .up-item:hover { background: #FFF3F0; color: #FF5722; text-decoration: none; }
  .up-item.danger { color: #e53935; }
  .up-item.danger:hover { background: #FFF5F5; color: #c62828; }
  .up-item-icon { width: 16px; height: 16px; flex-shrink: 0; opacity: 0.72; }
  .up-item:hover .up-item-icon { opacity: 1; }
`;

export default function UserProfile({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const initials = user?.name
    ? user.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()
    : "U";

  const handleLogout = () => {
    setOpen(false);
    onLogout?.();
    navigate("/login");
  };

  const close = () => setOpen(false);

  return (
    <>
      <style>{styles}</style>
      <div className="up-wrapper" ref={ref}>
        <button className="up-trigger" onClick={() => setOpen((o) => !o)} aria-label="Profile menu">
          {user?.avatar
            ? <img src={user.avatar} alt={user.name} className="up-avatar" />
            : <div className="up-avatar-fallback">{initials}</div>}
          <span className="up-name">{user?.name?.split(" ")[0] || "Profile"}</span>
          <svg className={`up-chevron ${open ? "open" : ""}`} viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {open && (
          <div className="up-dropdown">
            {/* Header */}
            <div className="up-header-card">
              {user?.avatar
                ? <img src={user.avatar} alt={user.name} className="up-header-avatar" />
                : <div className="up-header-fallback">{initials}</div>}
              <div>
                <div className="up-header-name">{user?.name || "User"}</div>
                <div className="up-header-email">{user?.email || ""}</div>
                {user?.role && <span className="up-badge">{user.role}</span>}
              </div>
            </div>

            {/* Links */}
            <Link className="up-item" to="/profile" onClick={close}>
              <svg className="up-item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
              My Profile
            </Link>

            <Link className="up-item" to="/orders" onClick={close}>
              <svg className="up-item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
                <rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6M9 16h4"/>
              </svg>
              My Orders
            </Link>

            <Link className="up-item" to="/favorites" onClick={close}>
              <svg className="up-item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              Favourites
            </Link>

            <Link className="up-item" to="/settings" onClick={close}>
              <svg className="up-item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
              Settings
            </Link>

            <div className="up-divider" />

            <button className="up-item danger" onClick={handleLogout}>
              <svg className="up-item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Logout
            </button>
          </div>
        )}
      </div>
    </>
  );
}