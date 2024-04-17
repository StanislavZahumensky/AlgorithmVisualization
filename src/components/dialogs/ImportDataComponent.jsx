import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';

const ImportDataComponent = ({ setVertexes, setLines, setArrows }) => {
    const [visible, setVisible] = useState(false);

    const handleImport = (event) => {
        const file = event.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            const content = reader.result;
            if (file.name.endsWith('.csv')) {
                handleCSVImport(content);
            } else if (file.name.endsWith('.xml')) {
                handleXMLImport(content);
            }
            setVisible(false);
        };
        reader.readAsText(file);
    };

    const handleCSVImport = (content) => {
        const rows = content.trim().split('\n');
        let section = '';
        const data = rows.reduce((acc, row) => {
            const rowData = row.trim().split(',');
            if (rowData.length === 1 && rowData[0] === '') {
                return acc;
            } else if (rowData[0] === 'Vertexes' || rowData[0] === 'Lines' || rowData[0] === 'Arrows') {
                section = rowData[0].toLowerCase();
            } else {
                if (!section) {
                    return acc;
                }
                if (!acc[section]) {
                    acc[section] = [];
                }
                acc[section].push(rowData);
            }
            return acc;
        }, { vertexes: [], lines: [], arrows: [] });

        const vertexes = data.vertexes.slice(1).map(item => ({
            id: parseInt(item[0]),
            x: parseInt(item[1]),
            y: parseInt(item[2]),
            color: item[3],
            text: item[4]
        }));

        const linesData = data.lines.slice(1).map(item => ({
            id: parseInt(item[0]),
            startId: parseInt(item[1]),
            endId: parseInt(item[2]),
            weight: parseFloat(item[3]),
            color: item[4]
        }));

        const arrowsData = data.arrows.slice(1).map(item => ({
            id: parseInt(item[0]),
            startId: parseInt(item[1]),
            endId: parseInt(item[2]),
            weight: parseFloat(item[3]),
            color: item[4]
        }));
        setVertexes(vertexes);
        setLines(linesData);
        setArrows(arrowsData);
    };

    const handleXMLImport = (content) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(content, 'text/xml');
        const vertexes = Array.from(xmlDoc.querySelectorAll('Vertex')).map(vertex => {
            const obj = {};
            Array.from(vertex.attributes).forEach(attr => {
                const attributeName = attr.name;
                let attributeValue = attr.value;
                if (attributeName === 'id' || attributeName === 'x' || attributeName === 'y') {
                    attributeValue = parseInt(attributeValue);
                }
                obj[attributeName] = attributeValue;
            });
            return obj;
        });
        const lines = Array.from(xmlDoc.querySelectorAll('Line')).map(line => {
            const obj = {};
            Array.from(line.attributes).forEach(attr => {
                const attributeName = attr.name;
                let attributeValue = attr.value;
                if (attributeName === 'id' || attributeName === 'startId' || attributeName === 'endId') {
                    attributeValue = parseInt(attributeValue);
                } else if (attributeName === 'weight') {
                    attributeValue = parseFloat(attributeValue);
                }
                obj[attributeName] = attributeValue;
            });
            return obj;
        });
        const arrows = Array.from(xmlDoc.querySelectorAll('Arrow')).map(arrow => {
            const obj = {};
            Array.from(arrow.attributes).forEach(attr => {
                const attributeName = attr.name;
                let attributeValue = attr.value;
                if (attributeName === 'id' || attributeName === 'startId' || attributeName === 'endId') {
                    attributeValue = parseInt(attributeValue);
                } else if (attributeName === 'weight') {
                    attributeValue = parseFloat(attributeValue);
                }
                obj[attributeName] = attributeValue;
            });
            return obj;
        });

        setVertexes(vertexes);
        setLines(lines);
        setArrows(arrows);
    };

    return (
        <>
            <Button icon="pi pi-upload" onClick={() => setVisible(true)} tooltip="Import csv alebo xml" />
            <Dialog header="Import súboru" visible={visible} style={{ width: '250px' }} onHide={() => setVisible(false)}>
                <div className="p-grid p-dir-col">
                    <div className="p-col" >
                        <FileUpload chooseLabel="Vyberte súbor" uploadLabel="Import"
                            mode="basic" accept=".csv,.xml" maxFileSize={1000000} customUpload={true} onSelect={handleImport} />
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default ImportDataComponent;
