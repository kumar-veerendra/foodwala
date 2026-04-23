import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

import "../../../styles/profile.css";

import ProfileHero from "../../../components/profile/ProfileHero";
import ProfileDetails from "../../../components/profile/ProfileDetails";
import AddressList from "../../../components/profile/AddressList";

import SecuritySection from "../../../components/profile/SecuritySection";
import NotificationPrefs from "../../../components/profile/NotificationPrefs";
import DangerZone from "../../../components/profile/DangerZone";
import ProfileCompleteness from "../../../components/profile/ProfileCompleteness";
import { SaveBar } from "../../../components/profile/SharedUI";

import { Toast } from "../../../components/profile/SharedUI";

import { ProfileSkeleton } from "../../../components/profile/SharedUI";

import { userService } from "../../../services/userService";



// ── Demo user (remove when using AuthContext) ─────────────────────────────────
const DEMO_USER = {
  id: "u_001",
  name: "Arjun Sharma",
  email: "arjun.sharma@gmail.com",
  phone: "+91 98765 43210",
  role: "Admin",
  avatar: null,
  bio: "Food lover & tech enthusiast. Based in Kolkata.",
  addresses: [
    { id: 1, label: "Home", line: "12, Rabindra Sarani, Kolkata 700006, WB", isDefault: true },
    { id: 2, label: "Work", line: "Salt Lake Sector V, Kolkata 700091, WB", isDefault: false },
  ],
  notifications: {
    orderUpdates: true,
    promotions: false,
    smsAlerts: true,
    emailDigest: false,
  },
  createdAt: "2024-01-15T10:30:00Z",
  lastLogin: "2026-04-23T09:15:00Z",
};

export default function Profile() {
  // const { user: authUser, setUser, logout } = useAuth();
  const navigate = useNavigate?.() ?? (() => {});

  const [user,       setUser]       = useState(null);
  const [loading,    setLoading]    = useState(true);
  const [saving,     setSaving]     = useState(false);
  const [editing,    setEditing]    = useState(false);
  const [toast,      setToast]      = useState(null);

  const [form, setForm] = useState({ name: "", phone: "", bio: "" });
  const [savedForm, setSavedForm] = useState({ name: "", phone: "", bio: "" });

  // ── Load user ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        // const data = await userService.getProfile();
        // setUser(data);
        await new Promise((r) => setTimeout(r, 900)); // simulate network
        setUser(DEMO_USER);
      } catch {
        showToast("Failed to load profile", "error");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (user) {
      const f = { name: user.name || "", phone: user.phone || "", bio: user.bio || "" };
      setForm(f);
      setSavedForm(f);
    }
  }, [user]);

  // ── Helpers ───────────────────────────────────────────────────────────────
  const showToast = useCallback((msg, type = "success") => {
    setToast({ msg, type });
  }, []);

  const isDirty = JSON.stringify(form) !== JSON.stringify(savedForm);

  // ── Save profile ──────────────────────────────────────────────────────────
  const handleSave = async () => {
    setSaving(true);
    try {
      // const updated = await userService.updateProfile(form);
      await new Promise((r) => setTimeout(r, 800));
      const updated = { ...user, ...form };
      setUser(updated);
      setSavedForm({ ...form });
      setEditing(false);
      showToast("Profile updated successfully!");
    } catch {
      showToast("Failed to save changes", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setForm({ ...savedForm });
    setEditing(false);
  };

  // ── Avatar upload ─────────────────────────────────────────────────────────
  const handleAvatarUpload = async (file) => {
    try {
      // const { avatarUrl } = await userService.uploadAvatar(file);
      const avatarUrl = URL.createObjectURL(file); // local preview for demo
      setUser((u) => ({ ...u, avatar: avatarUrl }));
      showToast("Photo updated!");
    } catch {
      showToast("Failed to upload photo", "error");
    }
  };

  // ── Addresses ─────────────────────────────────────────────────────────────
  const handleAddressAdded = useCallback((addr) => {
    setUser((u) => ({ ...u, addresses: [...(u.addresses || []), addr] }));
    showToast("Address saved!");
  }, [showToast]);

  const handleAddressDeleted = useCallback(async (id) => {
    // Optimistic update
    setUser((u) => ({ ...u, addresses: u.addresses.filter((a) => a.id !== id) }));
    try {
      // await userService.deleteAddress(id);
      showToast("Address removed");
    } catch {
      // Rollback on error
      setUser((u) => ({
        ...u,
        addresses: [...(u.addresses || []), user.addresses.find((a) => a.id === id)].filter(Boolean),
      }));
      showToast("Failed to remove address", "error");
    }
  }, [showToast, user]);

  const handleSetDefaultAddress = useCallback((id) => {
    setUser((u) => ({
      ...u,
      addresses: u.addresses.map((a) => ({ ...a, isDefault: a.id === id })),
    }));
    showToast("Default address updated!");
  }, [showToast]);

  // ── Notifications ─────────────────────────────────────────────────────────
  const handleNotifChange = useCallback(async (key, value) => {
    setUser((u) => ({ ...u, notifications: { ...u.notifications, [key]: value } }));
    try {
      // await userService.updateNotifications({ [key]: value });
    } catch {
      setUser((u) => ({ ...u, notifications: { ...u.notifications, [key]: !value } }));
      showToast("Failed to update preference", "error");
    }
  }, [showToast]);

  // ── Logout ────────────────────────────────────────────────────────────────
  const handleLogout = () => {
    // logout?.();
    navigate("/login");
  };

  if (loading) return <ProfileSkeleton />;

  return (
    <>
      <div className="pp-root">
        <div className="pp-center">

          <button className="pp-back" onClick={() => navigate(-1)}>
            <BackIcon /> Back
          </button>

          <ProfileCompleteness user={user} form={form} />

          <ProfileHero
            user={user}
            form={form}
            editing={editing}
            onEditToggle={() => setEditing((e) => !e)}
            onAvatarUpload={handleAvatarUpload}
            onLogout={handleLogout}
          />

          <ProfileDetails
            user={user}
            form={form}
            setForm={setForm}
            editing={editing}
          />

          <AddressList
            addresses={user.addresses || []}
            onAdded={handleAddressAdded}
            onDeleted={handleAddressDeleted}
            onSetDefault={handleSetDefaultAddress}
          />

          <SecuritySection onToast={showToast} />

          <NotificationPrefs
            prefs={user.notifications || {}}
            onChange={handleNotifChange}
          />

          <DangerZone onLogout={handleLogout} onToast={showToast} />

        </div>
      </div>

      {editing && isDirty && (
        <SaveBar
          onSave={handleSave}
          onCancel={handleCancel}
          saving={saving}
        />
      )}

      {toast && (
        <Toast msg={toast.msg} type={toast.type} onDone={() => setToast(null)} />
      )}
    </>
  );
}

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15 }}>
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}