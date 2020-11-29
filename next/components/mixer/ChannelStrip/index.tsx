import React, {useCallback} from 'react';
import {IAnalyserNode, IAudioContext} from 'standardized-audio-context';
import LevelControlFader from './LevelControlFader';
import LevelMeter from './LevelMeter';
import {styled} from "styletron-react";
import Button from "../../ui/Button";

const Strip = styled('div', {
  position: 'relative',
  height: '100%',
  width: '200px',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  flexShrink: 0,
});

const StripHeader = styled('div', {
  width: '100%',
  flexShrink: 0,
  flexGrow: 0,
});

const ChannelActions = styled('div', {
  width: '100%',
  flexShrink: 0,
  flexGrow: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '60px',
});

const VolumeFader = styled('div', {
  width: '100%',
  flexShrink: 0,
  flexGrow: 1,
  height: '1px',
  minHeight: '100px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
});

const LeftVolumeFader = styled(LevelControlFader, {
  paddingLeft: '.4rem',
  paddingRight: '.4rem',
});
const RightVolumeFader = styled(LevelControlFader, {
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

  analyser?: IAnalyserNode<IAudioContext>;

  isAdmin?: boolean;
  volume: number;
  muted: boolean;
  customVolume?: number;
  customMuted?: boolean;
  onVolumeChanged: (volume: number, muted: boolean) => void;
  onCustomVolumeChanged: (volume: number, muted: boolean) => void;
  onCustomVolumeReset: () => void;

  className?: string;
}) => {
  const {addHeader, className, analyser, isAdmin, volume, muted, customVolume, customMuted, onVolumeChanged, onCustomVolumeChanged, onCustomVolumeReset} = props;

  const addCustom = useCallback(() => {
    props.onCustomVolumeChanged(volume, muted);
  }, [volume, muted]);

  return (
    <Strip className={className}>
      {addHeader && <StripHeader>{addHeader}</StripHeader>}

      <ChannelActions>
        {customVolume ? (
          <Button
            onClick={() => onCustomVolumeReset()}>
            Reset
          </Button>
        ) : (
          isAdmin && <Button onClick={addCustom}>Custom</Button>
        )}
      </ChannelActions>

      <VolumeFader>
        {isAdmin ? (
          <>
            <LeftVolumeFader
              volume={volume}
              muted={muted}
              onChanged={(value, muted) => onVolumeChanged(value, muted)}
              color={[255, 255, 255]}
              alignLabel="left"
            />
            {customVolume ? (
              <RightVolumeFader
                volume={customVolume || volume}
                muted={customMuted}
                onChanged={(value, muted) => onCustomVolumeChanged(value, muted)}
                color={[255, 0, 0]}
                alignLabel="right"
              />
            ) : undefined}
          </>
        ) : (
          <LeftVolumeFader
            volume={customVolume || volume}
            muted={muted || customMuted}
            onChanged={(value, muted) => onCustomVolumeChanged(value, muted)}
            color={customVolume ? [255, 0, 0] : [255, 255, 255]}
          />
        )}
        {analyser ? <VolumeMeter analyser={analyser} /> : undefined}
      </VolumeFader>
    </Strip>
  );
};
export default ChannelStrip;
