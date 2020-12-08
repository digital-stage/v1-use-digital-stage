import React, {useEffect, useState} from "react";
import CodeWrapper from "../../components/ui/CodeWrapper";
import AddGroupPanel from "../../components/docs/AddGroupPanel";
import {useCurrentUser, useGroup, useGroups, useGroupsByStage, useStageActions, useStages} from "use-digital-stage";
import Button from "../../components/ui/Button";
import DocsWrapper from "../../components/docs/DocsWrapper";

const Groups = () => {
    const {createGroup, removeGroup} = useStageActions();
    const user = useCurrentUser();
    const groups = useGroups();
    const stages = useStages();
    const [stageId, setStageId] = useState<string>();
    const [groupId, setGroupId] = useState<string>();
    const groupsByStage = useGroupsByStage(stageId);
    const group = useGroup(groupId);

    useEffect(() => {
        if (!stageId)
            setStageId(stages.allIds[0])
    }, [stages])

    useEffect(() => {
        if (!groupId)
            setGroupId(groups.allIds[0])
    }, [groups])

    return (
        <DocsWrapper>
            <h2>Usage</h2>
            <h3>Fetch</h3>
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
            <h3>Update</h3>
            <p>
                Use actions to create, modify or delete any group.
                You can only modify or delete groups of stages you're admin of, so you may check this before calling any
                update function:
            </p>
            <CodeWrapper>
                const &#123; actions, user &#125; = useDigitalStage()<br/>
                const stage = useStage(&lt;stageId&gt;);<br/><br/>
                if( stage.admins.find(adminId =&gt; adminId === user._id)) &#123;<br/>
                &nbsp;&nbsp;actions.createGroup(stage._id, "My new group")<br/>
                &#125;
            </CodeWrapper>
            <CodeWrapper>
                const &#123; actions, user &#125; = useDigitalStage()<br/>
                const group = useStage(&lt;groupId&gt;);<br/>
                const stage = useGroup(group.stageId);<br/><br/>
                if( stage.admins.find(adminId =&gt; adminId === user._id)) &#123;<br/>
                &nbsp;&nbsp;actions.updateGroup(group._id, {JSON.stringify({
                name: "Another group name"
            })})<br/>
                &#125;
            </CodeWrapper>
            <CodeWrapper>
                const &#123;actions&#125; = useDigitalStage()<br/>
                const group = useStage(&lt;groupId&gt;);<br/>
                const stage = useGroup(group.stageId);<br/><br/>
                if( stage.admins.find(adminId =&gt; adminId === user._id)) &#123;<br/>
                &nbsp;&nbsp;actions.deleteGroup(group._id)<br/>
                &#125;
            </CodeWrapper>
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
                        if (!group) {
                            console.log("UNDEFINEF?")
                            return undefined
                        }
                        return (
                            <li key={group._id}>
                                {group._id} - {group.name}
                                <Button
                                    disabled={!user || !stages.byId[stageId].admins.find(adminId => adminId === user._id)}
                                    onClick={() => removeGroup(group._id)}>
                                    delete
                                </Button>
                            </li>
                        )
                    })}
                </ul>
            </CodeWrapper>
            <AddGroupPanel onClick={(groupName) => createGroup(stageId, groupName)}/>
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
                <pre>
                {JSON.stringify(group, null, 2)}
                </pre>
            </CodeWrapper>
        </DocsWrapper>
    )
}
export default Groups;
