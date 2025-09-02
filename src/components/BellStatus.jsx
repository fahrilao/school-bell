import React from "react";
import { Alert } from "react-bootstrap";

const BellStatus = ({ ringing, schedule }) => {
  if (!ringing) return null;

  return (
    <Alert variant="success" className="bell-status">
      <div className="d-flex align-items-center">
        <span className="bell-animation me-2" style={{ fontSize: "1.5rem" }}>
          🔔
        </span>
        <strong>Bell Ringing!!</strong>
      </div>
      <div>Current Schedule: {schedule}</div>
    </Alert>
  );
};

export default BellStatus;
