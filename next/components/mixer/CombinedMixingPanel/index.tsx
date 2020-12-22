import React from "react";
import {
    useSelector,
    useStageActions,
    useCustomStageMembers,
    useCustomGroups,
    useUsers,
    useStageMembers,
    useAudioProducers,
    useCustomAudioProducers,
} from "use-digital-stage";
import GroupRow from "../MixingPanel/rows/GroupRow";
import StageMemberRow from "../MixingPanel/rows/StageMemberRow";
import AudioProducerRow from "../MixingPanel/rows/AudioProducerRow";

const CombinedMixingPanel = (props: {
    global: boolean;
}): JSX.Element => {
    const {global} = props;

    const {
        setCustomGroup,
        setCustomStageMember,
        setCustomStageMemberAudio,
        removeCustomGroup,
        removeCustomStageMember,
        removeCustomStageMemberAudio,
        updateStageMember,
        updateGroup,
        updateStageMemberAudio
    } = useStageActions();
    // For groups
    const groups = useSelector(state => {
        if( state.global.stageId && state.groups.byStage[state.global.stageId] ) {
            return state.groups.byStage[state.global.stageId].map(id => state.groups.byId[id]);
        }
        return [];
    });
    const customGroups = useCustomGroups();
    // For stage members
    const users = useUsers();
    const stageMembers = useStageMembers();
    const customStageMembers = useCustomStageMembers();
    // For audio producers
    const audioProducers = useAudioProducers();
    const customAudioProducers = useCustomAudioProducers();

    return (
        <>
            {groups.map(group => {
                const customGroup = customGroups.byGroup[group._id]
                    ? customGroups.byId[customGroups.byGroup[group._id]]
                    : undefined;

                return (
                    <GroupRow
                        key={group._id}
                        group={group}
                        customGroup={!global && customGroup}
                        reset={!global && !!customGroup}
                        onReset={() => !global && customGroup && removeCustomGroup(customGroup._id)}
                        onChange={(volume, muted) => {
                            if (!global) {
                                setCustomGroup(group._id, {volume, muted})
                            } else {
                                updateGroup(group._id, {volume, muted})
                            }
                        }}
                    >
                        {stageMembers.byGroup[group._id] && stageMembers.byGroup[group._id].map(id => stageMembers.byId[id]).map((stageMember, index, arr) => {
                            const user = users.byId[stageMember.userId];
                            const customStageMember = customStageMembers.byStageMember[stageMember._id]
                                ? customStageMembers.byId[customStageMembers.byStageMember[stageMember._id]]
                                : undefined;

                            return (
                                <StageMemberRow
                                    key={stageMember._id}
                                    isLastChild={index === (arr.length - 1)}
                                    user={user}
                                    stageMember={stageMember}
                                    customStageMember={!global && customStageMember}
                                    reset={!global && !!customStageMember}
                                    onReset={() => !global && customStageMember && removeCustomStageMember(customStageMember._id)}
                                    onChange={(volume, muted) => {
                                        if (!global) {
                                            setCustomStageMember(stageMember._id, {volume, muted})
                                        } else {
                                            updateStageMember(stageMember._id, {volume, muted})
                                        }
                                    }}
                                >
                                    {audioProducers.byStageMember[stageMember._id] && audioProducers.byStageMember[stageMember._id].map(id => audioProducers.byId[id]).map((audioProducer, index, arr) => {
                                        const customAudioProducer = customAudioProducers.byAudioProducer[audioProducer._id]
                                            ? customAudioProducers.byId[customAudioProducers.byAudioProducer[audioProducer._id]]
                                            : undefined;

                                        return (
                                            <AudioProducerRow
                                                key={audioProducer._id}
                                                isLastChild={index === (arr.length - 1)}
                                                audioProducer={audioProducer}
                                                customAudioProducer={!global && customAudioProducer}
                                                reset={!global && !!customAudioProducer}
                                                onReset={() => !global && customAudioProducer && removeCustomStageMemberAudio(customAudioProducer._id)}
                                                onChange={(volume, muted) => {
                                                    if (!global) {
                                                        setCustomStageMemberAudio(audioProducer._id, {volume, muted})
                                                    } else {
                                                        updateStageMemberAudio(audioProducer._id, {volume, muted})
                                                    }
                                                }}
                                            />
                                        )
                                    })}
                                </StageMemberRow>
                            )
                        })}
                    </GroupRow>
                )

            })}
        </>
    );
};
export default CombinedMixingPanel;
