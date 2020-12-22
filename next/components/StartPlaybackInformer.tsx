import useAudioContext from "../lib/useAudioContext";
import {styled} from "styletron-react";
import debug from "debug";

const d = debug("StartPlaybackInformer");

const Overlay = styled("div", {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
})

const Box = styled('div', {
    display: "block",
    backgroundColor: '#50fa7b',
    color: '#000',
    padding: "2rem",
    borderRadius: "20px",
    boxShadow: 'rgba(0, 0, 0, 0.32) 0px 23px 17px'
});

const StartPlaybackInformer = () => {
    const {audioContext, started, start} = useAudioContext();

    if (audioContext && !started) {
        return (
            <Overlay onClick={() => {
                d('Starting audio context');
                start();
            }}>
                <Box>
                    Click to start audio engine
                </Box>
            </Overlay>
        )
    }

    return null;
}
export default StartPlaybackInformer;
