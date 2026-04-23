import React, { useState, useEffect, useRef } from "react";

// ── Icons ─────────────────────────────────────────────────────────────────────
const HomeIcon  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:16,height:16}}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const WorkIcon  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:16,height:16}}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>;
const PinIcon   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:16,height:16}}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const TrashIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:15,height:15}}><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>;
const PlusIcon  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{width:15,height:15}}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const CheckIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{width:14,height:14}}><polyline points="20 6 9 17 4 12"/></svg>;
const StarIcon  = () => <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{width:11,height:11}}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;

const LABEL_OPTS = [
  { value: "Home",  Icon: HomeIcon  },
  { value: "Work",  Icon: WorkIcon  },
  { value: "Other", Icon: PinIcon   },
];

const addrIcon = (label) => {
  if (label === "Home") return <HomeIcon />;
  if (label === "Work") return <WorkIcon />;
  return <PinIcon />;
};

// ── Add Address Modal ─────────────────────────────────────────────────────────
function AddAddressModal({ onClose, onAdded }) {
  const [label,   setLabel]   = useState("Home");
  const [street,  setStreet]  = useState("");
  const [city,    setCity]    = useState("");
  const [pin,     setPin]     = useState("");
  const [errors,  setErrors]  = useState({});
  const [loading, setLoading] = useState(false);
  const firstRef = useRef(null);

  useEffect(() => {
    firstRef.current?.focus();
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const validate = () => {
    const e = {};
    if (!street.trim()) e.street = "Street address is required";
    if (!city.trim())   e.city   = "City is required";
    if (!/^\d{6}$/.test(pin)) e.pin = "Enter a valid 6-digit PIN code";
    return e;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    const payload = {
      label,
      line: `${street.trim()}, ${city.trim()} ${pin.trim()}`,
      isDefault: false,
    };

    setLoading(true);
    try {
      // const saved = await userService.addAddress(payload);
      // onAdded(saved);
      await new Promise((r) => setTimeout(r, 600));
      onAdded({ id: Date.now(), ...payload });
    } catch (err) {
      console.error("Failed to add address:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="pp-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="pp-modal">
        <div className="pp-drag-handle" />
        <div className="pp-modal-title">Add New Address</div>
        <div className="pp-modal-sub">Fill in the details and tap Save</div>

        {/* Label picker */}
        <div className="pp-label-row">
          {LABEL_OPTS.map(({ value, Icon: Ico }) => (
            <button
              key={value}
              className={`pp-label-pill ${label === value ? "active" : ""}`}
              onClick={() => setLabel(value)}
            >
              <Ico /> {value}
            </button>
          ))}
        </div>

        <div className="pp-mfield">
          <label>Street / Flat / Area</label>
          <input
            ref={firstRef}
            className={`pp-minput ${errors.street ? "err" : ""}`}
            placeholder="e.g. 12, Rabindra Sarani, Flat 3B"
            value={street}
            onChange={(e) => { setStreet(e.target.value); setErrors((p) => ({ ...p, street: "" })); }}
          />
          {errors.street && <div className="pp-ferr">{errors.street}</div>}
        </div>

        <div className="pp-mfield">
          <label>City</label>
          <input
            className={`pp-minput ${errors.city ? "err" : ""}`}
            placeholder="e.g. Kolkata"
            value={city}
            onChange={(e) => { setCity(e.target.value); setErrors((p) => ({ ...p, city: "" })); }}
          />
          {errors.city && <div className="pp-ferr">{errors.city}</div>}
        </div>

        <div className="pp-mfield">
          <label>PIN Code</label>
          <input
            className={`pp-minput ${errors.pin ? "err" : ""}`}
            placeholder="e.g. 700006"
            value={pin}
            maxLength={6}
            inputMode="numeric"
            onChange={(e) => { setPin(e.target.value.replace(/\D/g, "")); setErrors((p) => ({ ...p, pin: "" })); }}
          />
          {errors.pin && <div className="pp-ferr">{errors.pin}</div>}
        </div>

        <div className="pp-mactions">
          <button className="pp-mcancel" onClick={onClose} disabled={loading}>Cancel</button>
          <button className="pp-msubmit" onClick={handleSubmit} disabled={loading}>
            {loading
              ? <><div className="pp-spin" /> Saving…</>
              : <><CheckIcon /> Save Address</>}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── AddressList ───────────────────────────────────────────────────────────────
export default function AddressList({ addresses, onAdded, onDeleted, onSetDefault }) {
  const [showModal, setShowModal] = useState(false);

  const handleAdded = (addr) => {
    onAdded(addr);
    setShowModal(false);
  };

  return (
    <>
      <div className="pp-card">
        <div className="pp-card-head">
          <span className="pp-card-title">Saved Addresses</span>
          <span className="pp-count-badge">{addresses.length} saved</span>
        </div>
        <div className="pp-addr-list">
          {addresses.map((addr) => (
            <div key={addr.id} className={`pp-addr-item ${addr.isDefault ? "is-default" : ""}`}>
              <div className="pp-addr-left">
                <div className="pp-addr-icon">{addrIcon(addr.label)}</div>
                <div>
                  <div className="pp-addr-label-row">
                    <span className="pp-addr-label">{addr.label}</span>
                    {addr.isDefault && (
                      <span className="pp-default-badge"><StarIcon /> Default</span>
                    )}
                  </div>
                  <div className="pp-addr-text">{addr.line}</div>
                  {!addr.isDefault && (
                    <button
                      className="pp-set-default-btn"
                      onClick={() => onSetDefault(addr.id)}
                    >
                      Set as default
                    </button>
                  )}
                </div>
              </div>
              <button
                className="pp-addr-del"
                onClick={() => onDeleted(addr.id)}
                title="Remove address"
              >
                <TrashIcon />
              </button>
            </div>
          ))}

          <button className="pp-add-addr" onClick={() => setShowModal(true)}>
            <PlusIcon /> Add New Address
          </button>
        </div>
      </div>

      {showModal && (
        <AddAddressModal onClose={() => setShowModal(false)} onAdded={handleAdded} />
      )}
    </>
  );
}