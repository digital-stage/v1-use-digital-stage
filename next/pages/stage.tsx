import {
    useSelector,
} from "use-digital-stage";
import {styled} from "styletron-react";
import React, {useState} from "react";
import GroupGrid from "../components/stage/GroupGrid";
import Layout from "../components/global/Layout";
import Button from "../components/ui/Button";

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
        <Layout>
            <h1>{stage?.name}</h1>
            <Button onClick={() => setFilterOffline(prev => !prev)}>
                Toggle offline
            </Button>
            <StageWrapper>
                {groups.map(group => <GroupGrid filterOffline={filterOffline} key={group._id} group={group}/>)}
            </StageWrapper>
        </Layout>
    )
}
export default Stage;
