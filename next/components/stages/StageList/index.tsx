import Accordion from "../../ui/Accordion";
import Button from "../../ui/Button";
import Notification from "../../ui/Notification";
import React, {useCallback, useEffect, useState} from "react";
import {styled, withStyleDeep} from "styletron-react";
import {breakpoints, colors} from "../../ui/Theme";
import useStageJoiner from "../../../lib/useStageJoiner";
import {
    useCurrentGroupId,
    useCurrentStageId,
    useGroups,
    useStageActions,
    useStages,
    useCurrentUser
} from "use-digital-stage";
import CopyToClipboard from "react-copy-to-clipboard";
import CreateStageModal from "./CreateStageModal";
import useModal from "../../../lib/useModal";
import {RiAddCircleFill, RiDeleteBinLine} from 'react-icons/ri';
import DeleteStageModal from "./DeleteStageModal";
import CreateGroupModal from "./CreateGroupModal";
import DeleteGroupModal from "./DeleteGroupModal";

const ActionBar = styled("div", {
    display: 'flex',
    width: '100%',
    paddingBottom: '1rem'
})

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
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    paddingTop: '.2rem',
    paddingBottom: '.2rem',
    backgroundColor: colors.background.darker,
    flexWrap: 'wrap',
    [breakpoints.TABLET]: {
        flexWrap: 'nowrap',
    }
})
const StageTitle = styled("div", {
    fontSize: '1.2rem',
    flexGrow: 1,
    [breakpoints.TABLET]: {
        width: 'auto'
    }
})
const StageActions = styled("div", {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
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

const StageList = () => {
    const user = useCurrentUser();
    const stages = useStages();
    const groups = useGroups();
    const stageActions = useStageActions();
    const [copied, setCopied] = useState<boolean>(false);
    const currentStageId = useCurrentStageId();
    const currentGroupId = useCurrentGroupId();
    const {requestJoin} = useStageJoiner();
    const {setModal} = useModal();

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

    return (
        <>
            <ActionBar>
                <Button
                    $border={true}
                    $round={true}
                    onClick={() => {
                        setModal(<CreateStageModal
                            onClose={() => setModal(undefined)}
                        />)
                    }}
                >
                    Create stage
                </Button>
            </ActionBar>
            <List>
                {stages.allIds.map((id) => stages.byId[id]).map((stage) => {
                    const isCurrentUserAdmin = stage.admins.indexOf(user._id) !== -1;
                    return (
                        <ListItem key={stage._id}>
                            <Accordion
                                expanded={true}
                                header={
                                    <StageHeader>
                                        <StageTitle>
                                            {stage.name}
                                        </StageTitle>
                                        <StageActions>
                                            {isCurrentUserAdmin && (
                                                <>
                                                    <Button
                                                        $round={true}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setModal(<CreateGroupModal
                                                                stage={stage}
                                                                onClose={() => setModal(undefined)}
                                                            />)
                                                        }}>
                                                        + group
                                                    </Button>
                                                    <Button
                                                        $round={true}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setModal(<DeleteStageModal
                                                                stage={stage}
                                                                onClose={() => setModal(undefined)}
                                                            />)
                                                        }}>
                                                        delete
                                                    </Button>
                                                </>
                                            )}
                                        </StageActions>
                                    </StageHeader>
                                }
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
                                            {isCurrentUserAdmin && (
                                                <>
                                                    <Button
                                                        $round={true}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setModal(<DeleteStageModal
                                                                stage={stage}
                                                                onClose={() => setModal(undefined)}
                                                            />)
                                                        }}>
                                                        delete
                                                    </Button>
                                                    <Button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setModal(<DeleteGroupModal
                                                                group={group}
                                                                onClose={() => setModal(undefined)}
                                                            />)
                                                        }}>
                                                        Delete
                                                    </Button>
                                                </>
                                            )}
                                        </GroupActions>
                                    </GroupContainer>
                                )) : null}
                            </Accordion>
                        </ListItem>
                    );
                })}
                {copied ? <Notification>Link copied!</Notification> : null}
            </List>
        </>
    );
}
export default StageList;
