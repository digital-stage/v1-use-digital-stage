import React from "react";
import AppBar from "./AppBar";
import Wrapper from "../ui/Wrapper";


const DocsWrapper = (props: {
    children: React.ReactNode
}) => {
    const {children} = props;

    return (
        <>
            <AppBar/>
            <Wrapper>
                {children}
            </Wrapper>
        </>
    )
}
export default DocsWrapper;
