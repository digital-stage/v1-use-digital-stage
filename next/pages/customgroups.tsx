import React, {useEffect, useState} from "react";
import CodeWrapper from "../components/ui/CodeWrapper";
import Button from "../components/ui/Button";
import useDigitalStage, {useCurrentStageId, useCustomGroups, useGroupsByStage} from "../..";
import RangeSlider from "../components/ui/RangeSlider";

const StageMembers = () => {
    const {actions} = useDigitalStage();

    const customGroups = useCustomGroups();

    const currentStageId = useCurrentStageId();
    const groups = useGroupsByStage(currentStageId);
    const [groupId, setGroupId] = useState<string>();

    useEffect(() => {
        if (!groupId && groups.length > 0)
            setGroupId(groups[0]._id)
    }, [groups])

    return (
        <div>
            <h2>Usage</h2>
            <h3>Fetch</h3>
            <p>
                Custom stage members are only delivered for the active stage.
                Get all available custom stage members by using:
            </p>
            <CodeWrapper>const customStageMembers = useCustomStageMembers()</CodeWrapper>
            <h3>Update</h3>
            <p>
                Create, modify or delete custom stage members by using:
            </p>
            <CodeWrapper>
                const &#123;actions&#125; = useDigitalStage()<br/>
                const stageMember = useStageMember(&lt;stageMemberId&gt;);<br/>
                actions.
            </CodeWrapper>
            <h2>Result</h2>
            <h3>All custom stage members</h3>
            <p>Format is: _id - name</p>
            <CodeWrapper>
                <ul>
                    {customGroups.allIds.map(id => {
                        const customGroup = customGroups.byId[id];
                        return (
                            <li key={customGroup._id}>
                                {customGroup._id}
                            </li>
                        )
                    })}
                </ul>
            </CodeWrapper>
            <h3>Single custom stage member</h3>
            <select onChange={(event) => setGroupId(event.target.value)}>
                {groups.map(group => {
                    return (
                        <option key={group._id}
                                value={group._id}>{group.name || group._id}</option>
                    )
                })}
            </select>
            {customGroups.byGroup[groupId] ? (
                <CodeWrapper>
                    <pre>
                             {JSON.stringify(customGroups.byId[customGroups.byGroup[groupId]], null, 2)}
                    </pre>
                    <RangeSlider
                        volume={customGroups.byId[customGroups.byGroup[groupId]].volume}
                        onChange={(v) => {
                            actions.setCustomGroup(
                                groupId, v, true
                            );
                        }}/>
                    <Button
                        onClick={() =>
                            actions.removeCustomGroup(customGroups.byGroup[groupId])
                        }>delete</Button>
                </CodeWrapper>
            ) : (
                <Button onClick={() => actions.setCustomGroup(groupId, 0.2, false)}>
                    Add
                </Button>
            )}


        </div>
    )
}
export default StageMembers;
