import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap';

const AddScheduleModal = ({ show, onHide, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    time: '',
    days: [],
    repetitions: 1
  });
  const [error, setError] = useState('');

  const dayNames = [
    { value: 0, label: 'Sunday' },
    { value: 1, label: 'Monday' },
    { value: 2, label: 'Tuesday' },
    { value: 3, label: 'Wednesday' },
    { value: 4, label: 'Thursday' },
    { value: 5, label: 'Friday' },
    { value: 6, label: 'Saturday' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleDayChange = (dayValue) => {
    setFormData(prev => ({
      ...prev,
      days: prev.days.includes(dayValue)
        ? prev.days.filter(day => day !== dayValue)
        : [...prev.days, dayValue]
    }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      setError('Please enter a schedule name');
      return;
    }
    
    if (!formData.time) {
      setError('Please select a time');
      return;
    }
    
    if (formData.days.length === 0) {
      setError('Please select at least one day');
      return;
    }

    onAdd(formData);
    
    // Reset form
    setFormData({
      name: '',
      time: '',
      days: [],
      repetitions: 1
    });
    setError('');
    onHide();
  };

  const handleClose = () => {
    setFormData({
      name: '',
      time: '',
      days: [],
      repetitions: 1
    });
    setError('');
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add New Bell Schedule</Modal.Title>
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

          <Form.Group className="mb-3">
            <Form.Label>Days of the Week</Form.Label>
            <Row>
              {dayNames.map(day => (
                <Col key={day.value} md={6} lg={4} className="mb-2">
                  <Form.Check
                    type="checkbox"
                    id={`day-${day.value}`}
                    label={day.label}
                    checked={formData.days.includes(day.value)}
                    onChange={() => handleDayChange(day.value)}
                  />
                </Col>
              ))}
            </Row>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Add Schedule
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddScheduleModal;
