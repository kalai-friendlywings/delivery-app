import React, { useEffect, useState } from "react";
import DeliverySummaryModal from "../components/DeliverySummaryModal";

const DeliverySummaryPage = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <>
      <DeliverySummaryModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default DeliverySummaryPage;
