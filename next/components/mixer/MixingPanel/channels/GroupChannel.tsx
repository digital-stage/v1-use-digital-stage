import * as React from 'react';
import {styled} from 'styletron-react';
import StageMemberChannel from './StageMemberChannel';
import ChannelStrip from '../../ChannelStrip';
import {CustomGroup, useGroup, useIsStageAdmin, useSelector, useStageActions} from "use-digital-stage";
import useStageWebAudio from "../../../../lib/useStageWebAudio";
import {useCallback} from "react";
import {colors} from "../../../ui/Theme";
import useColors from "../../../../lib/useColors";
import {Property} from "csstype";

const PanelRow = styled("div", {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: '20px',
    marginRight: '1rem',
    backgroundColor: colors.background.dark
});
const Column = styled('div', {
    paddingLeft: '1rem',
    paddingRight: '1rem',
    paddingTop: '3rem',
    paddingBottom: '3rem',
    height: '100%'
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
    backgroundColor: colors.background.default,
    borderRadius: '20px',
    height: '100%',
});
const ColumnWithChildren = styled('div', {
    height: '100%',
});
const Header = styled('div', (props: { $color?: Property.BackgroundColor }) => ({
    width: '100%',
    height: '64px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '10px',
    backgroundColor: props.$color,
}));
const HeaderButton = styled("div", {
    width: '100%',
    height: '64px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: "pointer"
});

const GroupChannel = (props: { groupId: string }) => {
    const {groupId} = props;
    const color = useColors(groupId);
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

    const stageActions = useStageActions();

    const [expanded, setExpanded] = React.useState<boolean>();

    const handleVolumeChange = useCallback((volume: number, muted: boolean) => {
        console.debug(group._id, volume, muted)
        if (isAdmin) {
            stageActions.updateGroup(group._id, {
                volume,
                muted,
            })
        }
    }, [isAdmin, group, stageActions]);

    const handleCustomVolumeChange = useCallback((volume: number, muted: boolean) => {
        stageActions.setCustomGroup(group._id, {volume, muted})
    }, [group, stageActions]);

    const handleCustomVolumeReset = useCallback(() => {
        if (customGroup)
            stageActions.removeCustomGroup(customGroup._id);
    }, [customGroup, stageActions]);

    return (
        <PanelRow>
            <Column>
                <ChannelStrip
                    addHeader={
                        <Header $color={color?.toProperty()}>
                            {stageMemberIds.length > 0 ? (
                                <HeaderButton
                                    onClick={() => setExpanded((prev) => !prev)}
                                >
                                    <h3>{group.name}</h3>
                                    {expanded ? <img src="/static/chevron_left-18dp.svg" alt="collapse"/> :
                                        <img src="/static/chevron_right-18dp.svg" alt="expand"/>}
                                </HeaderButton>
                            ) : (
                                <h3>{group.name}</h3>
                            )}
                        </Header>
                    }
                    analyserL={byGroup && byGroup[groupId] ? byGroup[groupId].analyserNodeL : undefined}
                    analyserR={byGroup && byGroup[groupId] ? byGroup[groupId].analyserNodeR : undefined}
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
                                <StageMemberChannel key={id}
                                                    color={color?.luminance(color.l + 6)}
                                                    stageMemberId={id}/>
                            </ColumnWithChildren>
                        ))}
                    </InnerRow>
                </Row>
            )}
        </PanelRow>
    );
};
export default GroupChannel;
