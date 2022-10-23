import React, { Children, FC, useState } from "react";

// * Components.
import StepsVisualizer from "../StepsVisualizer/StepsVisualizer";

interface ViewSliderProps {
  children: React.ReactElement | React.ReactElement[];
}

const ViewSlider: FC<ViewSliderProps> = ({ children }) => {
  const [step, setStep] = useState<number>(1);

  return (
    <div className="view-slider f-column y-start x-start">
      <StepsVisualizer steps={4} step={step} setStep={setStep} />

      <div className="view-slider-views flex y-start x-start">
        {Children.map(children, (child, i) => (
          <div className="view-slider-view" data-active={i + 1 === step}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewSlider;
