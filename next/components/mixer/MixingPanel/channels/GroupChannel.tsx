import * as React from 'react';
import {styled} from 'styletron-react';
import StageMemberChannel from './StageMemberChannel';
import ChannelStrip from '../../ChannelStrip';
import {CustomGroup, useGroup, useIsStageAdmin, useSelector, useStageActions} from "../../../../../dist";
import Button from "../../../ui/Button";
import useStageWebAudio from "../../../../lib/useStageWebAudio";
import {useCallback} from "react";

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
    const isAdmin = useIsStageAdmin();
    const group = useGroup(groupId);
    const customGroup = useSelector<CustomGroup>((state) =>
        state.customGroups.byGroup[groupId]
            ? state.customGroups.byId[state.customGroups.byGroup[groupId]]
            : undefined
    );
    const stageMemberIds = useSelector<string[]>((state) =>
        state.stageMembers.byGroup[groupId] ? state.stageMembers.byGroup[groupId] : []
    );

    const {byGroup} = useStageWebAudio();

    const {updateGroup, setCustomGroup, removeCustomGroup} = useStageActions();

    const [expanded, setExpanded] = React.useState<boolean>();

    const handleVolumeChange = useCallback((volume: number, muted: boolean) => {
        console.debug(group._id,volume, muted)
        if( isAdmin ) {
            updateGroup(group._id, {
                volume,
                muted,
            })
        }
    }, [isAdmin, group, updateGroup]);

    const handleCustomVolumeChange = useCallback((volume: number, muted: boolean) => {
        setCustomGroup(group._id, {volume, muted})
    }, [group, setCustomGroup]);

    const handleCustomVolumeReset = useCallback(() => {
        if( customGroup )
            removeCustomGroup(customGroup._id);
    }, [customGroup, setCustomGroup]);

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
                    analyser={byGroup[groupId] ? byGroup[groupId].analyserNodeL : undefined}
                    volume={group.volume}
                    muted={group.muted}
                    customVolume={customGroup ? customGroup.volume : undefined}
                    customMuted={customGroup ? customGroup.muted : undefined}
                    onVolumeChanged={handleVolumeChange}
                    onCustomVolumeChanged={handleCustomVolumeChange}
                    onCustomVolumeReset={handleCustomVolumeReset}
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
