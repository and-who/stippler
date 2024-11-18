import { useEffect, useRef, useState } from "react";
import "./App.css";
import { relaxPoints } from "./utils/stippler";
import ImageLoader from "./components/imageLoader";
import PointRenderer from "./components/pointRenderer";
import Container from "./components/container";
import PageLayout from "./components/pageLayout";
import ImageEditor from "./components/imageEditor";
import * as THREE from "three";
import ControlPanel from "./components/controlPanel";
import VerticalLayout from "./components/verticalLayout";
import ThemeProvider from "./components/themeProvider";
import testJPG from "./assets/test.jpg";

function App() {
  const [image, setImage] = useState<HTMLImageElement>();
  const [imageData, setImageData] = useState<ImageData>();
  const [count, setCount] = useState<number>(0);

  const imageDataRef = useRef<ImageData>();
  const pointsRef = useRef<THREE.Vector2[]>();
  const requestRef = useRef<number>();

  const [dotColor, setDotColor] = useState("#FFC0CB");
  const [bgColor, setBGDotColor] = useState("#FFC0CB");
  const [dotSize, setDotSize] = useState(3);
  const renderCycleActiveRef = useRef<boolean>(true);

  const recalculate = () => {
    if (imageDataRef.current) {
      const relaxedPoints = relaxPoints(
        imageDataRef.current,
        pointsRef.current || []
      );
      pointsRef.current = relaxedPoints;
      setCount((count) => count + 1);
    }
  };

  const animate = () => {
    if (renderCycleActiveRef.current) {
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
    pointsRef.current = [];
    setCount(0);
    recalculate();
  }, [imageData]);

  const controlArea = (
    <>
      <VerticalLayout>
        <ImageLoader
          initImageSource={testJPG}
          onChange={(imageElement: HTMLImageElement) => {
            setImage(imageElement);
          }}
        />
        <ImageEditor
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
        />
      </VerticalLayout>
    </>
  );

  const viewArea = (
    <>
      <Container>
        {pointsRef.current && imageDataRef.current && (
          <PointRenderer
            points={pointsRef.current}
            dotColor={dotColor}
            dotSize={dotSize}
            width={imageDataRef.current.width}
            height={imageDataRef.current.height}
          />
        )}
      </Container>
    </>
  );
  return (
    <ThemeProvider color={dotColor} bgColor={bgColor}>
      <PageLayout controlElements={controlArea} viewElements={viewArea} />
    </ThemeProvider>
  );
}

export default App;
