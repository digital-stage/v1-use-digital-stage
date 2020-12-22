import React from "react";
import useColors from "../../../../lib/useColors";
import useStageWebAudio from "../../../../lib/useStageWebAudio";
import {
    RemoteAudioProducer,
    CustomRemoteAudioProducer
} from "use-digital-stage";
import ChannelRow from "../../ChannelRow";
import HSLColor from "../../../../lib/useColors/HSLColor";
import {colors} from "../../../ui/Theme";
import {Property} from "csstype";

const AudioProducerRow = (props: {
    audioProducer: RemoteAudioProducer;
    customAudioProducer?: CustomRemoteAudioProducer;
    onChange: (volume: number, muted: boolean) => void;
    children?: React.ReactNode;
    reset?: boolean;
    onReset?: () => void;
    padding?: number;
    isLastChild?: boolean;
}) => {
    const {audioProducer, customAudioProducer, onChange, children, reset, onReset, isLastChild} = props;
    const {byAudioProducer} = useStageWebAudio();

    return (
        <ChannelRow
            key={audioProducer._id}
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
