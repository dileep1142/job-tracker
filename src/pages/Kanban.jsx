import "./Kenban.css";

import {
  useContext
} from "react";

import {
  DragDropContext,
  Droppable,
  Draggable
} from "@hello-pangea/dnd";

import {
  JobContext
} from "../context/JobContext";

import PageWrapper from "../components/PageWrapper";

function Kanban() {
  const { jobs, setJobs } =
    useContext(JobContext);

  const columns = [
    "Applied",
    "Interview",
    "Offer",
    "Rejected"
  ];

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const jobIndex = Number(
      result.draggableId
    );

    const updatedJobs = [...jobs];

    updatedJobs[jobIndex] = {
      ...updatedJobs[jobIndex],
      status: result.destination.droppableId
    };

    setJobs(updatedJobs);

    localStorage.setItem(
      "jobs",
      JSON.stringify(updatedJobs)
    );
  };

  return (
    <PageWrapper>
      <div className="kanban-container">

        <div className="kanban-top">
          <h1>Kanban Board</h1>
          <p>Drag jobs between stages to update their status.</p>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="kanban-board">

            {columns.map((column) => {
              const columnJobs = jobs
                .map((job, index) => ({
                  ...job,
                  originalIndex: index
                }))
                .filter((job) => job.status === column);

              return (
                <Droppable
                  droppableId={column}
                  key={column}
                >
                  {(provided) => (
                    <div
                      className="kanban-column"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <h2>{column}</h2>

                      {columnJobs.length === 0 && (
                        <p className="empty-column">
                          No jobs
                        </p>
                      )}

                      {columnJobs.map((job, index) => (
                        <Draggable
                          key={job.originalIndex}
                          draggableId={String(job.originalIndex)}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              className="kanban-card"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <h3>{job.company}</h3>
                              <p>{job.role}</p>

                              <span className={`status ${job.status.toLowerCase()}`}>
                                {job.status}
                              </span>
                            </div>
                          )}
                        </Draggable>
                      ))}

                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              );
            })}

          </div>
        </DragDropContext>

      </div>
    </PageWrapper>
  );
}

export default Kanban;