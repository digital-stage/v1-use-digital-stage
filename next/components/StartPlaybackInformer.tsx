import useAudioContext from "../lib/useAudioContext";
import {styled} from "styletron-react";

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
    const {audioContext, createAudioContext} = useAudioContext();

    if (!audioContext) {
        return (
            <Overlay onClick={() => createAudioContext()}>
                <Box>
                    Click to start audio engine
                </Box>
            </Overlay>
        )
    }

    return null;
}
export default StartPlaybackInformer;
