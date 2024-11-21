interface RGB {
  r: number;
  g: number;
  b: number;
}

export const rgbToHsv = (rgb: RGB) => {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;
  let s = 0;
  let v = max;

  if (max !== 0) {
    s = delta / max;
  }

  if (max === min) {
    h = 0;
  } else {
    switch (max) {
      case r:
        h = (g - b) / delta + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / delta + 2;
        break;
      case b:
        h = (r - g) / delta + 4;
        break;
    }
    h /= 6;
  }

  return { h, s, v };
};

export const hsvToRgb = (hsv: { h: number; s: number; v: number }) => {
  const h = hsv.h;
  const s = hsv.s;
  const v = hsv.v;

  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  let r = 0;
  let g = 0;
  let b = 0;

  switch (i % 6) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
};

export const hexToRGB = (hex: string) => {
  if (hex.indexOf("#") === 0) {
    hex = hex.slice(1);
  }
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    throw new Error("Invalid HEX color.");
  }
  return {
    r: parseInt(hex.slice(0, 2), 16),
    g: parseInt(hex.slice(2, 4), 16),
    b: parseInt(hex.slice(4, 6), 16),
  };
};

const componentToHex = (c: number) => {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
};

export const rgbToHex = (rgb: RGB) => {
  return (
    "#" + componentToHex(rgb.r) + componentToHex(rgb.g) + componentToHex(rgb.b)
  );
};

export const cycleRGB = (rgb: RGB, stepSize: number) => {
  const hsv = rgbToHsv(rgb);

  hsv.h = (((hsv.h + stepSize * 0.0001) * 10000) % 10000) / 10000;
  const newRGB = hsvToRgb(hsv);

  return newRGB;
};

export const invertColor = (hex: string) => {
  const rgb = hexToRGB(hex);
  // invert color components
  var r = (255 - rgb.r).toString(16),
    g = (255 - rgb.g).toString(16),
    b = (255 - rgb.b).toString(16);
  // pad each with zeros and return
  return "#" + padZero(r) + padZero(g) + padZero(b);
};

const padZero = (str: string, len?: number) => {
  len = len || 2;
  var zeros = new Array(len).join("0");
  return (zeros + str).slice(-len);
};
