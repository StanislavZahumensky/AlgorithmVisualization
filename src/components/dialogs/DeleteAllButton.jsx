import React, { useContext, useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { handleDeleteAll } from '../../handlers';
import { GraphContext } from '../../GraphProvider';

const DeleteAllButton = ({ active, onClick }) => {
    const [visible, setVisible] = useState(false);
    const {
        setActiveButton,
        setVertexes,
        setLines,
        setArrows,
        setStartVertexId,
        setIsDraggable,
        setCurrentColor
    } = useContext(GraphContext)

    const confirmDeleteAll = () => {
        setVisible(true);
        onClick();
    };

    const onDeleteConfirmed = () => {
        handleDeleteAll(setActiveButton, setVertexes, setLines, setArrows, setStartVertexId, setIsDraggable, setCurrentColor);
        setVisible(false);
    };

    const onHide = () => {
        setVisible(false);
    };

    return (
        <>
            <Button
                icon="pi pi-trash"
                onClick={confirmDeleteAll}
                className={active ? 'active' : ''}
                tooltip="Vymazať všetky vrcholy a hrany"
            />
            <Dialog
                visible={visible}
                onHide={onHide}
                modal
                header="Potvrdenie"
                footer={
                    <div>
                        <Button label="Nie" icon="pi pi-times" onClick={onHide} className="p-button-text" />
                        <Button label="Áno" icon="pi pi-check" onClick={onDeleteConfirmed} autoFocus />
                    </div>
                }
            >
                <div>Chcete vymazať všetky vrcholy a hrany ?</div>
            </Dialog>
        </>
    );
};

export default DeleteAllButton;
