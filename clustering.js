const Clustering = (() => {

  function pickInitCentroids(k, size) {
    if (k > size) {
      throw new Error('k cannot be bigger than the passed size! k: ' + k + ' size: ' + size);
    }
    let pickedIndexes = [];
    
    while (pickedIndexes.length < k) {
      const randomIndex = Math.round(Math.random() * size);
      if (pickedIndexes.indexOf(randomIndex) === -1) {
        pickedIndexes.push(randomIndex);
      }
    }
    
    return pickedIndexes;
  }

  function run(featureTypes, k, dataRows, initialCentroidIndexes = []) {
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
      const groups = groupData(centroids, dataRows, featureTypes);
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
    
    return {
      iterations: iterations,
      bestIndex: bestIndex,
      bestError: iterations[bestIndex].totalError,
      bestCentroids: iterations[bestIndex].centroids
    };
  }

  function pointDistanceSquared(centroidFeatures, dataPoint, featureTypes) {
    return dataPoint.reduce((sum, currentFeatureValue, featureIndex) => {
      return sum + Math.pow(featureDistance(centroidFeatures[featureIndex], currentFeatureValue, featureTypes[featureIndex]), 2);
    }, 0);
  }

  function featureDistance(centroidFeature, dataPointFeature, featureType) {
    if (isNaN(dataPointFeature)) {
      return 1;
    }
    else if (featureType === 'nominal') {
      if (dataPointFeature === -1) {
        return 1;
      }
      return dataPointFeature !== centroidFeature;
    }
    else {
      return centroidFeature - dataPointFeature;
    }  
  }

  function groupData(centroids, data, featureTypes) {
    let initGroups = new Array(centroids.length).fill(0).map(() => []);
    
    return data.reduce((groups, dataPoint) => {
      const distancesSquared = centroids.map(centroidValue => {
        return pointDistanceSquared(centroidValue, dataPoint, featureTypes);
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
        centroidDistanceSquared: bestCentroid.distanceSquared
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
            if (!isNaN(value)) {
              sum += value;
              validFeatureCount++;
            }
            
            return sum;
          }, 0);
          
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
    
    run: run
  };
})();

if (typeof module !== 'undefined' && module.hasOwnProperty('exports')) {
  // script called in require
  Object.assign(module.exports, Clustering);
}