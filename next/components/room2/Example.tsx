import React, {useEffect, useState} from 'react';

import {Stage, Layer, Text} from 'react-konva';
import RoomElement from '../room/RoomElement';
import useImage from "../../lib/useImage";
import Item from "../room/Item";

function generateShapes(image): RoomElement[] {
    return [...Array(10)].map((_, i) => ({
        _id: i.toString(),
        name: i.toString(),
        image: image,
        isGlobal: false,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        z: 0,
        rX: 0,
        rY: 0,
        rZ: 0,
    }));
}


const Example = () => {
    const [stars, setStars] = useState([]);
    const [size, setSize] = useState<{ width: number, height: number }>();
    const [selected, setSelected] = useState<RoomElement>(undefined);
    const image = useImage("/static/person_pin-18dp.svg", 96, 96);

    useEffect(() => {
        setStars(generateShapes(image));
        setSize({
            width: window.innerWidth,
            height: window.innerHeight
        })
    }, [image]);

    return (
        <Stage width={size?.width} height={size?.height}>
            <Layer>
                {stars.map((star) => (
                    <Item
                        key={star._id}
                        selected={selected && selected._id === star._id}
                        element={star}
                        onClick={() => {
                            setSelected(star)
                        }}
                    />
                ))}
            </Layer>
        </Stage>
    );
};
export default Example;
