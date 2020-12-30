import {styled} from 'styletron-react';
import {colors} from './Theme';

const Button = styled("button", (props: {
    $variant?: "primary" | "secondary" | "tertiary" | "danger";
}) =>  ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderWidth: '2px',
    outlineStyle: 'none',
    borderRadius: '12px',
    boxShadow: '3px 8px black 16px',
    padding: '.5rem',
    color: colors.button[props.$variant || "primary"].color,
    borderColor: colors.button[props.$variant || "primary"].borderColor,
    backgroundColor: colors.button[props.$variant || "primary"].backgroundColor,
    ":hover": {
        ...colors.button[props.$variant || "primary"].hover
    },
    ":focus": {
        ...colors.button[props.$variant || "primary"].focus
    },
    ":active": {
        ...colors.button[props.$variant || "primary"].active
    },
    ":disabled": {
        ...colors.button[props.$variant || "primary"].disabled
    },
}));

export default Button;
