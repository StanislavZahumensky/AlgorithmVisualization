export function kruskalsAlgorithm(adjList) {
    function find(parent, i) {
        if (i >= parent.length || parent[i] === undefined) {
            return -1;
        }
        if (parent[i] === i) {
            return i;
        }
        return find(parent, parent[i]);
    }

    function union(parent, rank, x, y) {
        const xRoot = find(parent, x);
        const yRoot = find(parent, y);

        if (rank[xRoot] < rank[yRoot]) {
            parent[xRoot] = yRoot;
        } else if (rank[xRoot] > rank[yRoot]) {
            parent[yRoot] = xRoot;
        } else {
            parent[yRoot] = xRoot;
            rank[xRoot]++;
        }
    }

    const edges = [];
    for (const vertex in adjList) {
        for (const neighbor in adjList[vertex]) {
            edges.push([parseInt(vertex), parseInt(neighbor), adjList[vertex][neighbor]]);
        }
    }

    edges.sort((a, b) => a[2] - b[2]);

    const numVertices = Object.keys(adjList).length;
    const maxVertexId = Math.max(...Object.keys(adjList).map(Number));
    const parent = Array(maxVertexId + 1).fill(null).map((_, index) => index);
    const rank = Array(maxVertexId + 1).fill(0);

    const minimumSpanningTree = [];

    let edgeIndex = 0;
    let treeEdgeCount = 0;
    while (treeEdgeCount < numVertices - 1) {
        const [source, destination, weight] = edges[edgeIndex];
        edgeIndex++;

        const sourceParent = find(parent, source);
        const destinationParent = find(parent, destination);

        if (sourceParent !== destinationParent) {
            minimumSpanningTree.push([source, destination, weight]);
            union(parent, rank, sourceParent, destinationParent);
            treeEdgeCount++;
        }
    }

    return minimumSpanningTree;
}
