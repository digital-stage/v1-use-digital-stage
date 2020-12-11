import React, {useCallback, useState} from 'react';
import {Stage as KonvaStage, Layer, Image} from 'react-konva';
import RoomElement from "./RoomElement";
import Item from "./Item";
import useImage from "../../lib/useImage";

const FACTOR: number = 100;

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
    const fullWidth = width * FACTOR;
    const fullHeight = height * FACTOR;
    const centerX = (fullWidth / 2);
    const centerY = (fullHeight / 2);
    const centerImage = useImage("/static/room-center.svg", 96, 96);

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
                width={(width * FACTOR) - 96}
                height={(height * FACTOR) - 96}
                onMouseDown={deselect}
                onTouchStart={deselect}
            >
                <Layer>
                    <Image
                        x={(width * FACTOR) / 2}
                        y={(height * FACTOR) / 2}
                        width={128}
                        height={128}
                        image={centerImage}
                    />
                    {elements.map((element) => {
                        return (
                            <Item
                                key={element._id}
                                selected={selected && selected._id === element._id}
                                element={{
                                    ...element,
                                    x: (element.x * FACTOR) + centerX,
                                    y: (element.y * FACTOR) + centerY,
                                }}
                                onFinalChange={(x, y, rZ) => onChange({
                                    ...element,
                                    x: (x - (fullWidth / 2)) / FACTOR,
                                    y: (y - (fullHeight / 2)) / FACTOR,
                                    rZ: rZ
                                })}
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
