const TEST_DATA = {
  smallData: [
    [-1, 1, 0],
    [-1, 2, 1],
    [0, 3, 0],
    [0, NaN, -1],
    [0, NaN, 1]
  ],
  smallTypes: [
    'nominal',
    'numeric',
    'nominal'
  ],
  smallCentroid: [
    0, 2, 0
  ],
  smallDistancesSquared: [
    2, 2, 1, 2, 2
  ],
  smallGroups: JSON.parse("[[{\"data\":[-1,1,0],\"centroidDistanceSquared\":2},{\"data\":[-1,2,1],\"centroidDistanceSquared\":2},{\"data\":[0,3,0],\"centroidDistanceSquared\":1},{\"data\":[0,null,-1],\"centroidDistanceSquared\":2},{\"data\":[0,null,1],\"centroidDistanceSquared\":2}]]"),
  smallSSE: 9,
};

const BIG_TEST_DATA = {
  dataRows: [ [ 0, 1, 5, NaN, NaN, -1, 40, -1, NaN, 2, -1, 11, 1, -1, -1, 0, -1, 1 ],
  [ 1, 2, 4.5, 5.8, NaN, -1, 35, 1, NaN, NaN, 0, 11, 0, -1, 2, -1, 2, 1 ],
  [ 2, NaN, NaN, NaN, NaN, -1, 38, 2, NaN, 5, -1, 11, 2, 0, 1, 0, 1, 1 ],
  [ 3, 3, 3.7, 4, 5, 2, NaN, -1, NaN, NaN, 0, NaN, -1, -1, -1, 0, -1, 1 ],
  [ 4, 3, 4.5, 4.5, 5, -1, 40, -1, NaN, NaN, -1, 12, 1, -1, 1, 0, 1, 1 ],
  [ 5, 2, 2, 2.5, NaN, -1, 35, -1, NaN, 6, 0, 12, 1, -1, -1, -1, -1, 1 ],
  [ 6, 3, 4, 5, 5, 2, NaN, 2, NaN, NaN, -1, 12, 2, 0, 0, 0, 1, 1 ],
  [ 7, 3, 6.9, 4.8, 2.3, -1, 40, -1, NaN, 3, -1, 12, 0, -1, -1, -1, -1, 1 ],
  [ 8, 2, 3, 7, NaN, -1, 38, -1, 12, 25, 0, 11, 0, 0, 1, 0, -1, 1 ],
  [ 9, 1, 5.7, NaN, NaN, 0, 40, 2, NaN, 4, -1, 11, 2, 0, 2, -1, -1, 1 ],
  [ 10, 3, 3.5, 4, 4.6, 0, 36, -1, NaN, 3, -1, 13, 2, -1, -1, 0, 2, 1 ],
  [ 11, 2, 6.4, 6.4, NaN, -1, 38, -1, NaN, 4, -1, 15, -1, -1, 2, -1, -1, 1 ],
  [ 12, 2, 3.5, 4, NaN, 0, 40, -1, NaN, 2, 1, 10, 0, 1, 1, -1, 1, 0 ],
  [ 13, 3, 3.5, 4, 5.1, 1, 37, -1, NaN, 4, -1, 13, 2, -1, 2, 0, 2, 1 ],
  [ 14, 1, 3, NaN, NaN, 0, 36, -1, NaN, 10, 1, 11, 2, -1, -1, -1, -1, 1 ],
  [ 15, 2, 4.5, 4, NaN, 0, 37, 2, NaN, NaN, -1, 11, 1, -1, 2, 0, -1, 1 ],
  [ 16, 1, 2.8, NaN, NaN, -1, 35, -1, NaN, 2, -1, 12, 0, -1, -1, -1, -1, 1 ],
  [ 17, 1, 2.1, NaN, NaN, 2, 40, 1, 2, 3, 1, 9, 0, 0, 1, -1, 0, 0 ],
  [ 18, 1, 2, NaN, NaN, 0, 38, 0, NaN, NaN, 0, 11, 1, 1, 0, 1, 0, 0 ],
  [ 19, 2, 4, 5, NaN, 1, 35, -1, 13, 5, -1, 15, 2, -1, -1, -1, -1, 1 ],
  [ 20, 2, 4.3, 4.4, NaN, -1, 38, -1, NaN, 4, -1, 12, 2, -1, 2, -1, 2, 1 ],
  [ 21, 2, 2.5, 3, NaN, -1, 40, 0, NaN, NaN, -1, 11, 0, -1, -1, -1, -1, 0 ],
  [ 22, 3, 3.5, 4, 4.6, 1, 27, -1, NaN, NaN, -1, NaN, -1, -1, -1, -1, -1, 1 ],
  [ 23, 2, 4.5, 4, NaN, -1, 40, -1, NaN, 4, -1, 10, 2, -1, 1, -1, 2, 1 ],
  [ 24, 1, 6, NaN, NaN, -1, 38, -1, 8, 3, -1, 9, 2, -1, -1, -1, -1, 1 ],
  [ 25, 3, 2, 2, 2, 0, 40, 0, NaN, NaN, -1, 10, 0, -1, 1, 0, 2, 0 ],
  [ 26, 2, 4.5, 4.5, NaN, 1, NaN, -1, NaN, NaN, 0, 10, 0, 0, 0, -1, 1, 1 ],
  [ 27, 2, 3, 3, NaN, 0, 33, -1, NaN, NaN, 0, 12, 2, -1, -1, 0, 2, 1 ],
  [ 28, 2, 5, 4, NaN, 0, 37, -1, NaN, 5, 1, 11, 0, 0, 2, 0, 2, 1 ],
  [ 29, 3, 2, 2.5, NaN, -1, 35, 0, NaN, NaN, -1, 10, 1, -1, -1, 0, 2, 0 ],
  [ 30, 3, 4.5, 4.5, 5, 0, 40, -1, NaN, NaN, 1, 11, 1, -1, 1, -1, -1, 1 ],
  [ 31, 3, 3, 2, 2.5, 2, 40, 0, NaN, 5, 1, 10, 0, 0, 1, 0, 2, 0 ],
  [ 32, 2, 2.5, 2.5, NaN, -1, 38, 2, NaN, NaN, -1, 10, 1, -1, -1, -1, -1, 0 ],
  [ 33, 2, 4, 5, NaN, 0, 40, 0, NaN, 3, 1, 10, 0, 1, 0, -1, 0, 0 ],
  [ 34, 3, 2, 2.5, 2.1, 2, 40, 0, 2, 1, 1, 10, 0, 1, 1, 0, 2, 0 ],
  [ 35, 2, 2, 2, NaN, 0, 40, 0, NaN, NaN, 1, 11, 1, 0, 0, 0, 2, 0 ],
  [ 36, 1, 2, NaN, NaN, 2, 40, 1, 4, 0, 1, 11, 2, 1, 0, 1, 0, 0 ],
  [ 37, 1, 2.8, NaN, NaN, 0, 38, 2, 2, 3, 1, 9, 0, 0, 1, -1, 0, 0 ],
  [ 38, 3, 2, 2.5, 2, -1, 37, 2, NaN, NaN, -1, 10, 1, -1, -1, 0, 0, 0 ],
  [ 39, 2, 4.5, 4, NaN, 0, 40, -1, NaN, 4, -1, 12, 1, 0, 2, 0, 1, 1 ],
  [ 40, 1, 4, NaN, NaN, 0, NaN, 0, NaN, NaN, 0, 11, 1, 1, 0, 1, 0, 0 ],
  [ 41, 2, 2, 3, NaN, 0, 38, 2, NaN, NaN, 0, 12, 2, 0, 0, 0, 2, 0 ],
  [ 42, 2, 2.5, 2.5, NaN, 2, 39, 2, NaN, NaN, -1, 12, 1, -1, -1, 0, -1, 0 ],
  [ 43, 2, 2.5, 3, NaN, 1, 40, 0, NaN, NaN, -1, 11, 0, -1, -1, 0, -1, 0 ],
  [ 44, 2, 4, 4, NaN, 0, 40, 0, NaN, 3, -1, 10, 0, 1, 0, -1, 0, 0 ],
  [ 45, 2, 4.5, 4, NaN, -1, 40, -1, NaN, 2, 1, 10, 0, 1, 1, -1, 1, 0 ],
  [ 46, 2, 4.5, 4, NaN, 0, 40, -1, NaN, 5, -1, 11, 1, -1, 2, 0, 2, 1 ],
  [ 47, 2, 4.6, 4.6, NaN, 1, 38, -1, NaN, NaN, -1, NaN, -1, 0, 1, -1, 1, 1 ],
  [ 48, 2, 5, 4.5, NaN, 0, 38, -1, 14, 5, -1, 11, 0, 0, -1, -1, 2, 1 ],
  [ 49, 2, 5.7, 4.5, NaN, 0, 40, 1, NaN, NaN, -1, 11, 1, 0, 2, 0, 2, 1 ],
  [ 50, 2, 7, 5.3, NaN, -1, NaN, -1, NaN, NaN, -1, 11, -1, 0, 2, -1, -1, 1 ],
  [ 51, 3, 2, 3, NaN, 1, NaN, 2, NaN, NaN, 0, NaN, -1, 0, 1, 0, -1, 1 ],
  [ 52, 3, 3.5, 4, 4.5, 1, 35, -1, NaN, NaN, -1, 13, 2, -1, -1, 0, 2, 1 ],
  [ 53, 3, 4, 3.5, NaN, 0, 40, 2, NaN, 6, -1, 11, 1, 0, 2, -1, 2, 1 ],
  [ 54, 3, 5, 4.4, NaN, 0, 38, 2, 10, 6, -1, 11, 2, 0, -1, -1, 2, 1 ],
  [ 55, 3, 5, 5, 5, -1, 40, -1, NaN, NaN, -1, 12, 1, -1, 1, 0, 1, 1 ],
  [ 56, 3, 6, 6, 4, -1, 35, -1, NaN, 14, -1, 9, 2, 0, 2, 0, 2, 1 ],
  [ -1, 4, NaN, NaN, 1, 1, 41, -1, NaN, NaN, -1, 13, -1, -1, -1, -1, -1, -1 ] ],
  types: [ 'numeric',
  'numeric',
  'numeric',
  'numeric',
  'numeric',
  'nominal',
  'numeric',
  'nominal',
  'numeric',
  'numeric',
  'nominal',
  'numeric',
  'nominal',
  'nominal',
  'nominal',
  'nominal',
  'nominal',
  'nominal' ],
  k: 5
};

