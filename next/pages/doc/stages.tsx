import React, {useEffect, useState} from "react";
import CodeWrapper from "../../components/ui/CodeWrapper";
import {useCurrentUser, useStage, useStageActions, useStages} from "../../..";
import Button from "../../components/ui/Button";
import AddStagePanel from "../../components/docs/AddStagePanel";
import DocsWrapper from "../../components/docs/DocsWrapper";

const Stages = () => {
    const user = useCurrentUser();
    const stages = useStages();
    const [stageId, setStageId] = useState<string>();
    const stage = useStage(stageId);
    const {createStage, removeStage} = useStageActions();

    useEffect(() => {
        if (!stageId)
            setStageId(stages.allIds[0])
    }, [stages])

    return (
        <DocsWrapper>
            <h2>Usage</h2>
            <h3>Fetch</h3>
            <p>
                Get all available stages by using:
            </p>
            <CodeWrapper>const stages = useStages()</CodeWrapper>
            <p>
                Get single stage by using:
            </p>
            <CodeWrapper>const stage = useStage(&lt;stageId&gt;)</CodeWrapper>
            <h3>Update</h3>
            <p>
                Use actions to create, modify or delete any stage.
                You can only modify or delete stages you're admin of, so you may check this before calling any update function:
            </p>
            <CodeWrapper>
                const &#123; actions &#125; = useDigitalStage()<br/>
                actions.createStage("Stage name", "my-password")
            </CodeWrapper>
            <CodeWrapper>
                const &#123; actions, user &#125; = useDigitalStage()<br/>
                const stage = useStage(&lt;stageId&gt;);<br/><br/>
                if( stage.admins.find(adminId =&gt; adminId === user._id)) &#123;<br/>
                &nbsp;&nbsp;actions.updateStage(&lt;stageId&gt;, {JSON.stringify({
                name: "My stage name"
            })})<br/>
                &#125;
            </CodeWrapper>
            <CodeWrapper>
                const &#123;actions&#125; = useDigitalStage()<br/>
                const stage = useStage(&lt;stageId&gt;);<br/><br/>
                if( stage.admins.find(adminId =&gt; adminId === user._id)) &#123;<br/>
                &nbsp;&nbsp;actions.deleteStage(&lt;stageId&gt;)<br/>
                &#125;
            </CodeWrapper>
            <h2>Result</h2>
            <p>Format is: _id - name</p>
            <CodeWrapper>
                <ul>
                    {stages.allIds.map(id => {
                        const stage = stages.byId[id];
                        return (
                            <li key={stage._id}>
                                {stage._id} - {stage.name}
                                <Button
                                    disabled={!user || !stage.admins.find(adminId => adminId === user._id)}
                                    onClick={() => removeStage(id)}>
                                    delete
                                </Button>
                            </li>
                        )
                    })}
                </ul>
            </CodeWrapper>
            <AddStagePanel onClick={(stageName) => createStage(stageName, null)}/>
            <h3>Single stage</h3>
            <select onChange={(event) => setStageId(event.target.value)} value={stageId}>
                {stages.allIds.map(sId => {
                    const stage = stages.byId[sId];
                    return (
                        <option key={stage._id} value={stage._id}>{stage.name}</option>
                    )
                })}
            </select>
            <CodeWrapper>
                <pre>
                {JSON.stringify(stage, null, 2)}
                </pre>
            </CodeWrapper>
        </DocsWrapper>
    )
}
export default Stages;
