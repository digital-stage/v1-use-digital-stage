import {styled} from 'styletron-react';
import React from 'react';

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

const OverlayInformer = (props: { children: React.ReactNode }) => {
    const {children} = props;

    return (
        <Overlay>
            <Box>
                {children}
            </Box>
        </Overlay>
    );
};
export default OverlayInformer;
