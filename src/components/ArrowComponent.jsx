import React, { useContext } from 'react';
import { Arrow, Text } from 'react-konva';
import { GraphContext } from '../GraphProvider';

const ArrowComponent = ({ offsetX, arrowId,text, endVertexId, startVertexId, handleDeleteComponent }) => {
  const {
    vertexes,
    isDraggable,
    shortestPath,
    dfsTraversal,
    bfsTraversal
  } = useContext(GraphContext)

  const startVertex = vertexes.find(vertex => vertex.id === startVertexId);
  const endVertex = vertexes.find(vertex => vertex.id === endVertexId);

  const diax = endVertex.x - startVertex.x;
  const diay = endVertex.y - startVertex.y;
  const length = Math.sqrt(diax * diax + diay * diay);
  const unitVector = { x: diax / length, y: diay / length };

  const adjustedEndX = endVertex.x - unitVector.x * 25;
  const adjustedEndY = endVertex.y - unitVector.y * 25;

  if (!startVertex || !endVertex) return null;

  const handleDelete = () => {
    handleDeleteComponent(arrowId, 'arrow');
  };

  const determineArrowColor = () => {
    if (isPartOfShortestPath()) return 'blue';
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
      <Arrow
        points={[
          startVertex.x + offsetX,
          startVertex.y,
          adjustedEndX + offsetX,
          adjustedEndY,
        ]}
        stroke={determineArrowColor()}
        strokeWidth={4}
        pointerLength={10}
        pointerWidth={10}
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

export default ArrowComponent;
