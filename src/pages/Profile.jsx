import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import Modal from "../components/Modal";

function Profile() {
  const navigate = useNavigate();

  // Load from localStorage OR default
  const storedUser = JSON.parse(localStorage.getItem("user")) || {
    name: "Your Name",
    email: "dileepkumarmallela1110@gmail.com",
    role: "Frontend Developer",
  };

  const [isOpen, setIsOpen] = useState(false);

  const [form, setForm] = useState(storedUser);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ EDIT / SAVE PROFILE
  const saveProfile = () => {
    localStorage.setItem("user", JSON.stringify(form));
    setIsOpen(false);
  };

  // 🚪 LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("jobs"); // optional cleanup

    navigate("/"); // redirect to login page
  };

  return (
    <div className="profile-page">

      {/* HEADER */}
      <div className="profile-header">
        <div className="avatar">
          {form.name?.charAt(0).toUpperCase()}
        </div>

        <div>
          <h2 className="name">{form.name}</h2>
          <p className="email">{form.email}</p>
        </div>
      </div>

      {/* DETAILS CARD */}
      <div className="profile-card card">
        <h3>Account Details</h3>

        <div className="info-row">
          <span>Role</span>
          <span>{form.role}</span>
        </div>

        {/* EDIT BUTTON */}
        <button
          className="btn"
          onClick={() => setIsOpen(true)}
        >
          Edit Profile
        </button>

        {/* LOGOUT BUTTON */}
        <button
          className="btn danger"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* EDIT MODAL */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Edit Profile"
      >
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="input"
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="input"
        />

        <input
          name="role"
          value={form.role}
          onChange={handleChange}
          placeholder="Role"
          className="input"
        />

        <button className="btn" onClick={saveProfile}>
          Save Changes
        </button>
      </Modal>

    </div>
  );
}

export default Profile;