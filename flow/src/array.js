// @flow

type PointType = [number, number]; // a tuple
//type PointArrType = Array<PointType>;
type PointArrType = PointType[];

function distance(p1: PointType, p2: PointType): number {
  return Math.hypot(p2[0] - p1[0], p2[1] - p1[1]);
}

function perimiter(points: PointArrType): number {
  return points.reduce(
    (sum: number, point: PointType, index: number) =>
      sum += index ?
        distance(points[index - 1], point) :
        distance(points[points.length - 1], point),
    0);
}

const points: PointArrType = [
  [0, 0], [3, 4], [5, 2] //, 'foo'
];
console.log('perimeter =', perimiter(points).toFixed(2));
console.log('perimeter =', perimiter(7));