const EXAMPLE_DATA = {
  rows: [ [ 1, 5, NaN, NaN, -1, 40, -1, NaN, 2, -1, 11, 1, -1, -1, 0, -1 ],
  [ 2, 4.5, 5.8, NaN, -1, 35, 1, NaN, NaN, 0, 11, 0, -1, 2, -1, 2 ],
  [ NaN, NaN, NaN, NaN, -1, 38, 2, NaN, 5, -1, 11, 2, 0, 1, 0, 1 ],
  [ 3, 3.7, 4, 5, 2, NaN, -1, NaN, NaN, 0, NaN, -1, -1, -1, 0, -1 ],
  [ 3, 4.5, 4.5, 5, -1, 40, -1, NaN, NaN, -1, 12, 1, -1, 1, 0, 1 ],
  [ 2, 2, 2.5, NaN, -1, 35, -1, NaN, 6, 0, 12, 1, -1, -1, -1, -1 ],
  [ 3, 4, 5, 5, 2, NaN, 2, NaN, NaN, -1, 12, 2, 0, 0, 0, 1 ],
  [ 3, 6.9, 4.8, 2.3, -1, 40, -1, NaN, 3, -1, 12, 0, -1, -1, -1, -1 ],
  [ 2, 3, 7, NaN, -1, 38, -1, 12, 25, 0, 11, 0, 0, 1, 0, -1 ],
  [ 1, 5.7, NaN, NaN, 0, 40, 2, NaN, 4, -1, 11, 2, 0, 2, -1, -1 ],
  [ 3, 3.5, 4, 4.6, 0, 36, -1, NaN, 3, -1, 13, 2, -1, -1, 0, 2 ],
  [ 2, 6.4, 6.4, NaN, -1, 38, -1, NaN, 4, -1, 15, -1, -1, 2, -1, -1 ],
  [ 2, 3.5, 4, NaN, 0, 40, -1, NaN, 2, 1, 10, 0, 1, 1, -1, 1 ],
  [ 3, 3.5, 4, 5.1, 1, 37, -1, NaN, 4, -1, 13, 2, -1, 2, 0, 2 ],
  [ 1, 3, NaN, NaN, 0, 36, -1, NaN, 10, 1, 11, 2, -1, -1, -1, -1 ],
  [ 2, 4.5, 4, NaN, 0, 37, 2, NaN, NaN, -1, 11, 1, -1, 2, 0, -1 ],
  [ 1, 2.8, NaN, NaN, -1, 35, -1, NaN, 2, -1, 12, 0, -1, -1, -1, -1 ],
  [ 1, 2.1, NaN, NaN, 2, 40, 1, 2, 3, 1, 9, 0, 0, 1, -1, 0 ],
  [ 1, 2, NaN, NaN, 0, 38, 0, NaN, NaN, 0, 11, 1, 1, 0, 1, 0 ],
  [ 2, 4, 5, NaN, 1, 35, -1, 13, 5, -1, 15, 2, -1, -1, -1, -1 ],
  [ 2, 4.3, 4.4, NaN, -1, 38, -1, NaN, 4, -1, 12, 2, -1, 2, -1, 2 ],
  [ 2, 2.5, 3, NaN, -1, 40, 0, NaN, NaN, -1, 11, 0, -1, -1, -1, -1 ],
  [ 3, 3.5, 4, 4.6, 1, 27, -1, NaN, NaN, -1, NaN, -1, -1, -1, -1, -1 ],
  [ 2, 4.5, 4, NaN, -1, 40, -1, NaN, 4, -1, 10, 2, -1, 1, -1, 2 ],
  [ 1, 6, NaN, NaN, -1, 38, -1, 8, 3, -1, 9, 2, -1, -1, -1, -1 ],
  [ 3, 2, 2, 2, 0, 40, 0, NaN, NaN, -1, 10, 0, -1, 1, 0, 2 ],
  [ 2, 4.5, 4.5, NaN, 1, NaN, -1, NaN, NaN, 0, 10, 0, 0, 0, -1, 1 ],
  [ 2, 3, 3, NaN, 0, 33, -1, NaN, NaN, 0, 12, 2, -1, -1, 0, 2 ],
  [ 2, 5, 4, NaN, 0, 37, -1, NaN, 5, 1, 11, 0, 0, 2, 0, 2 ],
  [ 3, 2, 2.5, NaN, -1, 35, 0, NaN, NaN, -1, 10, 1, -1, -1, 0, 2 ],
  [ 3, 4.5, 4.5, 5, 0, 40, -1, NaN, NaN, 1, 11, 1, -1, 1, -1, -1 ],
  [ 3, 3, 2, 2.5, 2, 40, 0, NaN, 5, 1, 10, 0, 0, 1, 0, 2 ],
  [ 2, 2.5, 2.5, NaN, -1, 38, 2, NaN, NaN, -1, 10, 1, -1, -1, -1, -1 ],
  [ 2, 4, 5, NaN, 0, 40, 0, NaN, 3, 1, 10, 0, 1, 0, -1, 0 ],
  [ 3, 2, 2.5, 2.1, 2, 40, 0, 2, 1, 1, 10, 0, 1, 1, 0, 2 ],
  [ 2, 2, 2, NaN, 0, 40, 0, NaN, NaN, 1, 11, 1, 0, 0, 0, 2 ],
  [ 1, 2, NaN, NaN, 2, 40, 1, 4, 0, 1, 11, 2, 1, 0, 1, 0 ],
  [ 1, 2.8, NaN, NaN, 0, 38, 2, 2, 3, 1, 9, 0, 0, 1, -1, 0 ],
  [ 3, 2, 2.5, 2, -1, 37, 2, NaN, NaN, -1, 10, 1, -1, -1, 0, 0 ],
  [ 2, 4.5, 4, NaN, 0, 40, -1, NaN, 4, -1, 12, 1, 0, 2, 0, 1 ],
  [ 1, 4, NaN, NaN, 0, NaN, 0, NaN, NaN, 0, 11, 1, 1, 0, 1, 0 ],
  [ 2, 2, 3, NaN, 0, 38, 2, NaN, NaN, 0, 12, 2, 0, 0, 0, 2 ],
  [ 2, 2.5, 2.5, NaN, 2, 39, 2, NaN, NaN, -1, 12, 1, -1, -1, 0, -1 ],
  [ 2, 2.5, 3, NaN, 1, 40, 0, NaN, NaN, -1, 11, 0, -1, -1, 0, -1 ],
  [ 2, 4, 4, NaN, 0, 40, 0, NaN, 3, -1, 10, 0, 1, 0, -1, 0 ],
  [ 2, 4.5, 4, NaN, -1, 40, -1, NaN, 2, 1, 10, 0, 1, 1, -1, 1 ],
  [ 2, 4.5, 4, NaN, 0, 40, -1, NaN, 5, -1, 11, 1, -1, 2, 0, 2 ],
  [ 2, 4.6, 4.6, NaN, 1, 38, -1, NaN, NaN, -1, NaN, -1, 0, 1, -1, 1 ],
  [ 2, 5, 4.5, NaN, 0, 38, -1, 14, 5, -1, 11, 0, 0, -1, -1, 2 ],
  [ 2, 5.7, 4.5, NaN, 0, 40, 1, NaN, NaN, -1, 11, 1, 0, 2, 0, 2 ],
  [ 2, 7, 5.3, NaN, -1, NaN, -1, NaN, NaN, -1, 11, -1, 0, 2, -1, -1 ],
  [ 3, 2, 3, NaN, 1, NaN, 2, NaN, NaN, 0, NaN, -1, 0, 1, 0, -1 ],
  [ 3, 3.5, 4, 4.5, 1, 35, -1, NaN, NaN, -1, 13, 2, -1, -1, 0, 2 ],
  [ 3, 4, 3.5, NaN, 0, 40, 2, NaN, 6, -1, 11, 1, 0, 2, -1, 2 ],
  [ 3, 5, 4.4, NaN, 0, 38, 2, 10, 6, -1, 11, 2, 0, -1, -1, 2 ],
  [ 3, 5, 5, 5, -1, 40, -1, NaN, NaN, -1, 12, 1, -1, 1, 0, 1 ],
  [ 3, 6, 6, 4, -1, 35, -1, NaN, 14, -1, 9, 2, 0, 2, 0, 2 ],
  [ 4, NaN, NaN, 1, 1, 41, -1, NaN, NaN, -1, 13, -1, -1, -1, -1, -1 ] ],
  types: [ 'numeric',
  'numeric',
  'numeric',
  'numeric',
  'nominal',
  'numeric',
  'nominal',
  'numeric',
  'numeric',
  'nominal',
  'numeric',
  'nominal',
  'nominal',
  'nominal',
  'nominal',
  'nominal' ],
  k: 5
};

