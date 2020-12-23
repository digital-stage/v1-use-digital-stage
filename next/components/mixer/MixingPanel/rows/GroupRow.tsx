import React from "react";
import useColors from "../../../../lib/useColors";
import useStageWebAudio from "../../../../lib/useStageWebAudio";
import ChannelRow from "../../ChannelRow";
import {
    Group,
    CustomGroup,
} from "use-digital-stage";

const GroupRow = (props: {
    group: Group;
    customGroup?: CustomGroup;
    onChange: (volume: number, muted: boolean) => void;
    children?: React.ReactNode;
    reset?: boolean;
    onReset?: () => void;
    inactive?: boolean;
}) => {
    const {group, customGroup, onChange, children, reset, onReset, inactive} = props;
    const {byGroup} = useStageWebAudio();
    const color = useColors(group._id);

    return (
        <ChannelRow
            key={group._id}
            inactive={inactive}
            name={group.name}
            numChildLayers={2}
            color={color}
            reset={reset}
            onReset={onReset}
            values={customGroup || group}
            onChange={onChange}
            analyserL={byGroup && byGroup[group._id] && byGroup[group._id].analyserNodeL}
            analyserR={byGroup && byGroup[group._id] && byGroup[group._id].analyserNodeR}
        >
            {children}
        </ChannelRow>
    )
}

export default GroupRow;
