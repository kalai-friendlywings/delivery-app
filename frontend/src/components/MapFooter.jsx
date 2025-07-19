// MapFooter.jsx
import React, { useState } from "react";
import { Button, Row, Col, Badge } from "react-bootstrap";
import OTPToast from "../components/OTPToast";
import DeliverySummaryModal from "./DeliverySummaryModal";

const MapFooter = ({ phone }) => {
  const [pickedUp, setPickedUp] = useState(false);
  const [showOtpToast, setShowOtpToast] = useState(false);
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);

  const handleOtpSubmit = (otp) => {
    console.log("✅ OTP submitted:", otp);
    setShowOtpToast(false);
    setShowDeliveryModal(true);
  };

  return (
    <>
      <div
        className="bg-light border-top px-4 py-4 d-flex flex-column justify-content-between"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          zIndex: 1050,
          boxShadow: "0 -2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="mb-0 text-muted">
            Status:{" "}
            <Badge bg={pickedUp ? "info" : "secondary"}>
              {pickedUp ? "Out for Delivery" : "Ready for Pickup"}
            </Badge>
          </h6>
          <Button variant="outline-dark" size="sm" href={`tel:${phone}`}>
            Call Customer
          </Button>
        </div>

        <Row className="g-2">
          <Col>
            {!pickedUp ? (
              <Button
                variant="success"
                size="lg"
                className="w-100"
                onClick={() => setPickedUp(true)}
              >
                Mark as Picked Up
              </Button>
            ) : (
              <Button
                variant="primary"
                size="lg"
                className="w-100"
                onClick={() => setShowOtpToast(true)}
              >
                Mark as Delivered
              </Button>
            )}
          </Col>
        </Row>
      </div>

      {/* Render only when picked up and OTP toast is active */}
      {pickedUp && showOtpToast && (
        <OTPToast
          show={showOtpToast}
          onClose={() => setShowOtpToast(false)}
          onOtpSubmit={handleOtpSubmit}
        />
      )}

      {showDeliveryModal && (
        <DeliverySummaryModal
          show={showDeliveryModal}
          onClose={() => setShowDeliveryModal(false)}
        />
      )}
    </>
  );
};

export default MapFooter;
