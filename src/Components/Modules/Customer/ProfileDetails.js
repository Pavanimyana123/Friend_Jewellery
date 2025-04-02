import React, { useEffect, useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import baseURL from '../../../Url/NodeBaseURL';
import { AuthContext } from '../../AuthContext/ContextApi';
import CustomerNavbar from '../../Pages/Navbar/CustomerNavbar';
import './ProfileDetails.css';

const ProfileDetails = () => {
    const { user } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [saveLoading, setSaveLoading] = useState(false);
    const [saveError, setSaveError] = useState(null);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    // Separated fetch function
    const fetchProfileDetails = async () => {
        if (!user || !user.id) {
            setLoading(false);
            setError('User not logged in');
            return;
        }

        try {
            const response = await fetch(`${baseURL}/account/${user.id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch profile details');
            }
            const data = await response.json();
            setProfile(data);
            setFormData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfileDetails();
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        if (!formData.mobile?.trim()) {
            alert("Mobile number is required.");
            return false;
        }

        if (formData.pincode?.trim() && formData.pincode.length !== 6) {
            alert("PinCode must be exactly 6 digits.");
            return false;
        }
        if (formData.aadhar_card?.trim() && formData.aadhar_card.length !== 12) {
            alert("Aadhar Card must be exactly 12 digits.");
            return false;
        }
        if (formData.pan_card?.trim() && formData.pan_card.length !== 10) {
            alert("PAN Card must be exactly 10 characters.");
            return false;
        }
        if (formData.gst_in?.trim() && formData.gst_in.length !== 15) {
            alert("GSTIN must be exactly 15 characters.");
            return false;
        }
        if (formData.ifsc_code?.trim() && formData.ifsc_code.length !== 11) {
            alert("IFSC Code must be exactly 11 characters.");
            return false;
        }

        return true;
    };


    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSave = async () => {
        if (!validateForm()) return; // Stop execution if validation fails
        setSaveLoading(true);
        setSaveError(null);

        try {
            const response = await fetch(`${baseURL}/update-account/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to update account');
            }

            const updatedData = await response.json();
            setProfile(updatedData);
            setIsEditing(false);
            fetchProfileDetails();
        } catch (err) {
            alert("❌ " + err.message); // Show error alert if saving fails
        } finally {
            setSaveLoading(false);
        }
    };

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-danger">Error: {error}</div>;

    return (
        <>
            <CustomerNavbar />
            <div className="main-container">
                <div className="profile-details-container">
                    <div className="card">
                        <div className="card-header">
                            <h2 className="text-center">Personal Information</h2>
                        </div>
                        <div className="card-body">
                            <div className="row mb-3">
                                <div className="col-md-4">
                                    <label className="form-label"><strong>Full Name:</strong></label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="account_name"
                                            value={formData.account_name || ''}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        <span>{profile?.account_name || ''}</span>
                                    )}
                                </div>
                                {/* <div className="col-md-4">
                                <label className="form-label"><strong>Password:</strong></label>
                                {isEditing ? (
                                    <div className="input-group">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            className="form-control"
                                            name="password"
                                            value={formData.password || ''}
                                            onChange={handleInputChange}
                                        />
                                        <span
                                            className="input-group-text bg-transparent border-start-0"
                                            style={{ cursor: 'pointer' }}
                                            onClick={toggleShowPassword}
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </span>
                                    </div>
                                ) : (
                                    <span>{profile?.password || ''}</span>
                                )}
                            </div> */}
                                <div className="col-md-4">
                                    <label className="form-label"><strong>Mobile:</strong></label>
                                    {isEditing ? (
                                        <input
                                            type="tel"
                                            className="form-control"
                                            name="mobile"
                                            value={formData.mobile || ''}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        <span>{profile?.mobile || ''}</span>
                                    )}
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label"><strong>Email:</strong></label>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            value={formData.email || ''}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        <span>{profile?.email || ''}</span>
                                    )}
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-4">
                                    <label className="form-label"><strong>Address1:</strong></label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="address1"
                                            value={formData.address1 || ''}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        <span>{profile?.address1 || ''}</span>
                                    )}
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label"><strong>Address2:</strong></label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="address2"
                                            value={formData.address2 || ''}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        <span>{profile?.address2 || ''}</span>
                                    )}
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label"><strong>City:</strong></label>
                                    {isEditing ? (
                                        <input
                                            type="city"
                                            className="form-control"
                                            name="city"
                                            value={formData.city || ''}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        <span>{profile?.city || ''}</span>
                                    )}
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-4">
                                    <label className="form-label"><strong>Pincode:</strong></label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="pincode"
                                            value={formData.pincode || ''}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        <span>{profile?.pincode || ''}</span>
                                    )}
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label"><strong>State:</strong></label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="state"
                                            value={formData.state || ''}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        <span>{profile?.state || ''}</span>
                                    )}
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label"><strong>State Code:</strong></label>
                                    {isEditing ? (
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="state_code"
                                            value={formData.state_code || ''}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        <span>{profile?.state_code || ''}</span>
                                    )}
                                </div>
                            </div>
                            <div className='row mb-3'>
                                <div className="col-md-4">
                                    <label className="form-label"><strong>Birthday:</strong></label>
                                    {isEditing ? (
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="birthday"
                                            value={formData.birthday ? formData.birthday.split('T')[0] : ''}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        <span>{profile?.birthday ? profile.birthday.split('T')[0] : ''}</span>
                                    )}
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label"><strong>Anniversary:</strong></label>
                                    {isEditing ? (
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="anniversary"
                                            value={formData.anniversary ? formData.anniversary.split('T')[0] : ''}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        <span>{profile?.anniversary ? profile.anniversary.split('T')[0] : ''}</span>
                                    )}
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label"><strong>Pancard:</strong></label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="pan_card"
                                            value={formData.pan_card || ''}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        <span>{profile?.pan_card || ''}</span>
                                    )}
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-4">
                                    <label className="form-label"><strong>Bank Account No:</strong></label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="bank_account_no"
                                            value={formData.bank_account_no || ''}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        <span>{profile?.bank_account_no || ''}</span>
                                    )}
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label"><strong>Bank Name:</strong></label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="bank_name"
                                            value={formData.bank_name || ''}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        <span>{profile?.bank_name || ''}</span>
                                    )}
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label"><strong>IFSC Code:</strong></label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="ifsc_code"
                                            value={formData.ifsc_code || ''}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        <span>{profile?.ifsc_code || ''}</span>
                                    )}
                                </div>
                            </div>
                            <div className='row mb-3'>
                                <div className="col-md-4">
                                    <label className="form-label"><strong>Branch:</strong></label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="branch"
                                            value={formData.branch || ''}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        <span>{profile?.branch || ''}</span>
                                    )}
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label"><strong>GST IN:</strong></label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="gst_in"
                                            value={formData.gst_in || ''}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        <span>{profile?.gst_in || ''}</span>
                                    )}
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label"><strong>Aadhar Card :</strong></label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="aadhar_card"
                                            value={formData.aadhar_card || ''}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        <span>{profile?.aadhar_card || ''}</span>
                                    )}
                                </div>
                            </div>
                            {isEditing && saveError && (
                                <div className="alert alert-danger">{saveError}</div>
                            )}
                            <div className="profile-buttons">
                                {isEditing ? (
                                    <>
                                        <button
                                            type="button"
                                            className="btn btn-success"
                                            onClick={handleSave}
                                            disabled={saveLoading}
                                        >
                                            {saveLoading ? 'Saving...' : 'Save'}
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() => setIsEditing(false)}
                                            disabled={saveLoading}
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => setIsEditing(true)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-secondary"
                                            onClick={() => navigate('/c-dashboard')}
                                        >
                                            Back
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div >
            </div>
        </>
    );
};

export default ProfileDetails;