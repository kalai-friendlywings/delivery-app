// ✅ OrderListPage.jsx
import { useEffect, useRef, useState } from "react";
import { Container, Offcanvas, Button, Row, Col } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import RouteLine from "../components/RouteLine";
import OrderCard from "../components/OrderCard";
import MapFooter from "../components/MapFooter";
import OtpModal from "../components/OtpModal"; // ✅ Make sure this path is correct
import { ChevronRight } from "react-bootstrap-icons";
import DeliverySummaryModal from "../components/DeliverySummaryModal";
import SlideToUnlock from "../components/SlideToUnlock";
import "../styles/SlideButton.css";

// Fix Leaflet default icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const deliveryIcon = new L.Icon({
  iconUrl: "/icons/delivery_boy_glow_icon.png",
  iconSize: [40, 40],
  className: "glow-icon",
});
const shopIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png",
  iconSize: [32, 32],
});
const customerIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
  iconSize: [32, 32],
});

function calculateDistance(a, b) {
  const toRad = (v) => (v * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const d =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return +(R * 2 * Math.atan2(Math.sqrt(d), Math.sqrt(1 - d))).toFixed(2);
}

function RiderAnimation({ waypoints, setLatLng }) {
  const requestRef = useRef();
  const stepRef = useRef(0);
  const indexRef = useRef(0);

  useEffect(() => {
    stepRef.current = 0;
    indexRef.current = 0;
    const speed = 0.005;

    const animate = () => {
      if (indexRef.current >= waypoints.length - 1) return;
      const from = waypoints[indexRef.current];
      const to = waypoints[indexRef.current + 1];
      const lat = from.lat + (to.lat - from.lat) * stepRef.current;
      const lng = from.lng + (to.lng - from.lng) * stepRef.current;
      setLatLng({ lat, lng });

      stepRef.current += speed;
      if (stepRef.current >= 1) {
        indexRef.current++;
        stepRef.current = 0;
      }
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [waypoints, setLatLng]);

  return null;
}

function OrderListPage() {
  const [orders] = useState([
    {
      id: "ORD-001",
      customerName: "Sanjay Gupta",
      address: "123, MG Road, Bengaluru",
      shop_lat: 12.935,
      shop_lng: 77.61,
      customer_lat: 12.934,
      customer_lng: 77.625,
      shop_name: "Fresh Mart",
      phone: "+91-9876543210",
      status: "pending",
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [mapVisible, setMapVisible] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [userLocation] = useState({ lat: 12.92, lng: 77.6 });
  const [riderLatLng, setRiderLatLng] = useState(null);
  const [showOtpModal, setShowOtpModal] = useState(false);
  
  
  const mapRef = useRef();

  useEffect(() => {
    if (mapVisible) {
      const timer = setTimeout(() => setMapReady(true), 100);
      return () => clearTimeout(timer);
    } else {
      setMapReady(false);
    }
  }, [mapVisible]);

  useEffect(() => {
    if (!mapReady || !selectedOrder || !mapRef.current) return;
    const map = mapRef.current;
    const routing = L.Routing.control({
      waypoints: [
        L.latLng(userLocation.lat, userLocation.lng),
        L.latLng(selectedOrder.shop_lat, selectedOrder.shop_lng),
        L.latLng(selectedOrder.customer_lat, selectedOrder.customer_lng),
      ],
      lineOptions: { styles: [{ color: "#00aaff", weight: 5 }] },
      createMarker: () => null,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      routeWhileDragging: false,
      show: false,
    }).addTo(map);
    return () => map.removeControl(routing);
  }, [mapReady, selectedOrder, userLocation]);

  const openDetails = (order) => {
    setSelectedOrder({
      ...order,
      shop_distance_km: calculateDistance(userLocation, {
        lat: order.shop_lat,
        lng: order.shop_lng,
      }),
      delivery_distance_km: calculateDistance(
        { lat: order.shop_lat, lng: order.shop_lng },
        { lat: order.customer_lat, lng: order.customer_lng }
      ),
    });
    setShowDetails(true);
  };

  const closeDetails = () => {
    setSelectedOrder(null);
    setMapVisible(false);
    setShowDetails(false);
  };

  const handleDelivered = () => {
    const audio = new Audio("/sounds/cash-register.mp3");
    audio.play().catch((err) => console.warn("Sound error", err));
    setShowSummary(true);
  };

  return (
    <Container fluid>
      {orders.map((order) => (
        <div
          key={order.id}
          onClick={() => openDetails(order)}
          style={{ cursor: "pointer" }}
        >
          <OrderCard order={order} />
        </div>
      ))}

      <Offcanvas
        show={showDetails && !mapVisible}
        onHide={closeDetails}
        placement="bottom"
        className="offcanvas-lg shadow"
        style={{
          height: "48vh",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
          paddingBottom: "0.5rem",
          overflowY: "auto",
        }}
      >
        <Offcanvas.Header closeButton className="border-bottom">
          <Offcanvas.Title className="fw-semibold fs-5 text-primary">
            Order #{selectedOrder?.id}
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          {selectedOrder && (
            <>
              <div className="mb-3">
                <div className="mb-1 text-muted small">Customer</div>
                <div className="fw-semibold">{selectedOrder.customerName}</div>
              </div>

              <div className="mb-3">
                <div className="mb-1 text-muted small">Address</div>
                <div className="fw-semibold">{selectedOrder.address}</div>
              </div>

              <hr className="my-3" />

              <Row className="text-center mb-3">
                <Col>
                  <div className="text-muted small">Distance to Shop</div>
                  <div className="fw-bold">
                    {selectedOrder.shop_distance_km} km
                  </div>
                </Col>
                <Col>
                  <div className="text-muted small">Delivery Distance</div>
                  <div className="fw-bold">
                    {selectedOrder.delivery_distance_km} km
                  </div>
                </Col>
              </Row>

              <hr className="my-3" />

              <div className="slide-button-container p-5">
                <div
                  className="slide-button"
                  onClick={() => setMapVisible(true)}
                >
                  <div className="slide-knob">
                    <ChevronRight />
                  </div>
                  <span className="slide-text">Slide to Start Pickup</span>
                </div>
              </div>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>

      {mapVisible && selectedOrder && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            width: "100vw",
            zIndex: 9999,
            background: "#fff",
          }}
        >
          <div className="d-flex justify-content-between align-items-center p-3 bg-light border-bottom">
            <h5 className="m-0">{selectedOrder.shop_name}</h5>
            <Button size="sm" variant="outline-danger" onClick={closeDetails}>
              Close
            </Button>
          </div>

          <div
            style={{
              height: "calc(100vh - 180px)",
              position: "relative",
              zIndex: 0,
            }}
          >
            <MapContainer
              center={[userLocation.lat, userLocation.lng]}
              zoom={14}
              style={{ height: "100%", width: "100%" }}
              whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker
                position={[selectedOrder.shop_lat, selectedOrder.shop_lng]}
                icon={shopIcon}
              >
                <Popup>Shop</Popup>
              </Marker>
              <Marker
                position={[
                  selectedOrder.customer_lat,
                  selectedOrder.customer_lng,
                ]}
                icon={customerIcon}
              >
                <Popup>Customer</Popup>
              </Marker>
              {riderLatLng && (
                <Marker
                  position={[riderLatLng.lat, riderLatLng.lng]}
                  icon={deliveryIcon}
                >
                  <Popup>Delivery Boy</Popup>
                </Marker>
              )}
              <RouteLine
                waypoints={[
                  userLocation,
                  { lat: selectedOrder.shop_lat, lng: selectedOrder.shop_lng },
                  {
                    lat: selectedOrder.customer_lat,
                    lng: selectedOrder.customer_lng,
                  },
                ]}
              />
              <RiderAnimation
                waypoints={[
                  userLocation,
                  { lat: selectedOrder.shop_lat, lng: selectedOrder.shop_lng },
                  {
                    lat: selectedOrder.customer_lat,
                    lng: selectedOrder.customer_lng,
                  },
                ]}
                setLatLng={setRiderLatLng}
              />
            </MapContainer>

            {/* ✅ OTP Modal should be rendered above everything */}
            <div
              style={{ position: "absolute", top: 0, left: 0, zIndex: 9999 }}
            >
              <OtpModal
                show={showOtpModal}
                handleClose={() => setShowOtpModal(false)}
                handleVerify={() => {
                  setShowOtpModal(false);
                  handleDelivered();
                }}
              />
            </div>
          </div>

          {/* Keep footer and summary below the map */}
          <MapFooter
            phone={selectedOrder.phone}
            onDelivered={() => setShowOtpModal(true)}
          />

          <DeliverySummaryModal
            show={showSummary}
            onClose={() => {
              setShowSummary(false);
              closeDetails();
            }}
            amount={70}
            distance={selectedOrder.delivery_distance_km}
            time={20}
          />
        </div>
      )}
    </Container>
  );
}

export default OrderListPage;
