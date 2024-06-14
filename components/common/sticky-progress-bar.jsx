import ALink from "../features/custom-link";

export const showProgressBar = ({
  current,
  max,
  progress,
  progressMessage,
  buttonText,
}) => (
  <div className="sticky-progress-container stick-bottom-button">
    <div className="progress-bar-container">
      <div className="progress-bar">
        <div
          className="progress"
          progress={progress}
          style={{ width: `${progress}%` }}
        />
        {current !== max ? (
          <div className="indicator current" style={{ left: `${progress}%` }}>
            {current}
          </div>
        ) : null}
        <div className={`indicator end ${current === max ? "active" : ""}`}>
          {max}
        </div>
      </div>
    </div>

    <p className="progress-text">{progressMessage}</p>
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
