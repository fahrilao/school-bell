import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const WelcomeModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>🔔 Welcome to School Bell Manager</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center mb-4">
          <h4>Welcome to your School Bell Management System!</h4>
          <p className="text-muted">Automate your school bell schedules with ease</p>
        </div>
        
        <div className="mb-4">
          <h5>✨ Features:</h5>
          <ul className="list-unstyled">
            <li>📅 <strong>Schedule Management</strong> - Create bell schedules for different days</li>
            <li>⏰ <strong>Automatic Bell Ringing</strong> - Bells ring automatically at scheduled times</li>
            <li>🔄 <strong>Enable/Disable Schedules</strong> - Toggle schedules on or off</li>
            <li>📱 <strong>Real-time Clock</strong> - Always know the current time</li>
            <li>🔍 <strong>Day Filtering</strong> - View schedules by specific days</li>
          </ul>
        </div>

        <div className="mb-4">
          <h5>🚀 Getting Started:</h5>
          <ol>
            <li>Click <strong>"Add New Schedule"</strong> to create your first bell schedule</li>
            <li>Set the schedule name, time, and select the days</li>
            <li>The bell will automatically ring at the scheduled time</li>
            <li>Use the day filter to view schedules for specific days</li>
          </ol>
        </div>

        <div className="text-center">
          <small className="text-muted">
            <strong>Credits:</strong> Built with React & Electron<br/>
            Developed by Fahril Aode Sadikin
          </small>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onHide} size="lg">
          Get Started 🎉
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WelcomeModal;
