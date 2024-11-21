import { useEffect, useRef, useState } from "react";
import "./App.css";
import { generateRandomPoints, relaxPoints } from "./utils/stippler";
import ImageLoader from "./components/imageLoader";
import PointRenderer from "./components/pointRenderer";
import PageLayout from "./components/pageLayout";
import ImageEditor from "./components/imageEditor";
import * as THREE from "three";
import ControlPanel from "./components/controlPanel";
import VerticalLayout from "./components/verticalLayout";
import ThemeProvider from "./components/themeProvider";
import InfoPanel from "./components/infoPanel";
import ExportPanel from "./components/exportPanel";
import MetaData from "./components/metaData";

function App() {
  const [image, setImage] = useState<HTMLImageElement>();
  const [imageData, setImageData] = useState<ImageData>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [count, setCount] = useState<number>(0);

  const cycleLimitRef = useRef<number>();
  const countRef = useRef<number>(0);
  const pointsCountRef = useRef<number>();
  const imageDataRef = useRef<ImageData>();
  const pointsRef = useRef<THREE.Vector2[]>();
  const requestRef = useRef<number>();

  const [dotColor, setDotColor] = useState<string>("#FFC0CB");
  const [bgColor, setBGDotColor] = useState<string>("#FFC0CB");
  const [dotSize, setDotSize] = useState<number>(3);
  const renderCycleActiveRef = useRef<boolean>(true);

  const recalculate = () => {
    if (imageDataRef.current && pointsCountRef.current) {
      let points = pointsRef.current;
      if (
        points &&
        (points.length === 0 || points.length !== pointsCountRef.current)
      ) {
        if (points.length > pointsCountRef.current) {
          points = points.slice(0, pointsCountRef.current);
        } else {
          const newPointsCount = pointsCountRef.current - points.length;
          points = [
            ...points,
            ...generateRandomPoints(imageDataRef.current, newPointsCount),
          ];
        }
        pointsRef.current = points;
      }

      const relaxedPoints = relaxPoints(
        imageDataRef.current,
        pointsRef.current || []
      );
      pointsRef.current = relaxedPoints;
      countRef.current++;
      setCount(countRef.current);
    }
  };

  const animate = () => {
    if (
      renderCycleActiveRef.current &&
      cycleLimitRef.current &&
      countRef.current < cycleLimitRef.current
    ) {
      recalculate();
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      requestRef.current && cancelAnimationFrame(requestRef.current);
    };
  }, []); // Make sure the effect runs only once

  useEffect(() => {
    imageDataRef.current = imageData;
    if (imageData && pointsCountRef.current) {
      pointsRef.current = generateRandomPoints(
        imageData,
        pointsCountRef.current
      );
    } else {
      pointsRef.current = [];
    }
    countRef.current = 0;
    recalculate();
  }, [imageData]);

  const controlArea = (
    <>
      <MetaData color={bgColor} />
      <VerticalLayout>
        <InfoPanel />
        <ImageLoader
          onChange={(imageElement: HTMLImageElement) => {
            setImage(imageElement);
          }}
        />
        <ImageEditor
          color={dotColor}
          image={image}
          onImageChange={(imageData) => {
            setImageData(imageData.imageData);
          }}
        />
        <ControlPanel
          cycleCount={count}
          onDotColorChange={(colors) => {
            setDotColor(colors.color);
            setBGDotColor(colors.bgColor);
          }}
          onDotSizeChange={(size) => setDotSize(size)}
          onRenderCycleChange={(active) =>
            (renderCycleActiveRef.current = active)
          }
          onCycleLimitChange={(cycleLimit) => {
            cycleLimitRef.current = cycleLimit;
          }}
          onDotCountChange={(dotCount) => {
            countRef.current = 0;
            pointsCountRef.current = dotCount;
          }}
        />
        <ExportPanel
          canvasRef={canvasRef}
          pointsRef={pointsRef}
          filename="stipple"
          width={imageData?.width || 0}
          height={imageData?.height || 0}
          pointSize={dotSize}
        />
      </VerticalLayout>
    </>
  );

  const viewArea = (
    <>
      {pointsRef.current && imageDataRef.current && (
        <PointRenderer
          canvasRef={canvasRef}
          points={pointsRef.current}
          dotColor={dotColor}
          dotSize={dotSize}
          width={imageDataRef.current.width}
          height={imageDataRef.current.height}
        />
      )}
    </>
  );
  return (
    <ThemeProvider color={dotColor} bgColor={bgColor}>
      <PageLayout controlElements={controlArea} viewElements={viewArea} />
    </ThemeProvider>
  );
}

export default App;
