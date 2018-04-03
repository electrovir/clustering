const Silhouette = (() => {
  // average dissimiliarty within cluster
  function inside(cluster, item, itemIndex, featureTypes) {
    
    return cluster.reduce((accum, instance, instanceIndex) => {
      if (instanceIndex !== itemIndex) {
        accum += pointDistance(instance, item, featureTypes);
      }
      
      return accum;
    }, 0) / (cluster.length - 1);
  }
  
  // smallest dissimilarity to other cluster
  function outside(clusters, item, itemClusterIndex, featureTypes) {
    
    return clusters.reduce((min, cluster, clusterIndex) => {
      if (clusterIndex === itemClusterIndex) {
        return min;
      }
      
      const average = cluster.reduce((innerSum, innerItem) => {
        return innerSum + pointDistance(innerItem, item, featureTypes);
      }, 0) / cluster.length;
      
      if (average < min) {
        return average;
      }
      else {
        return min;
      }
    }, Infinity);
  }
  
  function run(clusters, featureTypes) {
    return clusters.map((cluster, clusterIndex) => {
      return cluster.map((item, itemIndex) => {
        const a = inside(cluster, item, itemIndex, featureTypes);
        const b = outside(clusters, item, clusterIndex, featureTypes);
        
        if (a < b) {
          return 1 - a/b;
        }
        else if (a === b) {
          return 0;
        }
        else {
          return b/a - 1;
        }
      }).sort((a, b) => b - a);
    });
  }
  
  function pointDistance(point1, point2, featureTypes) {
    return Math.sqrt(point2.reduce((sum, currentFeatureValue, featureIndex) => {
      const distance = featureDistance(point1[featureIndex], currentFeatureValue, featureTypes[featureIndex]);
      return sum + Math.pow(distance, 2);
    }, 0));
  }

  function featureDistance(feature1, feature2, featureType) {
    if (isNaN(feature2) || isNaN(feature1) || typeof feature1 !== 'number' || typeof feature2 !== 'number') {
      return 1;
    }
    else if (featureType === 'nominal') {
      if (feature2 === -1 || feature1 === -1) {
        return 1;
      }
      return Number(feature2 !== feature1);
    }
    else {
      return feature2 - feature1;
    }  
  }
  
  return {
    run: run
  };
})();

if (typeof module !== 'undefined' && module.hasOwnProperty('exports')) {
  // script called in require
  Object.assign(module.exports, Silhouette);
}