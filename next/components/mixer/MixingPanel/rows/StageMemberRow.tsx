import React from "react";
import useColors from "../../../../lib/useColors";
import useStageWebAudio from "../../../../lib/useStageWebAudio";
import ChannelRow from "../../ChannelRow";
import {
    User,
    StageMember,
    CustomStageMember,
} from "use-digital-stage";
import {styled} from "styletron-react";
import HSLColor from "../../../../lib/useColors/HSLColor";
import {colors} from "../../../ui/Theme";


const StageMemberRow = (props: {
    user: User;
    stageMember: StageMember;
    customStageMember?: CustomStageMember;
    onChange: (volume: number, muted: boolean) => void;
    children?: React.ReactNode;
    reset?: boolean;
    onReset?: () => void;
    isLastChild?: boolean;
}) => {
    const {user, stageMember, customStageMember, onChange, children, reset, onReset, isLastChild} = props;
    //const color = useColors(stageMember._id);

    const {byStageMember} = useStageWebAudio();

    return (
        <ChannelRow
            key={stageMember._id}
            name={user.name}
            numChildLayers={1}
            isLastChild={isLastChild}
            //color={color}
            backgroundColor='rgba(135,135,135,0.6)'
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
