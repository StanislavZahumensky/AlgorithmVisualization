import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';

const InfoComponent = () => {
    const [visible, setVisible] = useState(false);

    return (
        <>
            <Button icon="pi pi-info-circle" onClick={() => setVisible(true)} tooltip="Info" />
            <Dialog header="Informácie" visible={visible} onHide={() => setVisible(false)} style={{ width: '50vw' }}>
                <div className="p-grid p-dir-col">
                    <Panel header="Práca s grafom">
                        <ul>
                            <li><i className="pi pi-circle p-mr-2"></i> Pridá nový vrchol na plátno.</li>
                            <li><i className="pi pi-minus p-mr-2"></i> Pridá novú hranu medzi dvomi kliknutými vrcholmi.</li>
                            <li><i className="pi pi-arrow-right p-mr-2"></i> Pridá novú orientovanú hranu medzi dvomi kliknutými vrcholmi.</li>
                            <li><i className="pi pi-arrows-alt p-mr-2"></i> Presunie vrchol alebo názov vrcholu a váhu hrany</li>
                            <li><i className="pi pi-file-edit p-mr-2"></i> Otvorí okno pod plátnom na úpravu názvov vrcholov alebo váh hrán, keď tam kliknete na ich názvy.</li>
                            <li><i className="pi pi-palette p-mr-2"></i> Môžete zmeniť farbu všetkých vrcholov alebo vrcholov, na ktoré kliknete.</li>
                            <li><i className="pi pi-eraser p-mr-2"></i> Vymaže kliknutý vrchol alebo hranu.</li>
                            <li><i className="pi pi-trash p-mr-2"></i> Vymaže všetky vrcholy a hrany.</li>
                        </ul>
                    </Panel>
                    <Panel header="Algoritmy">
                        <ul>
                            <li><i className="pi pi-book p-mr-2"></i> Vyberte algoritmus, ktorý chcete spustiť.</li>
                            <li style={{ marginLeft: '20px' }}>Dijkstrov algoritmus funguje v <span style={{ color: 'red' }}>orientovanom alebo neorientovanomgrafe s hranami, ktoré majú váhy.</span> </li>
                            <li style={{ marginLeft: '20px' }}>Kruskalov algoritmus funguje v <span style={{ color: 'red' }}>neorientovanom grafe s hranami ktoré majú váhy.</span></li>
                            <li style={{ marginLeft: '20px' }}>Primov algoritmus funguje v <span style={{ color: 'red' }}>neorientovanom grafe s hranami ktoré majú váhy.</span></li>
                            <li style={{ marginLeft: '20px' }}>Prehľadávanie do šírky funguje v <span style={{ color: 'red' }}>orientovanom alebo neorientovanom grafe, nemusíte mať váhy na hranách.</span></li>
                            <li style={{ marginLeft: '20px' }}>Prehľadávanie do hĺbky funguje v <span style={{ color: 'red' }}>orientovanom alebo neorientovanom grafe, nemusíte mať váhy na hranách.</span></li>
                            <li style={{ marginLeft: '20px' }}><span style={{ color: 'red' }}>Niektoré z týchto grafov je momentálne možné použiť aj v prípadoch, kde graf prene nie je vhodný (je možné vykonať algoritmus aj keď nie sú stanovené váhy hrán) takže výsledky nemusia byť v tom prípade správne.</span></li>
                        </ul>
                    </Panel>

                    <Panel header="Práca zo súbormi">
                        <ul>
                            <li><i className="pi pi-download p-mr-2"></i> Môžete si stiahnuť PNG, CSV alebo XML vrcholov a hrán.</li>
                            <li><i className="pi pi-upload p-mr-2"></i> Importovať CSV alebo XML vrcholov a hrán.</li>
                        </ul>
                    </Panel>
                    <Panel header="Nastavenia">
                        <ul>
                            <li><i className="pi pi-cog p-mr-2"></i> Tu môžete nastaviť veľkosť vrchola, šírku a výšku plátna.</li>
                            <li><i className="pi pi-info-circle p-mr-2"></i> Otvorí tento informačný dialóg.</li>
                        </ul>
                    </Panel>
                </div>
            </Dialog>
        </>
    );
};

export default InfoComponent;
