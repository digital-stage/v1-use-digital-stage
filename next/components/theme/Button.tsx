import {styled} from 'styletron-react';
import colors from './theme/colors';
import fonts from "./theme/fonts";

const ButtonStyles = {
    primary: {
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
    secondary: {
        color: colors.text.regular.default,
        borderColor: colors.primary.button.default,
        backgroundColor: 'transparent',
        ":hover": {
            opacity: 0.3,
            borderColor: colors.primary.button.hover,
            backgroundColor: colors.text.regular.inverted,
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
    tertiary: {
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
    },
    danger: {
        color: colors.text.regular.default,
        borderColor: colors.dangerButton.default,
        backgroundColor: colors.dangerButton.default,
        ":hover": {
            borderColor: colors.dangerButton.hover,
            backgroundColor: colors.dangerButton.hover,
        },
        ":focus": {
            borderColor: colors.primary.outline,
        },
        ":active": {
            borderColor: colors.dangerButton.active,
            backgroundColor: colors.dangerButton.active,
        },
        ":disabled": {
            boxShadow: 'none',
            opacity: 0.5,
            cursor: 'default'
        },
    },
    white: {
        color: colors.text.regular.inverted,
        borderColor: colors.text.regular.default,
        backgroundColor: colors.text.regular.default,
        ":hover": {
            borderColor: colors.tertiary.hover,
            backgroundColor: colors.text.regular.default,
        },
        ":focus": {
            opacity: 1,
            borderColor: colors.primary.outline,
        },
        ":active": {
            borderColor: colors.primary.button.active,
            backgroundColor: colors.primary.button.active,
        },
        ":disabled": {
            boxShadow: 'none',
            opacity: 0.5,
            cursor: 'default'
        },
    },
};

const Button = styled("button", (props: {
    $variant?: "primary" | "secondary" | "tertiary" | "danger" | "white";
}) =>  ({
    ...fonts.button,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderWidth: '2px',
    outlineStyle: 'none',
    borderRadius: '18px',
    boxShadow: '3px 3px 8px rgba(0,0,0,0.16)',
    padding: '.5rem',
    ...ButtonStyles[props.$variant || "primary"]
}));

export default Button;
