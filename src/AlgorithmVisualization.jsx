import React, { useRef, useEffect, useContext, useState } from 'react';
import { Stage, Layer } from 'react-konva';
import {
  ButtonGroup,
  VertexComponent,
  LineComponent,
  ArrowComponent,
  ColorPickerDialog,
  SettingsComponent,
  EditComponent,
  AlgorithmDialog,
  AlgorithmInfo,
  WeightDialog,
  VertexNameDialog
} from './components';

import {
  handleDeleteComponent,
  handleAddingVertex,
  handleAddingEdge,
  handleVertexDragEnd,
  handleButtonClick
} from './handlers'
import { GraphContext } from './GraphProvider';
const GraphVisualization = () => {
  const {
    vertexes,
    setVertexes,
    lines,
    setLines,
    arrows,
    setArrows,
    colorPickerVisible,
    setColorPickerVisible,
    vertexInfoVisible,
    setVertexInfoVisible,
    setAlgorithmVisible,
    setMinimumSpanningTree,
    setBfsTraversalSteps,
    setDfsTraversalSteps,
    setShortestPath,
    setBfsTraversal,
    setDfsTraversal,
    setDistances,
    setPrevious,
    setVertexNameDialogVisible,
    stageSize,
    setStageSize,
    setShowWeightDialog,
    currentColor,
    startVertexId,
    setStartVertexId,
    activeButton,
    setActiveButton,
    setIsDraggable
  } = useContext(GraphContext);

  const [settingsSave,setSettingsSave]=useState(false);

  const nextIdVertexes = useRef(Math.max(...vertexes.map(vertex => vertex.id)) + 1);
  const nextIdArrows = useRef(arrows.length);
  const nextIdLines = useRef(lines.length);
  const currentVertexId = useRef([]);
  const stageRef = useRef(null);

  //Buttons
  const buttonClick = (buttonName) => {
    handleButtonClick(buttonName, setActiveButton, activeButton, setIsDraggable, setStartVertexId, setVertexInfoVisible,
      setShortestPath, setDistances, setPrevious, setAlgorithmVisible, setMinimumSpanningTree, setDfsTraversal, setBfsTraversal, setBfsTraversalSteps,
      setDfsTraversalSteps)
  };

  //Edge
  const addEdge = (vertexId) => {
    handleAddingEdge(vertexId, activeButton, startVertexId, setStartVertexId, lines, setLines, arrows, setArrows, nextIdLines,
      nextIdArrows, setShowWeightDialog);
  };

  //Vertex
  const addVertex = (e) => {
    handleAddingVertex(e, activeButton, setVertexes, vertexes, nextIdVertexes, currentColor, setVertexNameDialogVisible);
  };

  const vertexDragEnd = (e, index) => {
    handleVertexDragEnd(e, index, vertexes, setVertexes);
  };

  //Delete
  const deleteComponent = (componentId, type) => {
    handleDeleteComponent(componentId, type, activeButton, vertexes, setVertexes, setLines, lines, setArrows, arrows)
  };

  //Canvas size
  const algorithmInfoOffset = () => {
    let offsetX = 0;
    if (activeButton === "book") {
      const vertexesWithOffset = vertexes.filter(vertex => {
        if (vertex.x < 100) {
          offsetX = 550;
          return true;
        } else if (vertex.x < 200) {
          offsetX = 450;
          return true;
        } else if (vertex.x < 400) {
          offsetX = 350;
          return true;
        }
        return false;
      });

      if (vertexesWithOffset.length > 0) {
        offsetX -= 100;
      }
    }
    return offsetX;
  };
  const offsetX = algorithmInfoOffset();

  const calculateStageSize = () => {
    let maxX = 0;
    let maxY = 0;

    vertexes.forEach(vertex => {
      const adjustedX = vertex.x + offsetX;
      if (adjustedX > maxX) {
        maxX = adjustedX;
      }
      if (vertex.y > maxY) {
        maxY = vertex.y;
      }
    });

    const padding = 50;
    const newWidth = maxX + padding;
    const newHeight = maxY + padding;

    const width = Math.max(newWidth, stageSize.width);
    const height = Math.max(newHeight, stageSize.height);
    setSettingsSave(false);

    return { width, height };
  };

  useEffect(() => {
    const newSize = calculateStageSize();
    setStageSize(newSize);
  }, [vertexes, activeButton,settingsSave]);

  return (
    <>
      <ButtonGroup
        stageRef={stageRef}
        onButtonClick={buttonClick}
      />
      <ColorPickerDialog
        onButtonClick={buttonClick}
        visible={colorPickerVisible}
        onHide={() => setColorPickerVisible(false)}
      />
      <SettingsComponent calculateStageSize={calculateStageSize} setSettingsSave={setSettingsSave}/>
      <AlgorithmDialog />
      <WeightDialog />
      <VertexNameDialog />
      <div style={{ border: '2px solid black', width: stageSize.width, height: stageSize.height }}>
        <Stage width={stageSize.width} height={stageSize.height} onClick={addVertex} ref={stageRef}>
          <Layer>
            {lines.map((line) => (
              <LineComponent
                key={line.id}
                lineId={line.id}
                text={line.weight}
                endVertexId={line.endId}
                startVertexId={line.startId}
                offsetX={offsetX}
                handleDeleteComponent={deleteComponent}
              />
            ))}
          </Layer>
          <Layer>
            {arrows.map((arrow) => (
              <ArrowComponent
                key={arrow.id}
                arrowId={arrow.id}
                text={arrow.weight}
                endVertexId={arrow.endId}
                startVertexId={arrow.startId}
                offsetX={offsetX}
                handleDeleteComponent={deleteComponent}
              />
            ))}
          </Layer>
          <Layer>
            {vertexes.map((vertex, index) => (
              <React.Fragment key={index}>
                <VertexComponent
                  x={vertex.x}
                  y={vertex.y}
                  id={vertex.id}
                  name={vertex.text}
                  color={vertex.color}
                  offsetX={offsetX}
                  currentVertexId={currentVertexId}
                  onHandleAddingEdge={addEdge}
                  onHandleDeleteComponent={deleteComponent}
                  onHandleVertexDragEnd={(e) => vertexDragEnd(e, index)}
                />
              </React.Fragment>
            ))}
          </Layer>
          <Layer>
            <AlgorithmInfo />
          </Layer>
        </Stage>
        {vertexInfoVisible && (
          <EditComponent />
        )}
      </div>
    </>
  );
};

export default GraphVisualization;
