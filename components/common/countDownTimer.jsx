import { useConfiguration } from "@wow-star/utils";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { connect } from "react-redux";

import {
  TIMER_BG_COLOR,
  TIMER_COLOR,
  TIMER_DESCRIPTION,
  TIMER_ENABLED,
  TIMER_END_TIME,
  TIMER_TTILE,
} from "~/constant";
import { countTimeFromSeconds } from "~/utils/countDownTimeCalc";

const Timer = ({ displayTimer }) => {
  const timerEnabled = useConfiguration(TIMER_ENABLED, false);
  const timerTitle = useConfiguration(TIMER_TTILE, "");
  const timerDescription = useConfiguration(TIMER_DESCRIPTION, "");
  const timerColor = useConfiguration(TIMER_COLOR, "#FFFFFF");
  const timerBgColor = useConfiguration(TIMER_BG_COLOR, "#2E8B57");
  const targetDate = useConfiguration(TIMER_END_TIME);

  const [showTimer, setShowTimer] = useState(timerEnabled);

  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    if (targetDate) {
      const interval = setInterval(() => {
        const timeInSeconds = dayjs(targetDate).diff(dayjs());

        if (timeInSeconds <= 0) {
          setTimeLeft({
            days: "00",
            hours: "00",
            minutes: "00",
            seconds: "00",
          });
          setShowTimer(false);
        } else {
          const { days, hours, minutes, seconds } =
            countTimeFromSeconds(timeInSeconds);
          setTimeLeft({
            days,
            hours,
            minutes,
            seconds,
          });
          setShowTimer(timerEnabled);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [targetDate]);

  if (!timerEnabled || !showTimer) return <></>;

  return (
    displayTimer && (
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
