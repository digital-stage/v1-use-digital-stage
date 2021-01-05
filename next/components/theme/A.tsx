import {styled} from "styletron-react";
import colors from "./theme/colors";

const A = styled("a", {
    color: colors.primary.default,
    ":hover": {
        color: colors.primary.hover
    },
    ":active": {
        color: colors.primary.button.hover
    },
    ":focus": {
        color: colors.primary.outline
    },
})
export default A;
