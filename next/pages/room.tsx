import React, {useEffect, useState} from "react";
import Container from "../components/ui/Container";
import RoomEditor, {RoomElement} from "../components/room/RoomEditor";
import {
    useSelector,
    useIsStageAdmin,
    useStageActions,
    useCurrentStageId,
    useStage,
    CustomStageMember
} from "use-digital-stage";
import Button from "../components/ui/Button";
import debug from "debug";

const report = debug("ThreeDAudio");

const useElements = () => {
    const stageMembers = useSelector(state => state.stageMembers);
    const users = useSelector(state => state.users);
    const customStageMembers = useSelector(state => state.customStageMembers);
    const [elements, setElements] = useState<RoomElement[]>([]);

    useEffect(() => {
        report("changed")
    }, [stageMembers])

    useEffect(() => {
        const createdElements: RoomElement[] = [];
        stageMembers.allIds.map(id => stageMembers.byId[id]).forEach(stageMember => {
            const name = users.byId[stageMember.userId] ? users.byId[stageMember.userId].name : stageMember._id;
            if (customStageMembers.byStageMember[stageMember._id]) {
                const customStageMember: CustomStageMember = customStageMembers.byId[customStageMembers.byStageMember[stageMember._id]];
                createdElements.push({
                    ...customStageMember,
                    name,
                    width: 96,
                    height: 96,
                    src: "/static/person_pin-blue-18dp.svg"
                })
            } else {
                createdElements.push({
                    ...stageMember,
                    name,
                    width: 96,
                    height: 96,
                    src: "/static/person_pin-black-18dp.svg"
                })
            }
        });
        setElements(createdElements);
    }, [stageMembers, users, customStageMembers])

    return {elements};
}


const Room = () => {
    const {updateStageMember, setCustomStageMember, removeCustomStageMember} = useStageActions()
    const stageId = useCurrentStageId();
    const {elements} = useElements();
    const isStageAdmin = useIsStageAdmin();
    const stage = useStage(stageId);
    const [width, setWidth] = useState<number>();
    const [height, setHeight] = useState<number>();

    useEffect(() => {
        if (stage) {
            setWidth(stage.width * 100)
            setHeight(stage.height * 100)
        }
    }, [stage])


    if (stage) {
        return (
            <Container>
                <RoomEditor
                    elements={elements}
                    width={width}
                    height={height}
                    onChange={(element) => {
                        report("Element changed: ", element.x, element.y, element.rX, element.rY);
                        if (isStageAdmin) {
                            report("Updating stage member");
                            updateStageMember(element._id, {
                                x: element.x,
                                y: element.y,
                                rX: element.rX,
                                rY: element.rY
                            })
                        } else {
                            report("Updating custom stage member " + element._id);
                            setCustomStageMember(element._id, {
                                x: element.x,
                                y: element.y,
                                rX: element.rX,
                                rY: element.rY
                            })
                        }
                    }}

                />
                <Button onClick={() => {
                    elements.forEach(element => {
                        if (isStageAdmin) {
                            report("Reset stage member");
                            updateStageMember(element._id, {
                                x: 0,
                                y: 0,
                                rX: 0,
                                rY: 0,
                            })
                        } else {
                            report("Reset custom stage member");
                            removeCustomStageMember(element._id);
                        }
                    })
                }}>
                    RESET
                </Button>

            </Container>
        )
    }

    return null;
};
export default Room;
