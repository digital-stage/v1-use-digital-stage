import React, {useEffect, useState} from "react";
import CodeWrapper from "../components/CodeWrapper";
import {useStages} from "../..";
import {useStageMember, useStageMembersByStage} from "../..";
import {useStageMembers} from "../..";

const StageMembers = () => {
    const stages = useStages();
    const stageMembers = useStageMembers();
    const [stageId, setStageId] = useState<string>();
    const [stageMemberId, setStageMemberId] = useState<string>();
    const stageMembersByStage = useStageMembersByStage(stageId);
    const stageMember = useStageMember(stageMemberId);

    useEffect(() => {
        if( !stageId )
            setStageId(stages.allIds[0])
    }, [stages])

    useEffect(() => {
        if( !stageMemberId )
        setStageMemberId(stageMembers.allIds[0])
    }, [stageMembers])

    return (
        <div>
            <h2>Usage</h2>
            <p>
                Get all available stage members by using:
            </p>
            <CodeWrapper>const stageMembers = useStageMembers()</CodeWrapper>
            <p>
                Get all stage members by stage:
            </p>
            <CodeWrapper>const stageMembers = useStageMembersByStage(&lt;stageId&gt;)</CodeWrapper>
            <p>
                Get single stage member by using:
            </p>
            <CodeWrapper>const stageMember = useStageMember(&lt;stageMemberId&gt;)</CodeWrapper>
            <p>
                NOTICE: A stage member does not contain user related information but stores a reference to an user.
                To get the user related data, you'll eventually want to perform a useUser() for each stage member.
            </p>
            <h2>Result</h2>
            <h3>All groups</h3>
            <p>Format is: _id - name</p>
            <CodeWrapper>
                <ul>
                    {stageMembers.allIds.map(id => {
                        const stageMember = stageMembers.byId[id];
                        return (
                            <li key={stageMember._id}>
                                {stageMember._id} - {stageMember._id}
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
                    {stageMembersByStage.map(stageMember => {
                        return (
                            <li key={stageMember._id}>
                                {stageMember._id} - {stageMember._id}
                            </li>
                        )
                    })}
                </ul>
            </CodeWrapper>
            <h3>Single stage member</h3>
            <select onChange={(event) => setStageMemberId(event.target.value)}>
                {stageMembers.allIds.map(sId => {
                    const stageMember = stageMembers.byId[sId];
                    return (
                        <option key={stageMember._id} value={stageMember._id}>{stageMember._id}</option>
                    )
                })}
            </select>
            <CodeWrapper>
                <pre>
                {JSON.stringify(stageMember, null, 2)}
                </pre>
            </CodeWrapper>
        </div>
    )
}
export default StageMembers;
