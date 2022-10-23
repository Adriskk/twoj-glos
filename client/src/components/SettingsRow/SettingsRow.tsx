import React, { FC } from "react";

interface SettingsRowProps {
  label: string;
  value: string;
}

const SettingsRow: FC<SettingsRowProps> = ({ label, value }) => {
  return (
    <div className="settings-row f-column y-start -start">
      <span className="settings-row-label">{label}</span>
      <span className="settings-row-value">{value}</span>
    </div>
  );
};

export default SettingsRow;
