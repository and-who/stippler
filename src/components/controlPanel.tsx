import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Container from "./container";
import { invertColor } from "../utils/utils";

interface ControlPanelProps {
  cycleCount: number;
  onDotColorChange: (colors: { color: string; bgColor: string }) => void;
  onDotSizeChange: (size: number) => void;
  onRenderCycleChange: (active: boolean) => void;
  onCycleLimitChange: (cycleLimit: number) => void;
  onDotCountChange: (dotCount: number) => void;
}

const Layout = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  button {
    margin-left: 10px;
  }
`;

const ControlPanel: React.FC<ControlPanelProps> = ({
  cycleCount,
  onDotColorChange,
  onDotSizeChange,
  onRenderCycleChange,
  onCycleLimitChange,
  onDotCountChange,
}) => {
  const [dotColor, setDotColor] = useState("#FFC0CB");
  const [dotSize, setDotSize] = useState(3);
  const [cycleLimit, setCycleLimit] = useState(1000);
  const [renderCycleActive, setRenderCycleActive] = useState(true);
  const [dotCount, setDotCount] = useState(20000);

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

  const toggleRenderCycle = () => {
    onRenderCycleChange(!renderCycleActive);
    setRenderCycleActive(!renderCycleActive);
  };

  const handleCycleLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cycleLimit = Number(e.target.value);
    setCycleLimit(cycleLimit);
    onCycleLimitChange(cycleLimit);
  };

  const handleDotCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dotCount = Number(e.target.value);
    onDotCountChange(dotCount);
    setDotCount(dotCount);
  };

  useEffect(() => {
    onDotColorChange({ color: dotColor, bgColor: invertColor(dotColor) });
    onDotSizeChange(dotSize);
    onRenderCycleChange(renderCycleActive);
    onCycleLimitChange(cycleLimit);
    onDotCountChange(dotCount);
  }, []);

  return (
    <Container title="Control Panel">
      <Layout>
        <table>
          <tr>
            <td>
              <label htmlFor="cycleCount">Cycle_Count: </label>
            </td>
            <td>
              <span id="cycleCount">{cycleCount}</span>
              <button id="renderCycle" onClick={toggleRenderCycle}>
                {renderCycleActive ? "⏸ Pause" : "▶ Render"}
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="cycleLimit">Cycle_Limit: </label>
            </td>
            <td>
              <input
                type="number"
                id="cycleLimit"
                value={cycleLimit}
                onChange={handleCycleLimitChange}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="dotCount">Dot_Count: </label>
            </td>
            <td>
              <input
                type="number"
                id="dotCount"
                value={dotCount}
                onChange={handleDotCountChange}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="dotSize">Dot_Size: </label>
            </td>
            <td>
              <input
                type="number"
                id="dotSize"
                value={dotSize}
                onChange={handleDotSizeChange}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="dotColor">Dot_Color: </label>
            </td>
            <td>
              <input
                type="color"
                id="dotColor"
                value={dotColor}
                onChange={handleDotColorChange}
              />
            </td>
          </tr>
        </table>
      </Layout>
    </Container>
  );
};

export default ControlPanel;
