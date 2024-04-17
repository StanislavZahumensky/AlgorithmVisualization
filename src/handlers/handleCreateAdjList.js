export function handleCreateAdjList(vertexes, lines, arrows) {
    if (lines.length > 0 && arrows.length > 0) {
        return null;
    }
    if (lines.length > 0) {
        return _createUndirectedAdjecancyList(vertexes, lines);
    } else if (arrows.length > 0) {
        return _createDirectedAdjecancyList(vertexes, arrows);
    } else {
        return null;
    }
}

function _createUndirectedAdjecancyList(vertexes, lines) {
    const adjList = {};
    console.log("prvy",adjList);
    if (vertexes && lines && vertexes.length > 0 && lines.length > 0) {
        vertexes.forEach(vertex => {
            adjList[vertex.id] = {};
        });
        console.log("druhy",adjList);
        lines.forEach(line => {
            const startVertexId = line.startId;
            const endVertexId = line.endId;
            const weight = parseFloat(line.weight);
            if (!adjList[startVertexId]) {
                return;
            }
            if (!adjList[endVertexId]) {
                return;
            }
            if (adjList[startVertexId][endVertexId] === undefined || weight < adjList[startVertexId][endVertexId]) {
                adjList[startVertexId][endVertexId] = weight;
                adjList[endVertexId][startVertexId] = weight;
            }
            console.log("xty",adjList);
        });
    }
    return adjList;
}

function _createDirectedAdjecancyList(vertexes, arrows) {
    const adjList = {};
    if (vertexes && arrows && vertexes.length > 0 && arrows.length > 0) {
        vertexes.forEach(vertex => {
            adjList[vertex.id] = {};
        });
        arrows.forEach(arrow => {
            const startVertexId = arrow.startId;
            const endVertexId = arrow.endId;
            const weight = parseFloat(arrow.weight);
            if (!adjList[startVertexId]) {
                return;
            }
            if (!adjList[endVertexId]) {
                return;
            }
            adjList[startVertexId][endVertexId] = weight;
        });
    }
    return adjList;
}