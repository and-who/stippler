import React, { useEffect } from "react";

interface ImageLoaderProps {
  initImageSource?: string;
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
    if (props.initImageSource) {
      const img = new Image();
      img.onload = () => {
        props.onChange?.(img);
      };
      img.src = props.initImageSource;
    }
  }, []);

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
    </div>
  );
};

export default ImageLoader;