const EXAMPLE_DATA_NORMALIZED = {
  rows: [
    [0,0.6,NaN,NaN,-1,0.9285714285714286,-1,NaN,0.08,-1,0.3333333333333333,1,-1,-1,0,-1],
    [0.3333333333333333,0.5,0.76,NaN,-1,0.5714285714285714,1,NaN,NaN,0,0.3333333333333333,0,-1,2,-1,2],
    [NaN,NaN,NaN,NaN,-1,0.7857142857142857,2,NaN,0.2,-1,0.3333333333333333,2,0,1,0,1],
    [0.6666666666666666,0.34,0.4,0.9756097560975611,2,NaN,-1,NaN,NaN,0,NaN,-1,-1,-1,0,-1],
    [0.6666666666666666,0.5,0.5,0.9756097560975611,-1,0.9285714285714286,-1,NaN,NaN,-1,0.5,1,-1,1,0,1],
    [0.3333333333333333,0,0.1,NaN,-1,0.5714285714285714,-1,NaN,0.24,0,0.5,1,-1,-1,-1,-1],
    [0.6666666666666666,0.4,0.6,0.9756097560975611,2,NaN,2,NaN,NaN,-1,0.5,2,0,0,0,1],
    [0.6666666666666666,0.9800000000000001,0.5599999999999999,0.3170731707317073,-1,0.9285714285714286,-1,NaN,0.12,-1,0.5,0,-1,-1,-1,-1],
    [0.3333333333333333,0.2,1,NaN,-1,0.7857142857142857,-1,0.8333333333333334,1,0,0.3333333333333333,0,0,1,0,-1],
    [0,0.74,NaN,NaN,0,0.9285714285714286,2,NaN,0.16,-1,0.3333333333333333,2,0,2,-1,-1],
    [0.6666666666666666,0.3,0.4,0.8780487804878049,0,0.6428571428571429,-1,NaN,0.12,-1,0.6666666666666666,2,-1,-1,0,2],
    [0.3333333333333333,0.8800000000000001,0.8800000000000001,NaN,-1,0.7857142857142857,-1,NaN,0.16,-1,1,-1,-1,2,-1,-1],
    [0.3333333333333333,0.3,0.4,NaN,0,0.9285714285714286,-1,NaN,0.08,1,0.16666666666666666,0,1,1,-1,1],
    [0.6666666666666666,0.3,0.4,1,1,0.7142857142857143,-1,NaN,0.16,-1,0.6666666666666666,2,-1,2,0,2],
    [0,0.2,NaN,NaN,0,0.6428571428571429,-1,NaN,0.4,1,0.3333333333333333,2,-1,-1,-1,-1],
    [0.3333333333333333,0.5,0.4,NaN,0,0.7142857142857143,2,NaN,NaN,-1,0.3333333333333333,1,-1,2,0,-1],
    [0,0.15999999999999998,NaN,NaN,-1,0.5714285714285714,-1,NaN,0.08,-1,0.5,0,-1,-1,-1,-1],
    [0,0.020000000000000018,NaN,NaN,2,0.9285714285714286,1,0,0.12,1,0,0,0,1,-1,0],
    [0,0,NaN,NaN,0,0.7857142857142857,0,NaN,NaN,0,0.3333333333333333,1,1,0,1,0],
    [0.3333333333333333,0.4,0.6,NaN,1,0.5714285714285714,-1,0.9166666666666666,0.2,-1,1,2,-1,-1,-1,-1],
    [0.3333333333333333,0.45999999999999996,0.4800000000000001,NaN,-1,0.7857142857142857,-1,NaN,0.16,-1,0.5,2,-1,2,-1,2],
    [0.3333333333333333,0.1,0.2,NaN,-1,0.9285714285714286,0,NaN,NaN,-1,0.3333333333333333,0,-1,-1,-1,-1],
    [0.6666666666666666,0.3,0.4,0.8780487804878049,1,0,-1,NaN,NaN,-1,NaN,-1,-1,-1,-1,-1],
    [0.3333333333333333,0.5,0.4,NaN,-1,0.9285714285714286,-1,NaN,0.16,-1,0.16666666666666666,2,-1,1,-1,2],
    [0,0.8,NaN,NaN,-1,0.7857142857142857,-1,0.5,0.12,-1,0,2,-1,-1,-1,-1],
    [0.6666666666666666,0,0,0.24390243902439027,0,0.9285714285714286,0,NaN,NaN,-1,0.16666666666666666,0,-1,1,0,2],
    [0.3333333333333333,0.5,0.5,NaN,1,NaN,-1,NaN,NaN,0,0.16666666666666666,0,0,0,-1,1],
    [0.3333333333333333,0.2,0.2,NaN,0,0.42857142857142855,-1,NaN,NaN,0,0.5,2,-1,-1,0,2],
    [0.3333333333333333,0.6,0.4,NaN,0,0.7142857142857143,-1,NaN,0.2,1,0.3333333333333333,0,0,2,0,2],
    [0.6666666666666666,0,0.1,NaN,-1,0.5714285714285714,0,NaN,NaN,-1,0.16666666666666666,1,-1,-1,0,2],
    [0.6666666666666666,0.5,0.5,0.9756097560975611,0,0.9285714285714286,-1,NaN,NaN,1,0.3333333333333333,1,-1,1,-1,-1],
    [0.6666666666666666,0.2,0,0.3658536585365854,2,0.9285714285714286,0,NaN,0.2,1,0.16666666666666666,0,0,1,0,2],
    [0.3333333333333333,0.1,0.1,NaN,-1,0.7857142857142857,2,NaN,NaN,-1,0.16666666666666666,1,-1,-1,-1,-1],
    [0.3333333333333333,0.4,0.6,NaN,0,0.9285714285714286,0,NaN,0.12,1,0.16666666666666666,0,1,0,-1,0],
    [0.6666666666666666,0,0.1,0.26829268292682934,2,0.9285714285714286,0,0,0.04,1,0.16666666666666666,0,1,1,0,2],
    [0.3333333333333333,0,0,NaN,0,0.9285714285714286,0,NaN,NaN,1,0.3333333333333333,1,0,0,0,2],
    [0,0,NaN,NaN,2,0.9285714285714286,1,0.16666666666666666,0,1,0.3333333333333333,2,1,0,1,0],
    [0,0.15999999999999998,NaN,NaN,0,0.7857142857142857,2,0,0.12,1,0,0,0,1,-1,0],
    [0.6666666666666666,0,0.1,0.24390243902439027,-1,0.7142857142857143,2,NaN,NaN,-1,0.16666666666666666,1,-1,-1,0,0],
    [0.3333333333333333,0.5,0.4,NaN,0,0.9285714285714286,-1,NaN,0.16,-1,0.5,1,0,2,0,1],
    [0,0.4,NaN,NaN,0,NaN,0,NaN,NaN,0,0.3333333333333333,1,1,0,1,0],
    [0.3333333333333333,0,0.2,NaN,0,0.7857142857142857,2,NaN,NaN,0,0.5,2,0,0,0,2],
    [0.3333333333333333,0.1,0.1,NaN,2,0.8571428571428571,2,NaN,NaN,-1,0.5,1,-1,-1,0,-1],
    [0.3333333333333333,0.1,0.2,NaN,1,0.9285714285714286,0,NaN,NaN,-1,0.3333333333333333,0,-1,-1,0,-1],
    [0.3333333333333333,0.4,0.4,NaN,0,0.9285714285714286,0,NaN,0.12,-1,0.16666666666666666,0,1,0,-1,0],
    [0.3333333333333333,0.5,0.4,NaN,-1,0.9285714285714286,-1,NaN,0.08,1,0.16666666666666666,0,1,1,-1,1],
    [0.3333333333333333,0.5,0.4,NaN,0,0.9285714285714286,-1,NaN,0.2,-1,0.3333333333333333,1,-1,2,0,2],
    [0.3333333333333333,0.5199999999999999,0.5199999999999999,NaN,1,0.7857142857142857,-1,NaN,NaN,-1,NaN,-1,0,1,-1,1],
    [0.3333333333333333,0.6,0.5,NaN,0,0.7857142857142857,-1,1,0.2,-1,0.3333333333333333,0,0,-1,-1,2],
    [0.3333333333333333,0.74,0.5,NaN,0,0.9285714285714286,1,NaN,NaN,-1,0.3333333333333333,1,0,2,0,2],
    [0.3333333333333333,1,0.6599999999999999,NaN,-1,NaN,-1,NaN,NaN,-1,0.3333333333333333,-1,0,2,-1,-1],
    [0.6666666666666666,0,0.2,NaN,1,NaN,2,NaN,NaN,0,NaN,-1,0,1,0,-1],
    [0.6666666666666666,0.3,0.4,0.853658536585366,1,0.5714285714285714,-1,NaN,NaN,-1,0.6666666666666666,2,-1,-1,0,2],
    [0.6666666666666666,0.4,0.3,NaN,0,0.9285714285714286,2,NaN,0.24,-1,0.3333333333333333,1,0,2,-1,2],
    [0.6666666666666666,0.6,0.4800000000000001,NaN,0,0.7857142857142857,2,0.6666666666666666,0.24,-1,0.3333333333333333,2,0,-1,-1,2],
    [0.6666666666666666,0.6,0.6,0.9756097560975611,-1,0.9285714285714286,-1,NaN,NaN,-1,0.5,1,-1,1,0,1],
    [0.6666666666666666,0.8,0.8,0.7317073170731708,-1,0.5714285714285714,-1,NaN,0.56,-1,0,2,0,2,0,2],
    [1,NaN,NaN,0,1,1,-1,NaN,NaN,-1,0.6666666666666666,-1,-1,-1,-1,-1]
  ],
  types: [
    'numeric',
    'numeric',
    'numeric',
    'numeric',
    'nominal',
    'numeric',
    'nominal',
    'numeric',
    'numeric',
    'nominal',
    'numeric',
    'nominal',
    'nominal',
    'nominal',
    'nominal',
    'nominal'
  ],
  k: 5
};

