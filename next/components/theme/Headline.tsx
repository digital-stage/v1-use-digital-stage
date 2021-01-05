import {styled} from "styletron-react";
import React from "react";
import fonts from "./theme/fonts";

const Caption = styled("div", {
    fontWeight: 'bold',
    fontSize: '1.2em',
})

const H1 = styled("h1", {
    ...fonts.headline.h1
})
const H2 = styled("h2", {
    ...fonts.headline.h2
})
const H3 = styled("h3", {
    ...fonts.headline.h3
})
const H4 = styled("h4", {
    ...fonts.headline.h4
})
const H5 = styled("h5", {
    ...fonts.headline.h5
})
const H6 = styled("h6", {
    ...fonts.headline.h6
})


const Headline = (props: {
    variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "caption";
    children: React.ReactNode | string;
    className?: string;
}): JSX.Element => {
    const {variant, children,className} = props;
    switch (variant) {
        case "h1":
            return (
                <H1 className={className}>{children}</H1>
            )
        case "h2":
            return (
                <H2 className={className}>{children}</H2>
            )
        case "h3":
            return (
                <H3 className={className}>{children}</H3>
            )
        case "h4":
            return (
                <H4 className={className}>{children}</H4>
            )
        case "h5":
            return (
                <H5 className={className}>{children}</H5>
            )
        case "h6":
            return (
                <H6 className={className}>{children}</H6>
            )
        case "caption":
            return (
                <Caption className={className}>{children}</Caption>
            )
        default:
            return (
                <div className={className}>
                    {children}
                </div>
            );
    }
};

export default Headline;
