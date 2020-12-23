import React from "react";
import useStageWebAudio from "../../../../lib/useStageWebAudio";
import {
    RemoteAudioProducer,
    CustomRemoteAudioProducer
} from "use-digital-stage";
import ChannelRow from "../../ChannelRow";

const AudioProducerRow = (props: {
    audioProducer: RemoteAudioProducer;
    customAudioProducer?: CustomRemoteAudioProducer;
    onChange: (volume: number, muted: boolean) => void;
    children?: React.ReactNode;
    reset?: boolean;
    onReset?: () => void;
    padding?: number;
    isLastChild?: boolean;
    inactive?: boolean;
}) => {
    const {audioProducer, customAudioProducer, onChange, children, reset, onReset, isLastChild, inactive} = props;
    const {byAudioProducer} = useStageWebAudio();

    return (
        <ChannelRow
            key={audioProducer._id}
            inactive={inactive}
            name="Web Track"
            numChildLayers={0}
            backgroundColor="transparent"
            values={customAudioProducer || audioProducer}
            onChange={onChange}
            reset={reset}
            onReset={onReset}
            isLastChild={isLastChild}
            analyserL={byAudioProducer && byAudioProducer[audioProducer._id] && byAudioProducer[audioProducer._id].analyserNode}
        >
            {children}
        </ChannelRow>
    )
}
export default AudioProducerRow;
