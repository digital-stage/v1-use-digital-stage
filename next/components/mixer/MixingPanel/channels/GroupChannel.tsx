import * as React from 'react';
import {styled} from 'styletron-react';
import StageMemberChannel from './StageMemberChannel';
import ChannelStrip from '../../ChannelStrip';
import {CustomGroup, useGroup, useIsStageAdmin, useSelector, useStageActions} from "use-digital-stage";
import Button from "../../../ui/Button";
import {useStageWebAudio} from "../../../../lib/useStageWebAudio";

const PanelRow = styled("div", {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: '20px',
    marginRight: '1rem',
});
const Column = styled('div', {
    paddingLeft: '1rem',
    paddingRight: '1rem',
    paddingTop: '3rem',
    paddingBottom: '3rem',
    height: '100%',
});
const Row = styled('div', {
    paddingTop: '1rem',
    paddingBottom: '1rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
});
const InnerRow = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'rgba(130,100,130,1)',
    borderRadius: '20px',
    height: '100%',
});
const ColumnWithChildren = styled('div', {
    height: '100%',
});
const Header = styled('div', {
    width: '100%',
    height: '64px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

const GroupChannel = (props: { groupId: string }) => {
    const {groupId} = props;
    const isAdmin: boolean = useIsStageAdmin();
    const group = useGroup(groupId);
    const customGroup = useSelector<CustomGroup>((state) =>
        state.customGroups.byGroup[groupId]
            ? state.customGroups.byId[state.customGroups.byGroup[groupId]]
            : undefined
    );
    const stageMemberIds = useSelector<string[]>((state) =>
        state.stageMembers.byGroup[groupId] ? state.stageMembers.byGroup[groupId] : []
    );

    const {updateGroup, setCustomGroup, removeCustomGroup} = useStageActions();
    const {byGroup} = useStageWebAudio();

    const [expanded, setExpanded] = React.useState<boolean>();

    return (
        <PanelRow>
            <Column>
                <ChannelStrip
                    addHeader={
                        <Header>
                            {stageMemberIds.length > 0 ? (
                                <Button
                                    onClick={() => setExpanded((prev) => !prev)}
                                >
                                    <h3>{group.name}</h3>
                                    {expanded ? <img src="/static/chevron_left-white-18dp.svg" alt="collapse"/> : <img src="/static/chevron_right-white-18dp.svg" alt="expand"/>}
                                </Button>
                            ) : (
                                <h3>{group.name}</h3>
                            )}
                        </Header>
                    }
                    analyser={byGroup[groupId] ? byGroup[groupId].analyserNode : undefined}
                    volume={group.volume}
                    muted={group.muted}
                    customVolume={customGroup ? customGroup.volume : undefined}
                    customMuted={customGroup ? customGroup.muted : undefined}
                    onVolumeChanged={
                        isAdmin
                            ? (volume, muted) => {
                                console.debug("onVolumeChanged");
                                updateGroup(group._id, {
                                    volume,
                                    muted,
                                })
                            }
                            : undefined
                    }
                    onCustomVolumeChanged={(volume, muted) => setCustomGroup(group._id, volume, muted)}
                    onCustomVolumeReset={() => {
                        if (removeCustomGroup) return removeCustomGroup(customGroup._id);
                        return null;
                    }}
                    isAdmin={isAdmin}
                />
            </Column>

            {expanded && (
                <Row>
                    <InnerRow>
                        {stageMemberIds.map((id, index) => (
                            <ColumnWithChildren key={index}>
                                <StageMemberChannel key={id} stageMemberId={id}/>
                            </ColumnWithChildren>
                        ))}
                    </InnerRow>
                </Row>
            )}
        </PanelRow>
    );
};
export default GroupChannel;
