import {styled} from "styletron-react";
import colors from "./theme/colors";

const TabSelectorButton = styled("button", (props: { $active?: boolean }) => ({

    cursor: 'pointer',

    color: props.$active ? colors.text.regular.default : colors.text.muted.default,
    borderBottomWidth: '2px',
    borderBottomColor: props.$active ? colors.primary.default : "transparent",
    outline: 'none',

    ":hover": {
        color: props.$active ? colors.text.muted.default : colors.primary.button.hover,
        borderBottomColor: 'transparent',
    },
    ":active": {
        color: colors.primary.button.active,
        borderBottomColor: props.$active ? colors.primary.button.active : "transparent",
    },
    ":focus": {
        color: colors.text.regular.default,
        borderBottomColor: colors.primary.outline,
    }
}));
export default TabSelectorButton;
