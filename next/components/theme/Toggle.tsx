import {styled} from 'styletron-react';
import {colors, fonts} from './Theme';
import React from "react";

const ToggleButton = styled("button", (props: {
    $active: boolean;
    $variant?: "primary" | "tertiary";
}) => ({
    ...fonts.toggle,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderWidth: '2px',
    outlineStyle: 'none',
    borderRadius: '50%',
    ...(props.$active ? colors.toggle[props.$variant || "primary"].active : colors.toggle[props.$variant || "primary"].inactive)
}));

const Toggle = (props: {
    active: boolean;
    variant?: "primary" | "tertiary";
    onToggle: (active: boolean) => void;
    children: React.ReactNode;
}) => {
    const {variant, active, children, onToggle} = props;

    return (
        <ToggleButton
            $active={active}
            $variant={variant}
            onClick={() => onToggle(!active)}
        >
            {children}
        </ToggleButton>
    )
};

export default Toggle;
