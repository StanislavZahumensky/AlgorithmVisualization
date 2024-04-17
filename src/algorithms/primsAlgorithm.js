export function primsAlgorithm(adjList) {
    const visited = {};
    const minimumSpanningTree = [];

    const startVertex = Object.keys(adjList)[Math.floor(Math.random() * Object.keys(adjList).length)];
    visited[startVertex] = true;

    while (Object.keys(visited).length < Object.keys(adjList).length) {
        let minEdge = null;
        let minWeight = Infinity;
        for (const vertex in visited) {
            for (const neighbor of Object.keys(adjList[vertex])) {
                if (!visited[neighbor]) {
                    const weight = adjList[vertex][neighbor] || 0;
                    if (weight < minWeight) {
                        minWeight = weight;
                        minEdge = [vertex, neighbor, weight];
                    }
                }
            }
        }
        if (!minEdge) break;

        const [source, destination, weight] = minEdge;
        minimumSpanningTree.push([parseInt(source), parseInt(destination), weight]);
        visited[destination] = true;
    }

    return minimumSpanningTree;
}
