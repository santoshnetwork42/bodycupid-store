import { ProgressBar } from "~/components/common/progress-bar";
import ALink from "~/components/features/custom-link";

export const ShowProgressBar = ({
  current,
  max,
  progress,
  progressMessage,
  buttonText,
  setCartVisibility,
}) => (
  <div className="sticky-progress-container stick-bottom-button">
    <ProgressBar
      current={current}
      max={max}
      progress={progress}
      progressMessage={progressMessage}
    />

    <ALink
      href="#"
      onClick={() => current === max && setCartVisibility(true)}
      className={`btn btn-checkout progress-button ${
        current === max ? "active" : ""
      }`}
    >
      {buttonText}
    </ALink>
  </div>
);
