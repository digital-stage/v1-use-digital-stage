import React, {useEffect, useState} from "react";
import {useGroups} from "../..";
import CodeWrapper from "../components/CodeWrapper";
import {useGroupsByStage} from "../..";
import {useStages} from "../..";
import {useGroup} from "../..";

const Groups = () => {
    const groups = useGroups();
    const stages = useStages();
    const [stageId, setStageId] = useState<string>();
    const [groupId, setGroupId] = useState<string>();
    const groupsByStage = useGroupsByStage(stageId);
    const group = useGroup(groupId);

    useEffect(() => {
        if( !stageId )
            setStageId(stages.allIds[0])
    }, [stages])

    useEffect(() => {
        if( !groupId )
        setGroupId(groups.allIds[0])
    }, [groups])

    return (
        <div>
            <h2>Usage</h2>
            <p>
                Get all available groups by using:
            </p>
            <CodeWrapper>const groups = useGroups()</CodeWrapper>
            <p>
                Get all groups by stage:
            </p>
            <CodeWrapper>const group = useGroupsByStageId(&lt;stageId&gt;)</CodeWrapper>
            <p>
                Get single group by using:
            </p>
            <CodeWrapper>const group = useGroups(&lt;groupId&gt;)</CodeWrapper>
            <h2>Result</h2>
            <h3>All groups</h3>
            <p>Format is: _id - name</p>
            <CodeWrapper>
                <ul>
                    {groups.allIds.map(id => {
                        const group = groups.byId[id];
                        return (
                            <li key={group._id}>
                                {group._id} - {group.name}
                            </li>
                        )
                    })}
                </ul>
            </CodeWrapper>
            <h3>Groups by stage</h3>
            <select onChange={(event) => setStageId(event.target.value)}>
                {stages.allIds.map(sId => {
                    const stage = stages.byId[sId];
                    return (
                        <option key={stage._id} value={stage._id}>{stage.name}</option>
                    )
                })}
            </select>
            <p>Format is: _id - name</p>
            <CodeWrapper>
                <ul>
                    {groupsByStage.map(group => {
                        return (
                            <li key={group._id}>
                                {group._id} - {group.name}
                            </li>
                        )
                    })}
                </ul>
            </CodeWrapper>
            <h3>Single group</h3>
            <select onChange={(event) => setGroupId(event.target.value)}>
                {groups.allIds.map(sId => {
                    const group = groups.byId[sId];
                    return (
                        <option key={group._id} value={group._id}>{group.name}</option>
                    )
                })}
            </select>
            <CodeWrapper>
                {JSON.stringify(group, null, 2)}
            </CodeWrapper>
        </div>
    )
}
export default Groups;
