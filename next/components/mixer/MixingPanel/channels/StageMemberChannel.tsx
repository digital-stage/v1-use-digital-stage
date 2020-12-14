import * as React from 'react';
import {styled} from 'styletron-react';
import ChannelStrip from '../../ChannelStrip';
import {useStageActions, CustomStageMember, useIsStageAdmin, useSelector, useStageMember} from "use-digital-stage";
import useStageWebAudio from "../../../../lib/useStageWebAudio";
import AudioProducerChannel from "./AudioProducerChannel";
import {useCallback} from "react";
import {colors} from "../../../ui/Theme";
import HSLColor from "../../../../lib/useColors/HSLColor";
import {Property} from "csstype";

const Panel = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
});
const Row = styled("div", {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    paddingTop: '1rem',
    paddingBottom: '1rem',
});
const InnerRow = styled("div", {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: colors.background.light,
    borderRadius: '20px',
    height: '100%',
});
const Column = styled('div', {
    paddingLeft: '1rem',
    paddingRight: '1rem',
    paddingTop: '2rem',
    paddingBottom: '2rem',
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

const StageMemberChannel = (props: { stageMemberId: string, color?: HSLColor }) => {
    const {stageMemberId, color} = props;
    const isAdmin: boolean = useIsStageAdmin();
    const stageMember = useStageMember(stageMemberId);
    const customStageMember = useSelector<CustomStageMember>((state) =>
        state.customStageMembers.byStageMember[props.stageMemberId]
            ? state.customStageMembers.byId[state.customStageMembers.byStageMember[props.stageMemberId]]
            : undefined
    );
    const audioProducers = useSelector<string[]>((state) =>
        state.audioProducers.byStageMember[props.stageMemberId]
            ? state.audioProducers.byStageMember[props.stageMemberId]
            : []
    );

    const {byStageMember} = useStageWebAudio();

    const stageActions = useStageActions();

    const [expanded, setExpanded] = React.useState<boolean>();

    const handleVolumeChange = useCallback((volume: number, muted: boolean) => {
        if (isAdmin) {
            stageActions.updateStageMember(stageMember._id, {
                volume,
                muted,
            })
        }
    }, [isAdmin, stageMember, stageActions]);

    const handleCustomVolumeChange = useCallback((volume: number, muted: boolean) => {
        stageActions.setCustomStageMember(stageMember._id, {
            volume,
            muted,
            x: stageMember.x,
            y: stageMember.y,
            rZ: stageMember.rZ
        })
    }, [stageMember, stageActions]);

    const handleCustomVolumeReset = useCallback(() => {
        if (customStageMember)
            stageActions.removeCustomStageMember(customStageMember._id);
    }, [customStageMember, stageActions]);

    return (
        <Panel>
            <Column>
                <ChannelStrip
                    addHeader={
                        <Header $color={color.toProperty()}>
                            {audioProducers.length > 0 ? (
                                <HeaderButton
                                    onClick={() => setExpanded((prev) => !prev)}
                                >
                                    <h3>{stageMember.name}</h3> {expanded ?
                                    <img src="/static/chevron_left-18dp.svg"/> :
                                    <img src="/static/chevron_right-18dp.svg"/>}
                                </HeaderButton>
                            ) : (
                                <h3>{stageMember.name}</h3>
                            )}
                        </Header>
                    }
                    volume={stageMember.volume}
                    muted={stageMember.muted}
                    customVolume={customStageMember ? customStageMember.volume : undefined}
                    customMuted={customStageMember ? customStageMember.muted : undefined}
                    analyserL={
                        byStageMember[stageMemberId] ? byStageMember[stageMemberId].analyserNodeL : undefined
                    }
                    analyserR={
                        byStageMember[stageMemberId] ? byStageMember[stageMemberId].analyserNodeR : undefined
                    }
                    onVolumeChanged={handleVolumeChange}
                    onCustomVolumeChanged={handleCustomVolumeChange}
                    onCustomVolumeReset={handleCustomVolumeReset}
                    isAdmin={isAdmin}
                />
            </Column>

            {expanded && audioProducers && (
                <Row>
                    <InnerRow color={color.toProperty()}>
                        {audioProducers.map((id, index) => (
                            <ColumnWithChildren key={index}>
                                <AudioProducerChannel
                                    key={id}
                                    audioProducerId={id}
                                    color={color?.luminance(color.l + 6)}
                                />
                            </ColumnWithChildren>
                        ))}
                    </InnerRow>
                </Row>
            )}
        </Panel>
    );
};
export default StageMemberChannel;
