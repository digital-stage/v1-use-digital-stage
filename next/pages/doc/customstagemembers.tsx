import React, {useEffect, useState} from "react";
import CodeWrapper from "../../components/ui/CodeWrapper";
import Button from "../../components/ui/Button";
import {useStageActions, useCurrentStageId, useCustomStageMembers, useStageMembersByStage} from "../../..";
import RangeSlider from "../../components/ui/RangeSlider";
import DocsWrapper from "../../components/docs/DocsWrapper";

const StageMembers = () => {
    const {setCustomStageMember, removeCustomStageMember} = useStageActions();

    const customStageMembers = useCustomStageMembers();

    const currentStageId = useCurrentStageId();
    const stageMembers = useStageMembersByStage(currentStageId);
    const [stageMemberId, setStageMemberId] = useState<string>();

    useEffect(() => {
        if (!stageMemberId && stageMembers.length > 0)
            setStageMemberId(stageMembers[0]._id)
    }, [stageMembers])

    return (
        <DocsWrapper>
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
                    {customStageMembers.allIds.map(id => {
                        const customStageMember = customStageMembers.byId[id];
                        return (
                            <li key={customStageMember._id}>
                                {customStageMember._id}
                            </li>
                        )
                    })}
                </ul>
            </CodeWrapper>
            <h3>Single custom stage member</h3>
            <select onChange={(event) => setStageMemberId(event.target.value)}>
                {stageMembers.map(stageMember => {
                    return (
                        <option key={stageMember._id}
                                value={stageMember._id}>{stageMember.name || stageMember._id}</option>
                    )
                })}
            </select>
            {customStageMembers.byStageMember[stageMemberId] ? (
                <CodeWrapper>
                    <pre>
                             {JSON.stringify(customStageMembers.byId[customStageMembers.byStageMember[stageMemberId]], null, 2)}
                    </pre>
                    <RangeSlider
                        volume={customStageMembers.byId[customStageMembers.byStageMember[stageMemberId]].volume}
                        onChange={(v) => {
                            setCustomStageMember(
                                stageMemberId, {
                                    volume: v
                                }
                            );
                        }}/>
                    <Button
                        onClick={() => {
                            const id = customStageMembers.byStageMember[stageMemberId];
                            console.log("Removing " + id)
                            removeCustomStageMember(customStageMembers.byStageMember[stageMemberId])
                        }}>delete</Button>
                </CodeWrapper>
            ) : (
                <Button onClick={() => setCustomStageMember(stageMemberId, {
                    volume: 0
                })}>
                    Add
                </Button>
            )}


        </DocsWrapper>
    )
}
export default StageMembers;
