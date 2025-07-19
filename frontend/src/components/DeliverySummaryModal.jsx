import React, { useRef } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import Confetti from "react-confetti";
import { useWindowSize } from "@uidotdev/usehooks";
import { Typography, Button, Box } from "@mui/material";
import earnRewardsAnimation from "../assets/lottie/EarnRewards.json";
import { useNavigate } from "react-router-dom";

const DeliverySummaryModal = ({ open, onClose }) => {
  const playerRef = useRef(null);
  const { width, height } = useWindowSize();
   const navigate = useNavigate();

  // Static values
  const amount = 999;
  const distance = 4.2; // km
  const time = 27; // mins

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 99999,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <Confetti width={width} height={height} />
      <Player
        ref={playerRef}
        autoplay
        keepLastFrame
        src={earnRewardsAnimation}
        style={{ height: "300px", width: "300px" }}
      />

      <Typography variant="h5" color="success.main" gutterBottom>
        Delivery Successful!
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        You completed the delivery.
      </Typography>

      <Box
        sx={{
          backgroundColor: "#f8f9fa",
          borderRadius: "10px",
          padding: "1.5rem",
          margin: "1.5rem 0",
          width: "90%",
          maxWidth: "450px",
          boxShadow: 1,
        }}
      >
        <Typography gutterBottom>
          <strong>📦 Order ID:</strong> #12345678
        </Typography>
        <Typography gutterBottom>
          <strong>📍 Address:</strong> 123, Main Street, Chennai
        </Typography>
        <Typography gutterBottom>
          <strong>🕓 Estimated:</strong> Tomorrow, 10:00 AM - 12:00 PM
        </Typography>
        <Typography gutterBottom>
          <strong>💳 Payment:</strong> Cash on Delivery
        </Typography>
        <Typography gutterBottom>
          <strong>💰 Total:</strong> ₹{amount}
        </Typography>
        <Typography gutterBottom>
          <strong>📏 Distance:</strong> {distance} km
        </Typography>
        <Typography>
          <strong>⏱️ Time Taken:</strong> {time} mins
        </Typography>
      </Box>

       <Button
        variant="contained"
        onClick={() => {
          onClose(); // Optional
          navigate("/dashboard"); // ✅ Redirect to Dashboard
        }}
      >
        Close Now
      </Button>
    </div>
  );
};

export default DeliverySummaryModal;
