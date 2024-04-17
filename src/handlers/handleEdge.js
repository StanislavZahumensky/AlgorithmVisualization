export const handleSaveWeight = (newWeight, lines, arrows, setLines, setArrows, activeButton) => {
    const lastLineIndex = lines.length - 1;
    const lastArrowIndex = arrows.length - 1;

    if (activeButton === 'line') {
        const updatedLines = [...lines];
        updatedLines[lastLineIndex].weight = newWeight;
        setLines(updatedLines);
    } else if (activeButton === 'arrow') {
        const updatedArrows = [...arrows];
        updatedArrows[lastArrowIndex].weight = newWeight;
        setArrows(updatedArrows);
    }
};

export const handleAddingEdge = (vertexId, activeButton, startVertexId, setStartVertexId, lines, setLines, arrows, setArrows, nextIdLines,
    nextIdArrows, setShowWeightDialog) => {
    if (activeButton === 'line' || activeButton === 'arrow') {
        if (startVertexId !== null && startVertexId !== vertexId && !_isExistingEdge(startVertexId, vertexId, lines, arrows)) {
            if (activeButton === 'line') {
                setLines([
                    ...lines,
                    { id: nextIdLines.current++, startId: startVertexId, endId: vertexId, weight: null, color: 'black' },
                ]);
            } else {
                setArrows([
                    ...arrows,
                    { id: nextIdArrows.current++, startId: startVertexId, endId: vertexId, weight: null, color: 'black' },
                ]);
            }
            setShowWeightDialog(true);
            setStartVertexId(null);
        } else {
            setStartVertexId(vertexId);
        }
    }
};

const _isExistingEdge = (startId, endId, lines, arrows) => {
    return lines.some(line => (line.startId === startId && line.endId === endId) || (line.startId === endId && line.endId === startId)) ||
        arrows.some(arrow => (arrow.startId === startId && arrow.endId === endId) || (arrow.startId === endId && arrow.endId === startId));
};