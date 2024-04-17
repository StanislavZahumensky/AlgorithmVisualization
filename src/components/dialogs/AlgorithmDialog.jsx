import React, { useState, useContext } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { AlgorithmExplanation } from '../index';
import { dijkstrasAlgorithm, kruskalsAlgorithm, primsAlgorithm, bfsAlgorithm, dfsAlgorithm } from '../../algorithms';
import { handleCreateAdjList } from '../../handlers';
import { GraphContext } from '../../GraphProvider';
const AlgorithmDialog = () => {
    const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
    const [startNodeText, setStartNodeText] = useState('');
    const [endNodeText, setEndNodeText] = useState('');
    const [showExplanation, setShowExplanation] = useState(false);

    const {
        lines,
        arrows,
        vertexes,
        setPrevious,
        setDistances,
        setDfsTraversal,
        setShortestPath,
        setBfsTraversal,
        setDfsTraversalSteps,
        setBfsTraversalSteps,
        setMinimumSpanningTree,
        setAlgorithmVisible,
        algorithmVisible
    } = useContext(GraphContext);

    const algorithmsUndirectedUnweighted = [
        { label: "Kurksalov Algoritmus", value: 'Kruskals' },
        { label: "Primov Algoritmus", value: 'Prims' },
        { label: "Prehľadávanie do šírky", value: 'BFS' },
        { label: "Prehľadávanie do hĺbky", value: 'DFS' }
    ];

    const algorithmsUndirectedWeighted = [
        { label: "Dijkstrov Algoritmus", value: 'Dijkstras' },
        { label: "Kurksalov Algoritmus", value: 'Kruskals' },
        { label: "Primov Algoritmus", value: 'Prims' },
        { label: "Prehľadávanie do šírky", value: 'BFS' },
        { label: "Prehľadávanie do hĺbky", value: 'DFS' }
    ];

    const algorithmsDirectedUnweighted = [
        { label: "Prehľadávanie do šírky", value: 'BFS' },
        { label: "Prehľadávanie do hĺbky", value: 'DFS' }
    ];

    const algorithmsDirectedWeighted = [
        { label: "Dijkstrov Algoritmus", value: 'Dijkstras' },
        { label: "Prehľadávanie do šírky", value: 'BFS' },
        { label: "Prehľadávanie do hĺbky", value: 'DFS' }
    ];

    const handleAlgorithmChange = (e) => {
        setSelectedAlgorithm(e.value);
    };

    const handleSetStartNode = (e) => {
        setStartNodeText(e.target.value);
    };

    function findVertexIdByText(text) {
        const vertex = vertexes.find(vertex => vertex.text === text);
        return vertex ? vertex.id : null;
    }

    const handleRunAlgorithm = () => {
        setMinimumSpanningTree([]);
        setBfsTraversalSteps([]);
        setDfsTraversalSteps([]);
        setBfsTraversal([]);
        setDfsTraversal([]);
        setShortestPath([]);
        setDistances([]);
        setPrevious([]);

        let adjList;
        if (selectedAlgorithm === 'Dijkstras') {
            adjList = handleCreateAdjList(vertexes, lines, arrows);
            if (adjList) {
                const startNodeId = findVertexIdByText(startNodeText);
                const endNodeId = findVertexIdByText(endNodeText);
                if (startNodeId !== null && endNodeId !== null) {
                    const { distancesResult, previousResult, shortestPathResult } = dijkstrasAlgorithm(adjList, startNodeId, endNodeId);
                    setShortestPath(shortestPathResult);
                    setDistances(distancesResult);
                    setPrevious(previousResult);
                }
            }
        }
        else if (selectedAlgorithm === 'Kruskals') {
            const missingEdges = vertexes.some(vertex => !lines.some(line => line.startId === vertex.id || line.endId === vertex.id));
            if (missingEdges) {
                return null;
            }
            adjList = handleCreateAdjList(vertexes, lines, arrows);
            if (adjList) {
                const minimumSpanningTree = kruskalsAlgorithm(adjList);
                setMinimumSpanningTree(minimumSpanningTree);
            }
        }
        else if (selectedAlgorithm === 'Prims') {
            adjList = handleCreateAdjList(vertexes, lines, arrows);
            if (adjList) {
                const minimumSpanningTree = primsAlgorithm(adjList);
                setMinimumSpanningTree(minimumSpanningTree);
            }
        }
        else if (selectedAlgorithm === 'BFS') {
            const startNode = findVertexIdByText(startNodeText);
            if (startNode !== null) {
                const adjList = handleCreateAdjList(vertexes, lines, arrows);
                if (adjList) {
                    const bfsResult = bfsAlgorithm(adjList, startNode);
                    setBfsTraversal(bfsResult.edges);
                    setBfsTraversalSteps(bfsResult.steps);
                }
            }
        }
        else if (selectedAlgorithm === 'DFS') {
            const startNode = findVertexIdByText(startNodeText);
            if (startNode !== null) {
                const adjList = handleCreateAdjList(vertexes, lines, arrows);
                if (adjList) {
                    const dfsResult = dfsAlgorithm(adjList, startNode);
                    setDfsTraversal(dfsResult.edges);
                    setDfsTraversalSteps(dfsResult.steps);
                }
            }
        }
    };

    function checkDropdownOptions(lines, arrows) {
        const condition1 = lines.length > 0 && lines.every(line => line.weight !== null) && arrows.length <= 0;
        const condition2 = lines.length > 0 && lines.some(line => line.weight === null) && arrows.length <= 0;
        const condition3 = arrows.length > 0 && arrows.every(arrow => arrow.weight !== null) && lines.length <= 0;
        const condition4 = arrows.length > 0 && arrows.some(arrow => arrow.weight === null) && lines.length <= 0;

        return {
            condition1,
            condition2,
            condition3,
            condition4
        };
    }

    const dropdownOptions = checkDropdownOptions(lines, arrows);

    return (
        <div>
            <Dialog visible={algorithmVisible} onHide={() => setAlgorithmVisible(false)} header="Algoritmy">
                <AlgorithmExplanation visible={showExplanation} onHide={() => setShowExplanation(false)} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p>{(dropdownOptions.condition1 || dropdownOptions.condition2 || dropdownOptions.condition3 || dropdownOptions.condition4) ? "Vyber Algoritmus" : "Nejde zvoliť algoritmus pokiaľ máš orientované aj neorientované hrany.  "}</p>
                    <div>
                        <Button onClick={() => setShowExplanation(true)} icon='pi pi-info-circle' className="p-button-rounded" />
                    </div>
                </div>
                <div className="card flex flex-wrap gap-3 p-fluid">
                    <div className="p-col-6" style={{ marginTop: '10px' }}>
                        {dropdownOptions.condition2 && <Dropdown value={selectedAlgorithm} options={algorithmsUndirectedUnweighted} onChange={handleAlgorithmChange} placeholder="Vyber Algoritmus" />}
                        {dropdownOptions.condition1 && <Dropdown value={selectedAlgorithm} options={algorithmsUndirectedWeighted} onChange={handleAlgorithmChange} placeholder="Vyber Algoritmus" />}
                        {dropdownOptions.condition4 && <Dropdown value={selectedAlgorithm} options={algorithmsDirectedUnweighted} onChange={handleAlgorithmChange} placeholder="Vyber Algoritmus" />}
                        {dropdownOptions.condition3 && <Dropdown value={selectedAlgorithm} options={algorithmsDirectedWeighted} onChange={handleAlgorithmChange} placeholder="Vyber Algoritmus" />}
                    </div>
                </div>
                {selectedAlgorithm === 'Dijkstras' && (
                    <div className="card flex flex-wrap gap-3 p-fluid">
                        <div className="flex-auto" style={{ marginTop: '10px' }}>
                            <label htmlFor="starting-node" className="font-bold block mb-2">Začiatočný vrchol</label>
                            <InputText inputid="starting-node" value={startNodeText} onChange={(e) => setStartNodeText(e.target.value)} />
                        </div>
                        <div className="flex-auto" style={{ marginTop: '10px' }}>
                            <label htmlFor="ending-node" className="font-bold block mb-2">Koncový Vrchol</label>
                            <InputText inputid="ending-node" value={endNodeText} onChange={(e) => setEndNodeText(e.target.value)} />
                        </div>
                    </div>
                )}
                {(selectedAlgorithm === 'BFS' || selectedAlgorithm === 'DFS') && (
                    <div className="p-col-6" style={{ marginTop: '10px' }}>
                        <InputText inputid="start-node" value={startNodeText} onChange={handleSetStartNode} placeholder="Začiatočný vrchol" />
                    </div>
                )}
                <div className="p-grid p-fluid">
                    <div className="p-col-6" style={{ marginTop: '10px' }}>
                        <Button label="Spustiť algoritmus" onClick={() => {
                            handleRunAlgorithm();
                            setSelectedAlgorithm();
                            setAlgorithmVisible(false);
                        }} />
                    </div>
                </div>
            </Dialog>
        </div>
    );
}

export default AlgorithmDialog;
