import {Stage, Layer, Image, Transformer} from 'react-konva';
import React, {useCallback, useEffect, useRef, useState} from "react";
import {styled} from "styletron-react";
import Konva from "konva";
import useImage from "../../lib/useImage";
import {
    ThreeDimensionAudioProperties
} from "use-digital-stage";
import debug from "debug";

const report = debug("ThreeDAudio:editor");

const Wrapper = styled("div", {
    width: '100%',
    height: '100%',
    overflow: 'scroll',
    border: "1px solid black"
})

export interface RoomElement extends ThreeDimensionAudioProperties {
    _id: string;
    name: string;
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
            const el = {
                ...element,
                x: evt.layerX - (element.width / 2),
                y: evt.layerY - (element.height / 2),
            };
            report("Was: ", element.x, element.y);
            report("Is: ", el.x, el.y)
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
                image={image}
                width={element.width}
                height={element.height}
                sceneFunc={(context, shape) => {
                    if (image)
                        context.drawImage(image, 0, 0, element.width, element.height)
                    context.fillText(element.name, 0, element.height);
                    context.fillText("(" + element.x + " " + element.y + ")", 0, 0);
                }}
                draggable={true}
                onDragEnd={handleDragEnd}
                onClick={() => onClick && onClick(element)}
                onTap={() => onClick && onClick(element)}
                onTransformEnd={(e) => {
                    const rotation = transformerRef.current.attrs.rotation;
                    //console.log(rotation);
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
    const wrapperRef = useRef<HTMLDivElement>();
    const {width, height, elements, onChange} = props;
    const [selected, setSelected] = useState<RoomElement>(undefined);
    const centeredImage = useImage("/static/person_pin-red-18dp.svg", 96, 96);

    useEffect(() => {
        if( wrapperRef.current ) {
            const rect = wrapperRef.current.getBoundingClientRect();
            wrapperRef.current.scrollTop = (height / 2) - (rect.height / 2);
            wrapperRef.current.scrollLeft = (width / 2) - (rect.width / 2);
        }
    }, [wrapperRef, width, height])

    const handleChange = useCallback((element: RoomElement) => {
        if (onChange) {
            onChange(element);
        }
    }, []);

    const deselect = useCallback((e) => {
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            setSelected(undefined);
        }
    }, []);

    return (
        <Wrapper
            ref={wrapperRef}
        >
            <Stage
                width={width}
                height={height}
                onMouseDown={deselect}
                onTouchStart={deselect}
            >
                <Layer>
                    <Image
                        width={96}
                        height={96}
                        x={width / 2}
                        y={height / 2}
                        image={centeredImage}
                    />
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
