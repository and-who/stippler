import * as d3 from "d3";
import * as THREE from "three";

const getPixelData = (imageData: ImageData, x: number, y: number) => {
  const { data, width } = imageData;
  const i = (y * width + x) * 4;
  return [data[i], data[i + 1], data[i + 2], data[i + 3]];
};

const brightness = (col: number[]) => {
  return (col[0] + col[1] + col[2]) / 3;
};

export const generateRandomPoints = (imageData: ImageData, n: number) => {
  const points: THREE.Vector2[] = [];
  for (let i = 0; i < n; i++) {
    let x = Math.floor(Math.random() * imageData.width);
    let y = Math.floor(Math.random() * imageData.height);
    getPixelData(imageData, x, y);
    let col = getPixelData(imageData, x, y);
    if (Math.random() * 200 > brightness(col)) {
      points.push(new THREE.Vector2(x, y));
    } else {
      i--;
    }
  }
  return points;
};

// Calculate centroids and update points
const recalculatePoints = (imageData: ImageData, points: THREE.Vector2[]) => {
  // Next voronoi (relaxation)
  let delaunay = calculateDelaunay(points);
  // let voronoi = delaunay.voronoi([0, 0, imageData.width, imageData.height]);
  // Get latest polygons
  // let polygons = voronoi.cellPolygons();
  // let cells = Array.from(polygons);

  // Arrays for centroids and weights
  let centroids: THREE.Vector2[] = new Array(points.length)
    .fill(0)
    .map(() => new THREE.Vector2(0, 0));
  let weights: number[] = new Array(points.length).fill(0);

  // Get the weights of all the pixels and assign to cells
  let delaunayIndex = 0;
  for (let i = 0; i < imageData.width; i++) {
    for (let j = 0; j < imageData.height; j++) {
      let pixelData = getPixelData(imageData, i, j);
      let bright = brightness(pixelData);
      let weight = 1 - bright / 255;
      delaunayIndex = delaunay.find(i, j, delaunayIndex);
      centroids[delaunayIndex].x += i * weight;
      centroids[delaunayIndex].y += j * weight;
      weights[delaunayIndex] += weight;
    }
  }

  // Compute weighted centroids
  for (let i = 0; i < centroids.length; i++) {
    if (weights[i] > 0) {
      centroids[i].divideScalar(weights[i]);
    } else {
      centroids[i] = points[i].clone();
    }
  }

  // Interpolate points
  const interpolatedPoints = points.map((point, i) =>
    point.lerp(centroids[i], 0.1)
  );

  return interpolatedPoints;
};

// Calculate Delaunay triangulation from p5.Vectors
function calculateDelaunay(points: THREE.Vector2[]) {
  let pointsArray = [];
  for (let v of points) {
    pointsArray.push(v.x, v.y);
  }
  return new d3.Delaunay(pointsArray);
}

export const relaxPoints = (imageData: ImageData, points: THREE.Vector2[]) => {
  const relaxedPoints = recalculatePoints(imageData, points);
  return relaxedPoints;
};
