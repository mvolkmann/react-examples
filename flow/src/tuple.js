// @flow

type PointType = [number, number];

const point: PointType = [3, 4];
console.log(point);
point[1] = 2;
console.log(point);
//point.sort(); // error
//console.log(point);

