import React, { useState } from "react";

const LogoutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" style={{width:17,height:17}}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);
const AlertIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" style={{width:16,height:16}}>
    <triangle points="10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

export default function DangerZone({ onLogout, onToast }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteInput,   setDeleteInput]   = useState("");
  const [deleting,      setDeleting]      = useState(false);

  const handleDelete = async () => {
    if (deleteInput !== "DELETE") return;
    setDeleting(true);
    try {
      // await userService.deleteAccount();
      await new Promise((r) => setTimeout(r, 1000));
      onToast?.("Account deleted. Goodbye 👋", "error");
      setTimeout(() => onLogout?.(), 1500);
    } catch {
      onToast?.("Failed to delete account", "error");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="pp-card pp-danger-card">
      <div className="pp-card-head">
        <span className="pp-card-title" style={{ color: "#e53935" }}>Danger Zone</span>
      </div>

      {/* Logout button */}
      <button className="pp-logout" onClick={onLogout}>
        <LogoutIcon /> Logout
      </button>

      {/* Logout all sessions */}
      <button
        className="pp-logout-all"
        onClick={() => {
          // await userService.logoutAllSessions()
          onToast?.("All sessions logged out");
        }}
        style={{ marginTop: 10 }}
      >
        Logout from all devices
      </button>

      {/* Delete account */}
      <div className="pp-delete-section">
        <div className="pp-delete-header">
          <span className="pp-delete-title">Delete Account</span>
          <span className="pp-delete-sub">This action is permanent and cannot be undone.</span>
        </div>

        {!confirmDelete ? (
          <button
            className="pp-delete-btn"
            onClick={() => setConfirmDelete(true)}
          >
            Delete my account
          </button>
        ) : (
          <div className="pp-delete-confirm">
            <p className="pp-delete-warn">
              Type <strong>DELETE</strong> to confirm account deletion:
            </p>
            <input
              className="pp-input"
              style={{ borderColor: "#e53935", boxShadow: "0 0 0 3px rgba(229,57,53,0.1)" }}
              placeholder="Type DELETE to confirm"
              value={deleteInput}
              onChange={(e) => setDeleteInput(e.target.value)}
            />
            <div className="pp-mactions" style={{ marginTop: 12 }}>
              <button
                className="pp-mcancel"
                onClick={() => { setConfirmDelete(false); setDeleteInput(""); }}
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                className="pp-msubmit"
                style={{ background: deleteInput === "DELETE" ? "#e53935" : "#FFCCBC" }}
                onClick={handleDelete}
                disabled={deleteInput !== "DELETE" || deleting}
              >
                {deleting
                  ? <><div className="pp-spin" /> Deleting…</>
                  : "Confirm Delete"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}