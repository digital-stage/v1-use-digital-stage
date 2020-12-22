import React, {useCallback} from 'react';
import {IAnalyserNode, IAudioContext} from 'standardized-audio-context';
import LevelControlFader from './LevelControlFader';
import LevelMeter from './LevelMeter';
import {styled} from "styletron-react";
import Button from "../../ui/Button";

const Strip = styled('div', {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%'
});

const StripHeader = styled('div', {
    width: '100%',
});

const ChannelActions = styled('div', {
    minWidth: '100px',
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem',
    height: '60px',
    alignItems: 'center',
    justifyContent: 'center',
});

const VolumeFaderWrapper = styled('div', {
    width: '100%',
    flexShrink: 0,
    flexGrow: 1,
    height: '1px',
    minHeight: '200px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: '1rem',
});

const VolumeFader = styled(LevelControlFader, {
    paddingLeft: '.4rem',
    paddingRight: '.4rem',
});

const VolumeMeter = styled(LevelMeter, {
    width: '10px',
    flexShrink: 1,
    height: '100%',
});

const ChannelStrip = (props: {
    addHeader?: React.ReactNode;

    analyserL?: IAnalyserNode<IAudioContext>;
    analyserR?: IAnalyserNode<IAudioContext>;

    isAdmin?: boolean;
    volume: number;
    muted: boolean;
    onVolumeChanged: (volume: number, muted: boolean) => void;

    reset?: boolean;
    onReset?: () => void;

    className?: string;
}) => {
    const {addHeader, className, analyserL, analyserR, isAdmin, volume, muted, onVolumeChanged, reset, onReset} = props;

    const handleChange = useCallback((value: number, muted: boolean) => {
        if (onVolumeChanged)
            onVolumeChanged(value, muted);
    }, [onVolumeChanged]);

    return (
        <Strip className={className}>
            {addHeader && <StripHeader>{addHeader}</StripHeader>}

            <ChannelActions>
                {reset && (
                    <Button
                        onClick={() => onReset()}>
                        Reset
                    </Button>
                )}
            </ChannelActions>

            <VolumeFaderWrapper>
                <VolumeFader
                    volume={volume}
                    muted={muted}
                    onChanged={handleChange}
                    color={[255, 255, 255]}
                    alignLabel="left"
                />
                {analyserL ? <VolumeMeter analyser={analyserL}/> : undefined}
                {analyserR ? <VolumeMeter analyser={analyserR}/> : undefined}
            </VolumeFaderWrapper>
        </Strip>
    );
};
export default ChannelStrip;
