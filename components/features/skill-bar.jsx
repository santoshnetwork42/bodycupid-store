import React from "react";

export default function SkillBar({
  percentage = 10,
  color = "#000",
  className,
}) {
  return (
    <div className={`skillbar-container ${className}`}>
      <div
        style={{ width: `${percentage}%`, backgroundColor: color }}
        className="skills "
      >
      </div>
    </div>
  );
}
