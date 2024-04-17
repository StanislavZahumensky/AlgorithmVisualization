import React from 'react';
import { GraphProvider } from './GraphProvider';
import AlgorithmVisualization from './AlgorithmVisualization';

const App = () => {
  return (
    <GraphProvider>
      <AlgorithmVisualization />
    </GraphProvider>
  );
};

export default App;
