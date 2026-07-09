import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { FaUser, FaLock, FaShieldAlt, FaBell } from "react-icons/fa";
import "../css/settings.css";

const Settings = () => {
  const { updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    timezone: "",
  });

  // Password form
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // 2FA
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState("");

  // Notifications
  const [notifications, setNotifications] = useState({
    emailDeposit: true,
    emailWithdrawal: true,
    emailProfit: true,
    emailSecurity: true,
    pushDeposit: false,
    pushWithdrawal: false,
  });

  // Load data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/user/profile");
        const data = res.data;
        setProfile({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          country: data.country || "United States",
          timezone: data.timezone || "UTC",
        });
      } catch (err) {
        console.error("Failed to load profile", err);
      }
    };
    fetchData();
  }, []);

  // Profile update
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Re-enabled loading for UX
    try {
      const res = await api.put("/user/profile", profile);

      // If backend returns the updated user, sync it globally
      if (res.data.user) {
        updateUser(res.data.user);
      }

      setMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (err) {
      setMessage({
        type: "danger", // Changed to 'danger' to match Bootstrap alert classes
        text: err.response?.data?.message || "Update failed",
      });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    }
  };

  // Password change
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match." });
      return;
    }
    if (passwordData.newPassword.length < 6) {
      setMessage({
        type: "error",
        text: "Password must be at least 6 characters.",
      });
      return;
    }
    setLoading(true);
    try {
      await api.put("/user/password", {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      setMessage({ type: "success", text: "Password changed!" });
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Current password is incorrect.",
      });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    }
  };

  // 2FA enable
  const handleEnable2FA = async (e) => {
    e.preventDefault();
    if (!twoFactorCode || twoFactorCode.length !== 6) {
      setMessage({ type: "error", text: "Enter a 6‑digit code." });
      return;
    }
    setLoading(true);
    try {
      await api.post("/user/2fa/enable", { code: twoFactorCode });
      setTwoFactorEnabled(true);
      setMessage({ type: "success", text: "2FA enabled!" });
      setTwoFactorCode("");
    } catch (err) {
      setMessage({ type: "error", text: "Invalid code." });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    }
  };
  const handleDisable2FA = async () => {
    setLoading(true);
    try {
      await api.post("/user/2fa/disable");
      setTwoFactorEnabled(false);
      setMessage({ type: "success", text: "2FA disabled." });
    } catch (err) {
      setMessage({ type: "error", text: "Failed to disable 2FA." });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    }
  };

  // Notifications update
  const handleNotificationSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put("/user/notifications", notifications);
      setMessage({ type: "success", text: "Preferences saved!" });
    } catch (err) {
      setMessage({ type: "error", text: "Failed to save preferences." });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    }
  };

  const clearMessage = () => setMessage({ type: "", text: "" });

  return (
    <div className="settings-page py-4">
      <div className="container">
        <h1 className="mb-4 text-white">Account Settings</h1>
        {message.text && (
          <div className={`alert alert-${message.type} mb-4`}>
            {message.text}
            <button
              type="button"
              className="btn-close float-end"
              onClick={clearMessage}
            />
          </div>
        )}
        <div className="row g-4">
          {/* Sidebar */}
          <div className="col-md-3">
            <div className="settings-sidebar">
              <button
                className={`sidebar-tab ${activeTab === "profile" ? "active" : ""}`}
                onClick={() => setActiveTab("profile")}
              >
                <FaUser /> Profile
              </button>
              <button
                className={`sidebar-tab ${activeTab === "security" ? "active" : ""}`}
                onClick={() => setActiveTab("security")}
              >
                <FaLock /> Security
              </button>
              <button
                className={`sidebar-tab ${activeTab === "2fa" ? "active" : ""}`}
                onClick={() => setActiveTab("2fa")}
              >
                <FaShieldAlt /> Two-Factor Auth
              </button>
              <button
                className={`sidebar-tab ${activeTab === "notifications" ? "active" : ""}`}
                onClick={() => setActiveTab("notifications")}
              >
                <FaBell /> Notifications
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="col-md-9">
            <div className="settings-content">
              {/* ========= PROFILE TAB ========= */}
              {activeTab === "profile" && (
                <div className="settings-card">
                  <h3>Profile Information</h3>
                  <form onSubmit={handleProfileSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label>Full Name</label>
                        <input
                          type="text"
                          name="name"
                          className="form-control settings-input"
                          value={profile.name}
                          onChange={(e) =>
                            setProfile({ ...profile, name: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label>Email</label>
                        <input
                          type="email"
                          name="email"
                          className="form-control settings-input"
                          value={profile.email}
                          onChange={(e) =>
                            setProfile({ ...profile, email: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label>Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          className="form-control settings-input"
                          value={profile.phone}
                          onChange={(e) =>
                            setProfile({ ...profile, phone: e.target.value })
                          }
                        />
                      </div>
                      <div className="col-md-6">
                        <label>Country</label>
                        <select
                          name="country"
                          className="form-select settings-input"
                          value={profile.country}
                          onChange={(e) =>
                            setProfile({ ...profile, country: e.target.value })
                          }
                        >
                          <option value="">Select Country</option>
                          <option>Afghanistan</option>
                          <option>Albania</option>
                          <option>Algeria</option>
                          <option>Andorra</option>
                          <option>Angola</option>
                          <option>Antigua and Barbuda</option>
                          <option>Argentina</option>
                          <option>Armenia</option>
                          <option>Australia</option>
                          <option>Austria</option>
                          <option>Azerbaijan</option>
                          <option>Bahamas</option>
                          <option>Bahrain</option>
                          <option>Bangladesh</option>
                          <option>Barbados</option>
                          <option>Belarus</option>
                          <option>Belgium</option>
                          <option>Belize</option>
                          <option>Benin</option>
                          <option>Bhutan</option>
                          <option>Bolivia</option>
                          <option>Bosnia and Herzegovina</option>
                          <option>Botswana</option>
                          <option>Brazil</option>
                          <option>Brunei</option>
                          <option>Bulgaria</option>
                          <option>Burkina Faso</option>
                          <option>Burundi</option>
                          <option>Cambodia</option>
                          <option>Cameroon</option>
                          <option>Canada</option>
                          <option>Cape Verde</option>
                          <option>Central African Republic</option>
                          <option>Chad</option>
                          <option>Chile</option>
                          <option>China</option>
                          <option>Colombia</option>
                          <option>Comoros</option>
                          <option>Congo</option>
                          <option>Costa Rica</option>
                          <option>Croatia</option>
                          <option>Cuba</option>
                          <option>Cyprus</option>
                          <option>Czech Republic</option>
                          <option>Denmark</option>
                          <option>Djibouti</option>
                          <option>Dominica</option>
                          <option>Dominican Republic</option>
                          <option>Ecuador</option>
                          <option>Egypt</option>
                          <option>El Salvador</option>
                          <option>Equatorial Guinea</option>
                          <option>Eritrea</option>
                          <option>Estonia</option>
                          <option>Eswatini</option>
                          <option>Ethiopia</option>
                          <option>Fiji</option>
                          <option>Finland</option>
                          <option>France</option>
                          <option>Gabon</option>
                          <option>Gambia</option>
                          <option>Georgia</option>
                          <option>Germany</option>
                          <option>Ghana</option>
                          <option>Greece</option>
                          <option>Grenada</option>
                          <option>Guatemala</option>
                          <option>Guinea</option>
                          <option>Guinea-Bissau</option>
                          <option>Guyana</option>
                          <option>Haiti</option>
                          <option>Honduras</option>
                          <option>Hungary</option>
                          <option>Iceland</option>
                          <option>India</option>
                          <option>Indonesia</option>
                          <option>Iran</option>
                          <option>Iraq</option>
                          <option>Ireland</option>
                          <option>Israel</option>
                          <option>Italy</option>
                          <option>Jamaica</option>
                          <option>Japan</option>
                          <option>Jordan</option>
                          <option>Kazakhstan</option>
                          <option>Kenya</option>
                          <option>Kiribati</option>
                          <option>Kuwait</option>
                          <option>Kyrgyzstan</option>
                          <option>Laos</option>
                          <option>Latvia</option>
                          <option>Lebanon</option>
                          <option>Lesotho</option>
                          <option>Liberia</option>
                          <option>Libya</option>
                          <option>Liechtenstein</option>
                          <option>Lithuania</option>
                          <option>Luxembourg</option>
                          <option>Madagascar</option>
                          <option>Malawi</option>
                          <option>Malaysia</option>
                          <option>Maldives</option>
                          <option>Mali</option>
                          <option>Malta</option>
                          <option>Marshall Islands</option>
                          <option>Mauritania</option>
                          <option>Mauritius</option>
                          <option>Mexico</option>
                          <option>Micronesia</option>
                          <option>Moldova</option>
                          <option>Monaco</option>
                          <option>Mongolia</option>
                          <option>Montenegro</option>
                          <option>Morocco</option>
                          <option>Mozambique</option>
                          <option>Myanmar</option>
                          <option>Namibia</option>
                          <option>Nauru</option>
                          <option>Nepal</option>
                          <option>Netherlands</option>
                          <option>New Zealand</option>
                          <option>Nicaragua</option>
                          <option>Niger</option>
                          <option>Nigeria</option>
                          <option>North Korea</option>
                          <option>North Macedonia</option>
                          <option>Norway</option>
                          <option>Oman</option>
                          <option>Pakistan</option>
                          <option>Palau</option>
                          <option>Panama</option>
                          <option>Papua New Guinea</option>
                          <option>Paraguay</option>
                          <option>Peru</option>
                          <option>Philippines</option>
                          <option>Poland</option>
                          <option>Portugal</option>
                          <option>Qatar</option>
                          <option>Romania</option>
                          <option>Russia</option>
                          <option>Rwanda</option>
                          <option>Saint Kitts and Nevis</option>
                          <option>Saint Lucia</option>
                          <option>Saint Vincent and the Grenadines</option>
                          <option>Samoa</option>
                          <option>San Marino</option>
                          <option>Sao Tome and Principe</option>
                          <option>Saudi Arabia</option>
                          <option>Senegal</option>
                          <option>Serbia</option>
                          <option>Seychelles</option>
                          <option>Sierra Leone</option>
                          <option>Singapore</option>
                          <option>Slovakia</option>
                          <option>Slovenia</option>
                          <option>Solomon Islands</option>
                          <option>Somalia</option>
                          <option>South Africa</option>
                          <option>South Korea</option>
                          <option>South Sudan</option>
                          <option>Spain</option>
                          <option>Sri Lanka</option>
                          <option>Sudan</option>
                          <option>Suriname</option>
                          <option>Sweden</option>
                          <option>Switzerland</option>
                          <option>Syria</option>
                          <option>Taiwan</option>
                          <option>Tajikistan</option>
                          <option>Tanzania</option>
                          <option>Thailand</option>
                          <option>Timor-Leste</option>
                          <option>Togo</option>
                          <option>Tonga</option>
                          <option>Trinidad and Tobago</option>
                          <option>Tunisia</option>
                          <option>Turkey</option>
                          <option>Turkmenistan</option>
                          <option>Tuvalu</option>
                          <option>Uganda</option>
                          <option>Ukraine</option>
                          <option>United Arab Emirates</option>
                          <option>United Kingdom</option>
                          <option>United States</option>
                          <option>Uruguay</option>
                          <option>Uzbekistan</option>
                          <option>Vanuatu</option>
                          <option>Vatican City</option>
                          <option>Venezuela</option>
                          <option>Vietnam</option>
                          <option>Yemen</option>
                          <option>Zambia</option>
                          <option>Zimbabwe</option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label>Timezone</label>
                        <select
                          className="form-select settings-input"
                          value={profile.timezone}
                          onChange={(e) =>
                            setProfile({ ...profile, timezone: e.target.value })
                          }
                        >
                          <option value="">Select Time Zone</option>

                          <option value="America/New_York">
                            Eastern Time (ET)
                          </option>
                          <option value="America/Chicago">
                            Central Time (CT)
                          </option>
                          <option value="America/Denver">
                            Mountain Time (MT)
                          </option>
                          <option value="America/Los_Angeles">
                            Pacific Time (PT)
                          </option>
                          <option value="America/Anchorage">
                            Alaska Time (AKT)
                          </option>
                          <option value="Pacific/Honolulu">
                            Hawaii Time (HST)
                          </option>
                          <option value="America/Toronto">
                            Toronto (EST/EDT)
                          </option>
                          <option value="America/Vancouver">
                            Vancouver (PST/PDT)
                          </option>
                          <option value="America/Mexico_City">
                            Mexico City (CST)
                          </option>

                          <option value="Europe/London">
                            London (GMT/BST)
                          </option>
                          <option value="Europe/Paris">Paris (CET)</option>
                          <option value="Europe/Berlin">Berlin (CET)</option>
                          <option value="Europe/Madrid">Madrid (CET)</option>
                          <option value="Europe/Rome">Rome (CET)</option>
                          <option value="Europe/Amsterdam">
                            Amsterdam (CET)
                          </option>
                          <option value="Europe/Brussels">
                            Brussels (CET)
                          </option>
                          <option value="Europe/Zurich">Zurich (CET)</option>
                          <option value="Europe/Moscow">Moscow (MSK)</option>

                          <option value="Africa/Lagos">Lagos (WAT)</option>
                          <option value="Africa/Cairo">Cairo (EET)</option>
                          <option value="Africa/Johannesburg">
                            Johannesburg (SAST)
                          </option>
                          <option value="Africa/Nairobi">Nairobi (EAT)</option>
                          <option value="Africa/Accra">Accra (GMT)</option>

                          <option value="Asia/Dubai">Dubai (GST)</option>
                          <option value="Asia/Kolkata">India (IST)</option>
                          <option value="Asia/Karachi">Pakistan (PKT)</option>
                          <option value="Asia/Dhaka">Bangladesh (BST)</option>
                          <option value="Asia/Bangkok">Bangkok (ICT)</option>
                          <option value="Asia/Singapore">
                            Singapore (SGT)
                          </option>
                          <option value="Asia/Hong_Kong">
                            Hong Kong (HKT)
                          </option>
                          <option value="Asia/Shanghai">China (CST)</option>
                          <option value="Asia/Seoul">Seoul (KST)</option>
                          <option value="Asia/Tokyo">Tokyo (JST)</option>

                          <option value="Australia/Sydney">
                            Sydney (AEST)
                          </option>
                          <option value="Australia/Perth">Perth (AWST)</option>
                          <option value="Pacific/Auckland">
                            Auckland (NZST)
                          </option>

                          <option value="America/Sao_Paulo">
                            São Paulo (BRT)
                          </option>
                          <option value="America/Buenos_Aires">
                            Buenos Aires (ART)
                          </option>
                          <option value="America/Bogota">Bogotá (COT)</option>
                          <option value="America/Lima">Lima (PET)</option>

                          <option value="UTC">
                            UTC (Coordinated Universal Time)
                          </option>
                        </select>
                      </div>
                      <div className="col-12">
                        <button
                          type="submit"
                          className="btn btn-save"
                          disabled={loading}
                        >
                          {loading ? "Saving..." : "Save Changes"}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {/* ========= SECURITY TAB (Change Password) ========= */}
              {activeTab === "security" && (
                <div className="settings-card">
                  <h3>Change Password</h3>
                  <form onSubmit={handlePasswordSubmit}>
                    <div className="mb-3">
                      <label>Current Password</label>
                      <input
                        type="password"
                        name="currentPassword"
                        className="form-control settings-input"
                        value={passwordData.currentPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            currentPassword: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label>New Password</label>
                      <input
                        type="password"
                        name="newPassword"
                        className="form-control settings-input"
                        value={passwordData.newPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            newPassword: e.target.value,
                          })
                        }
                        required
                      />
                      <small>Minimum 6 characters</small>
                    </div>
                    <div className="mb-3">
                      <label>Confirm New Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        className="form-control settings-input"
                        value={passwordData.confirmPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            confirmPassword: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-save"
                      disabled={loading}
                    >
                      {loading ? "Updating..." : "Update Password"}
                    </button>
                  </form>
                </div>
              )}

              {/* ========= TWO-FACTOR AUTH TAB ========= */}
              {activeTab === "2fa" && (
                <div className="settings-card">
                  <h3>Two-Factor Authentication</h3>
                  {!twoFactorEnabled ? (
                    <form onSubmit={handleEnable2FA}>
                      <p className="text-white-50">
                        Use an authenticator app like Google Authenticator.
                      </p>
                      <div className="qr-placeholder">
                        <div className="mock-qr">[QR Code]</div>
                        <p className="small text-white-50">
                          Secret Key: <code>ABCD EFGH IJKL MNOP</code>
                        </p>
                      </div>
                      <div className="mb-3">
                        <label>Verification Code</label>
                        <input
                          type="text"
                          className="form-control settings-input"
                          placeholder="6-digit code"
                          value={twoFactorCode}
                          onChange={(e) => setTwoFactorCode(e.target.value)}
                          maxLength="6"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-save"
                        disabled={loading}
                      >
                        {loading ? "Verifying..." : "Enable 2FA"}
                      </button>
                    </form>
                  ) : (
                    <div>
                      <div className="alert alert-success">
                        ✅ 2FA is ENABLED
                      </div>
                      <button
                        className="btn btn-danger"
                        onClick={handleDisable2FA}
                        disabled={loading}
                      >
                        {loading ? "Disabling..." : "Disable 2FA"}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* ========= NOTIFICATIONS TAB ========= */}
              {activeTab === "notifications" && (
                <div className="settings-card">
                  <h3>Notification Preferences</h3>
                  <form onSubmit={handleNotificationSubmit}>
                    <div className="mb-4">
                      <h5>Email Notifications</h5>
                      {Object.entries(notifications)
                        .filter(([key]) => key.startsWith("email"))
                        .map(([key, val]) => (
                          <div key={key} className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={val}
                              onChange={(e) =>
                                setNotifications({
                                  ...notifications,
                                  [key]: e.target.checked,
                                })
                              }
                            />
                            <label className="form-check-label text-white">
                              {key
                                .replace(/([A-Z])/g, " $1")
                                .replace(/^email/, "Email")}
                            </label>
                          </div>
                        ))}
                    </div>
                    <div className="mb-4">
                      <h5>Push Notifications</h5>
                      {Object.entries(notifications)
                        .filter(([key]) => key.startsWith("push"))
                        .map(([key, val]) => (
                          <div key={key} className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={val}
                              onChange={(e) =>
                                setNotifications({
                                  ...notifications,
                                  [key]: e.target.checked,
                                })
                              }
                            />
                            <label className="form-check-label text-white">
                              {key
                                .replace(/([A-Z])/g, " $1")
                                .replace(/^push/, "Push")}
                            </label>
                          </div>
                        ))}
                    </div>
                    <button
                      type="submit"
                      className="btn btn-save"
                      disabled={loading}
                    >
                      {loading ? "Saving..." : "Save Preferences"}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
