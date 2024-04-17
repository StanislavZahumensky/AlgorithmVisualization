export function bfsAlgorithm(adjList, startNode) {
    const visited = {};
    const queue = [{ node: startNode, level: 0 }];
    const bfsTraversalEdges = [];
    const bfsTraversalSteps = [];

    while (queue.length) {
        const { node, level } = queue.shift();

        visited[node] = true;

        if (!bfsTraversalSteps[level]) {
            bfsTraversalSteps[level] = [];
        }

        for (const neighborId in adjList[node]) {
            const neighbor = parseInt(neighborId);
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                queue.push({ node: neighbor, level: level + 1 });

                bfsTraversalEdges.push([node, neighbor]);
                bfsTraversalSteps[level].push(node, neighbor);
            }
        }
    }

    while (bfsTraversalSteps.length > 0 && bfsTraversalSteps[bfsTraversalSteps.length - 1].length === 0) {
        bfsTraversalSteps.pop();
    }

    return { edges: bfsTraversalEdges, steps: bfsTraversalSteps };
}
