import {Image, Transformer, Text} from 'react-konva';
import React, {useEffect, useRef, useState} from "react";
import RoomElement from "./RoomElement";
import Konva from "konva";

const SIZE: number = 96;

const Item = (props: {
    element: RoomElement;
    onFinalChange?: (x: number, y: number, rZ: number) => void;
    onClick?: () => void;
    selected?: boolean;
}) => {
    const {element, onFinalChange, selected, onClick} = props;
    const starRef = useRef<any>();
    const transformerRef = useRef<any>();
    const [dragging, setDragging] = useState<boolean>(false);
    const [position, setPosition] = useState<{
        x: number,
        y: number,
        rZ: number
    }>({
        x: 0,
        y: 0,
        rZ: 0
    });

    /**
     * Sync element with internal position
     */
    useEffect(() => {
        setPosition({
            x: element.x,
            y: element.y,
            rZ: element.rZ
        })
    }, [element])

    const handleDragStart = (e: Konva.KonvaEventObject<DragEvent>) => {
        setDragging(true);
    };
    const handleDragMove = (e: Konva.KonvaEventObject<DragEvent>) => {
        const x = e.evt.x - (SIZE / 2);
        const y = e.evt.y - (SIZE / 2);
        setPosition(prev => ({
            x,
            y,
            rZ: prev.rZ
        }));
    };
    const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
        setDragging(false);
        const x = e.evt.x - (SIZE / 2);
        const y = e.evt.y - (SIZE / 2);
        setPosition(prev => ({
            x,
            y,
            rZ: prev.rZ
        }));
        if (onFinalChange) {
            onFinalChange(x, y, position.rZ);
        }
    };
    const handleTransform = () => {
        const degrees: number = transformerRef.current.attrs.rotation;
        setPosition(prev => ({
            x: prev.x,
            y: prev.y,
            rZ: degrees
        }));
    }
    const handleTransformEnd = () => {
        const degrees: number = transformerRef.current.attrs.rotation;
        console.log("degrees");
        if (onFinalChange) {
            console.log(degrees);
            onFinalChange(position.x, position.y, position.rZ);
        }
    };

    useEffect(() => {
        if (transformerRef && transformerRef.current && starRef && starRef.current && selected) {
            // we need to attach transformer manually
            transformerRef.current.nodes([starRef.current]);
            transformerRef.current.getLayer().batchDraw();
        }
    }, [selected, transformerRef, starRef]);

    return (
        <>
            <Image
                ref={starRef}
                id={element._id}
                key={element._id}
                x={element.x}
                y={element.y}
                image={element.image}
                width={SIZE}
                height={SIZE}
                opacity={0.8}
                draggable
                rotation={element.rZ}
                shadowColor="black"
                shadowBlur={10}
                shadowOpacity={0.6}
                shadowOffsetX={dragging ? 10 : 5}
                shadowOffsetY={dragging ? 10 : 5}
                scaleX={dragging ? 1.2 : 1}
                scaleY={dragging ? 1.2 : 1}
                sceneFunc={(context, shape) => {
                    if (element.image)
                        context.drawImage(element.image, 0, 0, SIZE, SIZE)
                    context.fillText(element.name, 0, SIZE);
                    context.fillText("("+element.x+"|"+element.y+"|0)", 0, 0)
                }}
                onDragStart={handleDragStart}
                onDragMove={handleDragMove}
                onDragEnd={handleDragEnd}
                onClick={() => onClick && onClick()}
                onTap={() => onClick && onClick()}
                onTransform={handleTransform}
                onTransformEnd={handleTransformEnd}
            />
            {selected ? (
                <Transformer
                    ref={transformerRef}
                    resizeEnabled={false}
                    rotateEnabled={true}
                />
            ) : undefined}
        </>
    )
};

export default Item;
