import React from "react";
import {useSelector} from "react-redux";
import CodeWrapper from "../components/ui/CodeWrapper";

const State = () => {
    const state = useSelector(state => state);

    return (
        <CodeWrapper>
                    <pre>
                        {JSON.stringify(state, null, 2)}
                    </pre>
        </CodeWrapper>
    )
}
export default State;
