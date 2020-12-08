import {
    Group,
    LocalConsumer,
    StageMemberWithUserData,
    useSelector,
    useStageMembersByGroup
} from "use-digital-stage";
import VideoPlayer from "../components/ui/VideoPlayer";
import {styled} from "styletron-react";
import {breakpoints} from "../components/ui/Theme";
import React from "react";

const StageMemberBox = styled("div", {
    position: "relative",
    width: "50vw",
    height: "50vw",
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    overflow: "hidden",
    border: '1px solid white',
    [breakpoints.TABLET]: {
        width: "25vw",
        height: "25vw"
    },
    [breakpoints.DESKTOP]: {
        width: "12.5vw",
        height: "12.5vw"
    },
});
const StageMemberVideoPlayer = styled(VideoPlayer, {
    width: 'auto',
    height: '100%'
});
const StageMemberTitle = styled("div", {
    position: "absolute",
    color: "#fff",
    top: 0,
    left: 0,
    width: "100%"
});

const StageMemberContainer = (props: {
    stageMember: StageMemberWithUserData
}) => {
    const {stageMember} = props;
    const videoConsumers = useSelector<LocalConsumer[]>(state => state.videoConsumers.byStageMember[stageMember._id]
        ? state.videoConsumers.byStageMember[stageMember._id].map(id => state.videoConsumers.byId[id])
        : []
    )

    return (
        <StageMemberBox>
            <StageMemberVideoPlayer consumers={videoConsumers}/>
            <StageMemberTitle>{stageMember.name || stageMember._id}</StageMemberTitle>
        </StageMemberBox>
    )
}

const GroupWrapper = styled("div", {
    color: '#fff',
    backgroundColor: "#000",
    border: '1px solid blue'
});
const GroupTitle = styled("div", {
    color: '#fff',
    backgroundColor: "#000",
    fontSize: "2rem"
});
const GroupGrid = (props: {
    group: Group
}) => {
    const {group} = props;
    const stageMembers = useStageMembersByGroup(group._id)

    return (
        <GroupWrapper>
            <GroupTitle>{group.name}</GroupTitle>
            {stageMembers.map(stageMember => <StageMemberContainer key={stageMember._id} stageMember={stageMember}/>)}
        </GroupWrapper>
    )
}

const StageWrapper = styled("div", {
    width: '100%',
    minHeight: '100vh',
    color: '#fff',
    backgroundColor: "#000"
});
const Stage = () => {
    const groups = useSelector(state =>
        state.global.stageId && state.groups.byStage[state.global.stageId] ?
            state.groups.byStage[state.global.stageId].map(id => state.groups.byId[id]) : []
    );

    return (
        <StageWrapper>
            STAGE
            {groups.map(group => <GroupGrid key={group._id} group={group}/>)}
        </StageWrapper>
    )
}
export default Stage;
