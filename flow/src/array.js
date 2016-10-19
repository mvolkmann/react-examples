// @flow
type Point = [number, number]; // a tuple
type PointArr = Array<Point>;

function distance(p1: Point, p2: Point) {
  return Math.hypot(p2[0] - p1[0], p2[1] - p1[1]);
}

function perimiter(points: PointArr) {
  return points.reduce(
    (sum, point, index) =>
      sum += index ?
        distance(points[index - 1], point) :
        distance(points[points.length - 1], point),
    0);
}

const points: PointArr = [
  [0, 0], [3, 4], [5, 2], 'foo'
];
console.log('perimeter =', perimiter(points).toFixed(2));
console.log('perimeter =', perimiter(7));
