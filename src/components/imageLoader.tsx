import React, { useEffect } from "react";
import Container from "./container";
import exampleImage1 from "../assets/examples/ex1.jpg";
import exampleImage2 from "../assets/examples/ex2.jpg";

const examples = [exampleImage1, exampleImage2];

interface ImageLoaderProps {
  onChange: (image: HTMLImageElement) => void;
}

const ImageLoader = (props: ImageLoaderProps) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          props.onChange?.(img);
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const exampleImage = examples[Math.floor(Math.random() * examples.length)];
    const img = new Image();
    img.onload = () => {
      props.onChange?.(img);
    };
    img.src = exampleImage;
  }, []);

  return (
    <Container title="File Input">
      <input type="file" accept="image/*" onChange={handleImageChange} />
    </Container>
  );
};

export default ImageLoader;
