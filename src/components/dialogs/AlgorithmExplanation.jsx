import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { TabView, TabPanel } from 'primereact/tabview';

const AlgorithmExplanation = ({ visible, onHide }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleTabChange = (e) => {
        setActiveIndex(e.index);
    };

    return (
        <Dialog visible={visible} onHide={onHide} header="Vysvetlenie Algoritmov" style={{ width: '900px' }}>
            <TabView activeIndex={activeIndex} onTabChange={handleTabChange}>
                <TabPanel header="Dijkstrov">
                    <p>Dijkstrov algoritmus sa používa na hľadanie najkratšej cesty z jedného uzla ku všetkým ostatným uzlom v ohodnotenom grafe.</p>
                    <p>Iteratívne vyberá uzol s najmenšou možnou vzdialenosťou od zdroja, aktualizuje vzdialenosti k jeho susedným uzlom a označuje ho ako navštívený. Tento proces pokračuje, kým nie sú navštívené všetky uzly.</p>
                    <p>Dijkstrov algoritmus sa často používa v sieťových smerovacích protokoloch, GPS systémoch a riadení premávky, kde je nájdenie najkratšej cesty kľúčové.</p>
                </TabPanel>
                <TabPanel header="Primov">
                    <p>Primov algoritmus sa používa na hľadanie minimálnej kostry grafu v ohodnotenom neorientovanom grafe.</p>
                    <p>Začína s ľubovoľným vrcholom a rozširuje minimálnu kostru grafu o jeden vrchol, pričom vždy vyberá hranu s najmenšou hmotnosťou, ktorá spojí vrchol v minimálnej kostre grafu s vrcholom mimo neho.</p>
                    <p>Primov algoritmus sa často používa pri návrhu sietí, ako je návrh efektívnych komunikačných sietí a sietí distribúcie elektrickej energie.</p>
                </TabPanel>
                <TabPanel header="Kruskalov">
                    <p>Kruskalov algoritmus sa používa na hľadanie minimálnej kostry grafu v ohodnotenom neorientovanom grafe.</p>
                    <p>Vytvára minimálnu kostru grafu opakovane pridávaním nasledujúcej najľahšej hrany, ktorá nevytvára cyklus v aktuálnom čiastočnom riešení. To sa dosiahne udržiavaním lesa stromov, ktoré počiatočne obsahujú jednotlivé uzly a zlučovaním ich, kým nezostane len jeden strom.</p>
                    <p>Kruskalov algoritmus sa používa v rôznych oblastiach, ako je návrh sietí, návrh obvodov a algoritmy zhlukovania.</p>
                </TabPanel>
                <TabPanel header="Prehľadávanie do šírky">
                    <p>Prehľadávanie do šírky je algoritmus na prehľadávanie grafu, ktorý preskúma všetky susedné uzly v aktuálnej hĺbke pred prechodom na uzly v ďalšej hĺbke.</p>
                    <p>Používa frontu na sledovanie uzlov, ktoré majú byť preskúmané. Začína na zvolenom uzle, preskúma všetkých jeho susedov, potom pokračuje v preskúmaní susedov susedov a tak ďalej.</p>
                    <p>Bežne sa používa v algoritmoch na nájdenie najkratších ciest, hľadaní súvisiacich komponentov a algoritmoch na riešenie hádaniek.</p>
                </TabPanel>
                <TabPanel header="Prehľadávanie do hĺbky">
                    <p>Prehľadávanie do hĺbky preskúma čo najďalej v každej vetve pred vrátením sa späť. Používa sa na prechod alebo vyhľadávanie v grafe alebo stromovej štruktúre dát.</p>
                    <p>Používa zásobník (alebo rekurziu) na sledovanie uzlov, ktoré majú byť preskúmané. Preskúma jednu vetvu stromu tak hlboko, ako je to možné, pred vrátením sa späť na preskúmanie ďalších vetiev.</p>
                    <p>Bežne sa používa pri  detekcii cyklov, riešení bludísk a hľadaní silne súvisiacich komponentov v orientovaných grafoch.</p>
                </TabPanel>
            </TabView>
        </Dialog>
    );
};

export default AlgorithmExplanation;
