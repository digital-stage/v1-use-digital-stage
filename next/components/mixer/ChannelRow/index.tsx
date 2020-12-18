import {ThreeDimensionAudioProperties} from "use-digital-stage";
import {IAnalyserNode, IAudioContext} from "standardized-audio-context";
import React from "react";
import {styled} from "styletron-react";
import {colors} from "../../ui/Theme";
import ChannelStrip from "../ChannelStrip";
import {Property} from "csstype";
import HSLColor from "../../../lib/useColors/HSLColor";

const PanelRow = styled("div", {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: '20px',
    marginRight: '1rem',
    backgroundColor: colors.background.dark
});
const Header = styled('div', (props: { $color?: Property.BackgroundColor }) => ({
    width: '100%',
    height: '64px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '10px',
    backgroundColor: props.$color,
}));
const HeaderButton = styled("div", {
    width: '100%',
    height: '64px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: "pointer"
});
const Row = styled('div', {
    paddingTop: '1rem',
    paddingBottom: '1rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
});
const InnerRow = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: colors.background.default,
    borderRadius: '20px',
    height: '100%',
});

const ChannelRow = (props: {
    name: string;
    values: ThreeDimensionAudioProperties,
    analyserL?: IAnalyserNode<IAudioContext>;
    analyserR?: IAnalyserNode<IAudioContext>;

    color?: HSLColor;

    onChange: (volume: number, muted: boolean) => void;

    reset?: boolean;
    onReset?: () => void;

    children?: React.ReactNode
}) => {
    const {name, values, analyserL, analyserR, children, color, onChange, reset, onReset} = props;
    const [expanded, setExpanded] = React.useState<boolean>();

    return (
        <PanelRow>
            <ChannelStrip
                addHeader={
                    <Header $color={color?.toProperty()}>
                        {React.Children.count(children) > 0 ? (
                            <HeaderButton
                                onClick={() => setExpanded((prev) => !prev)}
                            >
                                <h3>{name}</h3>
                                {expanded ? <img src="/static/chevron_left-18dp.svg" alt="collapse"/> :
                                    <img src="/static/chevron_right-18dp.svg" alt="expand"/>}
                            </HeaderButton>
                        ) : (
                            <h3>{name}</h3>
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
                    <InnerRow>
                        {children}
                    </InnerRow>
                </Row>
            )}
        </PanelRow>
    )
}
export default ChannelRow;
