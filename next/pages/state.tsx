
import React from "react";
import {useSelector} from "react-redux";
import CodeWrapper from "../components/CodeWrapper";

const State = () => {
    const state = useSelector(state => state);

    return (
        <div>
            <div>
                <CodeWrapper>{JSON.stringify(state, null, 2) }</CodeWrapper>
            </div>
        </div>
    )
}
export default State;
