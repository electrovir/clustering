const Clustering = (() => {

  function pickInitCentroids(k, size) {
    if (k > size) {
      throw new Error('k cannot be bigger than the passed size! k: ' + k + ' size: ' + size);
    }
    let pickedIndexes = [];
    
    while (pickedIndexes.length < k) {
      const randomIndex = Math.round(Math.random() * (size - 1));
      if (pickedIndexes.indexOf(randomIndex) === -1) {
        pickedIndexes.push(randomIndex);
      }
    }
    
    return pickedIndexes;
  }

  function run(featureTypes, k, dataRows, initialCentroidIndexes = [], extras = false) {
    if (!Array.isArray(featureTypes)) {
      throw new Error('Invalid featureTypes passed: ' + featureTypes);
    }
    if (!Array.isArray(initialCentroidIndexes)) {
      throw new Error('Invalid initialCentroidIndexes passed: ' + initialCentroidIndexes);
    }
    if (!Array.isArray(dataRows) || !Array.isArray(dataRows[0])) {
      throw new Error('Invalid data passed: ' + dataRows);
    }
    if (typeof k !== 'number') {
      throw new Error('Invalid k parameter passed: ' + k);
    }
    if (!dataRows.every(entry => entry.length === featureTypes.length)) {
      throw new Error('featureTypes length does not match all data lengths.');
    }
    
    let centroidIndexes = initialCentroidIndexes;
    if (centroidIndexes.length === 0) {
      centroidIndexes = pickInitCentroids(k, dataRows.length);
    }
    
    let centroids = centroidIndexes.map(centroidIndex => {
      return dataRows[centroidIndex];
    });
    
    let bestIndex = 0;
    let worseIterationCount = 0;
    const MAX_WORST_COUNT = 10;
    let iterations = [];
    
    while (worseIterationCount < MAX_WORST_COUNT && iterations.length < 20) {
      const groups = groupData(centroids, dataRows, featureTypes, extras);
      const errors = calculateSSE(groups);
      const totalError = errors.reduce((total, error) => error + total);
      
      const currentIteration = {
        groups: groups,
        errors: errors,
        totalError: totalError,
        centroids: JSON.parse(JSON.stringify(centroids))
      };
      
      
      iterations.push(currentIteration);
      
      if (totalError < iterations[bestIndex].totalError) {
        worseIterationCount = 0;
        bestIndex = iterations.length - 1;
      }
      else {
        worseIterationCount++;
      }
      
      centroids = calculateCentroids(groups, featureTypes);
    }
    
    const bestClusterCounts = iterations[bestIndex].groups.map(group => group.length);
    
    return {
      startCentroidIndexes: centroidIndexes,
      bestIndex: bestIndex,
      bestError: iterations[bestIndex].totalError,
      bestErrors: iterations[bestIndex].errors,
      bestCentroids: iterations[bestIndex].centroids,
      bestClusteringCounts: bestClusterCounts,
      bestGroups: iterations[bestIndex].groups,
      featureTypes: featureTypes,
    };
  }

  function pointDistanceSquared(centroidFeatures, dataPoint, featureTypes, print=false, extras = false) {
    if (print) {
      console.log(centroidFeatures, dataPoint, featureTypes);
    }
    return dataPoint.reduce((sum, currentFeatureValue, featureIndex) => {
      const distance = featureDistance(centroidFeatures[featureIndex], currentFeatureValue, featureTypes[featureIndex], extras);
      if (print) {
        console.log(String(distance) + ', ' + String(sum));
      }
      return sum + Math.pow(distance, 2);
    }, 0);
  }

  function featureDistance(centroidFeature, dataPointFeature, featureType, extras = false) {
    if (extras && isNaN(dataPointFeature) && isNaN(centroidFeature)) {
      return 0;
    }
    else if (isNaN(dataPointFeature) || isNaN(centroidFeature) || typeof centroidFeature !== 'number' || typeof dataPointFeature !== 'number') {
      return 1;
    }
    else if (featureType === 'nominal') {
      if (extras && dataPointFeature === -1 && centroidFeature === -1) {
        return 0;
      }
      if (dataPointFeature === -1 || centroidFeature === -1) {
        return 1;
      }
      if (extras) {
        return dataPointFeature - centroidFeature;
      }
      else {
        return Number(dataPointFeature !== centroidFeature);
      }
    }
    else {
      return dataPointFeature - centroidFeature;
    }  
  }

  function groupData(centroids, data, featureTypes, extras) {
    let initGroups = new Array(centroids.length).fill(0).map(() => []);
    
    return data.reduce((groups, dataPoint, dataPointIndex) => {
      const distancesSquared = centroids.map(centroidValues => {
        return pointDistanceSquared(centroidValues, dataPoint, featureTypes, false, extras);
      });
      
      // get minimum distance
      const bestCentroid = distancesSquared.reduce((accum, distanceSquared, distanceIndex) => {
        if (distanceSquared < accum.distanceSquared) {
          return {
            distanceSquared: distanceSquared,
            index: distanceIndex
          };
        }
        else {
          return accum;
        }
      }, {distanceSquared: Infinity, index: -1});
      
      const groupData = {
        data: dataPoint,
        centroidDistanceSquared: bestCentroid.distanceSquared,
        index: dataPointIndex
      };
      
      groups[bestCentroid.index].push(groupData);
      return groups;
    }, initGroups);
  }

  function calculateSSE(groups) {
    return groups.map(group => {
      return group.reduce((accum, groupEntry) => {
        return accum + groupEntry.centroidDistanceSquared;
      }, 0);
    });
  }

  function calculateCentroids(groups, featureTypes) {
    return groups.map((group) => {
      
      return featureTypes.map((featureType, featureIndex) => {
        if (featureType === 'nominal') {
          const valueOccurrences = group.reduce((counts, entry) => {
            const value = entry.data[featureIndex];
            
            if (value !== -1) {
              if (!counts.hasOwnProperty(value)) {
                counts[value] = 0;
              }
              counts[value]++;
            }
            
            return counts;
          }, []);
          
          const mode = valueOccurrences.reduce((best, currentCount, value) => {
            if (currentCount > best.count) {
              return {
                value: value,
                count: currentCount
              };
            }
            return best;
          }, {value: -1, count: -1});
          
          return mode.value;
        }
        else {
          let validFeatureCount = 0;
          
          const summation = group.reduce((sum, entry) => {
            const value = entry.data[featureIndex];
            if (!isNaN(value) && typeof value === 'number') {
              sum += value;
              validFeatureCount++;
            }
            
            return sum;
          }, 0);
          
          const average = summation / validFeatureCount;
          return summation / validFeatureCount;
        }
      });
    });
  }
  
  return {
    _test_calculateSSE: calculateSSE,
    _test_calculateCentroids: calculateCentroids,
    _test_groupData: groupData,
    _test_featureDistance: featureDistance,
    _test_pickInitCentroids: pickInitCentroids,
    _test_pointDistanceSquared: pointDistanceSquared,
    
    run: run
  };
})();

if (typeof module !== 'undefined' && module.hasOwnProperty('exports')) {
  // script called in require
  Object.assign(module.exports, Clustering);
}