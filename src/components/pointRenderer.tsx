import React from "react";
import styled from "styled-components";
import * as THREE from "three";

interface PointRendererProps {
  points: THREE.Vector2[];
  width: number;
  height: number;
  dotColor: string;
  dotSize: number;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

const Layout = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;

  canvas {
    max-width: 100%;
    max-height: 100%;
  }
`;

const PointRenderer: React.FC<PointRendererProps> = ({
  points,
  width,
  height,
  dotColor,
  dotSize,
  canvasRef,
}) => {
  const canvas = canvasRef.current;
  if (canvas) {
    const context = canvas.getContext("2d");
    if (context) {
      context.clearRect(0, 0, width, height);
      context.fillStyle = dotColor;
      points.forEach((point) => {
        context.beginPath();
        context.arc(point.x, point.y, dotSize / 2, 0, Math.PI * 2);
        context.fill();
      });
    }
  }

  return (
    <Layout>
      <canvas ref={canvasRef} width={width} height={height} />
    </Layout>
  );
};

export default PointRenderer;
