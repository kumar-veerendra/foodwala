/**
 * userService.js
 *
 * All profile-related API calls in one place.
 * Swap API_BASE with your VITE_API_URL env variable.
 *
 * Every method throws on non-ok responses so callers can catch uniformly.
 */

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

// ── Helper ────────────────────────────────────────────────────────────────────
function authHeaders(extra = {}) {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...extra,
  };
}

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}/api${path}`, {
    ...options,
    headers: authHeaders(options.headers),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.message || `HTTP ${res.status}`);
  return json;
}

// ── Profile ───────────────────────────────────────────────────────────────────

/**
 * GET /api/user/profile
 * Returns: { id, name, email, phone, bio, avatar, role, addresses, notifications, createdAt, lastLogin }
 */
export const getProfile = () => request("/auth/me");

/**
 * PUT /api/user/profile
 * Body:    { name, phone, bio }
 * Returns: { success: true, user: { ...updatedFields } }
 */
export const updateProfile = (data) =>
  request("/users/profile", { method: "PUT", body: JSON.stringify(data) });

/**
 * PUT /api/user/password
 * Body:    { currentPassword, newPassword }
 * Returns: { success: true }
 */
export const changePassword = (data) =>
  request("/users/password", { method: "PUT", body: JSON.stringify(data) });

// ── Avatar ────────────────────────────────────────────────────────────────────

/**
 * POST /api/user/avatar   (multipart/form-data)
 * Returns: { avatarUrl: string }
 */
export const uploadAvatar = async (file) => {
  const token = localStorage.getItem("token");
  const form = new FormData();
  form.append("avatar", file);

  const res = await fetch(`${API_BASE}/api/users/avatar`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: form,
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.message || `HTTP ${res.status}`);
  return json; // { avatarUrl }
};

// ── Addresses ─────────────────────────────────────────────────────────────────

/**
 * POST /api/user/addresses
 * Body:    { label, line, isDefault? }
 * Returns: { id, label, line, isDefault }
 */
export const addAddress = (data) =>
  request("/users/addresses", { method: "POST", body: JSON.stringify(data) });

/**
 * DELETE /api/user/addresses/:id
 * Returns: { success: true }
 */
export const deleteAddress = (id) =>
  request(`/users/addresses/${id}`, { method: "DELETE" });

/**
 * PATCH /api/user/addresses/:id/default
 * Returns: { success: true }
 */
export const setDefaultAddress = (id) =>
  request(`/users/addresses/${id}/default`, { method: "PATCH" });

// ── Notifications ─────────────────────────────────────────────────────────────

/**
 * PATCH /api/user/notifications
 * Body:    { orderUpdates?, promotions?, smsAlerts?, emailDigest? }
 * Returns: { success: true, notifications: { ...updated } }
 */
export const updateNotifications = (data) =>
  request("/users/notifications", { method: "PATCH", body: JSON.stringify(data) });

// ── Sessions ──────────────────────────────────────────────────────────────────

/**
 * DELETE /api/user/sessions
 * Logs out all sessions except the current one.
 * Returns: { success: true }
 */
export const logoutAllSessions = () =>
  request("/users/sessions", { method: "DELETE" });

// ── Account ───────────────────────────────────────────────────────────────────

/**
 * DELETE /api/user/account
 * Permanently deletes the account.
 * Returns: { success: true }
 */
export const deleteAccount = () =>
  request("/users/account", { method: "DELETE" });

// ── Named export bundle ───────────────────────────────────────────────────────
export const userService = {
  getProfile,
  updateProfile,
  changePassword,
  uploadAvatar,
  addAddress,
  deleteAddress,
  setDefaultAddress,
  updateNotifications,
  logoutAllSessions,
  deleteAccount,
};