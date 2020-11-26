import {styled} from "styletron-react";
import React, {useCallback} from "react";
import { useStageActions, Group, useGroupsByStage, useVideoConsumers, useStageMembersByGroup, LocalConsumer, StageMemberWithUserData, useCurrentStageId, useLocalDevice, useSelector} from "../../../dist";

import DocsWrapper from "../../components/docs/DocsWrapper";
import VideoPlayer from "../../components/ui/VideoPlayer";

const Wrapper = styled("div", {
    position: 'fixed',
    bottom: '1rem',
    left: '50%',
    transform: 'translateX(-50%)'
});

const ToggleButton = styled("button", (props: { $active }) => ({
    borderRadius: "50%",
    border: '1px solid black',
    backgroundColor: props.$active ? '#50fa7b' : '#c2fad0',
    padding: '.2rem',
    color: '#000',
    marginLeft: '1rem',
    marginRight: '1rem',
    fontFamily: "'Fira Code', monospace",
    ':hover': {
        backgroundColor: '#40cd64',
    },
    ':disabled': {
        cursor: 'default',
        backgroundColor: '#cd40aa',
    },
}));

const StageMemberView = (props: {
    stageMember: StageMemberWithUserData
}) => {
    const {stageMember} = props;
    const videoConsumers = useSelector<LocalConsumer[]>(state => state.videoConsumers.byStageMember[stageMember._id]
        ? state.videoConsumers.byStageMember[stageMember._id].map(id => state.videoConsumers.byId[id])
        : []
    )

    return (
        <div>
            <h4>{stageMember.name || stageMember._id}</h4>
            <VideoPlayer consumers={videoConsumers}/>
        </div>
    )
}

const GroupView = (props: {
    group: Group
}) => {
    const {group} = props;

    const stageMembers = useStageMembersByGroup(group._id);

    console.debug(stageMembers);

    return (
        <div>
            <h3>{group.name} {group._id}</h3>
            {stageMembers.map(stageMember => <StageMemberView key={stageMember._id} stageMember={stageMember}/>)}
        </div>
    )
}


const Chat = () => {
    const {updateDevice} = useStageActions();
    const localDevice = useLocalDevice();

    const consumers = useVideoConsumers();

    // Get current stage id
    const stageId = useCurrentStageId();

    // Get all groups according to the stage
    const groups = useGroupsByStage(stageId);

    const toggleWebcam = useCallback(() => {
        updateDevice(localDevice._id, {
            sendVideo: !localDevice.sendVideo
        })
    }, [updateDevice, localDevice]);

    const toggleMic = useCallback(() => {
        updateDevice(localDevice._id, {
            sendAudio: !localDevice.sendAudio
        })
    }, [updateDevice, localDevice]);


    if (stageId) {

        return (
            <DocsWrapper>
                <p>{consumers.allIds.length} VIDEO CONSUMERS</p>
                {groups.map(group => <GroupView key={group._id} group={group}/>)}

                {localDevice ? (
                    <Wrapper>
                        <ToggleButton
                            $active={localDevice.sendVideo}
                            onClick={toggleWebcam}
                        >
                            <img
                                alt={localDevice.sendVideo ? "enable webcam" : "disable webcam"}
                                src={localDevice.sendVideo ? "/static/videocam-18dp.svg" : "/static/videocam_off-18dp.svg"}
                            />
                        </ToggleButton>
                        <ToggleButton
                            $active={localDevice.sendAudio}
                            onClick={toggleMic}
                        >
                            <img
                                alt={localDevice.sendVideo ? "enable microphone" : "disable microphone"}
                                src={localDevice.sendAudio ? "/static/mic-18dp.svg" : "/static/mic_off-18dp.svg"}
                            />
                        </ToggleButton>
                    </Wrapper>
                ) : null}
            </DocsWrapper>
        )
    }
    return (
        <DocsWrapper>Not inside a stage</DocsWrapper>
    )
};
export default Chat;
