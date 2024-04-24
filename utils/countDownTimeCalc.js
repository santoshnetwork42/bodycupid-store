import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export const countTimeFromSeconds = (durationInSeconds) => {
  const days = dayjs.duration(durationInSeconds).days();
  const hours = dayjs.duration(durationInSeconds).hours();
  const minutes = dayjs.duration(durationInSeconds).minutes();
  const seconds = dayjs.duration(durationInSeconds).seconds();

  const returnDateFormat = days < 10 ? "0" + days.toString() : days.toString();
  const returnHourFormat =
    hours < 10 ? "0" + hours.toString() : hours.toString();
  const returnMinutesFormat =
    minutes < 10 ? "0" + minutes.toString() : minutes.toString();
  const returnSecondsFormat =
    seconds < 10 ? "0" + seconds.toString() : seconds.toString();

  return {
    days: returnDateFormat,
    hours: returnHourFormat,
    minutes: returnMinutesFormat,
    seconds: returnSecondsFormat,
  };
};
