import React, { useState, useContext } from 'react';
import { DataScroller } from 'primereact/datascroller';
import { Inplace, InplaceDisplay, InplaceContent } from 'primereact/inplace';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { handleUpdateArrowsWeight, handleUpdateLinesWeight, handleUpdateVertexName } from '../handlers'
import { GraphContext } from '../GraphProvider';

import "../App.css";

const EditComponent = () => {
  const [editedText, setEditedText] = useState('');
  const [editedLineText, setEditedLineText] = useState('');
  const [editedArrowText, setEditedArrowText] = useState('');

  const {
    vertexes,
    lines,
    arrows,
    visible,
    setVertexes,
    setLines,
    setArrows
  } = useContext(GraphContext)

  const handleTextChange = (e, id) => {
    setEditedText(e.target.value);
  };

  const handleSaveText = (vertexId) => {
    if (editedText.trim() !== '') {
      handleUpdateVertexName(vertexId, editedText, vertexes, setVertexes);
      setEditedText('');
    }
  };

  const handleSaveWeightLines = (lineId) => {
    const floatValue = parseFloat(editedLineText.replace(',', '.'));
    if (!isNaN(floatValue)) {
      handleUpdateLinesWeight(lineId, floatValue, lines, setLines);
      setEditedLineText('');
    } else {
    }
  };

  const handleSaveWeightArrows = (arrowId) => {
    const floatValue = parseFloat(editedArrowText.replace(',', '.'));
    if (!isNaN(floatValue)) {
      handleUpdateArrowsWeight(arrowId, floatValue, arrows, setArrows);
      setEditedArrowText('');
    } else {
    }
  };


  const itemTemplate = (vertex) => {
    const connectedLines = lines.filter(line => line.startId === vertex.id || line.endId === vertex.id);
    const connectedArrows = arrows.filter(arrow => arrow.startId === vertex.id || arrow.endId === vertex.id);

    let lineCounter = 0;
    let arrowCounter = 0;

    return (
      <div>
        <div>
          <div style={{ textAlign: 'center' }}>
            <h4 >
              <Inplace closable>
                <InplaceDisplay>Názov vrcholu: {vertex.text}</InplaceDisplay>
                <InplaceContent>
                  <InputText value={editedText} onChange={handleTextChange} autoFocus />
                  <Button onClick={() => handleSaveText(vertex.id)} icon="pi pi-check" style={{ marginLeft: '5px' }} />
                </InplaceContent>
              </Inplace>
            </h4>
          </div>

        </div>
        <div className="lines-arrows-container">
          <div className="lines-container">
            <div className="lines-info-item">
              <h4>Neorientované hrany</h4>
              {connectedLines.map((line, index) => {
                lineCounter++;
                const startVertex = vertexes.find(v => v.id === line.startId);
                const endVertex = vertexes.find(v => v.id === line.endId);
                return (
                  <li key={index}>
                    {lineCounter}. Začiatočný vrchol: {startVertex ? startVertex.text : ''}, Koncový vrchol: {endVertex ? endVertex.text : ''},
                    <Inplace closable>
                      <InplaceDisplay>Váha hrany: {line.weight}</InplaceDisplay>
                      <InplaceContent>
                        <InputText value={editedLineText} onChange={(e) => setEditedLineText(e.target.value)} autoFocus />
                        <Button onClick={() => handleSaveWeightLines(line.id)} icon="pi pi-check" style={{ marginLeft: '5px' }} />
                      </InplaceContent>
                    </Inplace>
                  </li>
                );
              })}
            </div>
          </div>
          <div className="arrows-container">
            <div className="arrows-info-item">
              <h4>Orientované hrany</h4>
              {connectedArrows.map((arrow, index) => {
                arrowCounter++;
                const startVertex = vertexes.find(v => v.id === arrow.startId);
                const endVertex = vertexes.find(v => v.id === arrow.endId);
                return (
                  <li key={index}>
                    {arrowCounter}. Začiatočný vrchol: {startVertex ? startVertex.text : ''}, Koncový vrchol: {endVertex ? endVertex.text : ''},
                    <Inplace closable>
                      <InplaceDisplay>Váha hrany: {arrow.weight}</InplaceDisplay>
                      <InplaceContent>
                        <InputText value={editedArrowText} onChange={(e) => setEditedArrowText(e.target.value)} autoFocus />
                        <Button onClick={() => handleSaveWeightArrows(arrow.id)} icon="pi pi-check" style={{ marginLeft: '5px' }} />
                      </InplaceContent>
                    </Inplace>
                  </li>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`vertex-info ${visible ? 'visible' : 'hidden'}`}>
      <DataScroller value={vertexes} itemTemplate={itemTemplate} rows={vertexes.length} inline scrollHeight="500px" header="Posuňte sa nadol pre načítanie viacerých" />
    </div>
  );
};

export default EditComponent;
