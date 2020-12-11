import React from "react";
import CodeWrapper from "../../components/ui/CodeWrapper";
import DocsWrapper from "../../components/docs/DocsWrapper";
import {useSelector} from "use-digital-stage";

const State = () => {
    const state = useSelector(state => state);

    return (
        <DocsWrapper>
            <CodeWrapper>
                    <pre>
                        {JSON.stringify(state, null, 2)}
                    </pre>
            </CodeWrapper>
        </DocsWrapper>
    )
}
export default State;
