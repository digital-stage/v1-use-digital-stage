import {styled, withStyleDeep} from "styletron-react";
import TabSelectorButton from "./TabSelectorButton";
import React from "react";


const TabHeader = styled("div", {
    width: '100%',
    display: 'flex',
});
const TabItem = withStyleDeep(TabSelectorButton, {
    fontSize: '1.2rem',
    paddingLeft: '',
    marginRight: '1rem'
});

const TabControl = (props: {
    options: string[],
    value: string,
    onChange: (value: string) => void;
}) => {
    const {options, value, onChange} = props;

    return (
        <TabHeader>
            {options.map(option => (
                <TabItem
                    $active={option === value}
                    onClick={() => onChange(option)}
                >
                    {option}
                </TabItem>
            ))}

        </TabHeader>
    );
}
export default TabControl;
