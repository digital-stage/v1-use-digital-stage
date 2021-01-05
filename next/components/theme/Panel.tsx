import {styled} from "styletron-react";
import React from "react";

const Wrapper = styled("div", (props: { $variant: "default" | "white" | "grey" }) => ({
    borderRadius: '18px',
    paddingTop: '24px',
    paddingBottom: '24px',
    paddingLeft: '12px',
    paddingRight: '12px',
    color: props.$variant === "white" ? '#00000' : '#f4f4f4',
    boxShadow: 'rgba(0, 0, 0, 0.25) 0px 16px 20px',
    backgroundColor: props.$variant === "default" ? '#121212' : props.$variant === "white" ? "#f4f4f4" : "#393939"
}));

const Panel = (props: {
    children: React.ReactNode,
    variant?: "default" | "white" | "grey"
}) => {
    const {children, variant} = props;

    return (
        <Wrapper $variant={variant || "default"}>
            {children}
        </Wrapper>
    )
}
export default Panel;
