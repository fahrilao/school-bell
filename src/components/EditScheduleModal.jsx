import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col, Alert } from "react-bootstrap";

const EditScheduleModal = ({ show, onHide, schedule, onEdit }) => {
  const [formData, setFormData] = useState({
    name: "",
    time: "",
    days: [],
    bellSound: "./bell.mp3",
    repetitions: 1,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (schedule) {
      setFormData({
        name: schedule.name,
        time: schedule.time,
        days: [schedule.day],
        bellSound: schedule.bellSound || "./bell.mp3",
        repetitions: schedule.repetitions || 1,
      });
    }
  }, [schedule]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      setError("Please enter a schedule name");
      return;
    }

    if (!formData.time) {
      setError("Please select a time");
      return;
    }

    if (formData.days.length === 0) {
      setError("Please select at least one day");
      return;
    }

    onEdit(schedule.id, formData);
    setError("");
    onHide();
  };

  const handleClose = () => {
    setError("");
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Bell Schedule</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form.Group className="mb-3">
            <Form.Label>Schedule Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., Morning Bell, Lunch Break, End of Day"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Time</Form.Label>
            <Form.Control
              type="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Bell Repetitions</Form.Label>
            <Form.Control
              type="number"
              name="repetitions"
              value={formData.repetitions}
              onChange={handleInputChange}
              min="1"
              max="10"
              placeholder="Number of times to ring the bell"
            />
            <Form.Text className="text-muted">
              How many times should the bell ring? (1-10)
            </Form.Text>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditScheduleModal;
