import React, { createContext, useState } from 'react';

const GraphContext = createContext();

const GraphProvider = ({ children }) => {
    const [vertexes, setVertexes] = useState([
        { id: 0, x: 500, y: 404, color: '#5f0049', text: 'A' },
        { id: 1, x: 800, y: 148, color: '#5f0049', text: 'B' },
        { id: 2, x: 800, y: 582, color: '#5f0049', text: 'C' },
        { id: 3, x: 1100, y: 147, color: '#5f0049', text: 'D' },
        { id: 4, x: 1100, y: 585, color: '#5f0049', text: 'E' },
        { id: 5, x: 1360, y: 352, color: '#5f0049', text: 'F' }
    ]);

    const [lines, setLines] = useState([
        { id: 0, startId: 0, endId: 1, weight: 2, color: 'black' },
        { id: 1, startId: 1, endId: 3, weight: 4, color: 'black' },
        { id: 2, startId: 3, endId: 5, weight: 2, color: 'black' },
        { id: 3, startId: 5, endId: 4, weight: 3, color: 'black' },
        { id: 4, startId: 4, endId: 2, weight: 6, color: 'black' },
        { id: 5, startId: 2, endId: 0, weight: 3, color: 'black' },
        { id: 6, startId: 1, endId: 2, weight: 1, color: 'black' },
        { id: 7, startId: 4, endId: 3, weight: 5, color: 'black' }
    ]);

    const [arrows, setArrows] = useState([]);

    const [colorPickerVisible, setColorPickerVisible] = useState(false);
    const [vertexInfoVisible, setVertexInfoVisible] = useState(false);
    const [algorithmVisible, setAlgorithmVisible] = useState(false);
    const [settingsVisible, setSettingsVisible] = useState(false);

    const [minimumSpanningTree, setMinimumSpanningTree] = useState([]);
    const [bfsTraversalSteps, setBfsTraversalSteps] = useState([]);
    const [dfsTraversalSteps, setDfsTraversalSteps] = useState([]);
    const [shortestPath, setShortestPath] = useState([]);
    const [bfsTraversal, setBfsTraversal] = useState([]);
    const [dfsTraversal, setDfsTraversal] = useState([]);
    const [distances, setDistances] = useState([]);
    const [previous, setPrevious] = useState([]);

    const [vertexNameDialogVisible, setVertexNameDialogVisible] = useState(false);
    const [stageSize, setStageSize] = useState({ width: 1890, height: 900 });
    const [showWeightDialog, setShowWeightDialog] = useState(false);
    const [currentColor, setCurrentColor] = useState('#5f0049');
    const [startVertexId, setStartVertexId] = useState(null);
    const [activeButton, setActiveButton] = useState(null);
    const [isDraggable, setIsDraggable] = useState(false);
    const [vertexSize, setVertexSize] = useState(25);

    return (
        <GraphContext.Provider
            value={{
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
                algorithmVisible,
                setAlgorithmVisible,
                settingsVisible,
                setSettingsVisible,
                minimumSpanningTree,
                setMinimumSpanningTree,
                bfsTraversalSteps,
                setBfsTraversalSteps,
                dfsTraversalSteps,
                setDfsTraversalSteps,
                shortestPath,
                setShortestPath,
                bfsTraversal,
                setBfsTraversal,
                dfsTraversal,
                setDfsTraversal,
                distances,
                setDistances,
                previous,
                setPrevious,
                vertexNameDialogVisible,
                setVertexNameDialogVisible,
                stageSize,
                setStageSize,
                showWeightDialog,
                setShowWeightDialog,
                currentColor,
                setCurrentColor,
                startVertexId,
                setStartVertexId,
                activeButton,
                setActiveButton,
                isDraggable,
                setIsDraggable,
                vertexSize,
                setVertexSize
            }}
        >
            {children}
        </GraphContext.Provider>
    );
};

export { GraphContext, GraphProvider };
