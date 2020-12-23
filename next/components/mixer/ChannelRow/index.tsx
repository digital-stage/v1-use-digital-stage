import {ThreeDimensionAudioProperties} from "use-digital-stage";
import {IAnalyserNode, IAudioContext} from "standardized-audio-context";
import React from "react";
import {styled} from "styletron-react";
import {colors} from "../../ui/Theme";
import ChannelStrip from "../ChannelStrip";
import {Property} from "csstype";
import HSLColor from "../../../lib/useColors/HSLColor";

const PADDING = .2;

const PanelRow = styled("div", (props: { $backgroundColor: Property.BackgroundColor, $isLastChild?: boolean }) => ({
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: '20px',
    marginRight: props.$isLastChild ? undefined : PADDING + 'rem',
    height: '100%',
    backgroundColor: props.$backgroundColor || colors.background.dark,
    padding: PADDING + 'rem'
}));
const StyledChannelStrip = styled(ChannelStrip, (props: { $padding?: number }) => ({
    padding: props.$padding + "rem"
}));
const Header = styled('div', (props: { $color?: Property.BackgroundColor, $isCustomized?: boolean }) => ({
    width: '100%',
    height: '64px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '10px',
    backgroundColor: props.$color,
    color: props.$isCustomized ? colors.text.muted : colors.text.inverted
}));
const HeaderButton = styled("div", {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: "pointer"
});
const HeaderTitle = styled('div', {
    padding: PADDING + 'rem'
});
const Row = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
});
const InnerRow = styled('div', (props: {
    $color?: Property.BackgroundColor
}) => ({
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: props.$color || colors.background.default,
    borderRadius: '20px',
    height: '100%',
    padding: PADDING + 'rem'
}));

const ChannelRow = (props: {
    name: string;
    values: ThreeDimensionAudioProperties,
    analyserL?: IAnalyserNode<IAudioContext>;
    analyserR?: IAnalyserNode<IAudioContext>;

    color?: HSLColor;
    backgroundColor?: Property.BackgroundColor;
    isLastChild?: boolean;

    numChildLayers?: number;

    onChange: (volume: number, muted: boolean) => void;

    reset?: boolean;
    onReset?: () => void;

    children?: React.ReactNode;

    className?: string;

    inactive?: boolean;
}) => {
    const {numChildLayers, name, values, analyserL, analyserR, children, color, onChange, reset, onReset, className, backgroundColor, isLastChild, inactive} = props;
    const [expanded, setExpanded] = React.useState<boolean>();

    return (
        <PanelRow $backgroundColor={backgroundColor} $isLastChild={isLastChild}>
            <StyledChannelStrip
                $padding={(numChildLayers + 1) * PADDING * 2}
                className={className}
                addHeader={
                    <Header
                        $color={color?.toProperty()}
                        $isCustomized={inactive}
                    >
                        {React.Children.count(children) > 0 ? (
                            <HeaderButton
                                onClick={() => setExpanded((prev) => !prev)}
                            >
                                <HeaderTitle>{name}</HeaderTitle>
                                {expanded ? <img src="/static/chevron_left-18dp.svg" alt="collapse"/> :
                                    <img src="/static/chevron_right-18dp.svg" alt="expand"/>}
                            </HeaderButton>
                        ) : (
                            <HeaderTitle>{name}</HeaderTitle>
                        )}
                    </Header>
                }
                reset={reset}
                onReset={onReset}
                onVolumeChanged={onChange}
                muted={values.muted}
                volume={values.volume}
                analyserL={analyserL}
                analyserR={analyserR}
            />
            {children && expanded && (
                <Row>
                    <InnerRow $color={color?.toProperty()}>
                        {children}
                    </InnerRow>
                </Row>
            )}
        </PanelRow>
    )
}
export default ChannelRow;