const DISTANCE_TEST = {
  centroid: [0,  1, 5,   null, null, -1, 40, -1, null, 2,   -1, 11, 1, -1, -1,  0, -1, 1],
  point:    [32, 2, 2.5, 2.5,  NaN,  -1, 38,  2, NaN,  NaN, -1, 10, 1, -1, -1, -1, -1, 0],
  point2: [ 1, 2, 4.5, 5.8, NaN, -1, 35, 1, NaN, NaN, 0, 11, 0, -1, 2, -1, 2, 1 ],
  types: [ 'numeric',
  'numeric',
  'numeric',
  'numeric',
  'numeric',
  'nominal',
  'numeric',
  'nominal',
  'numeric',
  'numeric',
  'nominal',
  'numeric',
  'nominal',
  'nominal',
  'nominal',
  'nominal',
  'nominal',
  'nominal' ]
};

runWebTests();

function testSSE() {
  return {
    testName: 'sse',
    results: [
      {
        result: Clustering._test_calculateSSE(TEST_DATA.smallGroups)[0],
        target: TEST_DATA.smallSSE
      }
    ]
  };
}

function testGrouping() {
  const data = Clustering._test_groupData([TEST_DATA.smallCentroid], TEST_DATA.smallData, TEST_DATA.smallTypes);
  
  return {
    testName: 'grouping',
    results: [
      {
        data: data,
        result: data[0].map(value => value.centroidDistanceSquared),
        target: TEST_DATA.smallDistancesSquared
      }
    ]
  };
}

