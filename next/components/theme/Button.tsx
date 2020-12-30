import {styled} from 'styletron-react';
import {colors, fonts} from './Theme';



const Button = styled("button", (props: {
    $variant?: "primary" | "secondary" | "tertiary" | "danger";
}) =>  ({
    ...fonts.button,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderWidth: '2px',
    outlineStyle: 'none',
    borderRadius: '12px',
    boxShadow: '3px 3px 8px rgba(0,0,0,0.16)',
    padding: '.5rem',
    ...colors.button[props.$variant || "primary"]
}));

export default Button;
