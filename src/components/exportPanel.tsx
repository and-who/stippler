import React, { MutableRefObject } from "react";
import styled from "styled-components";
import Container from "./container";
import * as THREE from "three";
import { generateSVG } from "../utils/svgUtils";

interface ExportPanelProps {
  filename?: string;
  canvasRef?: React.RefObject<HTMLCanvasElement>;
  pointsRef?: MutableRefObject<THREE.Vector2[] | undefined>;
  width: number;
  height: number;
  pointSize: number;
}

const Layout = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
`;

const downloadCanvasAsPng = (props: {
  filename?: string;
  canvasRef?: React.RefObject<HTMLCanvasElement>;
}) => {
  const { filename, canvasRef } = props;
  if (canvasRef?.current) {
    var link = document.createElement("a");
    link.download = `${filename}.png` || "stipple.png";
    link.href = canvasRef.current?.toDataURL();
    //link.href = document.getElementById("canvas").toDataURL();
    link.click();
  }
};

const downloadPointsAsSvg = (props: {
  filename?: string;
  pointsRef?: MutableRefObject<THREE.Vector2[] | undefined>;
  width: number;
  height: number;
  pointSize: number;
}) => {
  const { filename, pointsRef, pointSize, width, height } = props;
  if (pointsRef?.current) {
    const svg = generateSVG({
      points: pointsRef.current,
      pointSize,
      width,
      height,
    });
    const blob = new Blob([svg.outerHTML], { type: "image/svg+xml" });
    let url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.download = `${filename}.svg` || "stipple.svg";
    link.href = url;
    link.click();
  }
};

const ExportPanel: React.FC<ExportPanelProps> = (props: ExportPanelProps) => {
  const { canvasRef, pointsRef, filename, pointSize, width, height } = props;
  return (
    <Container title="Export">
      <Layout>
        <button
          disabled={!canvasRef?.current}
          onClick={() => downloadCanvasAsPng({ canvasRef, filename })}
        >
          Export PNG
        </button>
        <button
          disabled={!canvasRef?.current}
          onClick={() =>
            downloadPointsAsSvg({
              pointsRef,
              filename,
              pointSize,
              width,
              height,
            })
          }
        >
          Export SVG
        </button>
      </Layout>
    </Container>
  );
};

export default ExportPanel;
