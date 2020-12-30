import {colors} from "./Theme";
import {styled} from "styletron-react";
import Text from "./Text";
import React from "react";

const P = styled(Text, {
    color: colors.text.default,
})

const Paragraph = (props: {
    variant?: "body" | "micro";
    children: React.ReactNode;
    className?: string;
}) => {
    const {children, variant, className} = props;

    return (
        <P variant={variant} className={className}>
            {children}
        </P>
    )
}
export default Paragraph;
