import React from "react";
import {useSelector} from "react-redux";
import CodeWrapper from "../../components/ui/CodeWrapper";
import DocsWrapper from "../../components/docs/DocsWrapper";

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
