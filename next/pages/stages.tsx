import React, {useCallback, useEffect, useState} from "react";
import {styled} from "styletron-react";
import Container from "../components/ui/Container";
import Accordion from "../components/ui/Accordion";
import {useCurrentGroupId, useCurrentStageId, useGroups, useStageActions, useStages} from "use-digital-stage";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Button from "../components/ui/Button";
import Notification from "../components/ui/Notification";
import useStageJoiner from "../lib/useStageJoiner";
import useAuth from "../lib/useAuth";
import {useRouter} from "next/router";


const List = styled("div", {
    display: "flex",
    flexDirection: "column",
})
const ListItem = styled("div", {})

const StageHeader = styled("div", {
    width: '100%',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    paddingTop: '.2rem',
    paddingBottom: '.2rem',
    backgroundColor: '#ccc'
})
const GroupContainer = styled("div", {
    padding: '1rem',
    backgroundColor: '#eee',
    display: 'flex',
    flexDirection: 'row',
})
const GroupTitle = styled("div", {
    flexGrow: 2
})
const GroupActions = styled("div", {
    flexGrow: 1
})

const generateLink = (stageId: string, groupId: string, password: string | null) => {
    const port: string = window.location.port ? `:${window.location.port}` : '';
    //const addPassword = password ? '?password=' + password : "";
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
                                            <Button onClick={leaveStage}>Leave</Button>
                                        ) : (
                                            <Button onClick={() => {
                                                requestJoin(stage._id, group._id)
                                            }}>Join</Button>
                                        )}
                                    </GroupActions>
                                </GroupContainer>
                            )) : null}
                        </Accordion>
                    </ListItem>
                ))}
            </List>
            {copied ? <Notification>Link copied!</Notification> : null}
        </Container>
    )
}
export default Stages;
