import { useState } from "react";
import {
  Container,
  Nav,
  Tab,
  Row,
  Col,
  Button,
  Badge,
  Alert,
} from "react-bootstrap";
import OrderListPage from "./OrderListPage";
import CompletedPage from "./CompletedPage";
import "../styles/DashboardPages.css";

function DashboardPage() {
  const [activeTab, setActiveTab] = useState("orders");
  const [isOnline, setIsOnline] = useState(false);

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
  };

  return (
    <Container fluid className="px-3 px-md-5">
      {/* Header Section */}
      <div className="dashboard-header d-flex flex-column flex-md-row justify-content-between align-items-center mt-4 mb-4">
        <div>
          <h2 className="dashboard-title">🚚 Delivery Dashboard</h2>
          <div className="d-flex align-items-center mt-1">
            <Badge bg={isOnline ? "success" : "secondary"} className="me-2">
              {isOnline ? "Online" : "Offline"}
            </Badge>
            <small className="text-muted">
              {isOnline
                ? "You’re ready to accept orders."
                : "You are currently offline."}
            </small>
          </div>
        </div>
        <Row className="mb-3 justify-content-between align-items-center">
          <Col>
            <h5>
              Status:
              <Badge bg={isOnline ? "success" : "secondary"} className="ms-2">
                {isOnline ? "Online" : "Offline"}
              </Badge>
            </h5>
          </Col>
          <Col className="text-end">
            <label className="switch">
              <input
                type="checkbox"
                checked={isOnline}
                onChange={toggleOnlineStatus}
              />
              <span className="slider round"></span>
            </label>
          </Col>
        </Row>
      </div>

      {/* Offline Alert */}
      {!isOnline && (
        <Alert variant="warning" className="text-center">
          ⚠️ You must be online to manage delivery tasks.
        </Alert>
      )}

      {/* Tabs Navigation */}
      <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
        <Nav variant="tabs" className="mb-4 justify-content-center fw-semibold">
          <Nav.Item>
            <Nav.Link eventKey="orders" disabled={!isOnline}>
              🧾 Orders
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="completed" disabled={!isOnline}>
              ✅ Completed
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey="orders">
            {isOnline ? <OrderListPage /> : null}
          </Tab.Pane>
          <Tab.Pane eventKey="completed">
            {isOnline ? <CompletedPage /> : null}
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
}

export default DashboardPage;
