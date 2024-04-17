export const handleUpdateVertexName = (vertexId, name, vertexes, setVertexes) => {
    const updatedVertexes = vertexes.map(vertex => {
        if (vertex.id === vertexId) {
          return { ...vertex, text: name };
        }
        return vertex;
      });
      setVertexes(updatedVertexes);
};

export const handleUpdateLinesWeight = (lineId, newWeight, lines, setLines) => {
    const updatedLines = lines.map(line => {
        if (line.id === lineId) {
            return { ...line, weight: newWeight };
        }
        return line;
    });
    setLines(updatedLines);
};

export const handleUpdateArrowsWeight = (arrowId, newWeight, arrows, setArrows) => {
    const updatedArrows = arrows.map(arrow => {
        if (arrow.id === arrowId) {
            return { ...arrow, weight: newWeight };
        }
        return arrow;
    });
    setArrows(updatedArrows);
};