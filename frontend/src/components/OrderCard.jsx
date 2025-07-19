// OrderCard.jsx
import { Card, Button, Alert, Row, Col } from "react-bootstrap";
import { CheckCircleFill, GeoAltFill } from "react-bootstrap-icons";

function OrderCard({ order, onMarkDelivered, error }) {
  const isAddressMissing = order.address.includes("MISSING");

  return (
    <Card
      className={`mb-3 shadow-sm ${
        order.status === "delivered" ? "bg-light opacity-75" : ""
      } ${isAddressMissing ? "border-danger" : ""}`}
    >
      <Card.Body>
        <Row className="align-items-start">
          <Col>
            <h5>{order.customerName}</h5>
            <div className="text-muted small">ID: {order.id}</div>
          </Col>
          <Col className="text-end">
            {order.status === "delivered" ? (
              <div className="text-success d-flex align-items-center justify-content-end">
                <CheckCircleFill className="me-1" />
                Delivered at {order.deliveredAt}
              </div>
            ) : (
              <div className="fw-semibold text-muted">{order.distance}</div>
            )}
          </Col>
        </Row>

        <div
          className={`d-flex align-items-center mt-3 ${
            isAddressMissing ? "text-danger" : "text-secondary"
          }`}
        >
          <GeoAltFill className="me-2" />
          <div className={`${isAddressMissing ? "fw-bold" : ""}`}>
            {order.address}
          </div>
        </div>

        {isAddressMissing && (
          <div className="text-danger small mt-2 fw-semibold">
            Address incomplete. Please contact admin at +91-123-4567890.
          </div>
        )}

        {order.status === "pending" && (
          <div className="d-flex gap-3 mt-4">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                order.address
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-secondary flex-fill d-flex align-items-center justify-content-center"
              style={{ height: "48px" }}
            >
              Navigate
            </a>
            <Button
              variant="success"
              onClick={onMarkDelivered}
              className="flex-fill d-flex align-items-center justify-content-center"
              style={{ height: "48px" }}
            >
              Mark as Delivered
            </Button>
          </div>
        )}

        {error && (
          <Alert variant="danger" className="mt-3 p-2 text-center mb-0">
            {error}
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
}

export default OrderCard;
