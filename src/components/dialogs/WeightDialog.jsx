import React, { useContext, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button'
import { GraphContext } from '../../GraphProvider';
import { handleSaveWeight } from '../../handlers';

const WeightDialog = ({ onHide, onSave }) => {
  const {
    setShowWeightDialog,
    showWeightDialog,
    lines,
    arrows,
    setLines,
    setArrows,
    activeButton
  } = useContext(GraphContext)
  const [weight, setWeight] = useState('');

  const handleSave = () => {
    const trimmedWeight = weight.trim();

    if (trimmedWeight === '') {
      setShowWeightDialog(false);
      return;
    }

    const parsedWeight = parseFloat(trimmedWeight);

    if (!isNaN(parsedWeight)) {
      handleSaveWeight(parsedWeight, lines, arrows, setLines, setArrows, activeButton);
    } else {
      return;
    }

    setWeight('');
    setShowWeightDialog(false);
  };

  return (
    <Dialog
      visible={showWeightDialog}
      onHide={() => { setShowWeightDialog(false) }}
      header="Zadajte váhu hrany"
      modal
      style={{ width: '300px' }}
      footer={
        <div>
          <Button label="Uložiť" onClick={() => {
            handleSave();
            setShowWeightDialog(false);
          }} />
          <Button label="Zrušiť" onClick={() => { setShowWeightDialog(false) }} />
        </div>
      }
    >
      <div className="p-fluid">
        <div className="p-field">
          <label htmlFor="weight">Váha</label>
          <InputText id="weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
        </div>
      </div>
    </Dialog>
  );
};

export default WeightDialog;
