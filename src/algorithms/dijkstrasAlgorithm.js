export function dijkstrasAlgorithm(adjList, startVertex, endVertex) {
    const distancesResult = {};
    const visited = {};
    const previousResult = {};
    const queue = [];
  
    Object.keys(adjList).forEach(vertex => {
        distancesResult[vertex] = Infinity;
        visited[vertex] = false;
        previousResult[vertex] = null;
    });
  
    distancesResult[startVertex] = 0;
  
    queue.push({ vertex: startVertex, distance: 0 });
  
    while (queue.length > 0) {
        queue.sort((a, b) => a.distance - b.distance);
  
        const { vertex: currentVertex } = queue.shift();
  
        visited[currentVertex] = true;
  
        for (const neighbor in adjList[currentVertex]) {
            const weight = adjList[currentVertex][neighbor];
            const distanceToNeighbor = distancesResult[currentVertex] + weight;
            if (distanceToNeighbor < distancesResult[neighbor]) {
                distancesResult[neighbor] = distanceToNeighbor;
                previousResult[neighbor] = parseInt(currentVertex);
                queue.push({ vertex: neighbor, distance: distanceToNeighbor });
            }
        }
    }
  
    const shortestPathResult = [];
    let current = endVertex;
    while (current !== null) {
        shortestPathResult.unshift(parseInt(current));
        current = previousResult[current];
    }
  
    return { distancesResult, previousResult, shortestPathResult };
}
