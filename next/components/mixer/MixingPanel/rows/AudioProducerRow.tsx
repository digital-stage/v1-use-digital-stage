import React from "react";
import useColors from "../../../../lib/useColors";
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
}) => {
    const {audioProducer, customAudioProducer, onChange, children, reset, onReset} = props;
    const color = useColors(audioProducer._id);
    const {byAudioProducer} = useStageWebAudio();

    return (
        <ChannelRow
            key={audioProducer._id}
            name="Web Track"
            color={color}
            values={customAudioProducer || audioProducer}
            onChange={onChange}
            reset={reset}
            onReset={onReset}
            analyserL={byAudioProducer && byAudioProducer[audioProducer._id] && byAudioProducer[audioProducer._id].analyserNode}
        >
            {children}
        </ChannelRow>
    )
}
export default AudioProducerRow;
