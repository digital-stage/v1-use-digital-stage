import {styled} from "styletron-react";
import {colors} from "./Theme";

const RoundButton = styled('button', (props: {
    $variant?: "primary" | "secondary"
}) => ({
    borderRadius: '50%',
    borderWidth: '1px',
    borderStyle: 'solid',
    padding: '1rem',
    outline: 'none',
    color: colors.button.text,
    borderColor: colors.button.text,
    backgroundColor: colors.background.default,
    ":hover": {
        backgroundColor: colors.button.background,
    },
}));
export default RoundButton;
