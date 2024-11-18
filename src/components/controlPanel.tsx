import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface ControlPanelProps {
  cycleCount: number;
  onDotColorChange: (colors: { color: string; bgColor: string }) => void;
  onDotSizeChange: (size: number) => void;
  onRenderCycleChange: (active: boolean) => void;
}

const Layout = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const invertColor = (hex: string) => {
  if (hex.indexOf("#") === 0) {
    hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    throw new Error("Invalid HEX color.");
  }
  // invert color components
  var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
    g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
    b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
  // pad each with zeros and return
  return "#" + padZero(r) + padZero(g) + padZero(b);
};

const padZero = (str: string, len?: number) => {
  len = len || 2;
  var zeros = new Array(len).join("0");
  return (zeros + str).slice(-len);
};

const ControlPanel: React.FC<ControlPanelProps> = ({
  cycleCount,
  onDotColorChange,
  onDotSizeChange,
  onRenderCycleChange,
}) => {
  const [dotColor, setDotColor] = useState("#FFC0CB");
  const [dotSize, setDotSize] = useState(3);
  const [renderCycleActive, setRenderCycleActive] = useState(true);

  const handleDotColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    const bgColor = invertColor(color);
    setDotColor(e.target.value);
    onDotColorChange({ color, bgColor });
  };

  const handleDotSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dotSize = Number(e.target.value);
    setDotSize(dotSize);
    onDotSizeChange(dotSize);
  };

  const handleRenderCycleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const active = e.target.checked;
    setRenderCycleActive(active);
    onRenderCycleChange(active);
  };

  useEffect(() => {
    onDotColorChange({ color: dotColor, bgColor: invertColor(dotColor) });
    onDotSizeChange(dotSize);
    onRenderCycleChange(renderCycleActive);
  }, []);

  return (
    <Layout>
      <div>
        <label htmlFor="renderCycle">Activate Render Cycle: </label>
        <input
          type="checkbox"
          id="renderCycle"
          value={renderCycleActive.toString()}
          onChange={handleRenderCycleChange}
        />
        <p>Cycle Count: {cycleCount}</p>
      </div>
      <div>
        <label htmlFor="dotSize">Dot Size: </label>
        <input
          type="number"
          id="dotSize"
          value={dotSize}
          onChange={handleDotSizeChange}
        />
        <label htmlFor="dotColor">Dot Color: </label>
        <input
          type="color"
          id="dotColor"
          value={dotColor}
          onChange={handleDotColorChange}
        />
      </div>
    </Layout>
  );
};

export default ControlPanel;
