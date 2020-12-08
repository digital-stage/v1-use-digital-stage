import React, {useCallback} from 'react';
import {styled} from 'styletron-react';
import ChannelStrip from '../../ChannelStrip';
import
{
    useStageActions,
    CustomRemoteAudioProducer,
    RemoteAudioProducer,
    useIsStageAdmin,
    useSelector
} from 'use-digital-stage';
import useStageWebAudio from "../../../../lib/useStageWebAudio";

const Panel = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
});
const Row = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
});
const Column = styled('div', {
    paddingLeft: '1rem',
    paddingRight: '1rem',
    paddingTop: '1rem',
    paddingBottom: '1rem',
    height: '100%',
});
const Header = styled('div', {
    width: '100%',
    height: '64px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

const AudioProducerChannel = (props: { audioProducerId: string }) => {
    const {audioProducerId} = props;
    const isAdmin: boolean = useIsStageAdmin();
    const audioProducer = useSelector<RemoteAudioProducer>(
        (state) => state.audioProducers.byId[props.audioProducerId]
    );
    const customAudioProducer = useSelector<CustomRemoteAudioProducer>((state) =>
        state.customAudioProducers.byAudioProducer[props.audioProducerId]
            ? state.customAudioProducers.byId[
                state.customAudioProducers.byAudioProducer[props.audioProducerId]
                ]
            : undefined
    );

    const {byAudioProducer} = useStageWebAudio();

    const stageActions = useStageActions();

    const handleVolumeChange = useCallback((volume: number, muted: boolean) => {
        if (isAdmin) {
            stageActions.updateStageMemberAudio(audioProducer._id, {
                volume,
                muted,
            })
        }
    }, [isAdmin, audioProducer, stageActions]);

    const handleCustomVolumeChange = useCallback((volume: number, muted: boolean) => {
        stageActions.setCustomStageMemberAudio(audioProducer._id, {
            volume,
            muted,
        })
    }, [audioProducer, stageActions]);

    const handleCustomVolumeReset = useCallback(() => {
        if (customAudioProducer)
            stageActions.removeCustomStageMemberAudio(customAudioProducer._id);
    }, [customAudioProducer, stageActions]);

    return (
        <Panel>
            <Row>
                <Column>
                    <ChannelStrip
                        addHeader={
                            <Header>
                                <h4>Track</h4>
                            </Header>
                        }
                        analyser={
                            byAudioProducer[audioProducerId]
                                ? byAudioProducer[audioProducerId].analyserNode
                                : undefined
                        }
                        volume={audioProducer.volume}
                        muted={audioProducer.muted}
                        customVolume={customAudioProducer ? customAudioProducer.volume : undefined}
                        customMuted={customAudioProducer ? customAudioProducer.muted : undefined}
                        onVolumeChanged={handleVolumeChange}
                        onCustomVolumeChanged={handleCustomVolumeChange}
                        onCustomVolumeReset={handleCustomVolumeReset}
                        isAdmin={isAdmin}
                    />
                </Column>
            </Row>
        </Panel>
    );
};
export default AudioProducerChannel;
