import * as React from 'react';
import {styled} from 'styletron-react';
import ChannelStrip from '../../ChannelStrip';
import {useStageActions, CustomStageMember, useIsStageAdmin, useSelector, useStageMember} from "../../../../../dist";
import useStageWebAudio from "../../../../lib/useStageWebAudio";
import Button from "../../../ui/Button";
import AudioProducerChannel from "./AudioProducerChannel";
import {useCallback} from "react";

const Panel = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
});
const Row = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    paddingTop: '1rem',
    paddingBottom: '1rem',
});
const InnerRow = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'rgba(100,100,130,1)',
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
const Header = styled('div', {
    width: '100%',
    height: '64px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

const StageMemberChannel = (props: { stageMemberId: string }) => {
    const {stageMemberId} = props;
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

    const {updateStageMember, setCustomStageMember, removeCustomStageMember} = useStageActions();

    const [expanded, setExpanded] = React.useState<boolean>();

    const handleVolumeChange = useCallback((volume: number, muted: boolean) => {
        if( isAdmin ) {
            updateStageMember(stageMember._id, {
                volume,
                muted,
            })
        }
    }, [isAdmin, stageMember, updateStageMember]);

    const handleCustomVolumeChange = useCallback((volume: number, muted: boolean) => {
        setCustomStageMember(stageMember._id, {
            volume,
            muted,
        })
    }, [stageMember, setCustomStageMember]);

    const handleCustomVolumeReset = useCallback(() => {
        if(customStageMember)
            removeCustomStageMember(customStageMember._id);
    }, [customStageMember, removeCustomStageMember]);

    return (
        <Panel>
            <Column>
                <ChannelStrip
                    addHeader={
                        <Header>
                            {audioProducers.length > 0 ? (
                                <Button
                                    onClick={() => setExpanded((prev) => !prev)}
                                >
                                    <h3>{stageMember.name}</h3> {expanded ?
                                    <img src="/static/chevron_left-white-18dp.svg"/> :
                                    <img src="/static/chevron_right-white-18dp.svg"/>}
                                </Button>
                            ) : (
                                <h3>{stageMember.name}</h3>
                            )}
                        </Header>
                    }
                    volume={stageMember.volume}
                    muted={stageMember.muted}
                    customVolume={customStageMember ? customStageMember.volume : undefined}
                    customMuted={customStageMember ? customStageMember.muted : undefined}
                    analyser={
                        byStageMember[stageMemberId] ? byStageMember[stageMemberId].analyserNodeL : undefined
                    }
                    onVolumeChanged={handleVolumeChange}
                    onCustomVolumeChanged={handleCustomVolumeChange}
                    onCustomVolumeReset={handleCustomVolumeReset}
                    isAdmin={isAdmin}
                />
            </Column>

            {expanded && audioProducers && (
                <Row>
                    <InnerRow>
                        {audioProducers.map((id, index) => (
                            <ColumnWithChildren key={index}>
                                <AudioProducerChannel key={id} audioProducerId={id}/>
                            </ColumnWithChildren>
                        ))}
                    </InnerRow>
                </Row>
            )}
        </Panel>
    );
};
export default StageMemberChannel;
