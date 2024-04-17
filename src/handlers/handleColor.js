export const handleColorChangeAll = (vertexes, setVertexes, color) => {
    const updatedVertexes = vertexes.map(vertex => ({ ...vertex, color }));
    setVertexes(updatedVertexes);
};

export const handleSetNewColor = (setCurrentColor, color) => {
    setCurrentColor(color);
};

export const handleSetSingleColor = (id, currentVertexId, activeButton, vertexes, currentColor, setVertexes) => {
    currentVertexId.current = id;
    if (activeButton === 'color-pick') {
        const updatedVertexes = vertexes.map(vertex => {
            if (vertex.id === currentVertexId.current) {
                return { ...vertex, color: currentColor };
            }
            return vertex;
        });
        setVertexes(updatedVertexes);
    }
};