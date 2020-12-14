import * as React from 'react';
import LogSlider, {RGBColor} from '../LogSlider';
import Button from "../../ui/Button";
import {styled} from "styletron-react";
import ToggleButton from '../../ui/ToggleButton';

const Wrapper = styled("div", {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
})

const TopActions = styled("div", {
    display: 'block',
    paddingBottom: '.6rem',
})

const LevelControlFader = (props: {
    muted: boolean;
    volume: number;
    color?: RGBColor;
    onChanged: (volume: number, muted: boolean) => any;
    alignLabel?: 'left' | 'right';
}) => {
    const {volume, onChanged, muted, color, alignLabel} = props;
    const [value, setValue] = React.useState<number>(volume);

    React.useEffect(() => {
        setValue(volume);
    }, [volume]);

    const handleMuteClicked = React.useCallback(() => {
        onChanged(value, !muted);
    }, [value, muted]);

    const handleEnd = React.useCallback(
        (updatedVolume: number) => {
            setValue(updatedVolume);
            onChanged(updatedVolume, muted);
        },
        [muted]
    );

    return (
        <Wrapper
        >
            <TopActions
            >
                <ToggleButton
                    aria-label="mute"
                    active={muted}
                    onToggle={handleMuteClicked}
                >
                    M
                </ToggleButton>
            </TopActions>
            <LogSlider
                min={0}
                middle={1}
                max={4}
                width={16}
                color={color || [255, 255, 255]}
                volume={value}
                onChange={(changedVolume) => setValue(changedVolume)}
                onEnd={handleEnd}
                alignLabel={alignLabel}
            />
        </Wrapper>
    );
};
export default LevelControlFader;
