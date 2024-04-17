export function dfsAlgorithm(adjList, startNode) {
    const totalNodes = Object.keys(adjList).length;
    let visitedCount = 0;

    const visited = {};
    const dfsTraversalEdges = [];
    const dfsTraversalSteps = [];

    function dfs(node, path = []) {
        visited[node] = true;
        visitedCount++;
        path.push(node);

        if (visitedCount === totalNodes) {
            return true;
        }

        for (const neighborId in adjList[node]) {
            const neighbor = parseInt(neighborId);
            if (!visited[neighbor]) {
                dfsTraversalEdges.push([node, neighbor]);
                dfsTraversalSteps.push([node, neighbor]);
                if (dfs(neighbor, path)) {
                    return true;
                }
            }
        }
        if (path.length > 1) {
            const lastNode = path.pop();
            dfsTraversalSteps.push([lastNode, path[path.length - 1]]);
        }
        return false;
    }

    dfs(startNode);

    return { edges: dfsTraversalEdges, steps: dfsTraversalSteps };
}
