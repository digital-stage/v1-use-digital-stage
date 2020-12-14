import React from "react";
import Button from "./Button";
import {withStyleDeep} from "styletron-react";
import {colors} from "./Theme";
import {Property} from "csstype";

const ButtonComponent = withStyleDeep(Button, (props: { $active: boolean, $activeColor?: Property.BackgroundColor }) => ({
    color: props.$active
        ? colors.toggle.on.enabled.text
        : colors.toggle.on.enabled.text,
    backgroundColor: props.$active
        ? props.$activeColor || colors.toggle.on.enabled.background
        : colors.toggle.off.enabled.background,
    ":hover": undefined
}));

const ToggleButton = (props: {
    children: React.ReactNode;
    active: boolean;
    color?: Property.BackgroundColor;
    onToggle: (active: boolean) => void;
    className?: string
}) => {
    const {className, children, active, onToggle, color} = props;

    return (
        <ButtonComponent
            className={className}
            $active={active}
            $activeColor={color}
            onClick={() => onToggle(!active)}
        >
            {children}
        </ButtonComponent>
    )
}
export default ToggleButton;
