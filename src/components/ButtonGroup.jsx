import React, { useContext } from 'react';
import { Button } from 'primereact/button';
import {
    DeleteAllButton,
    DownloadComponent,
    ImportDataComponent,
    InfoComponent
} from './index';
import { GraphContext } from '../GraphProvider';

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import '../App.css';

const ButtonGroup = ({ stageRef, onButtonClick }) => {
    const {
        activeButton,
        vertexes,
        lines,
        arrows,
        setVertexes,
        setLines,
        setArrows,
        setAlgorithmVisible,
        algorithmVisible,
        setSettingsVisible,
        settingsVisible,
        setColorPickerVisible,
        colorPickerVisible,
        setVertexInfoVisible,
        vertexInfoVisible
    } = useContext(GraphContext)

    const handleColorPickerButtonClick = () => {
        if (activeButton === 'color-pick') {
            onButtonClick(null);
        } else {

            setColorPickerVisible(!colorPickerVisible);
            onButtonClick('color-pick');
        }
    };

    const handleEditButtonClick = () => {
        setVertexInfoVisible(!vertexInfoVisible);;
        onButtonClick('edit');
    };

    const handleBookButtonClick = () => {
        if (activeButton === 'book') {
            onButtonClick(null);
        } else {
            setAlgorithmVisible(!algorithmVisible);
            onButtonClick('book');
        }
    };

    return (
        <div className="buttons-group">
            <Button
                icon="pi pi-circle"
                onClick={() => onButtonClick("vertex")}
                className={activeButton === "vertex" ? "active" : ""}
                tooltip="Pridať vrchol"
            />
            <Button
                icon="pi pi-minus"
                onClick={() => onButtonClick("line")}
                className={activeButton === "line" ? "active" : ""}
                tooltip="Pridať neorientovanú hranu"
            />
            <Button
                icon="pi pi-arrow-right"
                onClick={() => onButtonClick("arrow")}
                className={activeButton === "arrow" ? "active" : ""}
                tooltip="Pridať orientovanú hranu"
            />
            <Button
                icon="pi pi-arrows-alt"
                onClick={() => onButtonClick("move")}
                className={activeButton === "move" ? "active" : ""}
                tooltip="Presunúť vrchol alebo názov vrcholu a váhu hrany."
            />
            <Button
                icon="pi pi-file-edit"
                onClick={handleEditButtonClick}
                className={activeButton === "edit" ? "active" : ""}
                tooltip="Upraviť názov vrcholu alebo váhu hrany (úprava je pod plátnom)"
            />
            <Button
                icon="pi pi-palette"
                onClick={handleColorPickerButtonClick}
                className={activeButton === "color-pick" ? "active" : ""}
                tooltip="Zmeniť farbu"
            />
            <Button
                icon="pi pi-eraser"
                onClick={() => onButtonClick("eraser")}
                className={activeButton === "eraser" ? "active" : ""}
                tooltip="Vymazať kliknutý vrchol alebo hranu"
            />
            <DeleteAllButton
                active={activeButton === "delete-all"}
                onClick={() => onButtonClick("delete-all")}
            />
            <Button
                icon="pi pi-book"
                onClick={handleBookButtonClick}
                className={activeButton === "book" ? "active" : ""}
                tooltip="Vybrať algoritmus na spustenie"
            />
            <DownloadComponent stageRef={stageRef} vertexes={vertexes} lines={lines} arrows={arrows} />
            <ImportDataComponent setVertexes={setVertexes} setLines={setLines} setArrows={setArrows} />
            <Button
                icon="pi pi-cog"
                onClick={() => setSettingsVisible(!settingsVisible)}
                className={activeButton === "settings" ? "active" : ""}
                tooltip="Zmeniť veľkosť plátna alebo veľkosť vrchola"
            />
            <InfoComponent />
        </div>

    );
};

export default ButtonGroup;