// OTPToast.jsx
import React, { useState } from "react";
import { Toast, ToastContainer, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const OTPToast = ({ show, onClose, onOtpSubmit }) => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (otp.trim().length === 4) {
      onOtpSubmit(otp);   // Call parent handler if needed
      onClose();          // Close the toast
      navigate("/delivery-summary"); // ✅ Navigate to DeliverySummaryModal.jsx route
    } else {
      alert("Enter a valid 4-digit OTP");
    }
  };

  return (
    <ToastContainer
      position="top-center"
      className="p-3"
      style={{ zIndex: 9999 }}
    >
      <Toast show={show} onClose={onClose} bg="light">
        <Toast.Header>
          <strong className="me-auto">OTP Verification</strong>
        </Toast.Header>
        <Toast.Body>
          <Form.Control
            type="text"
            placeholder="Enter 4-digit OTP"
            maxLength={4}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="mb-2"
            autoFocus
          />
          <Button variant="primary" size="sm" onClick={handleSubmit}>
            Submit OTP
          </Button>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default OTPToast;
