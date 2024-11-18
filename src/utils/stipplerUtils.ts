import * as d3 from "d3";
import * as THREE from "three";
// Coding Train / Daniel Shiffman
// Weighted Voronoi Stippling
// https://thecodingtrain.com/challenges/181-image-stippling

// All of the points
// let points: THREE.Vector2[] = [];
// Global variables for geometry
// let delaunay: d3.Delaunay<THREE.Vector2>, voronoi: d3.Voronoi<THREE.Vector2>;
// Image
let gloria;

// Load image before setup
function preload() {
  gloria = loadImage("gloria_pickle.jpg");
}

function setup() {
  createCanvas(600, 532);

  // Generate random points avoiding bright areas
  generateRandomPoints(12000);

  // Calculate Delaunay triangulation and Voronoi diagram
  let delaunay = calculateDelaunay(points);
  voronoi = delaunay.voronoi([0, 0, width, height]);
}

function draw() {
  background(255);

  // Display points
  displayPoints();

  // Calculate centroids and update points
  updatePoints();
}

// Generate random points avoiding bright areas
function generateRandomPoints(n: number) {
  for (let i = 0; i < n; i++) {
    let x = Math.floor(Math.random() * width);
    let y = Math.floor(Math.random() * height);
    let col = gloria.get(x, y);
    if (random(100) > brightness(col)) {
      points.push(new THREE.Vector2(x, y));
    } else {
      i--;
    }
  }
}

// Display points
function displayPoints() {
  for (let v of points) {
    stroke(0);
    strokeWeight(2);
    point(v.x, v.y);
  }
}

// Calculate centroids and update points
function updatePoints() {
  // Get latest polygons
  let polygons = voronoi.cellPolygons();
  let cells = Array.from(polygons);

  // Arrays for centroids and weights
  let centroids: THREE.Vector2[] = new Array(cells.length).map(
    () => new THREE.Vector2()
  );
  let weights = new Array(cells.length).fill(0);

  // Get the weights of all the pixels and assign to cells
  gloria.loadPixels();
  let delaunayIndex = 0;
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      let index = (i + j * width) * 4;
      let r = gloria.pixels[index + 0];
      let g = gloria.pixels[index + 1];
      let b = gloria.pixels[index + 2];
      let bright = (r + g + b) / 3;
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
      centroids[i].div(weights[i]);
    } else {
      centroids[i] = points[i].copy();
    }
  }

  // Interpolate points
  for (let i = 0; i < points.length; i++) {
    points[i].lerp(centroids[i], 0.1);
  }

  // Next voronoi (relaxation)
  let delaunay = calculateDelaunay(points);
  voronoi = delaunay.voronoi([0, 0, width, height]);
}

// Calculate Delaunay triangulation from p5.Vectors
function calculateDelaunay(points: THREE.Vector2[]) {
  let pointsArray = [];
  for (let v of points) {
    pointsArray.push(v.x, v.y);
  }
  return new d3.Delaunay(pointsArray);
}
