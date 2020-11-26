import React, {useEffect, useState} from 'react';
import { useCurrentStageId, useGroups, useStages} from '../../../dist';
import Button from "../../components/ui/Button";
import DocsWrapper from "../../components/docs/DocsWrapper";
import {useStageActions} from "../../../dist";

const StageManagement = () => {
    const currentStageId = useCurrentStageId();
    const stages = useStages();
    const [stageId, setStageId] = useState<string>(currentStageId);
    const [groupId, setGroupId] = useState<string>(undefined);
    const groups = useGroups();
    const [error, setError] = useState<string>();
    const {leaveStage, joinStage} = useStageActions();

    useEffect(() => {
        if( currentStageId ) {
            setStageId(currentStageId);
        } else if( !stageId ) {
            setStageId(stages.allIds[0]);
        }
    }, [stages, currentStageId])

    useEffect(() => {
        if( stageId && groups.byStage[stageId] && groups.byStage[stageId].length > 0 ) {
            setGroupId(groups.byStage[stageId][0]);
        }
    }, [stageId, groups])

    if( currentStageId ) {
        return (
            <DocsWrapper>
                <Button onClick={() => leaveStage()}>Leave stage</Button>
            </DocsWrapper>
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
            {groups.byStage[stageId] ? (
                <select onChange={(event) => setGroupId(event.target.value)}>
                    {groups.byStage[stageId].map(id => groups.byId[id]).map(group => {
                        return (
                            <option key={group._id} value={group._id}>{group.name}</option>
                        )
                    })}
                </select>
            ) :  undefined}
            <Button onClick={() => {
                if( stageId && groupId )
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
