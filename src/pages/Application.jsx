import "./Application.css";

import Papa from "papaparse";

import {
  saveAs
} from "file-saver";

import {
  useState,
  useContext,
  useMemo
} from "react";

import {
  useNavigate,
  useLocation
} from "react-router-dom";

import {
  JobContext
} from "../context/JobContext";

import {
  NotificationContext
} from "../context/NotificationContext";

import PageWrapper from "../components/PageWrapper";

function Applications() {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  /* CONTEXT */

  const {
    jobs,
    setJobs
  } = useContext(
    JobContext
  );

  const {
    addNotification
  } = useContext(
    NotificationContext
  );

  /* SEARCH */

  const query =
    new URLSearchParams(
      location.search
    );

  const search =
    query.get("search") || "";

  /* STATES */

  const [sort, setSort] =
    useState("latest");

  const [
    statusFilter,
    setStatusFilter
  ] = useState("all");

  const [
    jobTypeFilter,
    setJobTypeFilter
  ] = useState("all");

  const [
    deleteIndex,
    setDeleteIndex
  ] = useState(null);

  /* DELETE */

  const confirmDelete = () => {

    const deletedJob =
      jobs[deleteIndex];

    const updatedJobs =
      jobs.filter(
        (_, i) =>
          i !== deleteIndex
      );

    setJobs(updatedJobs);

    localStorage.setItem(
      "jobs",
      JSON.stringify(updatedJobs)
    );

    addNotification(
      `${deletedJob.company} application deleted`
    );

    setDeleteIndex(null);
  };

  /* EXPORT CSV */

  const exportCSV = () => {

    if (
      filteredJobs.length === 0
    ) {

      alert(
        "No jobs available to export"
      );

      return;
    }

    const csvData =
      filteredJobs.map(
        (job) => ({

          Company:
            job.company,

          Role:
            job.role,

          Status:
            job.status,

          "Job Type":
            job.jobType,

          Location:
            job.location,

          Salary:
            job.salary,

          Notes:
            job.notes,

          Date:
            job.date

        })
      );

    const csv =
      Papa.unparse(csvData);

    const blob =
      new Blob(
        [csv],
        {
          type:
            "text/csv;charset=utf-8;"
        }
      );

    saveAs(
      blob,
      "job-applications.csv"
    );

    addNotification(
      "Applications exported as CSV"
    );
  };

  /* FILTER + SORT */

  const filteredJobs =
    useMemo(() => {

      let result =
        jobs.filter((job) => {

          const matchesSearch =

            job.company
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )

            ||

            job.role
              .toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const matchesStatus =

            statusFilter === "all"

              ? true

              : job.status === statusFilter;

          const matchesType =

            jobTypeFilter === "all"

              ? true

              : job.jobType === jobTypeFilter;

          return (

            matchesSearch
            &&
            matchesStatus
            &&
            matchesType

          );
        });

      /* SORT */

      if (sort === "latest") {

        result =
          [...result].reverse();
      }

      if (sort === "oldest") {

        result =
          [...result];
      }

      if (sort === "company") {

        result =
          [...result].sort(
            (a, b) =>

              a.company.localeCompare(
                b.company
              )
          );
      }

      return result;

    }, [
      jobs,
      search,
      sort,
      statusFilter,
      jobTypeFilter
    ]);

  return (

    <PageWrapper>

      <div className="application-container">

        {/* TOP */}

        <div className="application-top">

          <div>

            <h1 className="application-heading">
              Applications
            </h1>

            <p className="application-subtext">
              Manage and track your job applications
            </p>

          </div>

          <div className="top-buttons">

            <button
              className="export-btn"
              onClick={exportCSV}
            >

              Export CSV

            </button>

            <button
              className="new-job-btn"
              onClick={() =>
                navigate(
                  "/app/add-job"
                )
              }
            >

              + Add Job

            </button>

          </div>

        </div>

        {/* FILTERS */}

        <div className="filters-wrapper">

          <select
            className="sort-dropdown"
            value={sort}
            onChange={(e) =>
              setSort(
                e.target.value
              )
            }
          >

            <option value="latest">
              Latest
            </option>

            <option value="oldest">
              Oldest
            </option>

            <option value="company">
              Company A-Z
            </option>

          </select>

          <select
            className="sort-dropdown"
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
          >

            <option value="all">
              All Status
            </option>

            <option value="Applied">
              Applied
            </option>

            <option value="Interview">
              Interview
            </option>

            <option value="Offer">
              Offer
            </option>

            <option value="Rejected">
              Rejected
            </option>

          </select>

          <select
            className="sort-dropdown"
            value={jobTypeFilter}
            onChange={(e) =>
              setJobTypeFilter(
                e.target.value
              )
            }
          >

            <option value="all">
              All Types
            </option>

            <option value="Full Time">
              Full Time
            </option>

            <option value="Internship">
              Internship
            </option>

            <option value="Remote">
              Remote
            </option>

            <option value="Hybrid">
              Hybrid
            </option>

          </select>

        </div>

        {/* EMPTY */}

        {

          filteredJobs.length === 0 ? (

            <div className="empty-box">

              <h2>
                No Jobs Found
              </h2>

              <p>
                Try changing filters or add a new application.
              </p>

              <button
                onClick={() =>
                  navigate(
                    "/app/add-job"
                  )
                }
              >

                Add Job

              </button>

            </div>

          ) : (

            <div className="job-list">

              {

                filteredJobs.map(
                  (
                    job,
                    index
                  ) => (

                    <div
                      className="job-card"
                      key={index}
                    >

                      <div className="job-top">

                        <div>

                          <h2>
                            {job.company}
                          </h2>

                          <p className="job-role">
                            {job.role}
                          </p>

                        </div>

                        <span
                          className={`status ${job.status.toLowerCase()}`}
                        >

                          {job.status}

                        </span>

                      </div>

                      {/* META */}

                      <div className="job-meta">

                        <span>
                          📍 {job.location}
                        </span>

                        <span>
                          💼 {job.jobType}
                        </span>

                        <span>
                          💰 {job.salary}
                        </span>

                      </div>

                      {/* NOTES */}

                      <p className="notes">

                        {job.notes}

                      </p>

                      {/* DATE */}

                      <p className="job-date">

                        Applied on:
                        {" "}
                        {job.date}

                      </p>

                      {/* ACTIONS */}

                      <div className="job-actions">

                        <button
                          className="edit-btn"
                          onClick={() =>
                            navigate(
                              "/app/add-job",
                              {
                                state: {
                                  job,
                                  index
                                }
                              }
                            )
                          }
                        >

                          Edit

                        </button>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            setDeleteIndex(index)
                          }
                        >

                          Delete

                        </button>

                      </div>

                    </div>

                  )
                )

              }

            </div>

          )

        }

        {/* MODAL */}

        {

          deleteIndex !== null && (

            <div className="modal-overlay">

              <div className="delete-modal">

                <h2>
                  Delete Job?
                </h2>

                <p>
                  This action cannot be undone.
                </p>

                <div className="modal-actions">

                  <button
                    className="cancel-btn"
                    onClick={() =>
                      setDeleteIndex(null)
                    }
                  >

                    Cancel

                  </button>

                  <button
                    className="confirm-btn"
                    onClick={confirmDelete}
                  >

                    Delete

                  </button>

                </div>

              </div>

            </div>

          )

        }

      </div>

    </PageWrapper>
  );
}

export default Applications;