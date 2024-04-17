export const handleButtonClick = (buttonName, setActiveButton, activeButton, setIsDraggable, setStartVertexId, setVertexInfoVisible,
  setShortestPath, setDistances, setPrevious, setAlgorithmVisible, setMinimumSpanningTree, setDfsTraversal, setBfsTraversal, setBfsTraversalSteps,
   setDfsTraversalSteps) => {
  setActiveButton(buttonName === activeButton ? null : buttonName);
  if (buttonName !== 'line' && buttonName !== 'arrow') {
    setStartVertexId(null);
  }
  if (buttonName === 'move') {
    setIsDraggable(prevState => !prevState);
  } else {
    setIsDraggable(false);
  }
  if (buttonName !== 'edit') {
    setVertexInfoVisible(false);
  }
  if (buttonName !== 'book') {
    setAlgorithmVisible(false);
    setMinimumSpanningTree([]);
    setShortestPath([]);
    setDistances([]);
    setPrevious([]);
    setDfsTraversal([]);
    setDfsTraversalSteps([]);
    setBfsTraversal([]);
    setBfsTraversalSteps([]);
  }
};