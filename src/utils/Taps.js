import React, { useState } from "react";

const DELTA_TIME_THRESHOLD_MS = 700;

const TapFunc = ({ onSingleTap, onDoubleTap }) => {
  const [timer, setTimer] = useState(null);
  const [target, setTarget] = useState(null);

  const handleTap = (e) => {
    if (timer === null) {
      // First tap
      onSingleTap?.('active');

      setTimer(
        setTimeout(() => {
          setTimer(null);
        }, DELTA_TIME_THRESHOLD_MS)
      );
    } else {
      // Second tap
      if (e.target === target) {
        onDoubleTap?.('opened');
      }

      clearTimeout(timer);
      setTimer(null);
    }
    setTarget(e.target);
  };
}

export default TapFunc;

