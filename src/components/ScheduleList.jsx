import React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import ScheduleItem from "./ScheduleItem";

const ScheduleList = ({
  schedules,
  currentTime,
  selectedDay,
  onDelete,
  onToggle,
  onEdit,
  onAdd,
}) => {
  const getCurrentTimeString = () => {
    return currentTime.toTimeString().slice(0, 5); // HH:MM format
  };

  const getCurrentDay = () => {
    return currentTime.getDay(); // 0 = Sunday, 1 = Monday, etc.
  };

  const isScheduleActive = (schedule) => {
    const currentTimeString = getCurrentTimeString();
    const currentDay = getCurrentDay();

    return (
      schedule.enabled &&
      schedule.time === currentTimeString &&
      schedule.day === currentDay
    );
  };

  // Filter schedules by selected day
  const filteredSchedules =
    selectedDay === null
      ? schedules
      : schedules.filter((schedule) => schedule.day === selectedDay);

  const sortedSchedules = [...filteredSchedules].sort((a, b) => {
    // Sort by time
    return a.time.localeCompare(b.time);
  });

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 style={{ color: "#2c3e50", fontWeight: "700" }}>Bell Schedules</h4>
        <Badge className="schedule-count-badge">
          {sortedSchedules.length} schedules
        </Badge>
      </div>

      {sortedSchedules.length === 0 ? (
        <Card className="empty-state">
          <Card.Body>
            <div style={{ fontSize: "3rem", marginBottom: "20px" }}>🔔</div>
            <h5 className="text-muted mb-3">No schedules configured</h5>
            <p className="text-muted mb-4">
              Add your first bell schedule to get started
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={onAdd}
              style={{ borderRadius: "25px", padding: "12px 30px" }}
            >
              Add Schedule
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <div>
          {sortedSchedules.map((schedule) => (
            <ScheduleItem
              key={schedule.id}
              schedule={schedule}
              isActive={isScheduleActive(schedule)}
              onDelete={onDelete}
              onToggle={onToggle}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}

      <Button variant="primary" className="add-schedule-btn" onClick={onAdd}>
        +
      </Button>
    </div>
  );
};

export default ScheduleList;
