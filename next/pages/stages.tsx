import React, {useCallback, useEffect, useState} from "react";
import {styled, withStyleDeep} from "styletron-react";
import Container from "../components/ui/Container";
import Accordion from "../components/ui/Accordion";
import {useCurrentGroupId, useCurrentStageId, useGroups, useStageActions, useStages} from "use-digital-stage";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Button from "../components/ui/Button";
import Notification from "../components/ui/Notification";
import useStageJoiner from "../lib/useStageJoiner";
import useAuth from "../lib/useAuth";
import {useRouter} from "next/router";
import {breakpoints, colors} from "../components/ui/Theme";


const List = styled("div", {
    display: "flex",
    flexDirection: "column",
    paddingBottom: '8rem',
    [breakpoints.TABLET]: {
        paddingBottom: '16rem',
    }
})
const ListItem = styled("div", {})

const StageHeader = styled("div", {
    width: '100%',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    paddingTop: '.2rem',
    paddingBottom: '.2rem',
    fontSize: '1.2rem',
    backgroundColor: colors.background.darker,
})
const GroupContainer = styled("div", {
    padding: '1rem',
    backgroundColor: colors.background.lighter,
    borderColor: colors.background.darker,
    borderSize: '1px',
    borderStyle: 'solid',
    borderTopWidth: 0,
    display: 'flex',
    flexDirection: 'row',
})
const GroupTitle = styled("div", {
    flexGrow: 2
})
const GroupActions = styled("div", {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
})

const JoinButton = withStyleDeep(Button, {
    backgroundColor: colors.background.active
});
const LeaveButton = withStyleDeep(Button, {
    backgroundColor: colors.background.record,
});

const generateLink = (stageId: string, groupId: string, password: string | null) => {
    const port: string = window.location.port ? `:${window.location.port}` : '';
    return `${window.location.protocol}/${window.location.hostname}${port}/join/${stageId}/${groupId}`;
}

const Stages = () => {
    const stages = useStages();
    const groups = useGroups();
    const {requestJoin} = useStageJoiner();
    const stageActions = useStageActions();
    const [copied, setCopied] = useState<boolean>(false);
    const currentStageId = useCurrentStageId();
    const currentGroupId = useCurrentGroupId();
    const auth = useAuth();
    const {push} = useRouter();

    useEffect(() => {
        if (!auth.loading && !auth.user) {
            push("/auth/login")
        }
    }, [push, auth]);

    useEffect(() => {
        if (copied) {
            const timeout = setTimeout(() => {
                setCopied(false);
            }, 1000);
            return () => {
                clearTimeout(timeout);
            }
        }
    }, [copied]);

    const leaveStage = useCallback(() => {
        stageActions.leaveStage();
    }, [stageActions])

    console.log(stages.allIds);

    return (
        <Container>
            <h1>My stages</h1>
            <List>
                {stages.allIds.map((id) => stages.byId[id]).map((stage) => (
                    <ListItem key={stage._id}>
                        <Accordion
                            expanded={true}
                            header={<StageHeader>{stage.name}</StageHeader>}
                        >
                            {groups.byStage[stage._id] ? groups.byStage[stage._id].map(id => groups.byId[id]).map(group => (
                                <GroupContainer key={group._id}>
                                    <GroupTitle>
                                        {group.name}
                                    </GroupTitle>
                                    <GroupActions>
                                        <CopyToClipboard text={generateLink(stage._id, group._id, stage.password)}
                                                         onCopy={() => setCopied(true)}>
                                            <Button>Copy invite link</Button>
                                        </CopyToClipboard>
                                        {currentStageId === stage._id
                                        && currentGroupId === group._id ? (
                                            <LeaveButton onClick={leaveStage}>Leave</LeaveButton>
                                        ) : (
                                            <JoinButton onClick={() => {
                                                requestJoin(stage._id, group._id)
                                            }}>Join</JoinButton>
                                        )}
                                    </GroupActions>
                                </GroupContainer>
                            )) : null}
                        </Accordion>
                    </ListItem>
                ))}
                {copied ? <Notification>Link copied!</Notification> : null}
            </List>
        </Container>
    )
}
export default Stages;
