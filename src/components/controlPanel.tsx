import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Container from "./container";
import { cycleRGB, hexToRGB, invertColor, rgbToHex } from "../utils/utils";

const colorPalette = [
  "#FF00FF",
  "#FFFF00",
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#505050",
  "#9900FF",
  "#0066FF",
  "#FF0066",
  "#6600FF",
  "#000000",
  "#000000",
];

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
  const [dotColor, setDotColor] = useState("#FF00FF");
  const [dotSize, setDotSize] = useState(4);
  const [cycleLimit, setCycleLimit] = useState(1000);
  const [renderCycleActive, setRenderCycleActive] = useState(true);
  const [dotCount, setDotCount] = useState(20000);
  const [animationSpeed, setAnimationSpeed] = useState(0);
  const previousTimeRef = React.useRef<number>();

  const handleDotColorChange = (color: string) => {
    const bgColor = invertColor(color);
    setDotColor(color);
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

  // Initialize the control panel with the initial values
  useEffect(() => {
    const randomColor =
      colorPalette[Math.floor(Math.random() * colorPalette.length)];
    setDotColor(randomColor);
    onDotColorChange({ color: randomColor, bgColor: invertColor(randomColor) });
    onDotSizeChange(dotSize);
    onRenderCycleChange(renderCycleActive);
    onCycleLimitChange(cycleLimit);
    onDotCountChange(dotCount);
  }, []);

  // RequestAnimation loop
  useEffect(() => {
    let frameId: number;
    const colorAnimation = (time?: DOMHighResTimeStamp) => {
      const deltaTime =
        time && previousTimeRef.current ? time - previousTimeRef.current : 0;
      console.log("colorAnimation", {
        deltaTime,
        time,
        timeref: previousTimeRef.current,
      });
      if (animationSpeed > 0) {
        if (!previousTimeRef.current) {
          previousTimeRef.current = time;
        }
        if (deltaTime > 50) {
          if (previousTimeRef.current != undefined && time) {
            setDotColor((prevColor: string) => {
              const prevRGBColor = hexToRGB(prevColor);
              const nextRGBColor = cycleRGB(
                prevRGBColor,
                deltaTime * animationSpeed * 0.03
              );
              const nextHexColor = rgbToHex(nextRGBColor);
              const bgColor = invertColor(nextHexColor);
              console.log("setDotColor", {
                nextHexColor,
                prevColor,
                prevRGBColor,
                nextRGBColor,
                deltaTime,
              });
              onDotColorChange({ color: nextHexColor, bgColor });
              return nextHexColor;
            });
          }
          previousTimeRef.current = time;
        }
        frameId = requestAnimationFrame(colorAnimation);
      } else {
        cancelAnimationFrame(frameId);
      }
    };
    colorAnimation();
    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [animationSpeed]);

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
                {renderCycleActive ? "\u25A1 Pause" : "▶ Render"}
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
                min={0}
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
                min={0}
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
                min={0}
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
                onChange={(e) => handleDotColorChange(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="animationSpeed">Color_Change_Speed:</label>
            </td>
            <td>
              <input
                id="animationSpeed"
                type="range"
                min={0}
                max={100}
                value={animationSpeed}
                onChange={(event) =>
                  setAnimationSpeed(Number(event.target.value))
                }
              />
            </td>
          </tr>
        </table>
      </Layout>
    </Container>
  );
};

export default ControlPanel;
