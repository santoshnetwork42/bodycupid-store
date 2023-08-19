import React, { useState, useEffect } from "react";
import useWindowDimensions from "~/utils/getWindowDimension";
import { Clock } from "~/components/icons";

const CircularTimer = ({ starTime, duration, onComplete }) => {
  const radius = 32;
  const circumference = 2 * Math.PI * radius;

  const initialTime =
    duration - parseInt((new Date().valueOf() - starTime) / 1000, 10);

  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [progress, setProgress] = useState(100);
  const [circleColor, setCircleColor] = useState("#17B31B");
  const { isSmallSize } = useWindowDimensions();

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft((prevTime) => prevTime - 1);
        setProgress(((timeLeft - 1) / duration) * 100);

        if ((timeLeft - 1) / duration <= 0.42) {
          setCircleColor("#FFE500");
        }
        if ((timeLeft - 1) / duration <= 0.17) {
          setCircleColor("#E50B20");
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
        <div
          className="timer-container"
          style={{ backgroundColor: circleColor }}
        >
          <div className="icon-container">
            <Clock size={16} color={"white"} />
          </div>
          <div className="timer-content">
            <div className="timer-text">{formatTime(timeLeft)}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CircularTimer;
