import {styled} from "styletron-react";
import React from "react";
import {colors, fonts} from "./Theme";

const Caption = styled("div", {
    color: colors.text.default,
    fontWeight: 'bold',
    fontSize: '1.2em',
    ...fonts.headline
})

const H1 = styled("h1", {
    ...fonts.headline.h1,
    color: colors.text.default,
    fontSize: '1.4em',
    ...fonts.headline
})
const H2 = styled("h2", {
    ...fonts.headline.h2,
    color: colors.text.default,
    fontSize: '1.3em',
    ...fonts.headline
})
const H3 = styled("h3", {
    ...fonts.headline.h3,
    color: colors.text.default,
    fontSize: '1.2em',
    ...fonts.headline
})
const H4 = styled("h4", {
    ...fonts.headline.h4,
    color: colors.text.default,
    fontSize: '1.1em',
    ...fonts.headline
})
const H5 = styled("h5", {
    ...fonts.headline.h5,
    color: colors.text.default,
    fontSize: '0.9em',
    ...fonts.headline
})
const H6 = styled("h6", {
    ...fonts.headline.h6,
    color: colors.text.default,
    fontSize: '0.9em',
})


const Headline = (props: {
    variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "caption",
    children: React.ReactNode | string
}): JSX.Element => {
    const {variant, children} = props;
    switch (variant) {
        case "h1":
            return (
                <H1>{children}</H1>
            )
        case "h2":
            return (
                <H2>{children}</H2>
            )
        case "h3":
            return (
                <H3>{children}</H3>
            )
        case "h4":
            return (
                <H4>{children}</H4>
            )
        case "h5":
            return (
                <H5>{children}</H5>
            )
        case "h6":
            return (
                <H6>{children}</H6>
            )
        case "caption":
            return (
                <Caption>{children}</Caption>
            )
        default:
            return (
                <div>
                    {children}
                </div>
            );
    }
};

export default Headline;
