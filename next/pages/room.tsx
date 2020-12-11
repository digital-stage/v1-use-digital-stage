import React, {useEffect, useState} from "react";
import {
    useIsStageAdmin,
    useStageActions,
    useCurrentStageId,
    useStage,
    useStageMembersByStage,
    useCustomStageMembers
} from "use-digital-stage";
import Button from "../components/ui/Button";
import debug from "debug";
import {styled, withStyleDeep} from "styletron-react";
import Editor from "../components/room/Editor";
import useImage from "../lib/useImage";
import RoomElement from "../components/room/RoomElement";
import Select from "../components/ui/Select";

const report = debug("ThreeDAudio");

const Wrapper = styled("div", {
    width: '100vw',
    height: '100vh',
    overflow: 'scroll'
});
const InnerWrapper = styled("div", {
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
});
const ResetAllButton = withStyleDeep(Button, {
    position: 'fixed',
    top: '2rem',
    right: '1rem',
});
const ResetSingle = withStyleDeep(Button, {
    position: 'fixed',
    top: '4rem',
    right: '1rem',
});
const ModeSelect = styled(Select, {
    position: 'fixed',
    top: '2rem',
    left: '1rem',
});

const Room = () => {
    const {updateStageMember, setCustomStageMember, removeCustomStageMember} = useStageActions()
    const stageId = useCurrentStageId();
    const isStageAdmin = useIsStageAdmin();
    const stage = useStage(stageId);
    const stageMembers = useStageMembersByStage(stageId);
    const customStageMembers = useCustomStageMembers();
    const image = useImage("/static/person_pin-inverted-18dp.svg", 96, 96);
    const [selected, setSelected] = useState<RoomElement>(undefined);
    const [isAdminMode, setAdminMode] = useState<boolean>(false);


    if (stage) {
        return (
            <Wrapper>
                <InnerWrapper>
                    <ModeSelect
                        options={[{
                            id: 1,
                            value: "Global"
                        }, {
                            id: 2,
                            value: "Private"
                        }]}/>
                    <Editor
                        elements={stageMembers.map(stageMember => {
                            if (customStageMembers.byStageMember[stageMember._id]) {
                                const customStageMember = customStageMembers.byId[customStageMembers.byStageMember[stageMember._id]];
                                return {
                                    ...stageMember,
                                    image: image,
                                    name: stageMember.name || stageMember._id,
                                    x: customStageMember.x,
                                    y: customStageMember.y,
                                    z: customStageMember.z,
                                    rX: customStageMember.rX,
                                    rY: customStageMember.rY,
                                    rZ: customStageMember.rZ,
                                    isGlobal: false
                                }
                            }
                            return {
                                ...stageMember,
                                image: image,
                                name: stageMember.name || stageMember._id,
                                isGlobal: true
                            }
                        })}
                        width={stage.width}
                        height={stage.height}
                        onChange={(element) => {
                            if (isStageAdmin) {
                                report("Updating stage member");
                                updateStageMember(element._id, {
                                    x: element.x,
                                    y: element.y,
                                    rZ: element.rZ
                                })
                            } else {
                                report("Updating custom stage member");
                                report(element.x, element.y, element.rZ);
                                setCustomStageMember(element._id, {
                                    x: element.x,
                                    y: element.y,
                                    rZ: element.rZ
                                })
                            }
                        }}
                        onSelected={element => setSelected(element)}
                        onDeselected={() => setSelected(undefined)}
                    />
                    <ResetAllButton
                        onClick={() => {
                            customStageMembers.allIds.forEach(id => {
                                removeCustomStageMember(id)
                            });
                            if (isStageAdmin) {
                                // Also reset stage members
                                stageMembers.forEach(stageMember => {
                                    updateStageMember(stageMember._id, {
                                        x: 0,
                                        y: 0,
                                        rX: 0,
                                        rY: 0,
                                    })
                                });
                            }
                        }}>
                        RESET ALL
                    </ResetAllButton>
                    <ResetSingle
                        onClick={() => {
                            if (selected) {
                                const customStageMember = customStageMembers.byId[selected._id];
                                if (customStageMember) {
                                    removeCustomStageMember(customStageMember._id);
                                }
                            }
                        }}
                        disabled={!selected}
                    >
                        RESET
                    </ResetSingle>
                </InnerWrapper>
            </Wrapper>
        )
    }

    return null;
};
export default Room;
