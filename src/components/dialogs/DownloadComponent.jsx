import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

const DownloadComponent = ({ stageRef, vertexes, lines, arrows }) => {
  const [visible, setVisible] = useState(false);
  const [downloadName, setDownloadName] = useState('graph');

  const exportAsCSV = () => {
    const vertexesCSV = vertexes.map(vertex => `${vertex.id},${vertex.x},${vertex.y},${vertex.color},${vertex.text}`).join('\n');
    const linesCSV = lines.map(line => `${line.id},${line.startId},${line.endId},${line.weight},${line.color}`).join('\n');
    const arrowsCSV = arrows.map(arrow => `${arrow.id},${arrow.startId},${arrow.endId},${arrow.weight},${arrow.color}`).join('\n');

    const filteredVertexesCSV = vertexesCSV.trim() !== '' ? `Vertexes\nid,x,y,color,text\n${vertexesCSV}` : '';
    const filteredLinesCSV = linesCSV.trim() !== '' ? `\nLines\nid,startId,endId,weight,color\n${linesCSV}` : '';
    const filteredArrowsCSV = arrowsCSV.trim() !== '' ? `\nArrows\nid,startId,endId,weight,color\n${arrowsCSV}` : '';

    const csvContent = `${filteredVertexesCSV}${filteredLinesCSV}${filteredArrowsCSV}`;

    downloadFile(csvContent, `${downloadName}.csv`);
};


  const exportAsXML = () => {
    const vertexesXML = vertexes.map(vertex => `    <Vertex id="${vertex.id}" x="${vertex.x}" y="${vertex.y}" color="${vertex.color}" text="${vertex.text}" />\n`).join('');
    const linesXML = lines.map(line => `    <Line id="${line.id}" startId="${line.startId}" endId="${line.endId}" weight="${line.weight}" color="${line.color}" />\n`).join('');
    const arrowsXML = arrows.map(arrow => `    <Arrow id="${arrow.id}" startId="${arrow.startId}" endId="${arrow.endId}" weight="${arrow.weight}" />\n`).join('');

    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<GraphData>
  <Vertexes>
${vertexesXML}
  </Vertexes>
  <Lines>
${linesXML}
  </Lines>
  <Arrows>
${arrowsXML}
  </Arrows>
</GraphData>`;

    downloadFile(xmlContent, `${downloadName}.xml`);
  };



  const handleDownload = () => {
    const tempCanvas = document.createElement('canvas');
    const tempContext = tempCanvas.getContext('2d');

    tempCanvas.width = stageRef.current.width();
    tempCanvas.height = stageRef.current.height();

    tempContext.fillStyle = 'white';
    tempContext.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

    tempContext.drawImage(stageRef.current.toCanvas(), 0, 0);

    const dataURL = tempCanvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = dataURL;
    link.download = `${downloadName}.png`;

    link.click();
  };

  const downloadFile = (content, filename) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  return (
    <>
      <Button icon="pi pi-download" onClick={() => setVisible(true)} tooltip="Export png, csv alebo xml"/>
      <Dialog header="Stiahnuť" visible={visible} style={{ textAlign: 'center' }} onHide={() => setVisible(false)}>
        <div className="card flex flex-wrap gap-2 p-fluid">
          <div className="p-col">
            <label htmlFor="choose-file-name" className="font-bold block mb-2" >Názov súboru</label>
            <InputText inputid="choose-file-name" value={downloadName} onChange={(e) => setDownloadName(e.target.value)} />
          </div>
          <div className="flex-auto" style={{ marginTop: '10px' }}>
            <Button label="Stiahnuť png" icon="pi pi-download" onClick={handleDownload} />
          </div>
          <div className="flex-auto" style={{ marginTop: '10px' }}>
            <Button label="Stiahnuť ako CSV" icon="pi pi-download" onClick={exportAsCSV} />
          </div>
          <div className="flex-auto" style={{ marginTop: '10px' }}>
            <Button label="Stiahnuť ako XML" icon="pi pi-download" onClick={exportAsXML} />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default DownloadComponent;
