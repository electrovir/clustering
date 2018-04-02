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
  
  return {
    testName: 'run',
    results: [
      {
        data: data,
        result: data.iterations.length,
        target: 12
      }
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

function runWebTests() {
  let results = [
    testSSE(),
    testGrouping(),
    testCentroids(),
    testInitialCentroids(),
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