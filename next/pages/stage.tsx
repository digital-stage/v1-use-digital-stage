import {
    useSelector,
} from "use-digital-stage";
import {styled} from "styletron-react";
import React, {useState} from "react";
import GroupGrid from "../components/stage/GroupGrid";
import Button from "../components/ui/Button";
import Headline from "../components/theme/Headline";
import StageLayout from "../components/theme/StageLayout";

const StageWrapper = styled("div", {
    width: '100%',
    minHeight: '100vh',
    color: '#fff',
});

const Stage = () => {
    const [filterOffline, setFilterOffline] = useState<boolean>(false);
    const stage = useSelector(state => state.global.stageId ? state.stages.byId[state.global.stageId] : undefined)
    const groups = useSelector(state =>
        state.global.stageId && state.groups.byStage[state.global.stageId] ?
            state.groups.byStage[state.global.stageId].map(id => state.groups.byId[id]) : []
    );

    return (
        <StageLayout>
            <Headline variant="h1">{stage?.name}</Headline>
            <Button onClick={() => setFilterOffline(prev => !prev)}>
                Toggle offline
            </Button>
            <StageWrapper>
                {groups.map(group => <GroupGrid filterOffline={filterOffline} key={group._id} group={group}/>)}
            </StageWrapper>
        </StageLayout>
    )
}
export default Stage;
