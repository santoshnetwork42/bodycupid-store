export const ProgressBar = ({ current, max, progress, progressMessage }) => (
  <>
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
  </>
);
