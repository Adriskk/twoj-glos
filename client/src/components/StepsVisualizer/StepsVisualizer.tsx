import React, { FC } from "react";

interface StepsVisualizerProps {
  steps: number;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const StepsVisualizer: FC<StepsVisualizerProps> = ({
  steps,
  step,
  setStep,
}) => {
  const handleClick = (x: number): void => {
    setStep(x + 1);
  };

  return (
    <div className="steps-visualizer flex y-center x-center">
      {new Array(steps)?.fill(0)?.map((item, i) => (
        <div
          key={"step-" + i}
          className={`step ${i === step - 1 && "active"}`}
          onClick={() => handleClick(i)}
        ></div>
      ))}
    </div>
  );
};

export default StepsVisualizer;
