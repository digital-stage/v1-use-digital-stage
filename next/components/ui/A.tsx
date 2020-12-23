import {styled} from "styletron-react";
import {colors} from "./Theme";

const A = styled("a", {
    color: colors.interaction.default,
    ":hover": {
        color: colors.interaction.hover
    },
    ":active": {
        color: colors.interaction.active
    },
    ":focus": {
        color: colors.interaction.focus
    },
})
export default A;
