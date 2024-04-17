import React, { useContext } from 'react';
import { Line, Text } from 'react-konva';
import { GraphContext } from '../GraphProvider';

const LineComponent = ({ lineId, offsetX, text, endVertexId, startVertexId, handleDeleteComponent }) => {
    const {
      vertexes,
      isDraggable,
      shortestPath,
      dfsTraversal,
      bfsTraversal,
      minimumSpanningTree
    }=useContext(GraphContext)

  const startVertex = vertexes.find(vertex => vertex.id === startVertexId);
  const endVertex = vertexes.find(vertex => vertex.id === endVertexId);

  if (!startVertex || !endVertex) return null;

  const handleDelete = () => {
    handleDeleteComponent(lineId, 'line');
  };

  const determineLineColor = () => {
    if (isPartOfShortestPath()) return 'blue';
    if (isPartOfMinimumSpanningTree()) return 'blue';
    if (isPartOfBfsTraversal()) return 'blue';
    if (isPartOfDfsTraversal()) return 'blue';
    return 'black';
  };

  const isPartOfShortestPath = () => {
    return shortestPath.some((vertexId, index) => {
      if (index < shortestPath.length - 1) {
        const nextVertexId = shortestPath[index + 1];
        return (
          (startVertexId === vertexId && endVertexId === nextVertexId) ||
          (startVertexId === nextVertexId && endVertexId === vertexId)
        );
      }
      return false;
    });
  };

  const isPartOfMinimumSpanningTree = () => {
    const minimumSpanningTreeEdges = minimumSpanningTree.map(edge => ({
      startId: edge[0],
      endId: edge[1]
    }));
    return minimumSpanningTreeEdges.some(edge => {
      return (edge.startId === startVertexId && edge.endId === endVertexId) ||
        (edge.startId === endVertexId && edge.endId === startVertexId);
    });
  };

  const isPartOfBfsTraversal = () => {
    const bfsEdges = new Set(bfsTraversal.map(edge => edge.join(',')));
    return bfsEdges.has([startVertexId, endVertexId].join(',')) ||
      bfsEdges.has([endVertexId, startVertexId].join(','));
  };

  const isPartOfDfsTraversal = () => {
    const dfsEdges = new Set(dfsTraversal.map(edge => edge.join(',')));
    return dfsEdges.has([startVertexId, endVertexId].join(',')) ||
      dfsEdges.has([endVertexId, startVertexId].join(','));
  };

  return (
    <>
      <Line
        points={[
          startVertex.x + offsetX,
          startVertex.y,
          endVertex.x + offsetX,
          endVertex.y,
        ]}
        stroke={determineLineColor()}
        strokeWidth={4}
        onClick={handleDelete}
      />
      <Text
        text={text}
        x={(startVertex.x + endVertex.x) / 2 + 10 + offsetX}
        y={(startVertex.y + endVertex.y) / 2 + 10}
        draggable={isDraggable}
        fill="blue"
        fontStyle="bold"
        fontSize={18}
      />
    </>
  );
};

export default LineComponent;
