import React, { useState } from "react";
import { Card, Button, Badge, Form, Dropdown } from "react-bootstrap";
import EditScheduleModal from "./EditScheduleModal";

const ScheduleItem = ({ schedule, isActive, onDelete, onToggle, onEdit }) => {
  const [showEditModal, setShowEditModal] = useState(false);

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDayName = (day) => {
    return dayNames[day].toUpperCase();
  };

  return (
    <>
      <Card
        className={`schedule-card shadow-sm border-0 mb-3 ${
          isActive ? "active" : ""
        }`}
      >
        <Card.Body className="d-flex align-items-center justify-content-between py-3 px-4">
          {/* Left side: Day, Time, and Name */}
          <div className="d-flex align-items-center">
            <div className="text-secondary me-3 fw-bold h4">
              {getDayName(schedule.day)}
            </div>
            <div>
              <h4 className="mb-0 fw-bold text-dark">{schedule.time}</h4>
              <p className="text-muted small mb-0">{schedule.name}</p>
            </div>
          </div>

          {/* Right side: Switch and Actions Dropdown */}
          <div className="d-flex align-items-center">
            <Form.Check
              type="switch"
              id={`switch-${schedule.id}`}
              checked={schedule.enabled}
              onChange={() => onToggle(schedule.id)}
              label="" // Hide the default 'On/Off' label
              className="me-4"
            />
            <div className="align-self-end">
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => setShowEditModal(true)}
                style={{ borderRadius: "20px", padding: "6px 15px" }}
                className="me-2"
              >
                Edit
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => onDelete(schedule.id)}
                style={{ borderRadius: "20px", padding: "6px 15px" }}
              >
                Delete
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>

      <EditScheduleModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        schedule={schedule}
        onEdit={onEdit}
      />
    </>
  );
};

export default ScheduleItem;
