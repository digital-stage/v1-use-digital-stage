import {styled} from 'styletron-react';
import {colors} from "./Theme";

const Input = styled('input', {
  padding: '.3rem',
  color: colors.input.text,
  outlineColor: colors.input.border,
  backgroundColor: colors.input.background,
  boxShadow: 'inset 0 1px 0 rgba(0,0,0,.02)',
  ":hover": {
    color: colors.input.hover.text,
    outlineColor: colors.input.hover.border,
    backgroundColor: colors.input.hover.background
  },
  ":active": {
    color: colors.input.active.text,
    outlineColor: colors.input.active.border,
    backgroundColor: colors.input.active.background
  }
});
export default Input;
