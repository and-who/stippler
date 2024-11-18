import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Container from "./container";

interface ImageEditorProps {
  image?: HTMLImageElement;
  color: string;
  onImageChange: (data: {
    width: number;
    height: number;
    imageData: ImageData;
  }) => void;
}

const Layout = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const CanvasWrapper = styled.div`
  display: flex;
  height: 33vh;
  width: 100%;
  align-items: center;
  justify-content: center;

  canvas {
    max-width: 100%;
    max-height: 100%;
  }
`;

const ImageEditor: React.FC<ImageEditorProps> = ({ image, onImageChange }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(50);
  const [invert, setInvert] = useState(false);

  const imageBaseSize = 1000;
  const aspectRatio = image ? image.width / image.height : 1;
  const scaledWidth = imageBaseSize * aspectRatio;
  const scaledHeight = imageBaseSize;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && image) {
      const context = canvas.getContext("2d");
      if (context) {
        canvas.width = scaledWidth;
        canvas.height = scaledHeight;
        context.filter = `brightness(${brightness}%) contrast(${contrast}%) invert(${
          invert ? "100%" : "0%"
        })`;
        context.drawImage(image, 0, 0, scaledWidth, scaledHeight);

        var imageData = context.getImageData(0, 0, canvas.width, canvas.height);

        // const rgbColor = getRGB(color);
        // const rMult = rgbColor.r / 255;
        // const gMult = rgbColor.g / 255;
        // const bMult = rgbColor.b / 255;

        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          let alpha = Math.max(255 - avg * 1.2, 0);

          // data[i] = Math.min(avg * rMult, 255); // red
          // data[i + 1] = Math.min(avg * gMult, 255); // green
          // data[i + 2] = Math.min(avg * bMult, 255); // blue
          data[i + 3] = Math.min(alpha, 255); // alpha
        }

        context.putImageData(imageData, 0, 0);
        onImageChange({
          width: canvas.width,
          height: canvas.height,
          imageData: imageData,
        });
      }
    }
  }, [image, brightness, contrast, invert]);

  return (
    <Container>
      <Layout>
        <div>
          <label>Brigthness:</label>
          <input
            type="range"
            min={1}
            max={500}
            value={brightness}
            onChange={(event) => setBrightness(Number(event.target.value))}
          />
        </div>
        <div>
          <label>Contrast:</label>
          <input
            type="range"
            min={0}
            max={100}
            value={contrast}
            onChange={(event) => setContrast(Number(event.target.value))}
          />
        </div>
        <div>
          <label>Invert:</label>
          <input
            type="checkbox"
            onChange={(event) => {
              console.log(event.target.checked);
              setInvert(event.target.checked);
            }}
          />
        </div>

        <CanvasWrapper>
          <canvas ref={canvasRef}></canvas>
        </CanvasWrapper>
      </Layout>
    </Container>
  );
};

export default ImageEditor;