function testRun() {
  const data = Clustering.run(TEST_DATA.smallTypes, 2, TEST_DATA.smallData, [0, 1]);
  const bigData = Clustering.run(BIG_TEST_DATA.types, BIG_TEST_DATA.k, BIG_TEST_DATA.dataRows, [0, 1, 2, 3, 4]);
  const exampleData = Clustering.run(EXAMPLE_DATA.types, EXAMPLE_DATA.k, EXAMPLE_DATA.rows, [0, 1, 2, 3, 4]);
  const exampleDataNormalized = Clustering.run(EXAMPLE_DATA_NORMALIZED.types, EXAMPLE_DATA_NORMALIZED.k, EXAMPLE_DATA_NORMALIZED.rows, [0, 1, 2, 3, 4]);
  
  return {
    testName: 'run',
    results: [
      {
        data: data,
        result: data.iterations.length,
        target: 12
      },
      {
        data: bigData,
        result: bigData.iterations.length,
        target: 20
      },
      {
        data: exampleData,
        result: exampleData.iterations.length,
        target: 10
      },
      {
        result: exampleData.bestError,
        target: 820.01
      },
      {
        data: exampleDataNormalized,
        result: exampleDataNormalized.iterations.length,
        target: 16
      },
      {
        result: exampleDataNormalized.bestError,
        target: 416.29444717879176
      },
    ]
  };
}

