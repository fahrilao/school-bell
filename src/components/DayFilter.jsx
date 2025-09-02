import React from "react";
import { Button } from "react-bootstrap";

const DayFilter = ({ selectedDay, onDayChange }) => {
  const days = [
    { value: null, label: "All Days" },
    { value: 0, label: "Sunday" },
    { value: 1, label: "Monday" },
    { value: 2, label: "Tuesday" },
    { value: 3, label: "Wednesday" },
    { value: 4, label: "Thursday" },
    { value: 5, label: "Friday" },
    { value: 6, label: "Saturday" },
  ];

  return (
    <div className="day-filter mb-4">
      <h6 className="mb-3">Filter by Day:</h6>
      <div className="day-filter-buttons">
        {days.map((day) => (
          <Button
            key={day.value}
            variant={selectedDay == day.value ? "primary" : "outline-secondary"}
            size="sm"
            className="me-2 mb-2"
            onClick={() => onDayChange(day.value)}
          >
            {day.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default DayFilter;
