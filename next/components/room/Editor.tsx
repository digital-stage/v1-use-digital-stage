import React, {useEffect, useRef, useState} from 'react';
import {Stage as KonvaStage, Layer, Image} from 'react-konva';
import RoomElement from "./RoomElement";
import Item from "./Item";
import useImage from "../../lib/useImage";
import {styled} from "styletron-react";

const FACTOR: number = 100.0;
const BOUNDING_BUFFER: number = 42;

const Wrapper = styled("div", {
    position: 'absolute',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    border: '1px solid red'
});

const Editor = (props: {
    width: number;
    height: number;
    elements: RoomElement[];
    onChange?: (element: RoomElement) => void;
    onSelected?: (element: RoomElement) => void;
    onDeselected?: () => void;
    className?: string;
}) => {
    const {elements, width, height, onChange, onSelected, onDeselected, className} = props;
    const [selected, setSelected] = useState<RoomElement>(undefined);
    const fullWidth: number = width * FACTOR;
    const fullHeight: number = height * FACTOR;
    const centerX: number = (fullWidth / 2);
    const centerY: number = (fullHeight / 2);
    const centerImage = useImage("/static/room-center.svg", 96, 96);
    const wrapperRef = useRef<HTMLDivElement>();

    const deselect = (e) => {
        const clickedOnEmpty = e.target === e.target.getStage();

        if (clickedOnEmpty) {
            setSelected(undefined);
            if (onDeselected)
                onDeselected();
        }
    };

    /**
     * Scroll to center when component loaded
     */
    useEffect(() => {
        if (wrapperRef.current) {
            wrapperRef.current.scrollLeft = (fullWidth / 2) - (window.innerWidth / 2);
            wrapperRef.current.scrollTop = (fullHeight / 2) - (window.innerHeight / 2);
        }

    }, [wrapperRef, fullWidth, fullHeight]);

    return (
        <Wrapper
            className={className}
            ref={wrapperRef}
        >
                <KonvaStage
                    width={fullWidth}
                    height={fullHeight}
                    x={500}
                    draggable={true}
                    onMouseDown={deselect}
                    onTouchStart={deselect}
                    dragBoundFunc={(pos) => {
                        const x = Math.max(0, pos.x);
                        const y = Math.max(0, pos.y);
                        console.log(pos.x, pos.y);
                        console.log(x, y)
                        return {
                            x: x,
                            y: y,
                        };
                    }}
                >
                    <Layer>
                        <Image
                            x={fullWidth / 2}
                            y={fullHeight / 2}
                            width={128}
                            height={128}
                            offsetX={64}
                            offsetY={64}
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
                                        const nX = Math.max(BOUNDING_BUFFER, Math.min(Math.round(x), (fullWidth - BOUNDING_BUFFER)));
                                        const nY = Math.max(BOUNDING_BUFFER, Math.min(Math.round(y), (fullHeight - BOUNDING_BUFFER)));

                                        const dX = (nX - (fullWidth / 2)) / FACTOR;
                                        const dY = (nY - (fullHeight / 2)) / FACTOR;
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
        </Wrapper>
    );
};
export default Editor;
