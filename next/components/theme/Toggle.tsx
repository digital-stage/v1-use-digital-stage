import {styled} from 'styletron-react';
import {fonts} from './Theme';
import React from "react";
import colors from './theme/colors';

const ToggleStyle = {
    primary: {
        active: {
            color: colors.text.regular.default,
            borderColor: colors.primary.button.default,
            backgroundColor: colors.primary.button.default,
            ":hover": {
                borderColor: colors.primary.button.hover,
                backgroundColor: colors.primary.button.hover,
            },
            ":focus": {
                borderColor: colors.primary.outline,
                backgroundColor: colors.primary.button.active,
            },
            ":active": {
                borderColor: colors.primary.button.active,
                backgroundColor: colors.primary.button.default,
            },
            ":disabled": {
                boxShadow: 'none',
                opacity: 0.5,
                cursor: 'default'
            },
        },
        inactive: {
            color: colors.text.regular.default,
            borderColor: colors.tertiary.outline,
            ":hover": {
                opacity: 0.3,
                borderColor: colors.tertiary.hover
            },
            ":focus": {
                opacity: 1,
                borderColor: colors.primary.outline,
            },
            ":active": {
                opacity: 0.3,
                borderColor: colors.primary.button.active,
                backgroundColor: colors.primary.button.active,
            },
            ":disabled": {
                boxShadow: 'none',
                opacity: 0.5,
                cursor: 'default'
            },
        }
    },
    tertiary: {
        active: {
            color: colors.text.regular.inverted,
            borderColor: colors.text.regular.default,
            backgroundColor: colors.text.regular.default,
            ":hover": {
                opacity: 0.3,
            },
            ":focus": {
                opacity: 1,
                borderColor: colors.primary.outline,
            },
            ":active": {
                opacity: 0.3,
                borderColor: colors.primary.button.active,
                backgroundColor: colors.primary.button.active,
            },
            ":disabled": {
                boxShadow: 'none',
                opacity: 0.5,
                cursor: 'default'
            },
        },
        inactive: {
            color: colors.text.regular.default,
            borderColor: colors.tertiary.outline,
            ":hover": {
                opacity: 0.3,
                borderColor: colors.tertiary.hover
            },
            ":focus": {
                opacity: 1,
                borderColor: colors.primary.outline,
            },
            ":active": {
                opacity: 0.3,
                borderColor: colors.primary.button.active,
                backgroundColor: colors.primary.button.active,
            },
            ":disabled": {
                boxShadow: 'none',
                opacity: 0.5,
                cursor: 'default'
            },
        }
    }
}

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
    ...(props.$active ? ToggleStyle[props.$variant || "primary"].active : ToggleStyle[props.$variant || "primary"].inactive)
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
