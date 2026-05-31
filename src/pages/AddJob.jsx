import "./AddJob.css";

import {
  useState,
  useEffect,
  useContext
} from "react";

import {
  useNavigate,
  useLocation
} from "react-router-dom";

import {
  toast
} from "react-toastify";

import {
  NotificationContext
} from "../context/NotificationContext";

import {
  JobContext
} from "../context/JobContext";

function AddJob() {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const {
    addNotification
  } = useContext(
    NotificationContext
  );

  const {
    addJob,
    updateJob
  } = useContext(
    JobContext
  );

  const editJob =
    location.state?.job;

  const editIndex =
    location.state?.index;

  const [company, setCompany] =
    useState("");

  const [role, setRole] =
    useState("");

  const [status, setStatus] =
    useState("Applied");

  const [notes, setNotes] =
    useState("");

  const [jobType, setJobType] =
    useState("Full Time");

  const [
    locationValue,
    setLocationValue
  ] = useState("");

  const [salary, setSalary] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    if (editJob) {

      setCompany(
        editJob.company || ""
      );

      setRole(
        editJob.role || ""
      );

      setStatus(
        editJob.status || "Applied"
      );

      setNotes(
        editJob.notes || ""
      );

      setJobType(
        editJob.jobType || "Full Time"
      );

      setLocationValue(
        editJob.location || ""
      );

      setSalary(
        editJob.salary || ""
      );
    }

  }, [editJob]);

  const handleSubmit = () => {

    if (
      !company.trim() ||
      !role.trim()
    ) {
      toast.error(
        "Please fill all required fields"
      );
      return;
    }

    setLoading(true);

    const newJob = {
      company: company.trim(),
      role: role.trim(),
      status,
      notes,
      jobType,
      location: locationValue,
      salary,
      date:
        editJob?.date ||
        new Date().toLocaleDateString(),
      createdAt:
        editJob?.createdAt ||
        Date.now()
    };

    if (editIndex !== undefined) {

      updateJob(
        editIndex,
        newJob
      );

      addNotification(
        `${company} application updated`
      );

      toast.success(
        "Job Updated Successfully"
      );

    } else {

      addJob(newJob);

      addNotification(
        `Applied to ${company} for ${role}`
      );

      toast.success(
        "Job Added Successfully"
      );
    }

    setTimeout(() => {

      setLoading(false);

      navigate(
        "/app/applications"
      );

    }, 800);
  };

  return (

    <div className="addjob-container">

      <div className="addjob-box">

        <h1 className="addjob-heading">

          {
            editJob
              ? "Edit Job"
              : "Add New Job"
          }

        </h1>

        <p className="addjob-subtext">

          Organize and track your
          applications professionally

        </p>

        <div className="input-group">

          <label>
            Company Name
          </label>

          <input
            className="addjob-input"
            type="text"
            placeholder="Google, Microsoft..."
            value={company}
            onChange={(e) =>
              setCompany(
                e.target.value
              )
            }
          />

        </div>

        <div className="input-group">

          <label>
            Role
          </label>

          <input
            className="addjob-input"
            type="text"
            placeholder="Frontend Developer"
            value={role}
            onChange={(e) =>
              setRole(
                e.target.value
              )
            }
          />

        </div>

        <div className="double-grid">

          <div className="input-group">

            <label>
              Status
            </label>

            <select
              className="addjob-select"
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value
                )
              }
            >

              <option>
                Applied
              </option>

              <option>
                Interview
              </option>

              <option>
                Rejected
              </option>

              <option>
                Offer
              </option>

            </select>

          </div>

          <div className="input-group">

            <label>
              Job Type
            </label>

            <select
              className="addjob-select"
              value={jobType}
              onChange={(e) =>
                setJobType(
                  e.target.value
                )
              }
            >

              <option>
                Full Time
              </option>

              <option>
                Internship
              </option>

              <option>
                Remote
              </option>

              <option>
                Hybrid
              </option>

            </select>

          </div>

        </div>

        <div className="double-grid">

          <div className="input-group">

            <label>
              Location
            </label>

            <input
              className="addjob-input"
              type="text"
              placeholder="Bangalore"
              value={locationValue}
              onChange={(e) =>
                setLocationValue(
                  e.target.value
                )
              }
            />

          </div>

          <div className="input-group">

            <label>
              Salary
            </label>

            <input
              className="addjob-input"
              type="text"
              placeholder="₹6 LPA"
              value={salary}
              onChange={(e) =>
                setSalary(
                  e.target.value
                )
              }
            />

          </div>

        </div>

        <div className="input-group">

          <label>
            Notes
          </label>

          <textarea
            className="addjob-textarea"
            placeholder="Interview details, HR contact..."
            value={notes}
            onChange={(e) =>
              setNotes(
                e.target.value
              )
            }
          />

        </div>

        <button
          className="addjob-btn"
          onClick={handleSubmit}
          disabled={loading}
        >

          {
            loading
              ? "Processing..."
              : editJob
                ? "Update Job"
                : "Add Job"
          }

        </button>

      </div>

    </div>
  );
}

export default AddJob;