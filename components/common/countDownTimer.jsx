import { useConfiguration } from "@wow-star/utils";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { useEffect, useState } from "react";
import { connect } from "react-redux";

import {
  IS_DAILY_TIMER,
  TIMER_BG_COLOR,
  TIMER_COLOR,
  TIMER_DESCRIPTION,
  TIMER_ENABLED,
  TIMER_END_TIME,
  TIMER_START_TIME,
  TIMER_TTILE,
} from "~/constant";
import { countTimeFromSeconds } from "~/utils/countDownTimeCalc";

dayjs.extend(isBetween);

const Timer = ({ displayTimer }) => {
  const timerEnabled = useConfiguration(TIMER_ENABLED, false);
  const timerTitle = useConfiguration(TIMER_TTILE, "");
  const timerDescription = useConfiguration(TIMER_DESCRIPTION, "");
  const timerColor = useConfiguration(TIMER_COLOR, "#FFFFFF");
  const timerBgColor = useConfiguration(TIMER_BG_COLOR, "#2E8B57");
  const startDateConfig = useConfiguration(
    TIMER_START_TIME,
    new Date().toISOString()
  );
  const endDateConfig = useConfiguration(
    TIMER_END_TIME,
    new Date().toISOString()
  );
  const isDaily = useConfiguration(IS_DAILY_TIMER, false);

  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    if (!timerEnabled) return;

    const startTime = dayjs(startDateConfig).format("HH:mm:ss");
    const endTime = dayjs(endDateConfig).format("HH:mm:ss");

    const updateTimeLeft = () => {
      const now = dayjs();
      const currentTime = now.format("HH:mm:ss");

      if (now.isBetween(startDateConfig, endDateConfig)) {
        if (isDaily) {
          if (currentTime >= startTime && currentTime <= endTime) {
            const durationInSeconds = dayjs(endDateConfig).diff(now);
            if (durationInSeconds > 0) {
              const { days, hours, minutes, seconds } =
                countTimeFromSeconds(durationInSeconds);
              setTimeLeft({
                days: "00",
                hours,
                minutes,
                seconds,
              });
            } else {
              resetTimeLeft();
            }
          } else {
            resetTimeLeft();
          }
        } else {
          const durationInSeconds = dayjs(endDateConfig).diff(now);
          if (durationInSeconds > 0) {
            const { days, hours, minutes, seconds } =
              countTimeFromSeconds(durationInSeconds);
            setTimeLeft({
              days,
              hours,
              minutes,
              seconds,
            });
          } else {
            resetTimeLeft();
          }
        }
      } else {
        resetTimeLeft();
      }
    };
    const interval = setInterval(updateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [timerEnabled, startDateConfig, endDateConfig]);

  const resetTimeLeft = () => {
    setTimeLeft({
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
    });
  };

  if (
    !timerEnabled ||
    !timeLeft ||
    Object.values(timeLeft).every((val) => val === "00")
  )
    return <></>;

  return (
    displayTimer &&
    timerEnabled && (
      <div
        className="announcement d-flex-col align-items-center pb-2 pt-2"
        style={{ background: timerBgColor, color: timerColor }}
      >
        <p className="announcement font-size-12 mb-0">
          {timerTitle.toLocaleUpperCase()}
        </p>
        <div className="d-flex justify-content-center align-items-center gap-6 mb-2">
          <div className="d-flex-col justify-content-center align-items-center">
            <p className="font-size-18 font-weight-bold mb-0">
              {timeLeft.days}
            </p>
            <p className="font-size-12 line-height-14 mb-0">DAYS</p>
          </div>
          <span>:</span>
          <div className="d-flex-col justify-content-center align-items-center">
            <p className="font-size-18 font-weight-bold mb-0">
              {timeLeft.hours}
            </p>
            <p className="font-size-12 line-height-14 mb-0">HOURS</p>
          </div>
          <span>:</span>
          <div className="d-flex-col justify-content-center align-items-center">
            <p className="font-size-18 font-weight-bold mb-0">
              {timeLeft.minutes}
            </p>
            <p className="font-size-12 line-height-14 mb-0">MINUTES</p>
          </div>
          <span>:</span>
          <div className="d-flex-col justify-content-center align-items-center">
            <p className="font-size-18 font-weight-bold mb-0">
              {timeLeft.seconds}
            </p>
            <p className="font-size-12 line-height-14 mb-0">SECONDS</p>
          </div>
        </div>

        <div className="announcement">
          {timerDescription.toLocaleUpperCase()}
        </div>
      </div>
    )
  );
};

function mapStateToProps(state) {
  return {
    store: state.system,
  };
}

export default connect(mapStateToProps)(Timer);
