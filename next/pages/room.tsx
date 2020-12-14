import React, {useEffect, useRef, useState} from "react";
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
import {colors} from "../components/ui/Theme";

const report = debug("ThreeDAudio");

const FullscreenEditor = styled(Editor, {
    width: '100vw',
    height: '100vh',
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
const ModeNotification = styled("div", {
    position: 'fixed',
    top: '4rem',
    left: '1rem',
    color: colors.background.record
})

const Room = () => {
    const {updateStageMember, setCustomStageMember, removeCustomStageMember} = useStageActions()
    const stageId = useCurrentStageId();
    const isStageAdmin = useIsStageAdmin();
    const stage = useStage(stageId);
    const stageMembers = useStageMembersByStage(stageId);
    const customStageMembers = useCustomStageMembers();
    const image = useImage("/static/room-member.svg", 96, 96);
    const [selected, setSelected] = useState<RoomElement>(undefined);
    const [globalMode, setGlobalMode] = useState<boolean>(isStageAdmin);

    if (stage) {
        return (
            <>
                <FullscreenEditor
                    elements={stageMembers.map(stageMember => {
                        if (!globalMode && customStageMembers.byStageMember[stageMember._id]) {
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
                        if (globalMode && isStageAdmin) {
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
                        if (globalMode && isStageAdmin) {
                            // Also reset stage members
                            stageMembers.forEach(stageMember => {
                                updateStageMember(stageMember._id, {
                                    x: 0,
                                    y: 0,
                                    rZ: 0
                                })
                            });
                        } else {
                            customStageMembers.allIds.forEach(id => {
                                removeCustomStageMember(id)
                            });
                        }
                    }}>
                    RESET ALL
                </ResetAllButton>
                <ResetSingle
                    onClick={() => {
                        if (selected && !selected.isGlobal && customStageMembers.byStageMember[selected._id]) {
                            const customStageMember = customStageMembers.byId[customStageMembers.byStageMember[selected._id]];
                            console.log(customStageMember);
                            if (customStageMember) {
                                removeCustomStageMember(customStageMember._id);
                            }
                        }
                    }}
                    disabled={!selected}
                >
                    RESET
                </ResetSingle>
                {globalMode && <ModeNotification>MODIFYING GLOBAL VALUES</ModeNotification>}
                {isStageAdmin ? (
                    <ModeSelect
                        onSelected={(value) => setGlobalMode(value === "global")}
                        options={[{
                            id: "global",
                            value: "Global"
                        }, {
                            id: "monitor",
                            value: "Monitor"
                        }]}/>
                ) : null}
            </>
        )
    }

    return null;
};
export default Room;
