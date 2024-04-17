import React, { useContext, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { GraphContext } from '../../GraphProvider';

const SettingsComponent = () => {
  const {
    setSettingsVisible,
    setVertexSize,
    setStageSize,
    vertexSize,
    stageSize,
    settingsVisible
  } = useContext(GraphContext);

  const [newSize, setNewSize] = useState({ width: stageSize.width, height: stageSize.height });
  const [newVertexSize, setNewVertexSize] = useState(vertexSize);

  const handleSave = () => {
    setVertexSize(newVertexSize);
    setStageSize({ width: newSize.width, height: newSize.height });
    setSettingsVisible(false);
  };

  return (
    <Dialog visible={settingsVisible} onHide={() => setSettingsVisible(false)} header="Nastavenia">
      <div className="card flex flex-wrap gap-3 p-fluid">
        <div className="flex-auto">
          <label htmlFor="window-width" className="font-bold block mb-2">Šírka plátna</label>
          <InputNumber inputid="window-width" value={newSize.width} onChange={(e) => setNewSize({ ...newSize, width: e.value })} />
        </div>
        <div className="flex-auto" style={{ marginTop: '10px' }}>
          <label htmlFor="window-height" className="font-bold block mb-2">Výška plátna</label>
          <InputNumber inputid="window-height" value={newSize.height} onChange={(e) => setNewSize({ ...newSize, height: e.value })} />
        </div>
        <div className="flex-auto" style={{ marginTop: '10px' }}>
          <label htmlFor="vertex-size" className="font-bold block mb-2">Velkosť vrcholu</label>
          <InputNumber inputid="vertex-size" value={newVertexSize} onChange={(e) => setNewVertexSize(e.value)} />
        </div>
      </div>
      <div className="p-grid p-fluid">
        <div className="p-col-6" style={{ marginTop: '10px' }}>
          <Button label="Uložiť" onClick={handleSave} />
        </div>
      </div>
    </Dialog>
  );
}

export default SettingsComponent;
