import React from "react";
import Button from "./Button";
import {withStyleDeep} from "styletron-react";

const ButtonComponent = withStyleDeep(Button, (props: { $active }) => ({
    backgroundColor: props.$active ? "red" : "blue"
}));

const ToggleButton = (props: {
    children: React.ReactNode;
    active: boolean;
    onToggle: (active: boolean) => void;
    className?: string
}) => {
    const {className,  children, active, onToggle} = props;

    return (
        <ButtonComponent className={className} $active={active} onClick={() => onToggle(!active)}>
            {children}
        </ButtonComponent>
    )
}
export default ToggleButton;
