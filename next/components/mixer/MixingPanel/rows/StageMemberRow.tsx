import React from "react";
import useColors from "../../../../lib/useColors";
import useStageWebAudio from "../../../../lib/useStageWebAudio";
import ChannelRow from "../../ChannelRow";
import {
    User,
    StageMember,
    CustomStageMember,
} from "use-digital-stage";

const StageMemberRow = (props: {
    user: User;
    stageMember: StageMember;
    customStageMember?: CustomStageMember;
    onChange: (volume: number, muted: boolean) => void;
    children?: React.ReactNode;
    reset?: boolean;
    onReset?: () => void;
}) => {
    const {user, stageMember, customStageMember, onChange, children, reset, onReset} = props;
    const color = useColors(stageMember._id);
    const {byStageMember} = useStageWebAudio();

    return (
        <ChannelRow
            key={stageMember._id}
            name={user.name}
            color={color}
            reset={reset}
            onReset={onReset}
            values={customStageMember || stageMember}
            onChange={onChange}
            analyserL={byStageMember && byStageMember[stageMember._id] && byStageMember[stageMember._id].analyserNodeL}
            analyserR={byStageMember && byStageMember[stageMember._id] && byStageMember[stageMember._id].analyserNodeR}
        >
            {children}
        </ChannelRow>
    )
}
export default StageMemberRow;
