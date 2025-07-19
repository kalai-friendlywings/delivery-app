import React, { useState } from "react";
import DeliverySummaryModal from "./DeliverySummaryModal";
import MapFooter from "./MapFooter";

const DeliveryMapPage = () => {
  const [showSummary, setShowSummary] = useState(false);

  const handleDelivered = () => {
    setShowSummary(true);
  };

  const handleCloseSummary = () => {
    setShowSummary(false);
  };

  return (
    <>
      {/* Your Map / Page content */}
      <MapFooter phone="1234567890" onDelivered={handleDelivered} />

      {/* ✅ Delivery Summary */}
      <DeliverySummaryModal show={showSummary} handleClose={handleCloseSummary} />
    </>
  );
};

export default DeliveryMapPage;
