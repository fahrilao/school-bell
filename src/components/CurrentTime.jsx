import React from "react";
import { Card } from "react-bootstrap";

const CurrentTime = ({ currentTime }) => {
  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card className="current-time mb-4 bg-primary">
      <Card.Body>
        <div className="time-display mb-2">{formatTime(currentTime)}</div>
        <div className="text-center text-white">{formatDate(currentTime)}</div>
      </Card.Body>
    </Card>
  );
};

export default CurrentTime;
