import * as THREE from "three";

export const generateSVG = (props: {
  width: number;
  height: number;
  points: THREE.Vector2[];
  pointSize: number;
}): SVGSVGElement => {
  const { width, height, points, pointSize } = props;
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", `${width}px`);
  svg.setAttribute("height", `${height}px`);
  svg.setAttribute("xmlns", svgNS);
  svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("version", "1.1");

  points.forEach((point) => {
    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", point.x.toString());
    circle.setAttribute("cy", point.y.toString());
    circle.setAttribute("r", (pointSize / 2).toString());
    circle.setAttribute("fill", "currentColor");
    svg.appendChild(circle);
  });

  return svg;
};
