import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { IoArrowBackOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/section/Footer';

const API_BASE = 'https://def-e-library-server.onrender.com';

export default function ProfilePage() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    const [profileForm, setProfileForm] = useState({
        username: '',
        phoneNumber: '',
        avatarUrl: '',
    });

    const [profileMsg, setProfileMsg] = useState('');
    const [profileError, setProfileError] = useState('');

    const [availability, setAvailability] = useState({
        checking: false,
        usernameTaken: false,
        phoneTaken: false,
    });

    const [passwordForm, setPasswordForm] = useState({
        oldPassword: '',
        newPassword: '',
    });
    const [passwordMsg, setPasswordMsg] = useState('');
    const [passwordError, setPasswordError] = useState('');

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        const fetchProfile = async () => {
            try {
                const res = await axios.get(`${API_BASE}/api/users/me`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setProfileForm({
                    username: res.data.username || '',
                    phoneNumber: res.data.phoneNumber || '',
                    avatarUrl: res.data.profile?.avatarUrl || '',
                });
            } catch (err) {
                console.error(err);
                if (err.response?.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/login');
                } else {
                    setProfileError('Failed to load profile');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [token, navigate]);

    const checkAvailability = useCallback(
        debounce(async ({ username, phoneNumber }) => {
            try {
                setAvailability((a) => ({ ...a, checking: true }));
                const params = {};
                if (username) params.username = username;
                if (phoneNumber) params.phoneNumber = phoneNumber;

                const res = await axios.get(`${API_BASE}/api/auth/check-availability`, { params });

                setAvailability({
                    checking: false,
                    usernameTaken: res.data.usernameTaken,
                    phoneTaken: res.data.phoneTaken,
                });
            } catch (err) {
                setAvailability((a) => ({ ...a, checking: false }));
            }
        }, 500),
        []
    );

    useEffect(() => {
        if (profileForm.username || profileForm.phoneNumber) {
            checkAvailability({
                username: profileForm.username,
                phoneNumber: profileForm.phoneNumber,
            });
        }
    }, [profileForm.username, profileForm.phoneNumber, checkAvailability]);

    const handleProfileChange = (e) => {
        setProfileError('');
        setProfileMsg('');
        const { name, value } = e.target;
        setProfileForm((f) => ({ ...f, [name]: value }));
    };

    const handleProfileSave = async (e) => {
        e.preventDefault();
        setProfileError('');
        setProfileMsg('');

        if (availability.usernameTaken) {
            setProfileError('Username already taken');
            return;
        }
        if (availability.phoneTaken) {
            setProfileError('Phone number already in use');
            return;
        }

        try {
            await axios.patch(
                `${API_BASE}/api/users/me`,
                {
                    username: profileForm.username,
                    phoneNumber: profileForm.phoneNumber,
                    avatarUrl: profileForm.avatarUrl,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setProfileMsg('Profile updated');
        } catch (err) {
            console.error(err);
            if (err.response?.status === 409) {
                setProfileError(err.response.data.error);
            } else {
                setProfileError('Failed to update profile');
            }
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        setProfileError('');
        setProfileMsg('');

        try {
            const formData = new FormData();
            formData.append('avatar', file);

            const res = await axios.post(`${API_BASE}/api/users/upload-avatar`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            setProfileForm((prev) => ({
                ...prev,
                avatarUrl: res.data.avatarUrl,
            }));
            setProfileMsg('Avatar uploaded');
        } catch (error) {
            console.error('Upload error', error);
            setProfileError('Failed to upload avatar');
        } finally {
            setUploading(false);
        }
    };

    const handlePasswordInputChange = (e) => {
        setPasswordError('');
        setPasswordMsg('');
        const { name, value } = e.target;
        setPasswordForm((p) => ({ ...p, [name]: value }));
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setPasswordError('');
        setPasswordMsg('');

        if (!passwordForm.oldPassword || !passwordForm.newPassword) {
            setPasswordError('Both fields are required');
            return;
        }

        try {
            await axios.post(
                `${API_BASE}/api/auth/change-password`,
                {
                    oldPassword: passwordForm.oldPassword,
                    newPassword: passwordForm.newPassword,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setPasswordMsg('Password updated');
            setPasswordForm({ oldPassword: '', newPassword: '' });
        } catch (err) {
            console.error(err);
            setPasswordError(err.response?.data?.error || 'Password change failed');
        }
    };

    if (loading) return <div style={{ padding: 20 }}>Loading profile...</div>;

    return (
        <>
            <div style={{ maxWidth: 700, margin: 'auto', padding: 24, position: 'relative' }}>
                {/* Back Icon */}
                <IoArrowBackOutline
                    size={28}
                    style={{
                        position: 'absolute',
                        top: -30, // moved higher
                        left: 16,
                        cursor: 'pointer',
                        color: '#333',
                    }}
                    onClick={() => navigate(-1)}
                />


                {/* Profile Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, marginTop: 16 }}>
                    <img
                        src={
                            profileForm.avatarUrl ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(profileForm.username || 'User')}&background=4CAF50&color=fff`
                        }
                        alt="avatar"
                        style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', border: '2px solid #ccc' }}
                    />
                    <h2 style={{ margin: 0 }}>{profileForm.username}</h2>
                </div>

                {/* Profile Form */}
                <form onSubmit={handleProfileSave} style={formStyle}>
                    {profileError && <div style={{ color: 'red' }}>{profileError}</div>}
                    {profileMsg && <div style={{ color: 'green' }}>{profileMsg}</div>}

                    <div style={fieldStyle}>
                        <label>Change Username</label>
                        <input
                            name="username"
                            value={profileForm.username}
                            onChange={handleProfileChange}
                            style={inputStyle}
                            required
                        />
                        {availability.checking && <div style={hintStyle}>Checking availability...</div>}
                        {!availability.checking && availability.usernameTaken && (
                            <div style={{ ...hintStyle, color: 'red' }}>Username taken</div>
                        )}
                    </div>

                    <div style={fieldStyle}>
                        <label>Phone Number</label>
                        <input
                            name="phoneNumber"
                            value={profileForm.phoneNumber}
                            readOnly
                            style={{ ...inputStyle, backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
                        />
                        <div style={{ fontSize: 12, color: '#888' }}>To change phone number, please contact the library admin.</div>
                    </div>

                    <div style={fieldStyle}>
                        <label>Change Avatar</label>
                        <input type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} />
                        {uploading && <div>Uploading...</div>}
                    </div>

                    <div style={{ marginTop: 32 }}>
                        <h3>Change Password</h3>
                        {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
                        {passwordMsg && <div style={{ color: 'green' }}>{passwordMsg}</div>}
                    </div>

                    <div style={fieldStyle}>
                        <label>Old Password</label>
                        <input
                            type="password"
                            name="oldPassword"
                            value={passwordForm.oldPassword}
                            onChange={handlePasswordInputChange}
                            style={inputStyle}
                        />
                    </div>

                    <div style={fieldStyle}>
                        <label>New Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={passwordForm.newPassword}
                            onChange={handlePasswordInputChange}
                            style={inputStyle}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{ ...saveButtonStyle, marginTop: 24 }}
                        disabled={availability.usernameTaken || availability.phoneTaken}
                    >
                        Update Profile
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
}

// Inline styles
const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    marginTop: 8,
};

const fieldStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
};

const inputStyle = {
    padding: '10px 12px',
    borderRadius: 6,
    border: '1px solid #ccc',
    fontSize: 14,
    width: '100%',
    boxSizing: 'border-box',
};

const saveButtonStyle = {
    padding: '12px 18px',
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    fontWeight: '600',
    alignSelf: 'start',
};

const hintStyle = {
    fontSize: 12,
    marginTop: 4,
    color: '#555',
};
