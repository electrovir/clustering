const CLUSTERING = require('./clustering.js');
const ARFF = require('arff-toolkit');

function runOnData(fileName, k, callback, kInitIndexes = []) {
  ARFF.loadArff(fileName, handleData.bind(null, k, kInitIndexes, callback));
}

function handleData(k, kInitIndexes, callback, arffData) {
  const featureTypes = arffData.attributes.map(featureName => arffData.types[featureName].type);
  const dataRows = ARFF.arffToInputs(arffData, null, null, {skipTargetFilter: true}).patterns;
  
  const result = CLUSTERING.run(featureTypes, k, dataRows, kInitIndexes);
  callback(result);
}

module.exports = {
  runOnData: runOnData
};