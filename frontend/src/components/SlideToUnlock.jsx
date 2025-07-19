import { useRef, useState } from "react";
import { ChevronRight } from "react-bootstrap-icons";
import "../styles/SlideToUnlock.css";

function SlideToUnlock({ onComplete }) {
  const sliderRef = useRef(null);
  const knobRef = useRef(null);
  const [completed, setCompleted] = useState(false);

  const handleDrag = (e) => {
    if (completed) return;

    const slider = sliderRef.current;
    const knob = knobRef.current;
    const rect = slider.getBoundingClientRect();
    let clientX = e.type.includes("touch")
      ? e.touches[0].clientX
      : e.clientX;

    let offset = clientX - rect.left;
    const maxOffset = rect.width - knob.offsetWidth;

    if (offset < 0) offset = 0;
    if (offset > maxOffset) offset = maxOffset;

    knob.style.left = offset + "px";

    if (offset >= maxOffset - 5) {
      setCompleted(true);
      onComplete(); // Call the parent action
      knob.style.left = maxOffset + "px";
    }
  };

  const endDrag = () => {
    if (completed) return;

    // Reset knob
    knobRef.current.style.left = "2px";
  };

  return (
    <div
      ref={sliderRef}
      className={`slide-unlock ${completed ? "completed" : ""}`}
      onMouseMove={handleDrag}
      onTouchMove={handleDrag}
      onMouseLeave={endDrag}
      onTouchEnd={endDrag}
    >
      <div ref={knobRef} className="slide-knob" onMouseDown={handleDrag} onTouchStart={handleDrag}>
        <ChevronRight />
      </div>
      <span className="slide-text">
        {completed ? "✓ Pickup Started" : "Slide to Start Pickup"}
      </span>
    </div>
  );
}

export default SlideToUnlock;
