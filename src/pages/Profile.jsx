import "./Profile.css";

import {
  useEffect,
  useState,
  useContext
} from "react";

import {
  toast
} from "react-toastify";

import {
  JobContext
} from "../context/JobContext";

import PageWrapper from "../components/PageWrapper";

function Profile() {

  const { jobs } =
    useContext(JobContext);

  const currentUser =
    JSON.parse(
      localStorage.getItem(
        "currentUser"
      )
    );

  const [profile, setProfile] =
    useState({
      name:
        currentUser?.name || "Dileep Kumar",

      email:
        currentUser?.email || "dileepkumarmallela1110@gmail.com",

      role:
        "Frontend Developer",

      location:
        "India",

      bio:
        "Passionate React.js developer building modern responsive web applications.",

      skills:
        "HTML, CSS, JavaScript, React.js, Responsive UI, GitHub",

      github:
        "https://github.com/dileep1142",

      linkedin:
        "https://www.linkedin.com/in/dileep-kumar-mallela-28b9852a7/",

      image:
        "profile.png"
    });

  useEffect(() => {

    const savedProfile =
      JSON.parse(
        localStorage.getItem(
          "profile"
        )
      );

    if (savedProfile) {

      setProfile(savedProfile);
    }

  }, []);

  const applied =
    jobs.filter(
      (j) =>
        j.status === "Applied"
    ).length;

  const interview =
    jobs.filter(
      (j) =>
        j.status === "Interview"
    ).length;

  const offer =
    jobs.filter(
      (j) =>
        j.status === "Offer"
    ).length;

  const handleChange = (e) => {

    setProfile({
      ...profile,
      [e.target.name]:
        e.target.value
    });
  };

  const handleImage = (e) => {

    const file =
      e.target.files[0];

    if (!file) return;

    const reader =
      new FileReader();

    reader.onloadend = () => {

      setProfile({
        ...profile,
        image: reader.result
      });
    };

    reader.readAsDataURL(file);
  };

  const saveProfile = () => {

    localStorage.setItem(
      "profile",
      JSON.stringify(profile)
    );

    toast.success(
      "Profile updated successfully"
    );
  };

  const skillsArray =
    profile.skills
      .split(",")
      .map((skill) =>
        skill.trim()
      )
      .filter(Boolean);

  return (

    <PageWrapper>

      <div className="profile-container">

        {/* TOP CARD */}

        <div className="profile-card">

          <div className="profile-top">

            <div className="profile-photo-box">

              {
                profile.image ? (

                  <img
                    src={profile.image}
                    alt="Profile"
                    className="profile-photo"
                  />

                ) : (

                  <div className="profile-avatar">
                    {
                      profile.name
                        ?.charAt(0)
                        ?.toUpperCase() || "U"
                    }
                  </div>

                )
              }

              <label className="upload-btn">

                Upload Photo

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                />

              </label>

            </div>

            <div className="profile-main-info">

              <h1>
                {profile.name}
              </h1>

              <p className="role">
                {profile.role}
              </p>

              <p className="bio">
                {profile.bio}
              </p>

            </div>

          </div>

        </div>

        {/* EDIT PROFILE */}

        <div className="profile-edit-card">

          <h2>
            Edit Profile
          </h2>

          <div className="profile-form-grid">

            <input
              name="name"
              value={profile.name}
              onChange={handleChange}
              placeholder="Full Name"
            />

            <input
              name="email"
              value={profile.email}
              onChange={handleChange}
              placeholder="Email"
            />

            <input
              name="role"
              value={profile.role}
              onChange={handleChange}
              placeholder="Preferred Role"
            />

            <input
              name="location"
              value={profile.location}
              onChange={handleChange}
              placeholder="Preferred Location"
            />

            <input
              name="github"
              value={profile.github}
              onChange={handleChange}
              placeholder="GitHub URL"
            />

            <input
              name="linkedin"
              value={profile.linkedin}
              onChange={handleChange}
              placeholder="LinkedIn URL"
            />

          </div>

          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            placeholder="Short Bio"
          />

          <textarea
            name="skills"
            value={profile.skills}
            onChange={handleChange}
            placeholder="Skills separated by comma"
          />

          <button
            className="save-profile-btn"
            onClick={saveProfile}
          >

            Save Profile

          </button>

        </div>

        {/* INFO GRID */}

        <div className="info-grid">

          <div className="info-card">

            <h2>
              Contact
            </h2>

            <div className="info-item">

              <span>📧</span>

              <a
                href={`mailto:${profile.email}`}
                className="profile-link"
              >

                Gmail

              </a>

            </div>

            <div className="info-item">

              <span>🌐</span>

              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="profile-link"
              >

                GitHub Profile

              </a>

            </div>

            <div className="info-item">

              <span>💼</span>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="profile-link"
              >

                LinkedIn Profile

              </a>

            </div>

            <div className="info-item">

              <span>📍</span>

              <p>
                {profile.location}
              </p>

            </div>

          </div>

          <div className="info-card">

            <h2>
              Skills
            </h2>

            <div className="skills">

              {
                skillsArray.map(
                  (skill, index) => (

                    <span key={index}>
                      {skill}
                    </span>

                  )
                )
              }

            </div>

          </div>

        </div>

        {/* STATS */}

        <div className="profile-stats">

          <div className="stat-card">

            <h3>
              Applied
            </h3>

            <p>
              {applied}
            </p>

          </div>

          <div className="stat-card">

            <h3>
              Interviews
            </h3>

            <p>
              {interview}
            </p>

          </div>

          <div className="stat-card">

            <h3>
              Offers
            </h3>

            <p>
              {offer}
            </p>

          </div>

        </div>

      </div>

    </PageWrapper>
  );
}

export default Profile;