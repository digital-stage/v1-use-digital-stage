import {styled} from "styletron-react";
import React from "react";
import {colors, fonts} from "./Theme";

const Caption = styled("div", {
    color: colors.text.default,
    fontWeight: 'bold',
    fontSize: '1.2em',
    fontFamily: fonts.family.headline
})

const H1 = styled("h1", {
    color: colors.text.default,
    fontSize: '1.4em',
    fontFamily: fonts.family.headline
})
const H2 = styled("h2", {
    color: colors.text.default,
    fontSize: '1.3em',
    fontFamily: fonts.family.headline
})
const H3 = styled("h3", {
    color: colors.text.default,
    fontSize: '1.2em',
    fontFamily: fonts.family.headline
})
const H4 = styled("h4", {
    color: colors.text.default,
    fontSize: '1.1em',
    fontFamily: fonts.family.headline
})
const H5 = styled("h5", {
    color: colors.text.default,
    fontSize: '0.9em',
    fontFamily: fonts.family.headline
})


const Headline = (props: {
    variant: "h1" | "h2" | "h3" | "h4" | "h5" | "caption",
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
