
import {styled} from "styletron-react";
import React, {useEffect, useState} from "react";
import MixingPanelView from "./MixingPanel";

const Wrapper = styled('div', {
    position: 'relative',
    border: '1px solid red',
    whiteSpace: 'nowrap',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
});
const ScrollPane = styled('div', {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    overflowX: 'scroll',
    overflowY: 'auto',
});

const MixerPane = () => {
    const [isComponentMounted, setIsComponentMounted] = useState(false)

    useEffect(() => setIsComponentMounted(true), [])

    if( !isComponentMounted ) {
        return null;
    }

    return (
        <Wrapper>
            <ScrollPane>
                <MixingPanelView/>
            </ScrollPane>
        </Wrapper>
    );
};
export default MixerPane;
