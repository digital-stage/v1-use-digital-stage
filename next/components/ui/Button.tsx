import {styled} from 'styletron-react';
import {colors} from './Theme';
import {Property} from "csstype";

const Button = styled('button', (props: {
    $round?: boolean;
    $color?: Property.Color,
    $backgroundColor?: Property.Color,
    $border?: boolean
}) => ({
    padding: '.5rem',
    color: props.$color || colors.button.text,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    outlineStyle: 'none',
    borderRadius: props.$round ? '16px' : undefined,
    borderWidth: props.$border ? '1px' : 0,
    borderColor: colors.button.border,
    backgroundColor: props.$backgroundColor || colors.button.background,
    ':hover': {
        color: colors.button.hover.text,
        outlineColor: colors.button.hover.border,
        backgroundColor: colors.button.hover.background,
    },
    ':disabled': {
        color: colors.button.disabled.text,
        outlineColor: colors.button.disabled.border,
        backgroundColor: colors.button.disabled.background,
        cursor: 'default',
    },
    ':active': {
        backgroundColor: colors.background.selected
    }
}));
export default Button;
