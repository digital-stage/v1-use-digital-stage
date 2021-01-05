import {styled} from "styletron-react";
import React from "react";
import fonts from "./theme/fonts";


const Body = styled("p", fonts.body.regular);
const Micro = styled("p", fonts.body.micro);

const Text = (props: {
    variant?: "body" | "micro";
    children: React.ReactNode;
    className?: string;
}): JSX.Element => {
    const {children, variant, className} = props;

    if (variant && variant === "micro") {
        return (
            <Micro className={className}>
                {children}
            </Micro>
        )
    }

    return (
        <Body className={className}>
            {children}
        </Body>
    )
};
export default Text;
