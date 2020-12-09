import {styled} from 'styletron-react';
import {colors} from './Theme';

const Button = styled('button', (props: {
    $border?: boolean
}) => ({
    padding: '.2rem',
    color: colors.button.text,
    borderStyle: 'solid',
    outlineWidth: props.$border ? '1px' : 0,
    outlineStyle: 'solid',
    outlineColor: colors.button.border,
    backgroundColor: colors.button.background,
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
}));
export default Button;
