const WRAPPER = require('../arffWrapper.js');

WRAPPER.runOnData('tests/data/small_set.arff', 2, compareValues, [0, 1]);

function compareValues(result) {
  if (result.bestError) {
    console.log('PASSED');
  }
  else {
    console.log('FAILED');
  }
}