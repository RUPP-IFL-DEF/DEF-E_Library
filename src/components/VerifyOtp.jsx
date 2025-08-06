import React, { useState } from 'react';

/**
 * Props:
 *  - phoneNumber: string
 *  - onSubmit: (otp) => void
 *  - onBack: () => void
 *  - error: string|null
 *  - info: string|null
 */
export default function VerifyOtpForm({ phoneNumber, onSubmit, onBack, error, info }) {
  const [otp, setOtp] = useState('');

  const handle = (e) => {
    e.preventDefault();
    if (!otp) return;
    onSubmit(otp);
  };

  return (
    <div className="verify-otp-wrapper">
      <h2>Verify OTP</h2>
      <p>OTP sent to: {phoneNumber}</p>
      {info && <div style={{ color: 'green' }}>{info}</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handle}>
        <div className="form-field">
          <label>OTP:</label>
          <input
            name="otp"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            required
          />
        </div>
        <button type="submit" className="submit-btn">Verify</button>
        <button type="button" onClick={onBack} style={{ marginLeft: 8 }}>
          Back
        </button>
      </form>
    </div>
  );
}
