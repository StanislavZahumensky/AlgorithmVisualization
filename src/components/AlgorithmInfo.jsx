import React,{useContext} from 'react';
import { Group, Text } from 'react-konva';
import { GraphContext } from '../GraphProvider';

const AlgorithmInfo = () => {
  const textX = 10;
  let textY = 10;
  const lineHeight = 20;

  const{
    shortestPath, 
    distances, 
    previous, 
    vertexes, 
    minimumSpanningTree, 
    bfsTraversalSteps,
     dfsTraversalSteps
  }= useContext(GraphContext)
  

  return (
    <Group>
      {shortestPath.length > 0 && (
        <>
          <Text
            fontSize={15}
            x={textX}
            y={textY}
            text={`Najkratšia cesta:`}
            fontStyle="bold"
          />
          <Text
            fontSize={15}
            x={textX + 120}
            y={textY}
            text={shortestPath.map(vertexId => vertexes.find(vertex => vertex.id === vertexId)?.text).join(' → ')}
          />
          {previous && distances && vertexes.map((vertex, index) => {
            textY += lineHeight;
            const vertexId = vertex.id;
            const prevVertexText = previous[vertexId] !== null ? vertexes.find(v => v.id === previous[vertexId])?.text : '';
            const distanceText = distances[vertexId] !== Infinity ? distances[vertexId] : "";
            return (
              <Text
                fontSize={15}
                key={index}
                x={textX}
                y={textY+20}
                text={`Hrana ${prevVertexText} → ${vertex.text}: Vzdialenosť  - ${distanceText}`}
              />
            );
          })}
        </>
      )}
      {minimumSpanningTree.length > 0 && (
        <>
          <Text
            fontSize={15}
            x={textX}
            y={textY + lineHeight}
            text={`Minimálna kostra grafu: `}
            fontStyle="bold"
          />
          {minimumSpanningTree.map((edge, index) => {
            textY += lineHeight;
            const [startVertex, endVertex, weight] = edge;
            return (
              <Text
                fontSize={15}
                key={index}
                x={textX}
                y={textY + 20}
                text={`Hrana ${vertexes.find(vertex => vertex.id === startVertex)?.text} → ${vertexes.find(vertex => vertex.id === endVertex)?.text}, Váha: ${weight}`}
              />
            );
          })}
        </>
      )}
      {bfsTraversalSteps.length > 0 && (
        <>
          <Text
            fontSize={15}
            x={textX}
            y={textY + lineHeight}
            text={`Kroky prehľadávania do šírky: `}
            fontStyle="bold"
          />
          {bfsTraversalSteps.map((levelNodes, index) => (
            <Text
              key={index}
              fontSize={15}
              x={textX}
              y={textY + (index + 1) * lineHeight + 20}
              text={`Krok ${index + 1}: ${levelNodes.reduce((acc, nodeId, i) => acc + (i % 2 === 0 ? (i !== 0 ? ',' : '') + vertexes.find(vertex => vertex.id === nodeId)?.text : '→' + vertexes.find(vertex => vertex.id === nodeId)?.text), '')}`}
            />
          ))}
        </>
      )}
      {dfsTraversalSteps.length > 0 && (
        <>
          <Text
            fontSize={15}
            x={textX}
            y={textY + lineHeight}
            text={`Kroky prehľadávania do hĺbky: `}
            fontStyle="bold"
          />
          {dfsTraversalSteps.map((step, index) => (
            <Text
              key={index}
              fontSize={15}
              x={textX}
              y={textY + (index + 1) * lineHeight + 20}
              text={`Krok ${index + 1}: ${step
                .map(vertexId => vertexes.find(vertex => vertex.id === vertexId)?.text)
                .join(' → ')}` 
              }
            />
          ))}
        </>
      )}



    </Group>
  );
};

export default AlgorithmInfo;
