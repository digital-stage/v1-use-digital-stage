import React, {useEffect, useState} from "react";
import MixingPanelView from "./MixingPanel";
import {styled} from "styletron-react";

const Wrapper = styled("div", {
    width: '100%',
    padding: '1rem'
});

const MixerPane = () => {
    const [isComponentMounted, setIsComponentMounted] = useState(false)

    useEffect(() => setIsComponentMounted(true), [])

    if (!isComponentMounted) {
        return null;
    }

    return (
        <Wrapper>
            <MixingPanelView/>
        </Wrapper>
    );
};
export default MixerPane;
