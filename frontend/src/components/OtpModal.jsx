import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const OtpModal = ({ show, handleClose, handleVerify }) => {
  const [otp, setOtp] = useState("");

  const handleSubmit = () => {
    if (otp === "1234") {
      handleVerify();
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Enter OTP</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>OTP Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OtpModal;
