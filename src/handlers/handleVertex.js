export const handleAddingVertex = (e, activeButton, setVertexes, vertexes, nextIdVertexes, currentColor, setVertexNameDialogVisible) => {
    if (activeButton === 'vertex' && e.evt.button === 0) {
        const { x, y } = e.target.getStage().getPointerPosition();
        setVertexes([...vertexes, { id: nextIdVertexes.current++, x, y, color: currentColor, text: (nextIdVertexes.current - 1).toString() }]);
        setVertexNameDialogVisible(true);
    }
};

export const handleVertexDragEnd = (e, index, vertexes, setVertexes) => {
    const updatedVertexes = [...vertexes];
    updatedVertexes[index] = { ...updatedVertexes[index], x: e.target.x(), y: e.target.y() };
    setVertexes(updatedVertexes);
};

export const handleSetVertexName = (name, vertexes, setVertexes,setVertexNameDialogVisible) => {
    const lastVertexIndex = vertexes.length - 1;

    if (lastVertexIndex >= 0) {
        const updatedVertexes = [...vertexes];
        updatedVertexes[lastVertexIndex].text = name;
        setVertexes(updatedVertexes);
    }
};