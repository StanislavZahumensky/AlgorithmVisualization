import React, { useContext, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { GraphContext } from '../../GraphProvider';
import { handleSetVertexName } from '../../handlers';

const VertexNameDialog = () => {
  const {
    vertexes,
    setVertexes,
    setVertexNameDialogVisible,
    vertexNameDialogVisible
  } = useContext(GraphContext);
  const [text, setText] = useState('');

  const handleSave = () => {
    handleSetVertexName(text, vertexes, setVertexes);
    setText('');
  };

  return (
    <Dialog
      visible={vertexNameDialogVisible}
      onHide={() => setVertexNameDialogVisible(false)}
      header="Zadajte názov vrcholu"
      modal
      style={{ width: '300px' }}
      footer={
        <div>
          <Button label="Uložiť" onClick={() => {
            handleSave();
            setVertexNameDialogVisible(false);
          }} />
          <Button label="Zrušiť" onClick={() => setVertexNameDialogVisible(false)} />
        </div>
      }
    >
      <div className="p-fluid">
        <div className="p-field">
          <label htmlFor="vertexText">Názov</label>
          <InputText id="vertexText" value={text} onChange={(e) => setText(e.target.value)} />
        </div>
      </div>
    </Dialog>
  );
};

export default VertexNameDialog;
