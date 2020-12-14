import React, {useCallback, useState} from 'react';
import {Stage as KonvaStage, Layer, Image} from 'react-konva';
import RoomElement from "./RoomElement";
import Item from "./Item";
import useImage from "../../lib/useImage";
import { debounce } from 'lodash';

const FACTOR: number = 100.0;

const Editor = (props: {
    width: number;
    height: number;
    elements: RoomElement[];
    onChange?: (element: RoomElement) => void;
    onSelected?: (element: RoomElement) => void;
    onDeselected?: () => void;
}) => {
    const {elements, width, height, onChange, onSelected, onDeselected} = props;
    const [selected, setSelected] = useState<RoomElement>(undefined);
    const fullWidth: number = width * FACTOR;
    const fullHeight: number = height * FACTOR;
    const centerX: number = (fullWidth / 2);
    const centerY: number = (fullHeight / 2);
    const centerImage = useImage("/static/room-center.svg", 96, 96);

    console.log("[RENDER] Editor");

    const deselect = useCallback((e) => {
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            setSelected(undefined);
            if (onDeselected)
                onDeselected();
        }
    }, []);

    return (
        <>
            <KonvaStage
                width={fullWidth}
                height={fullHeight}
                onMouseDown={deselect}
                onTouchStart={deselect}
            >
                <Layer>
                    <Image
                        x={fullWidth / 2}
                        y={fullHeight / 2}
                        width={128}
                        height={128}
                        image={centerImage}
                    />
                    {elements.map((element) => {
                        const x: number = (element.x * FACTOR) + centerX;
                        const y: number = (element.y * FACTOR) + centerY;
                        return (
                            <Item
                                key={element._id}
                                selected={selected && selected._id === element._id}
                                element={{
                                    ...element,
                                    x: x,
                                    y: y,
                                }}
                                onFinalChange={(x, y, rZ) => {
                                    const dX = (Math.round(x) - (fullWidth / 2)) / FACTOR;
                                    const dY = (Math.round(y) - (fullHeight / 2)) / FACTOR;
                                    const dRZ = Math.round(rZ);

                                    onChange({
                                        ...element,
                                        x: dX,
                                        y: dY,
                                        rZ: dRZ
                                    })
                                }}
                                onClick={() => {
                                    setSelected(element)
                                    if (onSelected)
                                        onSelected(element)
                                }}
                            />
                        )
                    })}
                </Layer>
            </KonvaStage>
        </>
    );
};
export default Editor;
