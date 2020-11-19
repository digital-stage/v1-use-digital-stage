import React, {useEffect, useState} from "react";
import {useStages} from "../..";
import CodeWrapper from "../components/CodeWrapper";
import {useStage} from "../..";

const Stages = () => {
    const stages = useStages();
    const [stageId, setStageId] = useState<string>();
    const stage = useStage(stageId);

    useEffect(() => {
        if( !stageId )
            setStageId(stages.allIds[0])
    }, [stages])

    return (
        <div>
            <h2>Usage</h2>
            <p>
                Get all available stages by using:
            </p>
            <CodeWrapper>const stages = useStages()</CodeWrapper>
            <p>
                Get single stage by using:
            </p>
            <CodeWrapper>const stage = useStage(&lt;stageId&gt;)</CodeWrapper>
            <h2>Result</h2>
            <p>Format is: _id - name</p>
            <CodeWrapper>
                <ul>
                    {stages.allIds.map(id => {
                        const stage = stages.byId[id];
                        return (
                            <li key={stage._id}>
                                {stage._id} - {stage.name}
                            </li>
                        )
                    })}
                </ul>
            </CodeWrapper>
            <h3>Single group</h3>
            <select onChange={(event) => setStageId(event.target.value)} value={stageId}>
                {stages.allIds.map(sId => {
                    const stage = stages.byId[sId];
                    return (
                        <option key={stage._id} value={stage._id}>{stage.name}</option>
                    )
                })}
            </select>
            <CodeWrapper>
                {JSON.stringify(stage, null, 2)}
            </CodeWrapper>
        </div>
    )
}
export default Stages;
