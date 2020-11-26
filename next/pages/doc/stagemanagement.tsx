import React, {useEffect, useState} from 'react';
import {useCurrentStageId, useGroupsByStage, useStages} from '../../..';
import Button from "../../components/ui/Button";
import DocsWrapper from "../../components/docs/DocsWrapper";
import {useStageActions} from "../../..";

const StageManagement = () => {
    const currentStageId = useCurrentStageId();
    const stages = useStages();
    const [stageId, setStageId] = useState<string>();
    const [groupId, setGroupId] = useState<string>();
    const groups = useGroupsByStage(stageId);
    const [error, setError] = useState<string>();
    const {leaveStage, joinStage} = useStageActions();

    useEffect(() => {
        if( !stageId ) {
            setStageId(stages.allIds[0]);
        }
    }, [stages])

    if( currentStageId ) {
        return (
            <Button onClick={() => leaveStage()}>Leave stage</Button>
        )
    }

    return (
        <DocsWrapper>
            <select onChange={(event) => setStageId(event.target.value)}>
                {stages.allIds.map(sId => {
                    const stage = stages.byId[sId];
                    return (
                        <option key={stage._id} value={stage._id}>{stage.name}</option>
                    )
                })}
            </select>
            <select onChange={(event) => setGroupId(event.target.value)}>
                {groups.map(group => {
                    return (
                        <option key={group._id} value={group._id}>{group.name}</option>
                    )
                })}
            </select>
            <Button onClick={() => {
                joinStage(stageId, groupId)
                    .then(() => setError(undefined))
                    .catch((err) => {
                        console.error(err);
                        setError(err)
                    })
            }}>Join stage</Button>
            {error ? (
                <p>{error}</p>
            ) : null}
        </DocsWrapper>
    );
};
export default StageManagement;