function testInitialCentroids() {
  const pickedCentroids = Clustering._test_pickInitCentroids(2, 10);
  
  return {
    testName: 'init centroids',
    results: [
      {
        data: pickedCentroids,
        result: pickedCentroids.length,
        target: 2
      }
    ]
  };
}

function testCentroids() {
  const groups = Clustering._test_groupData([TEST_DATA.smallCentroid], TEST_DATA.smallData, TEST_DATA.smallTypes);
  
  return {
    testName: 'centroids',
    results: [
      {
        result: Clustering._test_calculateCentroids(groups, TEST_DATA.smallTypes),
        target: [TEST_DATA.smallCentroid]
      }
    ]
  };
}

function testDistance() {  
  return {
    testName: 'distance',
    results: [
      {
        result: Clustering._test_pointDistanceSquared(DISTANCE_TEST.centroid, DISTANCE_TEST.centroid, DISTANCE_TEST.types),
        target: 9
      },
      {
        result: Clustering._test_pointDistanceSquared(DISTANCE_TEST.centroid, DISTANCE_TEST.point2, DISTANCE_TEST.types),
        target: 39.25
      },
      {
        result: Clustering._test_pointDistanceSquared(EXAMPLE_DATA_NORMALIZED.rows[0], EXAMPLE_DATA_NORMALIZED.rows[5], EXAMPLE_DATA_NORMALIZED.types),
        target: 10.652039909297052
      },
      {
        result: Clustering._test_pointDistanceSquared(EXAMPLE_DATA_NORMALIZED.rows[1], EXAMPLE_DATA_NORMALIZED.rows[5], EXAMPLE_DATA_NORMALIZED.types),
        target: 10.713377777777778
      },
      {
        result: Clustering._test_pointDistanceSquared(EXAMPLE_DATA_NORMALIZED.rows[2], EXAMPLE_DATA_NORMALIZED.rows[5], EXAMPLE_DATA_NORMALIZED.types),
        target: 13.075296145124717
      },
      {
        result: Clustering._test_pointDistanceSquared(EXAMPLE_DATA_NORMALIZED.rows[3], EXAMPLE_DATA_NORMALIZED.rows[5], EXAMPLE_DATA_NORMALIZED.types),
        target: 12.316711111111111
      },
      {
        result: Clustering._test_pointDistanceSquared(EXAMPLE_DATA_NORMALIZED.rows[4], EXAMPLE_DATA_NORMALIZED.rows[5], EXAMPLE_DATA_NORMALIZED.types),
        target: 10.648662131519274
      },
    ]
  };
}

