export const handleDeleteComponent = (componentId, type, activeButton, vertexes, setVertexes, setLines, lines, setArrows, arrows) => {
    if (activeButton === 'eraser') {
        if (type === 'vertex') {
            const updatedVertexes = vertexes.filter(vertex => vertex.id !== componentId);
            setVertexes(updatedVertexes);
            setLines(lines.filter(line => line.startId !== componentId && line.endId !== componentId));
            setArrows(arrows.filter(arrow => arrow.startId !== componentId && arrow.endId !== componentId));
        }
        else if (type === 'line') {
            setLines(lines.filter(line => line.id !== componentId));
        }
        else if (type === 'arrow') {
            setArrows(arrows.filter(arrow => arrow.id !== componentId));
        }
    }
};

export const handleDeleteAll = (setActiveButton, setVertexes, setLines, setArrows,setStartVertexId,setIsDraggable,setCurrentColor) => {
    setVertexes([]);
    setLines([]);
    setArrows([]);
    setActiveButton(null);
    setStartVertexId(null);
    setIsDraggable(false);
    setCurrentColor('#5f0049');
};