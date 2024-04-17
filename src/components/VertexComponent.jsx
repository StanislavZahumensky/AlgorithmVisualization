import React, { useContext } from 'react';
import { Circle, Text } from 'react-konva';
import { handleSetSingleColor } from '../handlers';
import { GraphContext } from '../GraphProvider';

const VertexComponent = ({ x, y, id, offsetX, name, color, onHandleAddingEdge, onHandleVertexDragEnd, onHandleDeleteComponent,
  currentVertexId }) => {
  const {
    vertexSize,
    isDraggable,
    currentColor,
    activeButton,
    vertexes,
    setVertexes

  } = useContext(GraphContext)

  const handleDelete = () => {
    onHandleDeleteComponent(id, 'vertex');
  };

  const setSingleColor = (id) => {
    handleSetSingleColor(id, currentVertexId, activeButton, vertexes, currentColor, setVertexes);
  };

  const fillColor = typeof color === 'string' ? (color.startsWith('#') ? color : `#${color}`) : '#ff0000';

  return (
    <>
      <Circle
        x={x + offsetX}
        y={y}
        radius={vertexSize}
        fill={fillColor}
        draggable={isDraggable}
        onClick={() => {
          setSingleColor(id);
          onHandleAddingEdge(id);
          handleDelete();
        }}
        onTouchStart={()=>onHandleAddingEdge(id)}
        onDragEnd={onHandleVertexDragEnd}
      />
      <Text
        text={typeof name === 'string' ? (name.length > 6 ? name.substring(0, 5) + "..." : name) : name}
        x={x - vertexSize / 3 - 3 + offsetX}
        y={y - vertexSize * 2}
        draggable={isDraggable}
        fill="red"
        fontStyle="bold"
        fontSize={vertexSize / 2 + 5}
        pointerEvents="none"
      />
    </>
  );
};

export default VertexComponent;
