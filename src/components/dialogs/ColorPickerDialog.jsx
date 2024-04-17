import React, { useContext, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { ColorPicker } from 'primereact/colorpicker';
import { GraphContext } from '../../GraphProvider';
import { handleColorChangeAll, handleSetNewColor } from '../../handlers';

const ColorPickerDialog = ({ visible, onHide, onButtonClick }) => {
  const [color, setColor] = useState(null);
  const {
    setCurrentColor,
    vertexes,
    setVertexes
  } = useContext(GraphContext)

  const handleChangeColor = (event) => {
    setColor(event.value);
  };

  const changeColorAll = () => {
    handleColorChangeAll(vertexes, setVertexes, color);
    onHide();
  };

  const setNewColor = () => {
    handleSetNewColor(setCurrentColor, color);
    onHide();
  }

  return (
    <Dialog visible={visible} onHide={onHide} header="Zmeniť farbu">
      <div className="p-grid p-fluid">
        <div>
          <ColorPicker value={color} onChange={handleChangeColor} />
        </div>
        <div style={{ marginTop: '5px' }}>
          <Button label="Zmeniť farbu všetkým" icon="pi pi-check" onClick={() => {
            changeColorAll();
            setNewColor();
            onButtonClick(null);
          }}
          />
        </div>
        <div style={{ marginTop: '5px' }}>
          <Button label="Zmeniť farbu kliknutého vrcholu" icon="pi pi-check" onClick={setNewColor} />
        </div>
      </div>
    </Dialog>
  );
};

export default ColorPickerDialog;