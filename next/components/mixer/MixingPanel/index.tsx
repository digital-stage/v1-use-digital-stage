import {styled} from 'styletron-react';
import React, {useEffect, useState} from 'react';
import {
    useIsStageAdmin,
} from "use-digital-stage";
import Select, {Option} from "../../ui/Select";
import Paragraph from "../../ui/Paragraph";
import CombinedMixingPanel from "../CombinedMixingPanel";

const Wrapper = styled('div', {
    display: 'flex',
    flexDirection: 'column'
});
const ScrollPaneWrapper = styled('div', {
    position: 'relative',
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
    minHeight: '400px',
    maxHeight: '600px',
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    flexWrap: 'nowrap',
    padding: '1rem'
});

const Options: Option[] = [
    {
        id: "global",
        label: "Global"
    },
    {
        id: "monitor",
        label: "Monitor"
    }
];


/** *
 * The mixing panel shows all available volume controls for an active stage
 * @constructor
 */
const MixingPanelView = (): JSX.Element => {
    const isStageAdmin = useIsStageAdmin();
    const [mode, setMode] = useState<Option>(Options[1]);

    useEffect(() => {
        setMode(isStageAdmin ? Options[0] : Options[1])
    }, [isStageAdmin])

    let text;
    if (mode.id === "global") {
        text = "These settings affects the global default volumes for all users including yourself, but maybe overwritten by the monitor mix of each user.";
    } else {
        text = "This settings overwrites the global default volumes only for yourself.";
    }

    return (
        <Wrapper>
            {isStageAdmin && (
                <>
                    <Select
                        onSelected={(option: Option) => {
                            setMode(option);
                        }}
                        selected={mode}
                        options={Options}
                    />
                    <Paragraph>
                        {text}
                    </Paragraph>
                </>
            )}
            <ScrollPaneWrapper>
                <ScrollPane>
                    <CombinedMixingPanel global={mode.id === "global"}/>
                </ScrollPane>
            </ScrollPaneWrapper>
        </Wrapper>
    );
};
export default MixingPanelView;
