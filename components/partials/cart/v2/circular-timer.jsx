import React, { useState, useEffect } from "react";
import useWindowDimensions from "~/utils/getWindowDimension";

const CircularTimer = ({ starTime, duration, onComplete }) => {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;

  const initialTime =
    duration - parseInt((new Date().valueOf() - starTime) / 1000, 10);

  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [progress, setProgress] = useState(100);
  const [circleColor, setCircleColor] = useState("#00cc00");
  const { isSmallSize } = useWindowDimensions();

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft((prevTime) => prevTime - 1);
        setProgress(((timeLeft - 1) / duration) * 100);

        if ((timeLeft - 1) / duration <= 0.35) {
          setCircleColor("#ff9900");
        }
        if ((timeLeft - 1) / duration <= 0.15) {
          setCircleColor("#ff0000");
        }
      } else {
        clearInterval(timer);
        setProgress(0);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, duration, onComplete]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="circular-timer">
      {!isSmallSize ? (
        <>
          <svg className="timer-svg" width={radius * 2.1} height={radius * 2.1}>
            <circle
              className="timer-circle"
              r={radius - 2}
              cx={radius}
              cy={radius}
              stroke={circleColor}
              strokeWidth="4"
              fill="transparent"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: (circumference * (100 - progress)) / 100,
                transition: "stroke-dashoffset 1s linear",
              }}
            />
          </svg>
          <div className="timer-text">{formatTime(timeLeft)}</div>
        </>
      ) : (
        <div className="timer-text">{formatTime(timeLeft)}</div>
      )}
    </div>
  );
};

export default CircularTimer;
