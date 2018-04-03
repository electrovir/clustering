const CLUSTERING = require('./clustering.js');
const ARFF = require('arff-toolkit');

function runOnData(fileName, k, callback, patternAttributes = null, targetAttributes = null, includeTarget = false, kInitIndexes = [], normalized = false, extras = false) {
  ARFF.loadArff(fileName, handleData.bind(null, k, kInitIndexes, patternAttributes, targetAttributes, includeTarget, normalized, extras, callback));
}

function handleData(k, kInitIndexes, patternAttributes, targetAttributes, includeTarget, normalized, extras, callback, arffData) {
  if (normalized) {
    arffData.normalize();
  }
  const inputData = ARFF.arffToInputs(arffData, targetAttributes, patternAttributes, {skipTargetFilter: includeTarget});
  const featureTypes = inputData.patternAttributes.map(featureName => arffData.types[featureName].type);
  const dataRows = inputData.patterns;
  
  const result = CLUSTERING.run(featureTypes, k, dataRows, kInitIndexes, extras);
  callback(result);
}

module.exports = {
  runOnData: runOnData
};