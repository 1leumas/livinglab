import React, { useState } from "react";
import {
  IntervalSelectOverlay,
  IntervalSelectContainer,
  CloseButton,
  OkButton,
  IntervalInputLabel,
  IntervalInput,
} from "./styles";

const IntervalSelect = ({ onClose, onConfirm }) => {
  const [interval, setInterval] = useState("");

  const handleConfirm = () => {
    onConfirm(interval);
    onClose();
  };

  return (
    <IntervalSelectOverlay>
      <IntervalSelectContainer>
        <CloseButton onClick={onClose}>X</CloseButton>
        <IntervalInputLabel>Enter Interval in Hours:</IntervalInputLabel>
        <IntervalInput
          type="number"
          min={1}
          value={interval}
          onChange={(e) => {
            if (e.target.value >= 1) {
              setInterval(e.target.value);
            }
          }}
        />
        <OkButton onClick={handleConfirm}>✓</OkButton>
      </IntervalSelectContainer>
    </IntervalSelectOverlay>
  );
};

export default IntervalSelect;
