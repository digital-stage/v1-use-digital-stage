import {styled} from "styletron-react";
import {breakpoints, colors} from "./Theme";

const RoundButton = styled('button', (props: {
    $variant?: "primary" | "secondary"
}) => ({
    borderRadius: '50%',
    borderWidth: '1px',
    borderStyle: 'solid',
    width: '32px',
    height: '32px',
    outline: 'none',
    color: colors.button.text,
    borderColor: colors.button.text,
    backgroundColor: colors.background.default,
    ":hover": {
        backgroundColor: colors.button.background,
    },
    [breakpoints.TABLET]: {
        width: '48px',
        height: '48px',
    }
}));
export default RoundButton;
