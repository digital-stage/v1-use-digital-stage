import {
    LocalConsumer,
    StageMemberWithUserData,
    useSelector
} from "use-digital-stage";
import {styled} from "styletron-react";
import React from "react";
import {breakpoints, colors} from "../ui/Theme";
import VideoPlayer from "../../components/ui/VideoPlayer";
import {Property} from "csstype";

const StageMemberBox = styled("div", {
    boxSizing: 'border-box',
    position: "relative",
    width: "50%",
    display: 'flex',
    justifyContent: 'center',
    overflow: "hidden",
    borderStyle: 'solid',
    borderColor: colors.background.darker,
    borderWidth: '1px',
    [breakpoints.TABLET]: {
        width: "25%",
    },
    [breakpoints.DESKTOP]: {
        width: "12.5%",
    },
    ":after": {
        content: '""',
        display: 'block',
        paddingBottom: '100%',
    }
});
const StageMemberContent = styled("div", (props: {
    $online: boolean
}) => ({
    position: 'absolute',
    width: '100%',
    height: '100%',
    color: props.$online ? colors.text.default : colors.text.muted,
    backgroundRepeat: 'repeat',
    backgroundImage: 'url("/static/video_background.svg")'
}));
const StageMemberVideoPlayer = styled(VideoPlayer, {
    width: 'auto',
    height: '100%'
});
const StageMemberTitle = styled("div", (props: { $online: boolean }) => ({
    position: "absolute",
    color: props.$online ? colors.text.inverted : colors.text.muted,
    textShadow: props.$online ? '0px 0px 6px #fff' : "none",
    top: 0,
    left: 0,
    width: "100%",
    display: 'flex'
}));
const OnlineIndicator = styled("div", (props: { $online: boolean, $color: Property.BackgroundColor }) => ({
    backgroundColor: props.$online ? props.$color : colors.background.darker,
    width: '8px',
    height: '8px',
    marginTop: '2px',
    marginRight: '8px'
}));

const StageMember = (props: {
    stageMember: StageMemberWithUserData,
    color: Property.BackgroundColor
}) => {
    const {stageMember, color} = props;
    const videoConsumers = useSelector<LocalConsumer[]>(state => state.videoConsumers.byStageMember[stageMember._id]
        ? state.videoConsumers.byStageMember[stageMember._id].map(id => state.videoConsumers.byId[id])
        : []
    )

    return (
        <StageMemberBox>
            <StageMemberContent $online={stageMember.online}>
                <StageMemberVideoPlayer consumers={videoConsumers}/>
                <StageMemberTitle
                    $online={stageMember.online}
                >
                    <OnlineIndicator $color={color} $online={stageMember.online}/>
                    {stageMember.name || stageMember._id}
                </StageMemberTitle>
            </StageMemberContent>
        </StageMemberBox>
    )
}
export default StageMember;
