import {
    useSelector,
} from "use-digital-stage";
import {styled} from "styletron-react";
import React from "react";
import GroupGrid from "../components/stage/GroupGrid";
import LeaveStageButton from "../components/global/LeaveStageButton";

const StageWrapper = styled("div", {
    width: '100%',
    minHeight: '100vh',
    color: '#fff',
});
const Stage = () => {
    const groups = useSelector(state =>
        state.global.stageId && state.groups.byStage[state.global.stageId] ?
            state.groups.byStage[state.global.stageId].map(id => state.groups.byId[id]) : []
    );

    return (
        <>
            <StageWrapper>
                {groups.map(group => <GroupGrid key={group._id} group={group}/>)}
            </StageWrapper>
            <LeaveStageButton/>
        </>
    )
}
export default Stage;
