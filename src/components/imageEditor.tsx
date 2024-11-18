import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface ImageEditorProps {
  image?: HTMLImageElement;
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
  width: 100%;
  height: 600px;
  flex-direction: column;
  flex-grow: 1;

  canvas {
    max-width: 100%;
    max-height: 100%;
  }
`;

const ImageEditor: React.FC<ImageEditorProps> = ({ image, onImageChange }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [colorOffset, setColorOffset] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && image) {
      const context = canvas.getContext("2d");
      if (context) {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0, image.width, image.height);
        var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          const colorOffsetAVG = Math.min(255, Math.max(0, avg + colorOffset));
          data[i] = colorOffsetAVG; // red
          data[i + 1] = colorOffsetAVG; // green
          data[i + 2] = colorOffsetAVG; // blue
        }
        context.putImageData(imageData, 0, 0);
        onImageChange({
          width: canvas.width,
          height: canvas.height,
          imageData,
        });
      }
    }
  }, [image, colorOffset]);

  return (
    <Layout>
      <input
        type="range"
        max={255}
        min={-255}
        value={colorOffset}
        onChange={(event) => setColorOffset(Number(event.target.value))}
      />
      <label>Color Offset</label>

      <CanvasWrapper>
        <canvas ref={canvasRef}></canvas>
      </CanvasWrapper>
    </Layout>
  );
};

export default ImageEditor;
