import {Stage, Layer, Image, Text, Transformer} from 'react-konva';
import React, {useCallback, useEffect, useRef, useState} from "react";
import {styled} from "styletron-react";
import Konva from "konva";
import useImage from "../../lib/useImage";

const Wrapper = styled("div", {
    width: '100%',
    height: '100%'
})

export interface RoomElement {
    _id: string;
    x: number;
    y: number;
    rX: number;
    rY: number;
    width: number;
    height: number;
    src: string;
}

const Element = (props: {
    element: RoomElement;
    onChange?: (element: RoomElement) => void;
    onClick?: (element: RoomElement) => void;
    selected?: boolean;
}) => {
    const {element, onChange, selected, onClick} = props;
    const image = useImage(element.src, element.width, element.height);
    const imageRef = useRef<any>();
    const transformerRef = useRef<any>();

    useEffect(() => {
        if (transformerRef && transformerRef.current && imageRef && imageRef.current && selected) {
            // we need to attach transformer manually
            transformerRef.current.nodes([imageRef.current]);
            transformerRef.current.getLayer().batchDraw();
        }
    }, [selected, transformerRef, imageRef]);

    const handleDragEnd = useCallback((event: Konva.KonvaEventObject<DragEvent> & {
        evt: {
            layerX: number,
            layerY: number
        }
    }) => {
        const {evt} = event;
        if (onChange) {
            console.log("Was: ", element.x, element.y);
            console.log("Is: ", event)
            const el = {
                ...element,
                x: evt.layerX - (element.width / 2),
                y: evt.layerY - (element.height / 2),
            };
            onChange(el)
        }

    }, [element]);

    return (
        <>
            <Image
                id={element._id}
                ref={imageRef}
                x={element.x}
                y={element.y}
                width={element.width}
                height={element.height}
                image={image}
                draggable={true}
                onDragEnd={handleDragEnd}
                onClick={() => onClick && onClick(element)}
                onTap={() => onClick && onClick(element)}

                onTransformEnd={(e) => {
                    const rotation = transformerRef.current.attrs.rotation;
                    console.log("TRASNFORM END");
                    console.log(rotation);
                }}
            />
            {selected ? (
                <Transformer
                    ref={transformerRef}
                    resizeEnabled={false}
                    rotateEnabled={true}

                    boundBoxFunc={(oldBox, newBox) => {
                        // limit resize
                        if (newBox.width < 5 || newBox.height < 5) {
                            return oldBox;
                        }
                        return newBox;
                    }}
                />
            ) : undefined}
        </>
    );
};

const RoomEditor = (props: {
    width: number;
    height: number;
    elements: RoomElement[];
    className?: string;
    onChange?: (element: RoomElement) => void;
}) => {
    const {width, height, elements, onChange} = props;
    const [selected, setSelected] = useState<RoomElement>(undefined);

    const handleChange = useCallback((element: RoomElement) => {
        if (onChange) {
            onChange(element);
        }
    }, []);

    const deselect = useCallback((e) => {
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            console.log("deselect")
            setSelected(undefined);
        }
    }, []);

    return (
        <Wrapper>
            <Stage
                width={width}
                height={height}
                onMouseDown={deselect}
                onTouchStart={deselect}
            >
                <Layer>
                    <Text text="Try to drag a star"/>
                    {elements.map((element) => (
                        <Element
                            key={element._id}
                            element={element}
                            onChange={handleChange}
                            onClick={() => {
                                console.log("click");
                                setSelected(element)
                            }}
                            selected={selected && selected._id === element._id}
                        />
                    ))}
                </Layer>
            </Stage>
        </Wrapper>
    );
}
export default RoomEditor;
