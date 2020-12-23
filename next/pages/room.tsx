import React, {useState} from "react";
import {
    useIsStageAdmin,
    useStageActions,
    useCurrentStageId,
    useStage,
    useStageMembersByStage,
    useCustomStageMembers
} from "use-digital-stage";
import Button from "../components/ui/Button";
import {styled, withStyleDeep} from "styletron-react";
import Editor from "../components/room/Editor";
import useImage from "../lib/useImage";
import RoomElement from "../components/room/RoomElement";
import Select, {Option} from "../components/ui/Select";
import {colors} from "../components/ui/Theme";
import Layout from "../components/global/Layout";

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
    position: 'absolute',
    top: '2rem'
});
const ModeNotification = styled("div", {
    position: 'absolute',
    top: '4rem',
    left: '1rem',
    color: colors.background.record
})

export enum Mode {
    GLOBAL = "global",
    MONITOR = "monitor"
}

const Options: Option[] = [
    {
        id: Mode.GLOBAL,
        label: "Global"
    },
    {
        id: Mode.MONITOR,
        label: "Monitor"
    }
];

const Room = () => {
    const {updateStageMember, setCustomStageMember, removeCustomStageMember} = useStageActions()
    const stageId = useCurrentStageId();
    const isStageAdmin = useIsStageAdmin();
    const stage = useStage(stageId);
    const stageMembers = useStageMembersByStage(stageId);
    const customStageMembers = useCustomStageMembers();
    const image = useImage("/static/room-member.svg", 96, 96);
    const customImage = useImage("/static/room-member-custom.svg", 96, 96);
    const [selected, setSelected] = useState<RoomElement>(undefined);
    const [globalMode, setGlobalMode] = useState<boolean>(isStageAdmin);

    if (stage) {
        return (
            <Layout>
                <FullscreenEditor
                    elements={stageMembers.map(stageMember => {
                        if (!globalMode && customStageMembers.byStageMember[stageMember._id]) {
                            const customStageMember = customStageMembers.byId[customStageMembers.byStageMember[stageMember._id]];
                            return {
                                ...stageMember,
                                image: customImage,
                                name: stageMember.name || stageMember._id,
                                x: customStageMember.x,
                                y: customStageMember.y,
                                z: customStageMember.z,
                                rX: customStageMember.rX,
                                rY: customStageMember.rY,
                                rZ: customStageMember.rZ,
                                isGlobal: false,
                                opacity: 0.8
                            }
                        }
                        return {
                            ...stageMember,
                            image: image,
                            name: stageMember.name || stageMember._id,
                            isGlobal: true,
                            opacity: globalMode ? 0.8 : 0.4
                        }
                    })}
                    width={stage.width}
                    height={stage.height}
                    onChange={(element) => {
                        if (globalMode && isStageAdmin) {
                            updateStageMember(element._id, {
                                x: element.x,
                                y: element.y,
                                rZ: element.rZ
                            })
                        } else {
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
                                    y: -1,
                                    rZ: 180
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
                        onSelected={(option: Option) => {
                            setGlobalMode(option.id === "global");
                        }}
                        selected={globalMode ? Options[0].id : Options[1].id}
                        options={Options}/>
                ) : null}
            </Layout>
        )
    }

    return null;
};
export default Room;
