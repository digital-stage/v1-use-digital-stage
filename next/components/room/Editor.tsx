import React, {useCallback, useState} from 'react';
import {Stage as KonvaStage, Layer, Star as KonvaStar} from 'react-konva';
import RoomElement from "./RoomElement";
import Item from "./Item";

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
                width={width * FACTOR}
                height={height * FACTOR}
                onMouseDown={deselect}
                onTouchStart={deselect}
            >
                <Layer>
                    <KonvaStar
                        x={(width * FACTOR) / 2}
                        y={(height * FACTOR) / 2}
                        innerRadius={20}
                        outerRadius={40}
                        numPoints={5}
                        fill="#33333"
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
