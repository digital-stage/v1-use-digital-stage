import {styled} from "styletron-react";
import {colors} from "./Theme";

const TabSelectorButton = styled("button", (props: { $active?: boolean }) => ({

    cursor: 'pointer',

    color: props.$active ? colors.text.default : colors.text.muted,
    borderBottomWidth: '2px',
    borderBottomColor: props.$active ? colors.interaction.default : "transparent",
    outline: 'none',

    ":hover": {
        color: props.$active ? colors.text.muted : colors.interaction.hover,
        borderBottomColor: 'transparent',
    },
    ":active": {
        color: colors.interaction.active,
        borderBottomColor: props.$active ? colors.interaction.active : "transparent",
    },
    ":focus": {
        color: colors.text.default,
        borderBottomColor: colors.interaction.focus,
    }
}));
export default TabSelectorButton;
