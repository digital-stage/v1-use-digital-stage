import React, {useState} from "react";
import Container from "../components/ui/Container";
import RoomEditor, {RoomElement} from "../components/room/RoomEditor";


const Position = () => {
    const [elements, setElements] = useState<RoomElement[]>([
        {
            _id: "1",
            x: 100,
            y: 200,
            rX: 1,
            rY: 0,
            src: "/static/person_pin-black-18dp.svg",
            width: 96,
            height: 96
        },
        {
            _id: "2",
            x: 300,
            y: 400,
            rX: 1,
            rY: 0,
            src: "/static/group-black-18dp.svg",
            width: 64,
            height: 64
        }
    ])


    return (
        <Container>
            <RoomEditor
                elements={elements}
                width={1200}
                height={1200}
                onChange={(element) => {
                    console.debug("Element changed: ", element.x, element.y, element.rX, element.rY);
                    setElements(prev => prev.map(el => el._id === element._id ? element: el));
                }}

            />

        </Container>
    )
};
export default Position;