function runWebTests() {
  let results = [
    testSSE(),
    testGrouping(),
    testCentroids(),
    testInitialCentroids(),
    testDistance(),
    testRun()
  ];
  
  results = results.map((result) => {
    return parseResult(result);
  });
  
  const passed = results.reduce( (total, current) => total && current.passed.reduce((a, b) => a && b, true), true);
  
  console.log('all passed:', passed, 'results:', results);
}

function parseResult(testOutput) {
  return {
    passed: compareResults(testOutput.results),
    results: testOutput.results,
    test: testOutput.testName
  };
}

function compareResults(results) {
  return results.map((testObject) => {
    return equal(testObject.result, testObject.target)  && ((testObject.condition !== undefined && testObject.condition) || testObject.condition === undefined);
  });
}

// ripped this straight out of fast-deep-equal: https://github.com/epoberezkin/fast-deep-equal
// made it browser friendly and reformated some weird lines
function equal(a, b) {
  if (a === b) return true;

  let arrA = Array.isArray(a);
  let arrB = Array.isArray(b);
  let i;

  if (arrA && arrB) {
    if (a.length != b.length) return false;
    for (i = 0; i < a.length; i++)
      if (!equal(a[i], b[i])) return false;
    return true;
  }

  if (arrA != arrB) return false;

  if (a && b && typeof a === 'object' && typeof b === 'object') {
    let keys = Object.keys(a);
    if (keys.length !== Object.keys(b).length) return false;

    let dateA = a instanceof Date;
    let dateB = b instanceof Date;
    if (dateA && dateB) return a.getTime() == b.getTime();
    if (dateA != dateB) return false;

    let regexpA = a instanceof RegExp;
    let regexpB = b instanceof RegExp;
    if (regexpA && regexpB) return a.toString() == b.toString();
    if (regexpA != regexpB) return false;

    for (i = 0; i < keys.length; i++)
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

    for (i = 0; i < keys.length; i++)
      if(!equal(a[keys[i]], b[keys[i]])) return false;

    return true;
  }

  return false;
}