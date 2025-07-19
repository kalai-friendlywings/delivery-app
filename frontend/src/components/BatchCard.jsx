import { Card, Badge } from "react-bootstrap";

function BatchCard({ batch, onSelect, isCompleted = false, isOnline = true }) {
  return (
    <Card
      className="mb-3 shadow-sm border-start border-4"
      border={isCompleted ? "secondary" : "primary"}
    >
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <Card.Title>Batch ID: {batch.id}</Card.Title>
            <Card.Text>{batch.orderCount} Orders</Card.Text>
          </div>
          {!isCompleted && (
            <Badge bg="success" pill>
              ETA: {batch.eta}
            </Badge>
          )}
        </div>
        <button
          onClick={onSelect}
          disabled={!isOnline}
          className={`btn w-100 mt-3 ${
            isCompleted ? "btn-secondary" : "btn-primary"
          }`}
        >
          {isCompleted ? "View Summary" : "Start Delivery"}
        </button>
        {!isOnline && (
          <small className="text-muted d-block mt-1">
            Go online to start delivery
          </small>
        )}
      </Card.Body>
    </Card>
  );
}

export default BatchCard;
